function usersCtrl( $scope, usersService, sharedData, $timeout ) {

	(function Init() {
		$scope.sipediLogo = sharedData.getData( 'sipediLogo' );
		if ( sharedData.getData( 'users' ) ) {
			var usersState       = sharedData.getData( 'users' );
			$scope.usersMaster   = usersState.usersMaster;
			$scope.users         = usersState.users;
			$scope.currentClient = $scope.users[ usersState.usersCurrentClientIndex ];
			$timeout( function() {
				$scope.userForm.$pristine = usersState.usersFormPristine;
			});
		} else {
		usersService.getUsersBySupplier()
			.then( function( data ) {
					$scope.usersMaster = data.data;
					var supplierIndex = $scope.usersMaster.map( function( user ) { return user.admin }).indexOf( true );
					$scope.usersMaster.splice( supplierIndex, 1 ); // remove supplier from users array
					$scope.users = angular.copy( $scope.usersMaster );
					$scope.currentClient = $scope.users[0];
			})
			.catch( function ( err ) {
				$scope.showErrorAlert( 'Error cargando los usuarios.' );
			});
		};
	})();

	$scope.undoChanges = function() {
		var currentClientIndex = $scope.users.indexOf( $scope.currentClient );
		$scope.users = angular.copy( $scope.usersMaster );
		$scope.currentClient = $scope.users[ currentClientIndex ];
		$scope.userForm.$setPristine();
		$scope.userForm.$setUntouched();
	};

	$scope.saveChanges = function() {
		usersService.setUser( $scope.currentClient )
			.then( function( data ) {
				console.log( 'Datos del cliente actualizados correctamente.' );
			$scope.userForm.$setPristine();
			$scope.userForm.$setUntouched(); // $scope.userForm.$setValidity(name, null);
			})
			.catch( function ( err ) {
				console.log( 'Error guardando los datos del cliente.' );
			});
	};

	$scope.$on( '$destroy', function() { // scope destroy when change route
			var usersState = {
				users                   : $scope.users,
				usersMaster             : $scope.usersMaster,
				usersFormPristine       : $scope.userForm.$pristine,
				usersCurrentClientIndex : $scope.users.indexOf( $scope.currentClient )
			}
			sharedData.setData( 'users', usersState );
	});

}

usersCtrl.$inject = [ '$scope', 'usersService', 'sharedData', '$timeout' ];
module.exports = usersCtrl;
