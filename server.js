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

require('./app_api/models/db');

app.use( function( req, res, next ) {
	res.setHeader( 'Access-Control-Allow-Origin', '*' );
	res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST' );
	res.setHeader( 'Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization' );
	next();
});

var loginRouter = require('./app_api/routes/login.router');
app.use('/login', loginRouter );

var mainRouter = require('./app_api/routes/main.router');
app.use('/main', mainRouter );

// var config = require('./config'); // get our config file
// app.set('superSecret', config.secret); // secret variable

app.listen( process.env.PORT || 8080, function() {
	// var port = server.address().port;
	console.log( 'App now running on port 8080' );
})

	// app.get('/', function(req,res,next) {
	// 	res.redirect('/tasks');
	// 	next();
	// });

