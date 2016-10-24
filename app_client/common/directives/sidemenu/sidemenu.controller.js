function sidemenuCtrl( $scope, $timeout ) {

	$scope.closeMenu = function() {
		$timeout( function() {
			$scope.sibarOpen = false;
		}, 2000 );
	};

	$scope.$on( 'clientChanged', function( event, currentClient ) { // from main controller
		$scope.currentClient = currentClient;
	});

}

sidemenuCtrl.$inject = [ '$scope', '$timeout' ];
module.exports = sidemenuCtrl;
