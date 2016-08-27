var express     = require( 'express' ),
	apiRouter   = express.Router(),
    Product     = require( '../../db/models/products' ),
    verifyToken = require( '../../services/verifyToken.js' ),
    conn        = require( '../../db/db' ),
    connect     = conn.connection;

// middleware for verify token in all /api requests
module.exports.middlewareToken = function ( req, res, next ) {
	var token = req.query.token || req.body.token || req.params.token || req.headers['x-access-token'];
	if ( token ) { //	decode token
			verifyToken( token, function( err, decoded ) {
			if ( err ) {
				console.log('main.router.middleware : token err');
				res.status( 403 ).send( { success: false, message: 'Invalid token.' } )
			} else { 					// if everything is good
				console.log('main.router.middleware : token ok');
				req.decoded = decoded;
				next()
			}
		})
	} else { 						// token not received
			console.log('main.router.middleware : token not received');
			res.status( 403 ).send( { success: false, message: 'No token provided.' } )
	}
}

// GET /api/products/:clientID --> returns all client products
module.exports.getProductsByClientID = function( req, res ) {
	var clientID = req.params.clientID;
	connect.collection('products').find({ 'clients.client' : clientID }).toArray( function( err, productos ) {
		if ( err ) {
			res.status( 403 ).send('Error getting products by clientID')
		}
		res.json( productos );
	})
}
