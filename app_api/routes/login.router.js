var express     = require( 'express' );
var loginRouter = express.Router();
var loginHandler = require( './handlers/login.handler' );

loginRouter.post( '/', loginHandler.login );
loginRouter.get( '/getClientToken/:clientId', loginHandler.getClientToken );
loginRouter.post( '/register', loginHandler.register );

module.exports = loginRouter;
