var express      = require( 'express' ),
    loginRouter  = express.Router(),
    loginHandler = require( './handlers/login.handler' );

loginRouter.post( '/',              loginHandler.login );
loginRouter.get ( '/forgot/:email', loginHandler.forgotPassword );
// loginRouter.post( '/register', loginHandler.register );

module.exports = loginRouter;
