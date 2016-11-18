var	verifyToken = require( '../../services/verifyToken.js' );

// MIDDLEWARE VERIFY TOKEN / ALL API ROUTES
module.exports.middlewareToken = function ( req, res, next ) {
	var token = req.query.token || req.body.token || req.params.token || req.headers['x-access-token'];
	if ( token ) { //	decode token
			verifyToken( token, function( err, decoded ) {
			if ( err ) {
				res.status( 403 ).send( { success: false, message: 'Invalid token.' } );
			} else { 					// if everything is good
				req.decoded = decoded;
				next();
			}
		});
	} else { 						// token not received
			res.status( 403 ).send( { success: false, message: 'No token provided.' } );
	}
};
