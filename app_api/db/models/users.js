const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

var userSchema = new Schema( {
	email        : { type : String,  required: true }, // unique: true,
	admin        : { type : Boolean, required: true },
	active       : { type : Boolean, required: true, default: true },
	activeAdmin  : { type : Boolean, required: true, default: true },
	supplier     : { type : String,  required: true },
	name         : { type : String,  required: true, default: 'CLIENTE NUEVO' },
	contact      : { type : String,  required: false },
	address      : { type : String,  required: false },
	phone        : { type : String,  required: false },
	notes        : { type : String,  required: false },
	logo         : { type : String,  required: false },
	demandState  : { type : Number,  required: true, default: 0 },
	demandDate   : { type : Date,    required: false, default : Date.now },
	hash: String,
	salt: String
});

userSchema.methods.createNewUser = function( userData ) {
	var vm = this;
	vm.email         = userData.email;
	vm.admin         = userData.admin;
	vm.supplier      = userData.supplier;
	vm.active        = userData.active;
	vm.name          = userData.name;
	vm.contact       = userData.contact;
	vm.address       =  userData.address;
	vm.phone_numbers = userData.phone_numbers;
	vm.userDemand    = userData.userDemand;
	vm.setPassword( userData.password );
	return vm.save();
};

userSchema.statics.setUserDemand = function( userInfo ) {
	var clientId = userInfo.clientID;
	var demandState = userInfo.demandState;
	var demandDate = userInfo.demandDate;
	return this.findByIdAndUpdate( clientId, { demandState : demandState, demandDate : demandDate } );
};

userSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
	const hash = crypto.pbkdf2Sync( password, this.salt, 1000, 64, 'sha512' ).toString( 'hex' );
	return this.hash === hash;
};

userSchema.methods.generateJwt = function(user) {
	return jwt.sign(JSON.stringify(user), config.pass.secret, { // create a token
		// expiresIn: 9600 // 3600 expires in 1 hour
	});
};

userSchema.statics.setUser = function( user ) {
	return this.findByIdAndUpdate( user._id, user, { upsert : false });
};

userSchema.statics.getSupplierName = function( user ) {
	return this.findOne( { 'supplier' : user.supplier, 'admin' : true }, { 'name' : 1,'_id' : 0 } );
};

module.exports = mongoose.model( 'User', userSchema );

// userSchema.statics.getSupplierInfo = function( supplier ) {
// 	return this.findOne( { 'supplier' : supplier, 'admin' : true }, {} );
// };
// userSchema.statics.getClientInfo = function( clientId ) {
// 	return this.findById( clientId );
// };
