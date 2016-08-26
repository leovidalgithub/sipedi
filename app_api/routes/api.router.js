var express     = require('express');
var apiRouter  = express.Router();
var User        = require('../models/users');
var Product     = require('../models/products');
var verifyToken = require('../services/verifyToken.js');
var conn        = require('../models/db');
var connect     = conn.connection;
// var ctrlProfile = require('../controllers/profile');

// middleware for verify token in all /main requests
apiRouter.use( function( req, res, next ) {
	var token = req.query.token || req.body.token || req.params.token || req.headers['x-access-token'];
	if ( token ) { //	decode token
			verifyToken( token, function( err, decoded ) {
			if ( err ) {
				console.log('main.router.middleware : token err');
				res.status( 403 ).send( { success: false, message: 'Invalid token.' } );
			} else { 					// if everything is good
				console.log('main.router.middleware : token ok');
				req.decoded = decoded;
				next();
			}
		});
	} else { 						// if there is no token
			console.log('main.router.middleware : token not received');
			res.status( 403 ).send( { success: false, message: 'No token provided.' } );
	}
});

apiRouter.get( '/products/:clientID', function( req, res ) {

	var clientID = req.params.clientID;
	connect.collection('products').find({ 'clients.client' : clientID }).toArray( function( err, productos ) {
		if ( err ) {
			res.status( 403 ).send('Error getting products by clientID')
		}
		res.json( productos );
	})
})

// profile
// apiRouter.get('/profile', auth, ctrlProfile.profileRead);

module.exports = apiRouter;
