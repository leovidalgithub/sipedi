var angular               = require( 'angular' ),
	ngRoute               = require( 'angular-route' ),
	angularJwt            = require( 'angular-jwt' ),
	angularMoment         = require( 'angular-moment' ),
	angularUnique         = require( '../public/lib/angular/angular-unique' ),
	angularUiBootstrap    = require( '../public/lib/angular/ui-bootstrap-tpls-2.1.3' ),
	// angularanimate        = require( './lib/angular/angular-animate.js' ),
	// angulartouch          = require( './lib/angular/angular-touch' ),

	initialConfig         = require( './common/config' ),
	configRoutes          = require( './common/routes' ),
	categoryFilter        = require( './common/filters/uniqueCategory.filter' ),
	authenticationService = require( './common/services/authentication.service' ),
	mainService           = require( './common/services/main.service' ),
	loginCtrl             = require( './views/login/login.controller' ),
	mainCtrl              = require( './views/main/main.controller' ),
	modalCtrl             = require( './views/main/modal.controller' ),
	headerTagDirective    = require( './common/directives/headertag/headertag.directive.js' ),
	headerTagCtrl         = require( './common/directives/headertag/headertag.controller' );

angular.module('sipediApp', [ ngRoute, angularJwt, angularMoment, 'ui.bootstrap', 'ui.filters'] )
	.run( initialConfig )
	.config( configRoutes )
	.filter( 'uniqueCategory', categoryFilter ) // filter for unique category
	.service( 'authenticationService', authenticationService )
	.service( 'mainService', mainService )
	.controller( 'loginCtrl', loginCtrl )
	.controller( 'mainCtrl', mainCtrl )
	.controller( 'modalCtrl', modalCtrl )
	.directive( 'headertag', headerTagDirective )
	.controller( 'headerTagCtrl', headerTagCtrl )

