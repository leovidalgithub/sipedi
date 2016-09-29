function run ( $location, authenticationService ) {
	if ( $location.path() !== '/' ) {
		if ( !authenticationService.isLoggedIn() ) { //verifies token
				$location.path( '/' );
		}
	}
	// $rootScope.$on( '$routeChangeStart', function( event, nextRoute, currentRoute ) {})
}

run.$inject = [ '$location', 'authenticationService' ];
module.exports = run;

