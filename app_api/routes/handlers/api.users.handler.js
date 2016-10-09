var	connect     = require( '../../db/db' ).connection,
	User        = require( '../../db/models/users' );

// POST /api/clients/ --> returns all supplier users
module.exports.getUsersBySupplier = function( req, res ) {
	var supplier = req.body.supplier;
	connect.collection('users').find( { 'supplier' : supplier }, {} ).sort( { name: 1 } ).toArray( function( err, users ) {
		if ( err ) {
			res.status( 503 ).send( 'Error getting users by supplier' );
		}
		if ( users ) res.json( users );
	});
};

// POST /api/user/setUserDemand/ --> set user demand
module.exports.setUserDemand = function( req, res ) {
	User.setUserDemand( req.body )
		.then( function( data ) {
			return res.json( data );
		})
		.catch( function( err ) {
			return res.status( 503 ).res.send( 'Error setting userDemand' );
		});
};

// PUT /api/users/ --> set users into DB
module.exports.setUser = function( req, res ) {
	User.setUser( req.body.user )
		.then( function ( data ) {
			return res.json( data );
		})
		.catch( function ( err ) {
			return res.status( 503 ).res.send( 'Error setting products' );
		});
};
