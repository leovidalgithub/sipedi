function headerTagCtrlFn( $scope, authenticationService ) {

	$scope.logout = function() {
		// clearInterval( $scope.$parent.LoadTimerId );
		authenticationService.logout();
	}
}

headerTagCtrlFn.$inject = [ '$scope', 'authenticationService' ];
module.exports = headerTagCtrlFn;
