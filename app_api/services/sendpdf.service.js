const nodemailer = require('nodemailer');
const config = require('../config/config');

module.exports.sendPDFmail = function(pdf, reportName, email) {
	const pdfName = reportName + '.pdf';
	const transporter = nodemailer.createTransport(config.smtp);

	const mailOptions = {
			from: `SiPEDi 🙋🏾‍♂️ ${config.sipediEmail}`,
			sender: `${config.sipediEmail}`,
			to: email,
			// cc:
			bcc: `${config.sipediEmail}`,
			subject: 'SiPEDi - reporte de Pedidos (ℹ)',
			html : `
					<h2>Sistema de Pedido a Empresas de Distribución</h2><hr>
					<h3>Informe de Pedidos Pendientes</h3>`,
			attachments: [ // data uri as an attachment
				{
					filename: pdfName,
					contentType: 'application/pdf',
					path: 'data:application/pdf;base64,' + pdf
				}
			]
		}

		return new Promise(function (resolve, reject) {
			transporter.sendMail(mailOptions, function(err, info) {
				if(err) {
					reject(err);
				} else {
					resolve(info);
				}
			})
		})
}