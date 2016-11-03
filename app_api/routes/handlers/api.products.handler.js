var	verifyToken  = require( '../../services/verifyToken.js' ),
	Product      = require( '../../db/models/products' ),
	sipediSocket = require( '../../../sockets' );

// POST /api/products/ --> returns all-client-products or all-supplier-products
module.exports.getProducts = function( req, res ) {
	var clientID = req.body.clientID;
	var supplier = req.body.supplier;
	var allProducts = req.body.allProducts;
	var query = allProducts ? { 'supplier' : supplier } : { 'clients._id' : clientID, 'supplier' : supplier };
	Product.find( query ).sort({ product : 1 })
		.then( function( products ) {
			return res.json( products );
		})
		.catch( function( err ) {
			return res.status( 503 ).send( 'Error getting products' );
		});
};

// POST /api/products/setOrdered/ --> set client product ordered
module.exports.setProductOrder = function( req, res ) {
	var productID = req.body.productID,
	clientID      = req.body.clientID,
	supplierID    = req.body.supplierID,
	admin         = req.body.admin;
	Product.findById( productID, function ( err, productFound ) {
		productFound.setProductOrder( req.body )
			.then( function( data ) {
				sipediSocket.sendUpdateMessage( admin, clientID, supplierID );
				return res.json( data );
			})
			.catch( function( err ) {
				console.log(err);
				return res.status( 503 ).send( 'Error setting productOrder' );
			});
	});
};

// PUT /api/products/ --> set products into DB
module.exports.setProducts = function( req, res ) {
	var supplier = req.body.supplier;
	Product.setProducts( req.body.products )
		.then( function ( data ) {
			sipediSocket.sendUpdateMessageToAll( supplier );
			return res.json( data );
		})
		.catch( function ( err ) {
			return res.status( 503 ).send( 'Error setting products' );
		});
};
