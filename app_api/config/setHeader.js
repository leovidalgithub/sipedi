module.exports = function( req, res, next ) {
	res.setHeader( 'Access-Control-Allow-Origin', '*' ); //res.header("Access-Control-Allow-Origin", "http://localhost");
	res.setHeader( 'Access-Control-Request-Method', '*' );
	res.setHeader( "Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
	res.header( 'Access-Control-Allow-Headers', '*' ); // res.header( 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept' );
	next();
};
