var express     = require( 'express' ),
	apiRouter   = express.Router(),
	verifyToken = require( '../../services/verifyToken.js' ),
	connect     = require( '../../db/db' ).connection;

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
	connect.collection('products').find( { 'clients.client' : clientID } ).toArray( function( err, products ) {
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
