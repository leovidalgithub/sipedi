var express      = require( 'express' ),
    app          = express(),
    server       = require( 'http' ).Server(app),
    io           = require( 'socket.io' )(server),
    path         = require( 'path' ),
	bodyParser   = require( 'body-parser' ),
	conn         = require( './app_api/db/db' ),
	loginRouter  = require( './app_api/routes/login.router' ),
	apiRouter    = require( './app_api/routes/api.router' );
	socketRouter = require( './app_api/routes/socket.router' );
                   require( './sockets' ).initConnect( io );

app.set( 'port', process.env.PORT || 8080 );

app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );

app.use( express.static( path.join( __dirname, 'public' )) );
app.use( express.static( path.join( __dirname, 'app_client' )) );

app.use( require( './app_api/config/setHeader' ) );

app.use( '/main'    , function( req, res ) { res.redirect( '/#/main' ); });
app.use( '/products', function( req, res ) { res.redirect( '/#/main' ); });
app.use( '/users'   , function( req, res ) { res.redirect( '/#/main' ); });
app.use( '/password', function( req, res ) { res.redirect( '/#/main' ); });
app.use( '/assign'  , function( req, res ) { res.redirect( '/#/main' ); });
app.use( '/reports' , function( req, res ) { res.redirect( '/#/main' ); });

app.use( '/login' , loginRouter );
app.use( '/api'   , apiRouter );
app.use( '/socket', socketRouter );

conn.connection.on( 'connected', function() {
	console.log( '****Mongoose SiPEDi connected*****' );
	server.listen( app.get( 'port' ), function() {
		console.log( 'SiPEDI is now running on port ' + app.get( 'port' ) );
	});
});
