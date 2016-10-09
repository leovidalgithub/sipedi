var express       = require( 'express' ),
	apiRouter     = express.Router(),
	apiMiddleware = require( './handlers/api.middleware.handler' ),
	apiProducts   = require( './handlers/api.products.handler' );
	apiUsers      = require( './handlers/api.users.handler' );

//MIDDLEWARE TOKEN
apiRouter.use (                         apiMiddleware.middlewareToken );

//PRODUCTS
apiRouter.post( '/products/',           apiProducts.getProducts );
apiRouter.put ( '/products/',           apiProducts.setProducts );
apiRouter.post( '/products/setOrder/',  apiProducts.setProductOrder );

//USERS
apiRouter.post( '/users/',              apiUsers.getUsersBySupplier );
apiRouter.put ( '/users/',              apiUsers.setUser );
apiRouter.post( '/user/setUserDemand/', apiUsers.setUserDemand );

module.exports = apiRouter;
