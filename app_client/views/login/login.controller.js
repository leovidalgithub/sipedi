function loginCtrlFn( $location, authenticationService, $rootScope, $timeout ) {
	vm = this;
	vm.credentials = {};
	vm.credentials.remember = true; // remember password
	vm.showError = false; // login fail message

	vm.loginButton = function() { // ---------------- login
		authenticationService.login( vm.credentials )
			.then( function( data ) {
				//if login OK, saves token and set user credentials in $rootScope.credentials
				authenticationService.saveToken( data.data.token );
				console.log( 'LOGIN CORRECT' );
				$location.path( 'main' );
			})
			.catch( function( err ) {
				authenticationService.logout(); //if login fails, removes token
				console.log( 'LOGIN ERROR' );
				vm.showError = true;
				$timeout( function() { vm.showError = false }, 3000 );
			})
	}
}

loginCtrlFn.$inject = [ '$location', 'authenticationService', '$rootScope', '$timeout' ];
module.exports = loginCtrlFn;
