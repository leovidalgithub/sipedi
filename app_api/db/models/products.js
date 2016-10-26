	var mongoose = require( 'mongoose' ),
		Schema   = mongoose.Schema,
		ObjectId = Schema.ObjectId,
		User     = require('./users');

	var productSchema = new Schema( {
		product  : { type : String,  required : true },
		category : { type : String,  required : true },
		supplier : { type : String,	 required : true },
		action   : { type : String,  required : false, default : '' },
		stock    : { type : Boolean, required : true,  default : true },
		selected : { type : Boolean, required : false, default : false },
		clients  : [ {
				_id            : { type : ObjectId, ref : 'User' },
				quantity       : { type : Number,  required : true, default : 0 },
				productOrdered : { type : Boolean, required : true, default : false }
		}]
	});

	productSchema.methods.setProductOrder = function( data ){
		var clientID       = data.clientID,
			productOrdered = data.productOrdered,
			quantity       = data.quantity;

		var client = this.clients.find( function( el ) {
			return el._id == clientID;
		});
		client.productOrdered = productOrdered;
		client.quantity = quantity;
		return this.save();
	};

	productSchema.statics.setProducts = function( products ) {
		myPromises = [],
		vm         = this;
		products.forEach( function( product ) {
			// UPDATE AND ADD
			if ( product.action == 'added_modified' ) { //vm.collection.insert( product )
				if ( product._id === '' ) product._id = mongoose.Types.ObjectId();
				myPromises.push( vm.findByIdAndUpdate( product._id, {
					$set: { 'category': product.category, 'product': product.product, 'stock': product.stock, 'supplier': product.supplier, 'clients': product.clients }},
					{ upsert : true, setDefaultsOnInsert : true } ));
			// REMOVE
			} else if ( product.action == 'deleted' ) {
				myPromises.push( vm.findByIdAndRemove( product._id ) );
			}
		});
		return Promise.all( myPromises );
	};

module.exports = mongoose.model( 'Product', productSchema );

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
