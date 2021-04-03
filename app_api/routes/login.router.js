const express = require( 'express' );
const loginRouter  = express.Router();
const loginHandler = require( './handlers/login.handler' );

loginRouter.post( '/', loginHandler.login );
loginRouter.get ( '/forgot/:email', loginHandler.forgotPassword );
// loginRouter.post( '/register', loginHandler.register );

module.exports = loginRouter;
