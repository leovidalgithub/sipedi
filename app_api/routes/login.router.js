var express = require('express');
var loginRouter = express.Router();

// var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

// loginRouter.use('/', function( req, res, next ) {
// 	console.log( 'from loginRouter /login' );
// 	next();
// })

// authentication
// loginRouter.post('/register', ctrlAuth.register);
loginRouter.post('/', ctrlAuth.login);

// register new user
loginRouter.post('/register', ctrlAuth.register);

module.exports = loginRouter;
