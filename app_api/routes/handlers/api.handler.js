var express     = require( 'express' ),
	apiRouter   = express.Router(),
	verifyToken = require( '../../services/verifyToken.js' ),
	connect     = require( '../../db/db' ).connection,
	productModel = require('../../db/models/products')

// middleware for verify token in all /api requests
module.exports.middlewareToken = function ( req, res, next ) {
	var token = req.query.token || req.body.token || req.params.token || req.headers['x-access-token'];
	if ( token ) { //	decode token
			verifyToken( token, function( err, decoded ) {
			if ( err ) {
				console.log( 'main.router.middleware : token err' );
				res.status( 403 ).send( { success: false, message: 'Invalid token.' } )
			} else { 					// if everything is good
				console.log( 'main.router.middleware : token ok' );
				req.decoded = decoded;
				next()
			}
		})
	} else { 						// token not received
			console.log( 'main.router.middleware : token not received' );
			res.status( 403 ).send( { success: false, message: 'No token provided.' } )
	}
}

// GET /api/products/:clientID --> returns all client products
module.exports.getProductsByClientID = function( req, res ) {
	var clientID = req.params.clientID;
	connect.collection('products').find( { 'clients._id' : clientID } ).toArray( function( err, products ) {
		if ( err ) {
			res.status( 403 ).send( 'Error getting products by clientID' )
		}
		res.json( products )
	})
}

// GET /api/clients/:supplier --> returns all supplier clients
module.exports.getClientsBySupplier = function( req, res ) {
	var supplier = req.params.supplier;
	connect.collection('users').find( { 'supplier' : supplier, 'admin' : false }, {} ).toArray( function( err, clients ) {
		if ( err ) {
			res.status( 403 ).send( 'Error getting clients by supplier' )
		}
		res.json( clients )
	})
}

// GET /api/supplier/:supplier --> returns supplier info
module.exports.getSupplierInfo = function( req, res ) {
	var supplier = req.params.supplier;
	connect.collection('users').find( { 'supplier' : supplier, 'admin' : true }, {} ).toArray( function( err, supplier ) {
		if ( err ) {
			res.status( 403 ).send( 'Error getting supplier info' )
		}
		res.json( supplier )
	})
}

// POST /api/products/setOrdered/ --> set client product ordered
module.exports.setProductOrdered = function( req, res ) {
	var productID = req.body.productID,
		clientID = req.body.clientID,
		newOrdered = req.body.newOrdered;

// productModel.findByIdAndUpdate(productID, { $set: { name: 'jason borne' }}, options, callback)
		// productModel.findById( productID, function ( err, product ) {
		// 	if ( err ) {
		// 		res.status( 403 ).send( 'Error updating client product ordered' )
		// 	}
		// 	var client1 = product.clients.find( function( client2 ) {
		// 		// console.log( client2.client + '\n' + clientID  )
		// 		return client2._id == clientID;
		// 	})
		// 	client1.ordered = newOrdered;
		// 	res.json( client1 )
		// 	// res.json( client )
		// })
		// productModel.findByIdAndUpdate(
		//     {productID, 'clients._id': clientID}, 
		//     {'$set': {
		//         'quantity': 666
		//     }},
		//     function( err, numAffected ) {
		//     	if (err) { console.log(err)}
		//     res.send(numAffected);
		//     });
		// productModel.find(
		//     {'_id' : productID}, 
		//     function( err, numAffected ) {
		//     	if (err) { console.log(err)}
		//     res.send(numAffected);
		//     });

	// productModel.update( {'_id' : productID , "clients._id" : clientID } , 
 //                {$set : {'clients.$.quantity' : '777'} } , function(err,doc){
 //                	res.send(doc)
 //                })

productModel.find({'_id': productID, 'clients._id': clientID}).lean().exec(function (err, user) {

    // var interest =  ... //find specific interest
    // interest.description = 'I love tacos... Like, a lot'.
    var valor = 999;

	    productModel.update(
	        {
	            _id: user._id, 
	            'clients._id': clientID
	        },
	        {
	            $set: {
	                'clients.$.quantity': valor
	            }
	        },
	        function (err, update) {
	        	res.send(update)
	        }
	    );
});
		// productModel.find({'_id': productID}, function( err, doc ) {

			// productModel.children.clients.find({'_id': clientID},{'quantity' : '32'}, function(err,doc2) {
			// res.json(doc2)

			// });
			// productModel.save();

// ADD ITEM
// 	var newClient = {
// 		quantity: 55,
// 		ordered: true
// 	};
// // find by document id and update
// productModel.findByIdAndUpdate(
//     productID,
//     {$push: {clients: newClient}},
//     {safe: true, upsert: true},
//     function(err, model) {
//     	res.send(model)
//     }
// );
// ADD ITEM

// productModel.findByIdAndUpdate(
//     {productID, 'clients._id': clientID},
//     {$set: {'quantity': '66'}},
//     function(err, model) {
//     	res.send(model)
//     }
// );


// res.end()
}
