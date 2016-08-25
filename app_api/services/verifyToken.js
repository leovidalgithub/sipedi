var jwt = require('jsonwebtoken');
var config = require('../models/config'); // get our config file

module.exports = function( token, callback ) {
	return jwt.verify( token, config.secret, callback ) // verifies secret and checks exp
}
