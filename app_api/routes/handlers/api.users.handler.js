var	connect          = require( '../../db/db' ).connection,
	User             = require( '../../db/models/users' ),
	sendEmailService = require( '../../services/sendemail.service' ),
	sipediSocket     = require( '../../../sockets' );

// POST /api/clients/ --> returns all supplier users
module.exports.getUsersBySupplier = function( req, res ) {
	var supplier     = req.body.supplier;
	var justSupplier = req.body.justSupplier;
	connect.collection('users').find( { 'supplier' : supplier, 'admin' : justSupplier }, {} ).sort( { name: 1 } ).toArray( function( err, users ) {
		if ( err ) {
			res.status( 503 ).send( 'Error getting users by supplier' );
		}
		if ( users ) res.json( users );
	});
};

// POST /api/user/setUserDemand/ --> set user demand
module.exports.setUserDemand = function( req, res ) {
	var clientID   = req.body.clientID,
		supplierID = req.body.supplierID,
		admin      = req.body.admin;
	User.setUserDemand( req.body )
		.then( function( data ) {
			sipediSocket.sendUpdateMessage( admin, clientID, supplierID );
			return res.json( data );
		})
		.catch( function( err ) {
			return res.status( 503 ).res.send( 'Error setting userDemand' );
		});
};

// PUT /api/users/ --> [ generate password / send email ] / set users into DB
module.exports.setUser = function( req, res ) {
	var user = req.body.user;

	generatePassWord()
		.then( updateUser )
		.then( function ( data ) {
			res.statusCode = 200;
			return res.json( user );
		})
		.catch( function ( err ) {
			res.statusCode = 503;
			return res.json( err );
		});

	function updateUser() {
		console.log(user.name);
		return User.setUser( user );
	}
	function generatePassWord() {
		if ( req.body.generatePassword ) {
			var newPass = Math.random().toString( 36 ).slice( -6 );
			var data = {
				user     : user,
				supplier : req.body.supplier,
				newPass  : newPass,
			};
			function promiseFindUser() {
				console.log('findUser');
				return User.findById( user._id );
			}
			function promiseSetNewPass( userFound ) {
				console.log('setPass');
				userFound.setPassword( newPass );
				user.hash = userFound.hash;
				user.salt = userFound.salt;
			}
			function promiseSendEmail() {
				return sendEmailService.sendMail( data );
			}
			return promiseFindUser()
				.then ( promiseSetNewPass )
				.then ( promiseSendEmail );
		} else {
			return Promise.resolve();
		}
	}
};
