function sidemenuCtrl( $scope, $timeout ) {

	$scope.closeMenu = function() {
		$timeout( function(){
			$scope.sibarOpen = false;
		}, 1500);
	}

}

sidemenuCtrl.$inject = [ '$scope', '$timeout' ];
module.exports = sidemenuCtrl;
