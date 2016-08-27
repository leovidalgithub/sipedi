var jwt = require('jsonwebtoken');
var config = require('../config/config');

module.exports = function( token, callback ) {
	return jwt.verify( token, config.secret, callback ) // verifies secret and checks exp
}
