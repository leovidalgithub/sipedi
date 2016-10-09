function mainCtrlFn( $scope, mainService, $rootScope, $interval, $timeout, $location, sharedData ) {

	(function () { // main Init
		$scope.userData   = {};
		$scope.alertMsg   = {};
		$scope.sipediLogo = sharedData.getData( 'sipediLogo' );

		getUsers( function () {
			var supplierIndex = $scope.users.map( function( user ) { return user.admin }).indexOf( true );
			$scope.userData.supplier   = $scope.users[supplierIndex];
			$scope.users.splice( supplierIndex, 1 ); // remove supplier from users array

			if ( $rootScope.credentials.admin ) { // supplier logged
				$scope.userData.currentClient = $scope.userData.currentClient || $scope.users[0];
			} else { // client logged
				$scope.userData.currentClient = $rootScope.credentials;
			}
		});
	})();

	function getUsers( callBack ) {
		mainService.getUsersBySupplier()
			.then( function( data ) {
				$scope.users = data.data;
				if( typeof( callBack ) === 'function' ) callBack();
			})
			.catch( function ( err ) {
				$scope.showErrorAlert( 'Error cargando los usuarios.' );
			});
	};

	$scope.$watch( 'userData.currentClient', function( newUser, oldValue ) {
		if ( angular.isDefined( newUser ) ) {
			$scope.$emit     ( 'userChanged', $scope.userData ); // to sideMenu directive
			$scope.$broadcast( 'refreshProducts', $scope.userData.currentClient._id ); // to products controller
		}
	});

	$scope.demandButton = function() {
		$scope.userData.currentClient.demandDate = Date.now(); // set new Date
		if ( $scope.userData.currentClient.demandState === 0 ) { // setting new State
			$scope.userData.currentClient.demandState = 1;
		} else if ( $scope.userData.currentClient.demandState === 1 ) {
			if ( $rootScope.credentials.admin ) {
				$scope.userData.currentClient.demandState = 2;
			} else {
				$scope.userData.currentClient.demandState = 0;
			}
		} else {
			$scope.userData.currentClient.demandState = 0;
		}
		var data = {	clientID    : $scope.userData.currentClient._id,
						demandState : $scope.userData.currentClient.demandState,
						demandDate  : $scope.userData.currentClient.demandDate
					 };
		mainService.setUserDemand( data )
			.then( function( data ) {
				console.log( 'demand state updated' );
				$scope.showSuccessAlert( 'Información de pedido enviada.' );
			})
			.catch( function ( data ) {
				$scope.showErrorAlert( 'Error al intentar guardar el estado del Pedido.' );
			});
	}

	$scope.showErrorAlert = function ( msg ) {
		$scope.alertMsg.error = msg;
		showAlert( '.errorAlert', 6000 );
	}

	$scope.showSuccessAlert = function ( msg ) {
		$scope.alertMsg.success = msg;
		showAlert( '.successAlert', 2000 );
	}

	function showAlert( alertType, time ) {
		$( '#main ' + alertType ).collapse( 'show' );
		$timeout( function() {
			$scope.closesAlert();
		}, time);
	};

	$scope.closesAlert = function() {
		$( '#main .closeAlert' ).collapse( 'hide' );
	}

// var stop = $interval(function() {
// 		}, 3000, 555);
}

mainCtrlFn.$inject = [ '$scope', 'mainService', '$rootScope', '$interval', '$timeout', '$location', 'sharedData' ];
module.exports = mainCtrlFn;
