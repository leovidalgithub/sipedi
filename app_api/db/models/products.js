	var mongoose = require( 'mongoose' ),
		Schema   = mongoose.Schema,
		ObjectId = Schema.ObjectId,
		User     = require('./users');

	var productSchema = new Schema( {
		product : {
			type : String,
			required : true
		},
		category : {
			type : String,
			required : true
		},
		supplier : {
			type : String,
			required : true
		},
		stock : {
			type : Boolean,
			required : true,
			default : true
		},
		clients : [ {
			_id  : { type : Schema.ObjectId, ref : 'User' },
			quantity  : { type : Number, default : 0 },
			productOrdered : { type : Boolean, default: false }
		}]
	})

	// productSchema.statics.setProductOrdered = function( data ){
	// 	var productID         = data.productID,
	// 		clientID          = data.clientID,
	// 		newProductOrdered = data.newProductOrdered;
	// 	this.findById( productID )
	// 		.then( function ( productFound ) {
	// 			var client = productFound.clients.find( function( el ) {
	// 				return el._id == clientID
	// 			});
	// 			client.productOrdered = newProductOrdered;
	// 			return productFound.save(); // return promise
	// 	})
	// }

	productSchema.methods.setProductOrdered = function( data ){
		var clientID          = data.clientID,
			newProductOrdered = data.newProductOrdered;
		var client = this.clients.find( function( el ) {
			return el._id == clientID
		});
		client.productOrdered = newProductOrdered;
		return this.save()
	}

	productSchema.methods.setProductQuantity = function( data ){
		var clientID           = data.clientID,
			newProductQuantity = data.newProductQuantity;
		var client = this.clients.find( function( el ) {
			return el._id == clientID
		});
		client.quantity = newProductQuantity;
		return this.save()
	}

module.exports = mongoose.model( 'Product', productSchema )
