//app_api / routes / handlers / login.handler

var User = require('../../db/models/users');
var verifyToken = require('../../services/verifyToken.js');

	module.exports.login = function( req, res ) {

			console.log( 'API authentication.js login function' );

			if( !req.body.email || !req.body.password ) {
				res.status( 400 ). send( 'All fields required' );
				return
			}

			User.findOne({ email: req.body.email }, function ( err, user ) {
				if ( err ) {
					console.log( 'authentication.login findOne err' );
					res.status( 403).send( 'user error' );
					return
				}
				if ( !user ) { // user not found
					console.log( 'authentication.login: user not found' );
					res.status( 403 ).json( 'User not found' );
					return
				}
				if ( !user.validPassword( req.body.password ) ) { // password wrong
					console.log( 'authentication.login : password wrong' );
					res.status( 403 ).json( 'Password is wrong' );
					return
				}
				console.log( 'authentication.login : credentials correct' );
				var token = user.generateJwt( user ); // credentials correct --> token generate

				verifyToken( token, function( err, decoded ) {
					res.status( 200 );
					res.json( { 'token'   : token,
								'decoded' : decoded
							  })
				})
			})
	}
	module.exports.register = function( req, res ) {

		var userData = {
			email : req.body.email,
			password : req.body.password,
			admin : false,
			supplier : 'valero',
			active : true,
			name : 'Bar Metrópolis',
			contact : 'Paco',
			address :  'Eix Macià, Sabadell 41',
			phone_numbers : ['666 45 56 77'],
			userDemand : 0
		};

		var newUser = new User();
		newUser.createNewUser( userData )
			.then( function( newUserSaved ) {
				var token = newUserSaved.generateJwt( newUserSaved );
				// http://stackoverflow.com/questions/38085582/express-4-chaining-res-json-with-promise-then-does-not-work
				// res.status( 200 ).res.json( { 'token'   : token } )
				// return res.json.bind({ 'token'   : token })
				return res.json( { 'token'   : token } )
			})
			.catch( function( err ) {
				console.log( err );
				res.status( 403 ).json( 'Error creating new user' );
			})

	}