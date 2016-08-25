var express = require('express');
var mainRouter = express.Router();
var User = require('../models/users');
var Product = require('../models/products');
var verifyToken = require('../services/verifyToken.js');
// var ctrlProfile = require('../controllers/profile');

// middleware for verify token in all /main requests
mainRouter.use( function( req, res, next ) {
	var token = req.body.token || req.params.token || req.headers['x-access-token'];
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

mainRouter.post( '/', function( req, res ) {
		console.log( "main.router POST '/'" );
		// var obj = [];
		Product.find({}, function( err, users ) {
			if (err) res.send( err );
			// obj.push( users );
			// res.send(obj);

			res.json( users );
			// users._creator = aaron;
			// console.log(users._creator.name); // prints "Aaron"
		});

})

// profile
// mainRouter.get('/profile', auth, ctrlProfile.profileRead);


module.exports = mainRouter;
