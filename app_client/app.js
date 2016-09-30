var angular               = require( 'angular' ),
	ngRoute               = require( 'angular-route' ),
	angularJwt            = require( 'angular-jwt' ),
	angularMoment         = require( 'angular-moment' ),
	angularUnique         = require( '../public/lib/angular/angular-unique' ), // first category filter ('ui.filters')

	initialConfig         = require( './common/config' ),
	configRoutes          = require( './common/routes' ),
	shareDataFtry         = require( './common/factories/shareData.factory' ),
	categoryFilter        = require( './common/filters/uniqueCategory.filter' ), // my filter
	authenticationService = require( './common/services/authentication.service' ),
	mainService           = require( './common/services/main.service' ),
	productsService       = require( './common/services/products.service' ),
	loginCtrl             = require( './views/login/login.controller' ),
	mainCtrl              = require( './views/main/main.controller' ),
	productsCtrl          = require( './views/main/products.controller' ),
	productsAdminCtrl     = require( './views/products/productsAdmin.controller' ),
	modifyProductsCtrl    = require( './views/products/modifyProducts.controller' ),

	navbarDirective       = require( './common/directives/navbar/navbar.directive' ),
	navbarCtrl            = require( './common/directives/navbar/navbar.controller' );

	sidemenuDirective     = require( './common/directives/sidemenu/sidemenu.directive' ),
	sidemenuCtrl          = require( './common/directives/sidemenu/sidemenu.controller' );

angular.module( 'sipediApp', [ ngRoute, angularJwt, angularMoment, 'ui.filters', 'ngMaterial'] )
	.run       ( initialConfig )
	.config    ( configRoutes )
	.factory   ( 'sharedData', shareDataFtry )
	.filter    ( 'uniqueCategory', categoryFilter ) // filter for unique category
// LOGIN
	.controller( 'loginCtrl', loginCtrl )
	.service   ( 'authenticationService', authenticationService )
// MAIN
	.controller( 'mainCtrl', mainCtrl )
	.controller( 'productsCtrl', productsCtrl )
	.service   ( 'mainService', mainService )
// PRODUCTS ADMIN
	.controller( 'productsAdminCtrl', productsAdminCtrl )
	.controller( 'modifyProductsCtrl', modifyProductsCtrl )
	.service   ( 'productsService', productsService )

// DIRECTIVES
	.directive ( 'navbar', navbarDirective ) // éste es 
	.controller( 'navbarCtrl', navbarCtrl )
	.directive ( 'sidemenu', sidemenuDirective ) // éste es 
	.controller( 'sidemenuCtrl', sidemenuCtrl )
