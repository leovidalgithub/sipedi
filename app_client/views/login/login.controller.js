function loginCtrlFn( $location, authenticationService, $rootScope, $timeout ) {
	vm = this;
	vm.credentials = {};
	vm.credentials.remember = true; // remember password
	vm.showError = false; // login fail message
	$rootScope.credentials = null;

	vm.loginButton = function() { // ---------------- login
		authenticationService.login( vm.credentials )
			.then( function( data ) { // login OK
				authenticationService.saveToken( data.data.token );
				console.log( 'LOGIN CORRECT' );
				$location.path( 'main' );
			})
			.catch( function( err ) { // login failed
				authenticationService.logout();
				console.log( 'LOGIN ERROR' );
				vm.showError = true;
				$timeout( function() { vm.showError = false; }, 2000 );
			});
	};
}

loginCtrlFn.$inject = [ '$location', 'authenticationService', '$rootScope', '$timeout' ];
module.exports = loginCtrlFn;
