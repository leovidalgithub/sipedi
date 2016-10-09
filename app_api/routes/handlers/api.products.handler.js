var	verifyToken = require( '../../services/verifyToken.js' ),
	Product     = require( '../../db/models/products' );

// POST /api/products/ --> returns all-client-products or all-supplier-products
module.exports.getProducts = function( req, res ) {
	var clientID = req.body.clientID;
	var supplier = req.body.supplier;
	var allProducts = req.body.allProducts;
	var query = allProducts ? { 'supplier' : supplier } : { 'clients._id' : clientID, 'supplier' : supplier }
	Product.find( query ).sort({ product : 1 })
		.then( function( products ) {
			return res.json( products );
		})
		.catch( function( err ) {
			return res.status( 503 ).res.send( 'Error getting products' );
		});
}

// POST /api/products/setOrdered/ --> set client product ordered
module.exports.setProductOrder = function( req, res ) {
	var productID = req.body.productID;
	Product.findById( productID, function ( err, productFound ) {
		productFound.setProductOrder( req.body )
			.then( function( data ) {
				return res.json( data );
			})
			.catch( function( err ) {
				console.log(err);
				return res.status( 503 ).res.send( 'Error setting productOrder' );
			})
	})
};

// PUT /api/products/ --> set products into DB
module.exports.setProducts = function( req, res ) {
	Product.setProducts( req.body.products )
		.then( function ( data ) {
			return res.json( data );
		})
		.catch( function ( err ) {
			return res.status( 503 ).res.send( 'Error setting products' );
		});
}

// var	connect     = require( '../../db/db' ).connection,
//var mongoose = require( '../../db/db' );
// var myConn = mongoose.connection;
// myConn.collection( 'products' ).insert( dataUser )
