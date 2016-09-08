function loginCtrlFn( $location, authenticationService, $rootScope ) {
	this.remember = true; // remember password

	this.loginButton = function() { // ---------------- login
		authenticationService.login( this.credentials )
			.then( function( data ) {
				//if login OK, saves token and set user credentials in $rootScope.credentials
				authenticationService.saveToken( data.data.token );
				console.log( 'LOGIN CORRECT' );
				$location.path( 'main' );
			})
			.catch( function( err ) {
				//if login fails, removes token
				authenticationService.logout();
				console.log('LOGIN ERROR' );
				$( '#login #loginError' ).removeClass( 'hide' );
				setTimeout( function() {
					$( '#login #loginError' ).addClass( 'hide' );
				}, 2500)
			})
	}	

}

loginCtrlFn.$inject = [ '$location', 'authenticationService', '$rootScope' ];
module.exports = loginCtrlFn;
