// app-client / common / config / index

( function () {
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

	angular
		.module( 'sipediApp' )
		.run( ['$rootScope', '$location', 'authenticationService', run] )
})()
