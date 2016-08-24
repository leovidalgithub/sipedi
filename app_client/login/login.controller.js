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
					console.log('LOGIN CORRECT');
					$location.path('main');
				})
				.catch( function( err ) {
					console.log('LOGIN ERROR');
				})
		};

		$scope.register = function() { // --------------- register new user
			authentication.register( $scope.credentials )
			.then( function( data ) {
				console.log('login.controller register');
				console.log( data )
			})
		}

		$scope.token = function() {
			authentication.token()
				.then( function( data ) {
					console.log('login.controller token');
					// console.log( data.data._doc );
					$location.path('main');
				})
				.catch( function ( err ) {
					console.log( err )
				})
		}

		$scope.logout = function() {
			authentication.logout()
		}

		$scope.var1 = 'SiPEDI';
		console.log('Login controller is running');
	}

})();