var express = require('express');
var mainRouter = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require( 'mongoose' );
var User = mongoose.model('User');
var config = require('../models/config'); // get our config file

// var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

// middleware for verify token in all /main requests
mainRouter.use( function( req, res, next ) {
	var token = req.body.token || req.params.token || req.headers['x-access-token'];
	if ( token ) { //	decode token
		jwt.verify( token, config.secret, function( err, decoded ) { // verifies secret and checks exp
			if ( err ) {
			res.status( 403 ).send({ 
				success: false,
				message: 'Invalid token.'
			});
			} else { 					// if everything is good
				req.decoded = decoded;
				next();
			}
		});
	} else { 						// if there is no token
		res.status( 403 ).send({ 
			success: false,
			message: 'No token provided.'
		});
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
