var express     = require( 'express' ),
	apiRouter   = express.Router(),
	apiHandler  = require( './handlers/api.handler' );

apiRouter.use(  apiHandler.middlewareToken );
apiRouter.post(  '/products/',    apiHandler.getProductsByClientID );
apiRouter.post(  '/clients/',     apiHandler.getClientsBySupplier );
apiRouter.post(  '/supplier/',    apiHandler.getSupplierInfo );
apiRouter.post( '/products/setOrdered/',  apiHandler.setProductOrdered );
apiRouter.post( '/products/setQuantity/', apiHandler.setProductQuantity );
apiRouter.post( '/user/setUserDemand/',   apiHandler.setUserDemand );

module.exports = apiRouter;
