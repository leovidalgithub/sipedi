var angular               = require('angular'),
	ngRoute               = require('angular-route'),
	angularJwt            = require('angular-jwt'),

	initialConfig         = require('./common/config'),
	configRoutes          = require('./common/routes'),
	categoryFilter        = require('./common/filters/uniqueCategory.filter'),
	authenticationService = require('./common/services/authentication.service'),
	mainService           = require('./common/services/main.service'),
	loginCtrl             = require('./views/login/login.controller'),
	mainCtrl              = require('./views/main/main.controller'),
	modalCtrl             = require('./views/main/modal.controller');

angular.module('sipediApp', [ ngRoute, angularJwt] )
	.run( initialConfig )
	.config( configRoutes )
	.filter( 'uniqueCategory', categoryFilter )
	.service( 'authenticationService', authenticationService )
	.service( 'mainService', mainService )
	.controller( 'loginCtrl', loginCtrl )
	.controller( 'mainCtrl', mainCtrl )
	.controller( 'modalCtrl', modalCtrl )

