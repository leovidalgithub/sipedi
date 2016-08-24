var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function( res, status, content ) {
	res.status( status );
	res.json( content );
};

module.exports.register = function( req, res ) {

	console.log( 'post : api/register' );
	var user = new User();
	user.email = req.body.email;
	user.admin = true;
	user.proveedor = 'vinolas';
	user.setPassword( req.body.password );
	user.save(function( err ) {
		res.status(200).send('data saved!');
	});

	// if(!req.body.name || !req.body.email || !req.body.password) {
	//   sendJSONresponse(res, 400, {
	//     "message": "All fields required"
	//   });
	//   return;
	// }
};
module.exports.login = function( req, res ) {
	console.log( 'post : api/login' );

		User.findOne({ email: req.body.email }, function ( err, user ) {
			if (err) { res.status(403).send('user error') }

			// if user not found in database
			if (!user) {
					sendJSONresponse(res, 403, {
						"message": "User not found"
					});
					return;
			}
			// if password is wrong
			if ( !user.validPassword( req.body.password ) ) {
				sendJSONresponse( res, 403, {
					"message": "Password is wrong"
				});
				return;
			}
			// If credentials are correct, return the user object
			var token = user.generateJwt( user );
				res.status(200);
				res.json({
				"token" : token
			});
		});

								// if(!req.body.email || !req.body.password) {
								//   sendJSONresponse(res, 400, {
								//     "message": "All fields required"
								//   });
								//   return;
								// }

};