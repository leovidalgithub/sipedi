var nodemailer = require( 'nodemailer' ),
	config     = require( '../config/config' );

if ( process.env.NODE_ENV === 'production' ) {
	emailPass =  process.env.EMAIL_PASS;
} else {
	emailPass = config.pass.email;
}

module.exports.sendPDFmail = function( pdf, reportName, email ) {
    var pdfName = reportName + '.pdf';
    var smtpConfig = {
			host: 'smtp.gmail.com', //host: 'smtp.gmail.com',port: 465,secure: true,
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
	var mailOptions = {
			from : '"SiPEDi 👥" <info@sipedi.net>',
			// sender : 'info@sipedi.net',
			to : email, // 'xxx@xxx.es, xxx@xxx.com',
			// cc :
			bcc : 'webmaster@sipedi.net',
			subject : 'SiPEDi acceso ✔',
			// text : '🐴 ' + supplier + '\n\nhttp://sipedi.herokuapp.com\n\nlogin : ' + user.email + '\n\npass: ' + newPass,
			html : '<h3>🐴 </h3><hr>http://sipedi.herokuapp.com<br><br>login : ' + email + '<br><br>pass : ',
            attachments: [
				{   // data uri as an attachment
					filename: pdfName,
					contentType: 'application/pdf',
					path: 'data:application/pdf;base64,' + pdf
				}
            ]
		};
console.log(email);
        return new Promise( function ( resolve, reject ) {
            transporter.sendMail( mailOptions, function( err, info ) {
                if( err ) {
                    console.log(err);
                    reject( err );
                } else {
                    console.log(info);
                    resolve( info );
                }
            });
        });
};
