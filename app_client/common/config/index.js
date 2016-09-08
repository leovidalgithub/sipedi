function run ( $location, authenticationService ) {
		// every time app runs verifies a valid token
		if ( $location.path() !== '/' ) {
			if ( !authenticationService.isLoggedIn() ) {
					$location.path( '/' )
			}
		}
	// $rootScope.$on( '$routeChangeStart', function( event, nextRoute, currentRoute ) {})
}

run.$inject = [ '$location', 'authenticationService' ];
module.exports = run;

