var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
// var cookieParser = require('cookie-parser');

app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );

// app.nose( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' )) );
app.use( express.static( path.join( __dirname, 'app_client' )) );

app.use( function( req, res, next ) {
	res.setHeader( 'Access-Control-Allow-Origin', '*' );
	res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST' );
	res.setHeader( 'Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization' );
	next();
});

var loginRouter = require('./app_api/routes/login.router');
app.use('/login', loginRouter );

var apiRouter = require('./app_api/routes/api.router');
app.use('/api', apiRouter );

	// app.get('/', function(req,res,next) {
	// 	res.redirect('/tasks');
	// 	next();
	// });

var conn = require('./app_api/models/db');
	conn.connection.on( 'connected', function() {
		console.log( '****Mongoose connected****' );
		app.listen( process.env.PORT || 8080, function() {
		// var port = server.address().port;
		console.log( 'App now running on port 8080' );
	})
});
