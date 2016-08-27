var express = require( 'express' );
var loginRouter = express.Router();

var loginHandler = require( './handlers/login.handler' );
loginRouter.post( '/', loginHandler.login );

// register new user
// loginRouter.post( '/register', loginHandler.register );

module.exports = loginRouter;
