function navbarCtrl( $scope, constData, authenticationService ) {

	$scope.genericLogo = constData.getData( 'genericLogo' );

	$scope.home = function() {
		authenticationService.home();
	};
	$scope.refresh = function() {
		authenticationService.refresh();
	};
	$scope.logout = function() {
		authenticationService.logout();
	};
}

navbarCtrl.$inject = [ '$scope', 'constData', 'authenticationService' ];
module.exports = navbarCtrl;
