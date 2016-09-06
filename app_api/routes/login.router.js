var express     = require( 'express' );
var loginRouter = express.Router();
var loginHandler = require( './handlers/login.handler' );

loginRouter.post( '/', loginHandler.login );
// loginRouter.get( '/', loginHandler.api );
loginRouter.post( '/register', loginHandler.register );

module.exports = loginRouter;
