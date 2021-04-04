function run ($location, $root, authenticationService) {

	if (authenticationService.isLoggedIn()) {
		$location.path('/main');
	} else {
		$location.path('/login');
	}

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
