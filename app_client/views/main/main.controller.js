function mainController ( $scope, $rootScope, mainService, usersService, $timeout, sharedData ) {

	(function Init() {
		$scope.sipediLogo = sharedData.getData( 'sipediLogo' );
		$scope.alertMsg   = {};
		getClients();
		// getClients( function() {});
	})();

	function getClients() {
		usersService.getUsersBySupplier( false ) // get clients
			.then( function( data ) {
					var selectedIndex = 0;
					if ( $scope.clients ) {
						selectedIndex = $scope.clients.indexOf( $scope.currentClient );
					}
					$scope.clients = data.data;
					sharedData.setData( 'clientsMaster', $scope.clients );

					if ( !$rootScope.credentials.userLogged.admin ) { // client logged
						selectedIndex = $scope.clients.map( function( user ) { return user._id; }).indexOf( $rootScope.credentials.userLogged._id );
					}

					$scope.currentClient = $scope.clients[ selectedIndex ];
					// if ( typeof( callback ) === 'function' ) callback();
			});
	}

	$scope.$watch( 'currentClient', function( newValue, oldValue ) {
		if ( newValue !== oldValue ) {
			if ( $scope.currentClient !== null && $scope.currentClient !== 'undefined' ) {
					$scope.$emit     ( 'clientChanged',   $scope.currentClient );     // to sideMenu directive
					$scope.$broadcast( 'refreshProducts', $scope.currentClient._id ); // to products controller
			}
		}
	});

	$scope.$on( 'socketGetUpdate', function() {
		getClients();
		$scope.$broadcast( 'refreshProducts', $scope.currentClient._id ); // to products controller
	});

	$scope.demandButton = function() {
		$scope.currentClient.demandDate = Date.now(); // set new Date
		if ( $scope.currentClient.demandState === 0 ) { // setting new State
			$scope.currentClient.demandState = 1;
		} else if ( $scope.currentClient.demandState === 1 ) {
			if ( $rootScope.credentials.userLogged.admin ) {
				$scope.currentClient.demandState = 2;
			} else {
				$scope.currentClient.demandState = 0;
			}
		} else {
			$scope.currentClient.demandState = 0;
		}
		var data = {	clientID    : $scope.currentClient._id,
						supplierID  : $rootScope.credentials.supplier._id,
						admin       : $rootScope.credentials.userLogged.admin,
						demandState : $scope.currentClient.demandState,
						demandDate  : $scope.currentClient.demandDate
					 };
		mainService.setUserDemand( data )
			.then( function( data ) {
				console.log( 'demand state updated' );
				$scope.showSuccessAlert( 'Información de pedido enviada.' );
			})
			.catch( function ( data ) {
				$scope.showErrorAlert( 'Error al intentar guardar el estado del Pedido.' );
			});
	};

	(function AlertMessages() {
		$scope.showErrorAlert = function ( msg ) {
			$scope.alertMsg.error = msg;
			showAlert( '.errorAlert', 6000 );
		};
		$scope.showSuccessAlert = function ( msg ) {
			$scope.alertMsg.success = msg;
			showAlert( '.successAlert', 2000 );
		};
		function showAlert( alertType, time ) {
			$( '#main ' + alertType ).collapse( 'show' );
			$timeout( function() {
				$scope.closesAlert();
			}, time);
		}
		$scope.closesAlert = function() {
			$( '#main .closeAlert' ).collapse( 'hide' );
		};
	})();
}

mainController.$inject = [ '$scope', '$rootScope', 'mainService', 'usersService', '$timeout', 'sharedData' ];
module.exports = mainController;

// var stop = $interval(function() {}, 4000, 555);
