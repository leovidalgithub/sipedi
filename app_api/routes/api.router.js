var express     = require( 'express' ),
	apiRouter   = express.Router(),
	apiHandler  = require( './handlers/api.handler' );

apiRouter.use (                         apiHandler.middlewareToken );
apiRouter.post( '/products/',           apiHandler.getProductsByClientID );
apiRouter.post( '/users/',              apiHandler.getUsersBySupplier );
apiRouter.post( '/products/setOrder/',  apiHandler.setProductOrder );
apiRouter.post( '/user/setUserDemand/', apiHandler.setUserDemand );

module.exports = apiRouter;
