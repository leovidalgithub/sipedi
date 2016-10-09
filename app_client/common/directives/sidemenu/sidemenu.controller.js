function sidemenuCtrl( $scope, $timeout ) {

	$scope.closeMenu = function() {
		$timeout( function() {
			$scope.sibarOpen = false;
		}, 2000);
	}

	$scope.$on( 'userChanged', function( event, currentUser ) { // from main controller
		$scope.user = currentUser;
	});

}

sidemenuCtrl.$inject = [ '$scope', '$timeout' ];
module.exports = sidemenuCtrl;
