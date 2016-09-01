	var mongoose = require( 'mongoose' ),
		Schema   = mongoose.Schema,
		crypto   = require( 'crypto' ),
		jwt      = require( 'jsonwebtoken' ),
		config   = require( '../../config/config' );

	var userSchema = new Schema( {
		email: {
			type: String,
			// unique: true,
			required: true
		},
		admin: {
			type: Boolean,
			required: true
		},
		active: {
			type: Boolean,
			required: true,
			default: true
		},
		supplier: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true,
			default: 'CLIENTE NUEVO'
		},
		contact: {
			type: String
		},
		address: {
			type: String
		},
		phone_numbers: [
			{ type: String }
		],
		userDemand : {
			type : Number,
			required: true,
			default: 0
		},
		hash: String,
		salt: String
	});

	userSchema.methods.createNewUser = function( userData ) {
		var vm = this;
		vm.email = userData.email;
		vm.admin = userData.admin;
		vm.supplier = userData.supplier;
		vm.active = userData.active;
		vm.name = userData.name;
		vm.contact = userData.contact;
		vm.address =  userData.address;
		vm.phone_numbers = userData.phone_numbers;
		vm.userDemand = userData.userDemand;
		vm.setPassword( userData.password );
		return vm.save();
	}

	userSchema.statics.getSupplierInfo = function( supplier ) {
		return this.findOne( { 'supplier' : supplier, 'admin' : true }, {} )
	}

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
			expiresIn: 3600 // expires in 1 hour
		})
	};

	module.exports = mongoose.model( 'User', userSchema )
