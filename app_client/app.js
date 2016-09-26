var angular               = require( 'angular' ),
	ngRoute               = require( 'angular-route' ),
	angularJwt            = require( 'angular-jwt' ),
	angularMoment         = require( 'angular-moment' ),
	angularUnique         = require( '../public/lib/angular/angular-unique' ), // first category filter ('ui.filters')

	initialConfig         = require( './common/config' ),
	configRoutes          = require( './common/routes' ),
	categoryFilter        = require( './common/filters/uniqueCategory.filter' ), // my filter
	authenticationService = require( './common/services/authentication.service' ),
	mainService           = require( './common/services/main.service' ),
	loginCtrl             = require( './views/login/login.controller' ),
	mainCtrl              = require( './views/main/main.controller' ),
	productsCtrl          = require( './views/main/products.controller' ),

	headerTagDirective    = require( './common/directives/headertag/headertag.directive.js' ),
	headerTagCtrl         = require( './common/directives/headertag/headertag.controller' );

angular.module('sipediApp', [ ngRoute, angularJwt, angularMoment, 'ui.filters', 'ngMaterial'] )
	.run( initialConfig )
	.config( configRoutes )
	.filter( 'uniqueCategory', categoryFilter ) // filter for unique category
	.service( 'authenticationService', authenticationService )
	.service( 'mainService', mainService )
	.controller( 'loginCtrl', loginCtrl )
	.controller( 'mainCtrl', mainCtrl )
	.controller( 'productsCtrl', productsCtrl )
	.directive( 'headertag', headerTagDirective )
	.controller( 'headerTagCtrl', headerTagCtrl )

