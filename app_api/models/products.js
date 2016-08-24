var mongoose = require( 'mongoose' ),
	Schema   = mongoose.Schema,

var productSchema = Schema({
		producto: {
			type: String,
			required: true
		},
		departamento: {
			type: String,
			required: true
		},
		proveedor: {
			type: String,
			required: true
		},
		stock: {
			type: Boolean,
			required: true,
			default: true
		}
});

// mongoose.model( 'Product', userSchema );
module.exports = mongoose.model( 'Product', productSchema );
