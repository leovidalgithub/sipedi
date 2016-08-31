var express     = require( 'express' ),
	apiRouter   = express.Router(),
	verifyToken = require( '../../services/verifyToken.js' ),
	connect     = require( '../../db/db' ).connection,
	productModel = require('../../db/models/products').productModel;
	clientModel = require('../../db/models/products').clientModel;

	var ObjectID = require('mongodb').ObjectID;

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

// productModel.find( { _id:productID,
// 	{ 'clients.quantity' : 89} } , function( err, data ) {

// 		res.json(data)
// })

var product = new productModel();

// productModel.findById(productID, function (err, room) {


productModel.update(
        { _id: "57c4509e695a349c293cb061" , "clients._id":"57bee5da309b288c37e2ea7b" },
        { $set:{ "quantity":"666" } },
        { upsert: true },
        function(err){
        	console.log(err)

        }
    );

	// var clientsSchema = Schema( {
	//   client: { type: Schema.ObjectId, ref: 'User' },
	//   quantity: { type: Number, default: 0 },
	//   ordered: { type: Boolean, default: false }
	// })

	// res.json(room);

//     if (!err) {
//         //we can remove a user by Id rather than looping over an array 
//         productModel.clientsSchema(clientID).remove();
//         productModel.save(function (err) {
//               // do something
//            });
//       }
// });

// productModel.findById(productID).populate({
//      "clients": { "_id": "clientID" },
//      "options": { "skip": 0, "limit": 2 }
// }).exec(function(err,docs) {

// 		res.json(data)
// });

// productModel.findById(productID)
// .where('clients._id', clientID)
// .exec(function(err,data) {
// 	res.json(data)
// })

// productModel.findById(productID)
// 	// .populate('clients')
// 	.exec(function (err, post) {
// 		post.clients.forEach( function( el ) {
// 			console.log(el);
// 		});
// productModel.save(function(err) {
// 	console.log(err)
// })
// 			res.json(post);
//   	// return;
// 		 //    post.clients[0].remove();
// 		 //    post.save(function (err) {
// 		 //    	console.log(err)
//    //    // do something
//    //  });
//   // }
// });


		// productModel.findById(productID, function(err,doc) {
		// 	doc.clients.findById(clientID, function(err,doc2) {
		// 		res.json(doc2)
		// 	})
		// 	// clientModel.findById(clientID, function(err,docs2) {
		// 	// })
		// })

// productModel.find({_id:productID,'clients._id':clientID}, function(err, foundUsers){
// 	res.json(foundUsers)
// });

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

// productModel.find({'_id': productID, 'clients._id': clientID}).lean().exec(function (err, user) {
//     var valor = 999;
// 	    productModel.update(
// 	        {
// 	            _id: user._id, 
// 	            'clients._id': clientID
// 	        },
// 	        {
// 	            $set: {
// 	                'clients.$.quantity': valor
// 	            }
// 	        },
// 	        function (err, update) {
// 	        	res.send(update)
// 	        }
// 	    );
// });

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

