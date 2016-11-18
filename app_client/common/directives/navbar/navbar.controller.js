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

	$scope.$on( 'demandQuantities', function( event, clients ) { // from main or reports
		$scope.demandAsk      = 0;
		$scope.demandReceived = 0;
		angular.forEach( clients, function( client ) {
			if ( client.demandState === 1 ) {
				$scope.demandAsk++;
			} else if ( client.demandState === 2 ) {
				$scope.demandReceived++;
			}
		});
	});
}

navbarCtrl.$inject = [ '$scope', 'constData', 'authenticationService' ];
module.exports = navbarCtrl;
