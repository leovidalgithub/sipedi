var express     = require( 'express' ),
	apiRouter   = express.Router(),
	verifyToken = require( '../../services/verifyToken.js' ),
	connect     = require( '../../db/db' ).connection,
	User        = require('../../db/models/users'),
	Product     = require('../../db/models/products');

	// var mongoose = require( 'mongoose' ),
	// 	Schema   = mongoose.Schema,
	// 	ObjectId = Schema.ObjectId,

// middleware for verify token in all /api requests
module.exports.middlewareToken = function ( req, res, next ) {

	// next();
	// return;

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

// POST /api/products/ --> returns all client products
module.exports.getProductsByClientID = function( req, res ) {
	var clientID = req.body.clientID;
	Product.find({'clients._id' : clientID })
	.then( function( products ) {
		return res.json( products )
	})

}

// POST /api/clients/ --> returns all supplier clients
module.exports.getClientsBySupplier = function( req, res ) {
	var supplier = req.body.supplier;
	connect.collection('users').find( { 'supplier' : supplier, 'admin' : false }, {} ).toArray( function( err, clients ) {
		if ( err ) {
			res.status( 403 ).send( 'Error getting clients by supplier' )
		}
		res.json( clients )
	})
}

// POST /api/supplier/ --> returns supplier info
module.exports.getSupplierInfo = function( req, res ) {
	var supplier = req.body.supplier;
	User.getSupplierInfo( supplier )
		.then( function( supplierInfo ) {
			return res.json( supplierInfo )
		})
		.catch( function ( err ) {
			return res.status( 403 ).res.send( 'Error getting supplier info' )
		})
}

// POST /api/products/setOrdered/ --> set client product ordered
module.exports.setProductOrdered = function( req, res ) {
	var productID = req.body.productID;
	Product.findById( productID, function ( err, productFound ) {
		productFound.setProductOrdered( req.body )
			.then( function( data ) {
				return res.json( data )
			})
			.catch( function( err ) {
				return res.status( 403 ).res.send( 'Error setting productOrdered' )
			})
	})

	// Product.setProductOrdered( req.body )
	// 	.then( function( data ) {
	// 		return res.json( data )
	// 	})
	// 	.catch( function( err ) {
	// 		return res.status( 403 ).res.send( 'Error setting productOrdered' )
	// 	})
}

module.exports.setProductQuantity = function( req, res ) {
	var productID = req.body.productID;
	Product.findById( productID, function ( err, productFound ) {
		productFound.setProductQuantity( req.body )
			.then( function( data ) {
				return res.json( data )
			})
			.catch( function( err ) {
				return res.status( 403 ).res.send( 'Error setting productQuantity' )
			})
	})
}

module.exports.setUserDemand = function( req, res ) {
	User.setUserDemand( req.body )
		.then( function( data ) {
			return res.json( data )
		})
		.catch( function( err ) {
			return res.status( 403 ).res.send( 'Error setting userDemand' )
		})
}

module.exports.addProductsClient = function( req, res ) {
	var clientId = '57c943e237f93d2861c97085';
	var client1 = {
		_id : clientId,
		quantity : 4,
		productOrdered : false
	};
	Product.findById( '57c74a0bb276c6201f8d2b53' )
		.then( function( data ) {
			var a = data.clients.filter( function( el ) {
				return el._id == clientId
			});
			if (a.length == 0) {
				data.clients.push( client1 );
				data.save();
			} 
		})
	// User.findOne( name : 'deedwdweew' )
	// .exec(function (err, user ){
 //        user.movies.push('deded')
 //        user.save()
	// })
	// 	.then( function( data ) {
	// 		var a = data.clients.filter( function( el ) {
	// 			return el._id == clientId
	// 		});
	// 		if (a.length == 0) {
	// 			data.clients.push( client1 );
	// 			data.save();
	// 		} 
	// 	})
	res.end()
}


