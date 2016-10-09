function config ( $routeProvider, $locationProvider ) {
	$routeProvider
		.when( '/', {
			templateUrl: 'views/login/login.view.html',
			controller: 'loginCtrl',
			controllerAs: 'ctrl'
		})
		.when( '/login', {
			templateUrl: 'views/login/login.view.html',
			controller: 'loginCtrl',
			controllerAs: 'ctrl'
		})
		.when( '/main', {
			templateUrl: 'views/main/main.view.html',
			controller: 'mainCtrl'
		})
		.when( '/products', {
			templateUrl: 'views/products/productsAdmin.view.html',
			controller: 'productsAdminCtrl'
		})
		.when( '/users', {
			templateUrl: 'views/users/users.view.html',
			controller: 'usersCtrl'
		})
		.otherwise( { redirectTo: '/' } )

		// use the HTML5 History API
		$locationProvider.html5Mode(true)
}

config.$inject = [ '$routeProvider', '$locationProvider'  ];
module.exports = config;