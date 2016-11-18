function sidemenuCtrl( $scope, $timeout ) {

	$scope.$on( 'clientChanged', function( event, currentClient ) { // from main controller
		$scope.currentClient = angular.copy( currentClient );
	});

	$scope.closeMenu = function() {
		$timeout( function() {
			$scope.sibarOpen = false;
		}, 1500 );
	};

}

sidemenuCtrl.$inject = [ '$scope', '$timeout' ];
module.exports = sidemenuCtrl;
