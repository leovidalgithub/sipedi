var express    = require( 'express' ),
	app        = express(),
	path       = require( 'path' ),
	bodyParser = require( 'body-parser' ),
	PORT       = process.env.PORT || 8080;

app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );

app.use( express.static( path.join( __dirname, 'public' )) );
app.use( express.static( path.join( __dirname, 'app_client' )) );

app.use( require( './app_api/config/setHeader' ) );

app.use( '/main'    , function( req, res ) { res.redirect( '/#/main' ) });
app.use( '/products', function( req, res ) { res.redirect( '/#/products' ) });
app.use( '/users'    , function( req, res ) { res.redirect( '/#/users' ) });

var loginRouter = require( './app_api/routes/login.router' );
app.use( '/login', loginRouter );

var apiRouter = require( './app_api/routes/api.router' );
app.use( '/api', apiRouter );


var conn = require( './app_api/db/db' );
	conn.connection.on( 'connected', function() {
		console.log( '****Mongoose SiPEDi connected****' );
		app.listen( PORT, function() {
		console.log( 'SiPEDI is now running on port ' + PORT )
	})
})
