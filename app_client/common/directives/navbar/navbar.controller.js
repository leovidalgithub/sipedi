function navbarCtrl( $scope, authenticationService ) {

	$scope.home = function() {
		authenticationService.home();
	}
	$scope.logout = function() {
		authenticationService.logout();
	}

}

navbarCtrl.$inject = [ '$scope', 'authenticationService' ];
module.exports = navbarCtrl;
