(function() {

	angular.module( 'sipediApp' )
	.controller( 'login.controller', loginCtrlFn );

	loginCtrlFn.$inject = [ '$scope', '$location', 'authenticationService', '$rootScope' ];

	function loginCtrlFn( $scope, $location, authenticationService, $rootScope ) {
		// var vm = this;
		$scope.var1 = 'SiPEDI';
		$scope.remember = true; // remember password

		$scope.loginButton = function() { // ---------------- login
			authenticationService.login( $scope.credentials )
				.then( function( data ) {
					//if login OK, saves token and set user credentials in $rootScope.credentials
					authenticationService.saveToken( data.data.token );
					authenticationService.setCredentials();
					console.log('LOGIN CORRECT');
					$location.path('main');
				})
				.catch( function( err ) {
					//if login fails, removes token
					authenticationService.logout();
					console.log('LOGIN ERROR');
				})
		}

		// $scope.register = function() { // --------------- register new user
		// 	authenticationService.register( $scope.credentials )
		// 	.then( function( data ) {
		// 		console.log('USER registred');
		// 		authenticationService.saveToken( data.token );
		// 	})
		// }

		// $scope.logout = function() {
		// 	authenticationService.logout()
		// }

	}
})();