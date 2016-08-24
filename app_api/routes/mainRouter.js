var express = require('express');
var mainRouter = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require( 'mongoose' );
var User = mongoose.model('User');
var config = require('../models/config'); // get our config file

// var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

// middleware for verify token in all /api requests
mainRouter.use( function( req, res, next ) {
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.params.token || req.headers['x-access-token'];
	if ( token ) { //	decode token
		// verifies secret and checks exp
		jwt.verify( token, config.secret, function( err, decoded ) {
			if ( err ) {
			res.status( 403 ).send({ 
				success: false,
				message: 'Invalid token.'
			});
			// return;

			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;
				next();
			}
		});
	} else {
		// if there is no token return an error
		res.status( 403 ).send({ 
			success: false,
			message: 'No token provided.'
		});
		// return;
	}
});

mainRouter.use('/', function( req, res ) {
	// res.send( req.decoded );
	res.json( req.decoded );
	// res.json({
	// 	msg : 'from mainRouter api/',
	// 	token:  token
	// });
})

// profile
// mainRouter.get('/profile', auth, ctrlProfile.profileRead);


module.exports = mainRouter;
