var nodemailer = require('nodemailer'),
	config     = require('../config/config');

if ( process.env.NODE_ENV === 'production' ) {
	emailPass =  process.env.EMAIL_PASS;
} else {
	emailPass = config.emailPass;
}

module.exports.sendMail = function( data ) {
	var newPass = data.newPass;
	var supplier = data.supplier;
	var user = data.user;
//*******************************************************************
	var smtpConfig = {
			host: 'smtp.sipedi.net',
			port: 465,
			secure: true, // use SSL
			auth: {
			user: 'webmaster@sipedi.net',
			pass: emailPass
			},
			tls: {
				rejectUnauthorized: false // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
		}
	};
	// var smtpConfig = {
	// 		host: 'smtp.gmail.com',
	// 		port: 465,
	// 		secure: true, // use SSL
	// 		auth: {
	// 		user: 'leoamiguo@gmail.com',
	// 		pass: emailPass
	// 		},
	// 		tls: {
	// 			rejectUnauthorized: false // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	// 	}
	// };
//*******************************************************************
	var transporter = nodemailer.createTransport( smtpConfig );

	var mailOptions = {
		from : '"SiPEDi 👥" <info@sipedi.net>',
		// sender : 'info@sipedi.net',
		to : user.email, // 'leo@leovidal.es, leoamiguo@yahoo.com',
		// cc :
		bcc : 'webmaster@sipedi.net',
		subject : 'SiPEDi acceso ✔',
		// text : '🐴 ' + supplier + '\n\nhttp://sipedi.herokuapp.com\n\nlogin : ' + user.email + '\n\npass: ' + newPass,
		html : '<h3>🐴 ' + supplier + '</h3><hr>http://sipedi.herokuapp.com<br><br>login : ' + user.email + '<br><br>pass : ' + newPass,
	};

	var emailPromise = new Promise( function ( resolve, reject ) {
		transporter.sendMail( mailOptions, function( err, info ) {
			if( err ) {
				reject( err );
			} else {
				resolve( info );
			};
		});
	});

	return emailPromise;

}
