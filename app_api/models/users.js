var mongoose = require( 'mongoose' ),
	Schema   = mongoose.Schema,
	crypto   = require( 'crypto' ),
	jwt      = require( 'jsonwebtoken' ),
	config   = require( './config' );

	var userSchema = Schema({
			email: {
				type: String,
				// unique: true,
				required: true
			},
			admin: {
				type: Boolean,
				required: true
			},
			activo: {
				type: Boolean,
				required: true,
				default: true
			},
			proveedor: {
				type: String,
				required: true
			},
			nombre: {
				type: String,
				required: true,
				default: 'CLIENTE NUEVO'
			},
			contacto: {
				type: String
			},
			direccion: {
				type: String
			},
			telefonos: {
				type: String
			},
			hash: String,
			salt: String
	});

		userSchema.methods.setPassword = function( password ){
			this.salt = crypto.randomBytes( 16 ).toString( 'hex' );
			this.hash = crypto.pbkdf2Sync( password, this.salt, 1000, 64 ).toString( 'hex' );
		};

		userSchema.methods.validPassword = function( password ) {
			var hash = crypto.pbkdf2Sync( password, this.salt, 1000, 64 ).toString( 'hex' );
			return this.hash === hash;
		};

		userSchema.methods.generateJwt = function( user ) {
			return jwt.sign( user, config.secret, { // create a token
				expiresIn: 86400 // expires in 24 hours
			})
		};

module.exports = mongoose.model( 'User', userSchema );