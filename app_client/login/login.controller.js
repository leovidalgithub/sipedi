(function() {

	angular.module('sipediApp')
	.controller('login.controller', loginCtrl);

	loginCtrl.$inject = [ '$scope', '$location', 'authentication' ];

	function loginCtrl( $scope, $location, authentication ) {
		// var vm = this;
		$scope.credentials = {
			email : '',
			password : ''
		};
		$scope.remember = true;

		$scope.submit = function() { // ---------------- login
			authentication.login( $scope.credentials )
				.then( function( data ) {
					authentication.saveToken( data.data.token );
					console.log('LOGIN CORRECT');
					$location.path('main');
				})
				.catch( function( err ) {
					authentication.logout();
					console.log('LOGIN ERROR');
				})
		}

		$scope.register = function() { // --------------- register new user
			authentication.register( $scope.credentials )
			.then( function( data ) {
				console.log('USER registred');
				authentication.saveToken( data.token );
			})
		}

		$scope.token = function() {
			authentication.token()
				.then( function( data ) {
					console.log('TOKEN OK');
					$location.path('main');
				})
				.catch( function ( err ) {
					console.log( 'TOKEN ERROR' )
				})
		}

		$scope.logout = function() {
			authentication.logout()
		}

		$scope.var1 = 'SiPEDI';
	}

})();