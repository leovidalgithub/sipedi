function config ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl  : 'views/login/login.view.html',
			controller   : 'loginCtrl',
			controllerAs : 'ctrl'
		})
		.when('/login', {
			templateUrl  : 'views/login/login.view.html',
			controller   : 'loginCtrl',
			controllerAs : 'ctrl'
		})
		.when('/main', {
			templateUrl : 'views/main/main.view.html',
			controller  : 'mainCtrl',
			resolve: {
						setCredentials: function(credentialsService) {
							return credentialsService.setCredentials();
					}
				}
		})
		.when('/products', {
			templateUrl : 'views/products/productsAdmin.view.html',
			controller  : 'productsAdminCtrl'
		})
		.when('/users', {
			templateUrl : 'views/users/users.view.html',
			controller  : 'usersCtrl'
		})
		.when('/password', {
			templateUrl : 'views/password/password.view.html',
			controller  : 'passwordCtrl'
		})
		.when('/assign', {
			templateUrl : 'views/assign/assign.view.html',
			controller  : 'assignCtrl'
		})
		.when('/reports', {
			templateUrl : 'views/reports/reports.view.html',
			controller  : 'reportsCtrl'
		})
		.otherwise({ redirectTo: '/' });

		$locationProvider.html5Mode(true);
}

config.$inject = ['$routeProvider', '$locationProvider'];
module.exports = config;
