var mongoose = require( 'mongoose' ),
	Schema   = mongoose.Schema;

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
		clients: [
			{	_id : { type: Schema.Types.ObjectId, ref: 'User' },
				quantity : { type: Number }
			}
		]
});

module.exports = mongoose.model( 'Product', productSchema );
