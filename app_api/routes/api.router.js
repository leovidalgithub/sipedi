var express       = require( 'express' ),
	apiRouter     = express.Router(),
	apiMiddleware = require( './handlers/api.middleware.handler' ),
	apiProducts   = require( './handlers/api.products.handler' );
	apiUsers      = require( './handlers/api.users.handler' );
	apiReports    = require( './handlers/api.reports.handler' );

//MIDDLEWARE TOKEN
apiRouter.use (                         apiMiddleware.middlewareToken );

//PRODUCTS
apiRouter.post( '/products/',          apiProducts.getProducts );
apiRouter.put ( '/products/',          apiProducts.setProducts );
apiRouter.post( '/products/setOrder/', apiProducts.setProductOrder );

//USERS
apiRouter.post( '/users/',              apiUsers.getUsersBySupplier );
apiRouter.put ( '/users/',              apiUsers.setUser );
apiRouter.put ( '/users/password/',     apiUsers.setNewPassword );
apiRouter.post( '/user/setUserDemand/', apiUsers.setUserDemand );

//REPORTS
apiRouter.post( '/reports/pdf',         apiReports.sendPDF );
apiRouter.put(  '/reports/users',       apiReports.setUsers );

module.exports = apiRouter;
