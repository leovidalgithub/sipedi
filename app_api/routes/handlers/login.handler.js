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
		// console.log( 'post : login/register' );
		// var user = new User();
		// user.email = req.body.email;
		// user.admin = false;
		// user.supplier = 'vinolas';
		// user.active = true;
		// user.name = 'Pedro López';
		// user.contat = 'Pedrito';
		// user.address = 'Av. Sucre, Los Dos Caminos';
		// user.phone_numbers = ['234 56 77', '234 21 90'];
		// user.setPassword( req.body.password );
		// user.save(function( err ) {
		// 	res.status( 200 ).send( 'data saved!' );
		// });
	}