var express     = require( 'express' ),
	apiRouter   = express.Router();

var apiHandler = require( './handlers/api.handler' );

apiRouter.use( apiHandler.middlewareToken );
apiRouter.get( '/products/:clientID', apiHandler.getProductsByClientID );
apiRouter.get( '/clients/:supplier', apiHandler.getClientsBySupplier );
apiRouter.get( '/supplier/:supplier', apiHandler.getSupplierInfo );

module.exports = apiRouter;
