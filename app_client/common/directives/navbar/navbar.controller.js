function navbarCtrl( $scope, constData, authenticationService ) {

	$scope.sipediLogo = constData.getData( 'sipediLogo' );

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
