// app-client / common / config / index

function run ( $rootScope, $location, authenticationService ) {
	// every time app runs, first of all, verifies authentication through token
	// if so, sets user credentials in $rootScope.credentials
	if ( authenticationService.isLoggedIn() ) {
				authenticationService.setCredentials();
				$location.path( 'main' )
	} else {
				$location.path( '/' )
	}

	$rootScope.$on( '$routeChangeStart', function( event, nextRoute, currentRoute ) {
		if ( $location.path() !== '/' ) {
			if ( authenticationService.isLoggedIn()) {
						authenticationService.setCredentials();
						// $location.path('main')
			} else {
						$location.path( '/' )
			}
	  	}
	})
}

run.$inject = [ '$rootScope', '$location', 'authenticationService' ];
module.exports = run;
