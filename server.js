var express    = require( 'express' ),
	app        = express(),
	path       = require( 'path' ),
	bodyParser = require( 'body-parser' ),
	PORT = process.env.PORT || 8080;

app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );

app.use( express.static( path.join( __dirname, 'public' )) );
app.use( express.static( path.join( __dirname, 'app_client' )) );

app.use( require( './app_api/config/setHeader' ) );

var loginRouter = require( './app_api/routes/login.router' );
app.use( '/login', loginRouter );

var apiRouter = require( './app_api/routes/api.router' );
app.use( '/api', apiRouter );

var conn = require( './app_api/db/db' );
	conn.connection.on( 'connected', function() {
		console.log( '****Mongoose connected****' );
		app.listen( PORT, function() {
		console.log( 'SiPEDI now running on port ' + PORT )
	})
})

	// 	res.redirect('/tasks');
