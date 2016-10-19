var angular               = require( 'angular' ),
	ngRoute               = require( 'angular-route' ),
	angularJwt            = require( 'angular-jwt' ),
	angularMoment         = require( 'angular-moment' ),
	angularUnique         = require( '../public/lib/angular/angular-unique' ), // first category filter ('ui.filters')

	initialConfig         = require( './common/config' ),
	configRoutes          = require( './common/routes' ),
	categoryFilter        = require( './common/filters/uniqueCategory.filter' ), // my filter
// FACTORIES
	shareDataFtry         = require( './common/factories/shareData.factory' ),
	socketFtry            = require( './common/factories/socket.factory' ),
// SERVICES
	authenticationService = require( './common/services/authentication.service' ),
	credentialsService    = require( './common/services/credentials.service' ),
	mainService           = require( './common/services/main.service' ),
	productsService       = require( './common/services/products.service' ),
	usersService          = require( './common/services/users.service' ),
// CONTROLLERS
	loginCtrl             = require( './views/login/login.controller' ),
	forgotCtrl            = require( './views/login/forgot.controller' ),
	mainCtrl              = require( './views/main/main.controller' ),
	productsCtrl          = require( './views/main/products.controller' ),
	productsAdminCtrl     = require( './views/products/productsAdmin.controller' ),
	modifyProductsCtrl    = require( './views/products/modifyProducts.controller' ),
	usersCtrl             = require( './views/users/users.controller' ),
	passwordCtrl          = require( './views/password/password.controller' ),

	navbarDirective       = require( './common/directives/navbar/navbar.directive' ),
	navbarCtrl            = require( './common/directives/navbar/navbar.controller' );

	sidemenuDirective     = require( './common/directives/sidemenu/sidemenu.directive' ),
	sidemenuCtrl          = require( './common/directives/sidemenu/sidemenu.controller' ),

angular.module( 'sipediApp', [ ngRoute, angularJwt, angularMoment, 'ui.filters', 'ngMaterial' ] )
	.run       ( initialConfig )
	.config    ( configRoutes )
	.factory   ( 'sharedData'    , shareDataFtry )
	.factory   ( 'socket'        , socketFtry )
	.filter    ( 'uniqueCategory', categoryFilter ) // filter for unique category
// LOGIN
	.controller( 'loginCtrl'            , loginCtrl )
	.controller( 'forgotCtrl'           , forgotCtrl )
	.service   ( 'authenticationService', authenticationService )
	.service   ( 'credentialsService'   , credentialsService )
// MAIN
	.controller( 'mainCtrl'    , mainCtrl )
	.controller( 'productsCtrl', productsCtrl )
	.service   ( 'mainService' , mainService )
// PRODUCTS ADMIN
	.controller( 'productsAdminCtrl' , productsAdminCtrl )
	.controller( 'modifyProductsCtrl', modifyProductsCtrl )
	.service   ( 'productsService'   , productsService )
// USERS
	.controller( 'usersCtrl'   , usersCtrl )
	.service   ( 'usersService', usersService )
// PASSWORD
	.controller( 'passwordCtrl', passwordCtrl )
// DIRECTIVES
	.directive ( 'navBar'      , navbarDirective )
	.controller( 'navbarCtrl'  , navbarCtrl )
	.directive ( 'sideMenu'    , sidemenuDirective )
	.controller( 'sidemenuCtrl', sidemenuCtrl );

	require( './common/directives/dgvProducts/dgvProducts.directive' );
