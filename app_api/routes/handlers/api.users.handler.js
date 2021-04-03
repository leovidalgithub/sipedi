const db = require( '../../db/db' );
const User         = require( '../../db/models/users' );
const generatePass = require( '../../services/generatepassword.service' );
const sipediSocket = require( '../../services/socket.service' );

// GET /api/getUsersBySupplier/:supplier --> returns all users of a supplier
module.exports.getUsersBySupplier = function(req, res) {
	const supplier = req.params.supplier;
	let justSupplier = req.query.justSupplier;
	justSupplier = justSupplier === 'true' ? true : false; // it comes as string and boolean is needed
	db.collection('users').find( { 'supplier' : supplier, 'admin' : justSupplier }, {} ).sort( { name: 1 } ).toArray( function( err, users ) {

		if (err) {
			res.status(503).send( 'Error getting users by supplier' );
		} else {
			console.log('users',users);
			res.json(users);
		}
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
			return res.status( 503 ).send( 'Error setting userDemand' );
		});
};

// PUT /api/users/ --> set user & [ generate password / send email ]
module.exports.setUser = function( req, res ) {
	var user         = req.body.user,
	generatePassword = req.body.generatePassword;

	var promises = [];
	promises.push( User.setUser( user ) );
	if ( generatePassword ) promises.push( generatePass.generatePassword( user ) );

	Promise.all( promises )
		.then( function( data ) {
			return res.json( data );
		})
		.catch( function( err ) {
			return res.status( 503 ).send( 'Error setting user' );
		});
};

// PUT /api/user/password/ --> set new user password (user change pass)
module.exports.setNewPassword = function( req, res ) {
	var userID       = req.body.userID,
		passwordData = req.body.passwordData;

		User.findById( userID )
			.then( verifyCurrentPassword )
			.then( setPassword )
			.then( function( userFound ) {
				userFound.save();
			})
			.then( function( data ) {
				res.status( 200 ).send( 'setNewPassword Ok.' );
			})
			.catch( function( err ) {
				if ( err === 402 ) {
					res.status( 402 ).send( 'currentPass wrong.' );
				} else {
					res.status( 401 ).send( 'setNewPassword error.' );
				}
			});

			function verifyCurrentPassword( userFound ) {
				if ( userFound.validPassword( passwordData.current ) ) {
					return Promise.resolve( userFound );
				} else {
					return Promise.reject( 402 );
				}
			}
			function setPassword ( userFound ) {
				userFound.setPassword( passwordData.new );
				return Promise.resolve( userFound );
			}
};

// var mongoose = require( 'mongoose' );
// console.log( mongoose.Types.ObjectId() );
