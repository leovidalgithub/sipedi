	var mongoose = require( 'mongoose' ),
	  Schema = mongoose.Schema

	var clientsSchema = Schema( {
	  client: { type: Schema.ObjectId, ref: 'User' },
	  quantity: { type: Number, default: 0 },
	  ordered: { type: Boolean, default: false }
	})

	var productSchema = Schema({
	  product: {
		type: String,
		required: true
	  },
	  category: {
		type: String,
		required: true
	  },
	  supplier: {
		type: String,
		required: true
	  },
	  stock: {
		type: Boolean,
		required: true,
		default: true
	  },
	  clients: [clientsSchema]
	})

var productModel = mongoose.model( 'Product', productSchema );
var clientModel = mongoose.model( 'Client', clientsSchema );

module.exports = {
	productModel : productModel,
	clientModel : clientModel
}

	// module.exports = mongoose.model( 'Product', productSchema )
	// module.exports = mongoose.model( 'Client', clientsSchema )
