var nodemailer = require( 'nodemailer' ),
	config     = require( '../config/config' ),
	User       = require( '../db/models/users' );

if ( process.env.NODE_ENV === 'production' ) {
	emailPass =  process.env.EMAIL_PASS;
} else {
	emailPass = config.pass.email;
}

module.exports.sendMail = function( user, newPass ) {
	var smtpConfig = {
			host: 'smtp.gmail.com',
			port: 465,
			secure: true, // use SSL
			auth: {
			user: 'sipediapp@gmail.com',
			pass: emailPass
			},
			tls: {
				rejectUnauthorized: false // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
		}
	};
	var transporter = nodemailer.createTransport( smtpConfig );

	function setMailOptions( supplierName ) {
			var mailOptions = {
					from : '"SiPEDi 👥" <info@sipedi.net>',
					// sender : 'info@sipedi.net',
					to : user.email,
					// cc :
					bcc : 'webmaster@sipedi.net',
					subject : 'SiPEDi acceso ✔',
					html : '<h3> ' + supplierName.name + '</h3><hr><h4><a href="http://sipedi.net">SiPEDi Web App</a><br><br>login : ' +
					 user.email + '<br><br>pass : ' + newPass + '</h4><hr><a href="mailto:info@sipedi.net?Subject=ID=' + user._id + '" target="_top">Enviar correo</a>',
				};
			return mailOptions;
	}

	function sendMailFn( mailOptions ) {
		return new Promise( function ( resolve, reject ) {
			transporter.sendMail( mailOptions, function( err, info ) {
				if( err ) {
					reject( err );
				} else {
					resolve( info );
				}
			});
		});
	}

	return User.getSupplierName( user )
		.then( setMailOptions )
		.then( sendMailFn );
};
