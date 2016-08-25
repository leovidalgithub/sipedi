(function () {

	function config ( $routeProvider, $locationProvider ) {
		$routeProvider
			.when( '/', {
				templateUrl: 'login/login.view.html',
				controller: 'login.controller'
				// controllerAs: 'vm'
			})
			.when( '/login', {
				templateUrl: 'login/login.view.html',
				controller: 'login.controller'
				// controllerAs: 'vm'
			})
			.when( '/main', {
				templateUrl: '/main/main.view.html',
				controller: 'main.controller'
				// controllerAs: 'vm'
			})
			// .when( '/profile', {
			//   templateUrl: '/profile/profile.view.html',
			//   controller: 'profileCtrl',
			//   controllerAs: 'vm'
			// })
			.otherwise( { redirectTo: '/' } );

		// use the HTML5 History API
		// $locationProvider.html5Mode(true);
	}

		function run( $rootScope, $location, authenticationService ) {
			// $rootScope.$on( '$routeChangeStart', function( event, nextRoute, currentRoute ) {
			// 	 if ( $location.path() !== '/' ) {
			// 			authenticationService.isLoggedIn()
			// 				.then( function() {})
			// 				.catch( function() {
			// 						console.log( 'run says NO' );
			// 						$location.path( '/' );
			// 				})
			// 	 }
			// })
		}
	
	angular
		.module('sipediApp')
		.config(['$routeProvider', '$locationProvider', config])
		.run(['$rootScope', '$location', 'authenticationService', run]);

})();

        // .when('/calendar', {
        //     redirectTo: function(){
        //         var today = new Date();
        //         var currYear = today.getFullYear();
        //         var currMonth = today.getMonth() + 1;
        //         return '/calendar/'+currYear+'/'+currMonth;
        //     }
        // })
