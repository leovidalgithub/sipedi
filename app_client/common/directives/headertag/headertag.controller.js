function headerTagCtrlFn( $scope, authenticationService ) {

	$scope.logout = function() {
		authenticationService.logout();
	}
}

headerTagCtrlFn.$inject = [ '$scope', 'authenticationService' ];
module.exports = headerTagCtrlFn;
