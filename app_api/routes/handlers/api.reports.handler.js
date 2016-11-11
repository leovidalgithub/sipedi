var nodemailer   = require( 'nodemailer' ),
	config       = require( '../../config/config' ),
	sendPDF      = require( '../../services/sendpdf.service' ),
	User         = require( '../../db/models/users' ),
	sipediSocket = require( '../../services/socket.service' );

    if ( process.env.NODE_ENV === 'production' ) {
    	emailPass =  process.env.EMAIL_PASS;
    } else {
    	emailPass = config.pass.email;
    }

// POST /api/reports/pdf/ --> send pdf email
module.exports.sendPDF = function( req, res ) {
    var pdf        = req.body.pdf,
        email      = req.body.email,
        reportName = req.body.reportName;

        sendPDF.sendPDFmail( pdf, reportName, email )
			.then( function( data ) {
				return res.json( data );
			})
			.catch( function( err ) {
				return res.status( 503 ).send( 'Error sending pdf report mail' );
			});
};

// PUT /api/reports/users --> set users (demandState 2)
module.exports.setUsers = function( req, res ) {
	var users    = req.body.users,
		supplier = req.body.supplier,
		promises = [];

	users.forEach( function( user ) {
		promises.push( User.setUser( user ) );
	});

	Promise.all( promises )
		.then( function( data ) {
			sipediSocket.sendUpdateMessageToAll( supplier );
			return res.json( data );
		})
		.catch( function( err ) {
			return res.status( 503 ).send( 'Error setting users' );
		});
};
