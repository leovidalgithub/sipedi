var express     = require( 'express' ),
	apiRouter   = express.Router(),
	verifyToken = require( '../../services/verifyToken.js' ),
	connect     = require( '../../db/db' ).connection,
	User        = require('../../db/models/users'),
	Product     = require('../../db/models/products');

// middleware for verify token in all /api requests
module.exports.middlewareToken = function ( req, res, next ) {
	var token = req.query.token || req.body.token || req.params.token || req.headers['x-access-token'];
	if ( token ) { //	decode token
			verifyToken( token, function( err, decoded ) {
			if ( err ) {
				console.log( 'middleware : token err' );
				res.status( 403 ).send( { success: false, message: 'Invalid token.' } )
			} else { 					// if everything is good
				console.log( 'middleware : token ok' );
				req.decoded = decoded;
				next()
			}
		})
	} else { 						// token not received
			console.log( 'main.router.middleware : token not received' );
			res.status( 403 ).send( { success: false, message: 'No token provided.' } )
	}
}

// POST /api/products/ --> returns all-client-products or all-supplier-products
module.exports.getProducts = function( req, res ) {
	var clientID = req.body.clientID;
	var supplier = req.body.supplier;
	var allProducts = req.body.allProducts;
	var query = allProducts ? { 'supplier' : supplier } : { 'clients._id' : clientID, 'supplier' : supplier }
	Product.find( query )
		.then( function( products ) {
			return res.json( products );
		})
		.catch( function( err ) {
			return res.status( 503 ).res.send( 'Error getting products' );
		});
}

// POST /api/clients/ --> returns all supplier users
module.exports.getUsersBySupplier = function( req, res ) {
	var supplier = req.body.supplier;
	connect.collection('users').find( { 'supplier' : supplier }, {} ).sort( { name: 1 } ).toArray( function( err, users ) {
		if ( err ) {
			res.status( 503 ).send( 'Error getting users by supplier' );
		}
		res.json( users )
	})
}

// POST /api/products/setOrdered/ --> set client product ordered
module.exports.setProductOrder = function( req, res ) {
	var productID = req.body.productID;
	Product.findById( productID, function ( err, productFound ) {
		productFound.setProductOrder( req.body )
			.then( function( data ) {
				return res.json( data );
			})
			.catch( function( err ) {
				return res.status( 503 ).res.send( 'Error setting productOrder' );
			})
	})
}

module.exports.setUserDemand = function( req, res ) {
	User.setUserDemand( req.body )
		.then( function( data ) {
			return res.json( data );
		})
		.catch( function( err ) {
			return res.status( 503 ).res.send( 'Error setting userDemand' );
		})
}
