var jwt    = require( 'jsonwebtoken' ),
	config = require( '../config/config' );

module.exports = function( token, callback ) {
	return jwt.verify( token, config.pass.secret, callback ); // verifies secret and checks exp
};
