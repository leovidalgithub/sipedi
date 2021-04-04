const sendPDFService = require( '../../services/sendpdf.service' );
const User = require( '../../db/models/users' );
const sipediSocket = require( '../../services/socket.service' );

// POST /api/reports/pdf/ --> send pdf email
module.exports.sendPDF = function( req, res ) {
	const pdf = req.body.pdf;
	const email = req.body.email;
	const reportName = req.body.reportName;

	sendPDFService.sendPDFmail(pdf, reportName, email)
		.then( function(data) {
			return res.json(data);
		})
		.catch( function(err) {
			return res.status(503).send('Error sending pdf report mail');
		});
};

// PUT /api/reports/users --> set users (demandState 2)
module.exports.setUsers = function( req, res ) {
	let users = req.body.users;
	const supplier = req.body.supplier;
	let promises = [];

	users.forEach(function(user) {
		promises.push(User.setUser(user));
	});

	Promise.all(promises)
		.then(function(data) {
			sipediSocket.sendUpdateMessageToAll(supplier);
			return res.json(data);
		})
		.catch(function(err) {
			return res.status(503).send('Error setting users');
		});
}