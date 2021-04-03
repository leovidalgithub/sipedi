function run ($location, $root, authenticationService) {

	if (authenticationService.isLoggedIn()) {
		$location.path('/main');
	} else {
		$location.path('/login');
	}

	// if ($location.path() !== '/') {
	// 	if (!authenticationService.isLoggedIn()) { //verifies token
	// 			$location.path('/login');
	// 		} else {
	// 		$location.path('/main');
	// 	}
	// }

	$root.$on('$routeChangeStart', function(e, curr, prev) {
		$root.loadingView = true;
		// if (curr.$$route && curr.$$route.resolve) {}
	});
	$root.$on('$routeChangeSuccess', function(e, curr, prev) { // '$routeChangeStart'
		$root.loadingView = false;
	});
}

run.$inject = ['$location', '$rootScope', 'authenticationService'];
module.exports = run;
