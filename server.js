const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const bodyParser= require('body-parser');
const db = require('./app_api/db/db');
const loginRouter = require('./app_api/routes/login.router');
const apiRouter = require('./app_api/routes/api.router');
const socketRouter = require('./app_api/routes/socket.router');
require('./app_api/services/socket.service').initConnect(io);

app.set('port', process.env.PORT || 8080);

app.use(bodyParser.json( { limit: '50mb' }));
app.use(bodyParser.urlencoded( { limit: '50mb', extended: true }));

app.use(express.static( path.join( __dirname, 'public')));
app.use(express.static( path.join( __dirname, 'app_client')));

app.use(require('./app_api/config/setHeader'));

app.use('/login' , loginRouter);
app.use('/api'   , apiRouter);
app.use('/socket', socketRouter);

app.all('*', function (req, res) {
	res.sendFile(path.join( __dirname, 'app_client/index.html')) /* <= Where my ng-view is located */
})

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('****Mongoose SiPEDi connected*****');
	server.listen( app.get('port'), function() {
		console.log( 'SiPEDI is now running on port ' + app.get('port'))
	})
});


// for add users and products

// const usersCollection = db.collection('users');
// usersCollection.insertOne(myuser)
// .then(result => {
// 	console.log(result)
// })
// .catch(error => console.error(error))

// const myuser = {
// 	email        : '',
// 	admin        : false,
// 	active       : true,
// 	activeAdmin  : true,
// 	supplier     : '10',
// 	name         : '',
// 	contact      : '',
// 	address      : '',
// 	phone        : '',
// 	notes        : '',
// 	logo         : '',
// 	demandState  : 2,
// 	demandDate   : Date.now(),
// 	hash: 'ba68519161e1ab5f1b0c89bd48100f6755bcf13d62dbc2dc1f6052081c3df273c4413883bb7fca28819f806b0bcd2cd1609420f73d979238cc7cbf671887ce69',
// 	salt: '936d647339583251b4f6afa956c110ac'
// };

// const myproduct = {
// 	product  : 'ron pampero',
// 	category : 'bebidas',
// 	supplier : 'central madeirense',
// 	action   : '',
// 	stock    : true,
// 	selected : true,
// 	clients  : [ {
// 			_id : '6067d297854c2951c43c5d36',
// 			quantity : 33,
// 			productOrdered : false
// 	}]
// };