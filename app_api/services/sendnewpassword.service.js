const nodemailer = require('nodemailer');
const User = require('../db/models/users');
const config = require('../config/config');

module.exports.sendMail = function(user, newPass) {
	const transporter = nodemailer.createTransport(config.smtp);

	function setMailOptions(supplierName) {
			const mailOptions = {
					from: `SiPEDi 🙋🏾‍♂️ ${config.sipediEmail}`,
					sender: `${config.sipediEmail}`,
					to: user.email,
					// cc:
					bcc: `${config.sipediEmail}`,
					subject: 'SiPEDi - información de acceso (ℹ)',
					html: `
							<h2>Sistema de Pedido a Empresas de Distribución</h2><hr>
							<h3>${supplierName.name}</h3>
							<h3><a href="${config.sipediURL}">Ir a SiPEDi</a></h3>
							<h3>usuario: ${user.email}</h3>
							<h3>contraseña: ${newPass}</h3>
							<p>--- Recuerde que puede cambiar su contraseña desde el menú de opciones ---</p><hr>
							<h3><a href="mailto:${config.sipediEmail}?Subject=userId=${user._id}">Comunicarse con SiPEDI</a></h3>`
				}
			return mailOptions;
	}

	function sendMailFn(mailOptions) {
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

	return User.getSupplierName(user)
		.then(setMailOptions)
		.then(sendMailFn);
}
