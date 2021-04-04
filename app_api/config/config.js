const NODE_ENV = process.env.NODE_ENV || 'dev';
const EMAILPASS_ENV = process.env.EMAILPASS_ENV;
const SECRETWORD_ENV = process.env.SECRETWORD_ENV;
const DATABASEPASSWORD_ENV = process.env.DATABASEPASSWORD_ENV;

module.exports = {
	secretWord: SECRETWORD_ENV,

	sipediURL: 'https://sipedi.leovidal.es/',

	sipediEmail: 'info@sipedi.leovidal.es',

	databaseURI: `mongodb+srv://sipedi_user:${DATABASEPASSWORD_ENV}@sipedi.dpvlm.mongodb.net/sipedi?retryWrites=true&w=majority`,

	smtp: {
		host: 'smtp.leovidal.es',
		port: 465,
		secure: true, // use SSL
		auth: {
			user: 'cv@leovidal.es',
			pass: EMAILPASS_ENV
		},
		tls: {
			rejectUnauthorized: false // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
		}
	}
}