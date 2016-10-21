var User             = require( '../db/models/users' ),
    sendEmailService = require( './sendemail.service' );

module.exports.generatePassword = function( user ) {
	var newPass = Math.random().toString( 36 ).slice( -6 );
		return User.findById( user._id )
			.then ( promiseSetNewPass )
			.then ( saveUserFound )
			.then ( promiseSendEmail );

	function promiseSetNewPass( userFound ) {
		userFound.setPassword( newPass );
		return userFound;
	}
	function saveUserFound( userFound ) {
		return userFound.save();
	}
	function promiseSendEmail() {
		return sendEmailService.sendMail( user, newPass );
	}
};
