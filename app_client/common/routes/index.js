// app-client / common / routes / index

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
		.otherwise( { redirectTo: '/' } )

// use the HTML5 History API
// $locationProvider.html5Mode(true)
}

config.$inject = [ '$routeProvider', '$locationProvider'  ];
module.exports = config;