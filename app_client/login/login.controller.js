(function() {

	angular.module( 'sipediApp' )
	.controller( 'login.controller', loginCtrlFn );

	loginCtrlFn.$inject = [ '$scope', '$location', 'authenticationService' ];

	function loginCtrlFn( $scope, $location, authenticationService ) {
		// var vm = this;
		$scope.credentials = {
			email : '',
			password : ''
		};
		$scope.var1 = 'SiPEDI';
		$scope.remember = true;

		$scope.submit = function() { // ---------------- login
			authenticationService.login( $scope.credentials )
				.then( function( data ) {
					authenticationService.saveToken( data.data.token );
					console.log('LOGIN CORRECT');
					$location.path('main');
				})
				.catch( function( err ) {
					authenticationService.logout();
					console.log('LOGIN ERROR');
				})
		}

		$scope.register = function() { // --------------- register new user
			authenticationService.register( $scope.credentials )
			.then( function( data ) {
				console.log('USER registred');
				authenticationService.saveToken( data.token );
			})
		}

		$scope.token = function() {
			authenticationService.token()
				.then( function( data ) {
					console.log('TOKEN OK');
					$location.path('main');
				})
				.catch( function ( err ) {
					console.log( 'TOKEN ERROR' )
				})
		}

		$scope.logout = function() {
			authenticationService.logout()
		}

	}

})();