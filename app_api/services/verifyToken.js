const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = function(token, callback) {
	return jwt.verify(token, config.secretWord, callback); // verify secret and checks exp
};
