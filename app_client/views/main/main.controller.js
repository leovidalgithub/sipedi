const usersFilter = require ('../../common/filters/users.filter');
function mainController ( $location, $scope, $rootScope, mainService, usersService, $interval, sharedData, constData ) {

	var promiseInterval;
	(function Init() {
		$scope.usersFilter = usersFilter;
		$scope.genericLogo = constData.getData( 'genericLogo' );
		$scope.$watch('childLoaded', function(newValue, oldValue) { // wait until child products controller load
			if( newValue ) {
				getClients();
				promiseInterval = $interval(function() { // polling
					getClients();
					$scope.$broadcast('refreshProducts', $scope.currentClient._id); // to products controller
				}, 300000); // 300000 , 555 times
			}
		});
	})();

	function getClients() {
		usersService.getUsersBySupplier(false) // get clients
			.then(function(data) {
					let selectedIndex = 0;
					if ( $scope.clients ) {
						selectedIndex = $scope.clients.indexOf( $scope.currentClient );
					}
					$scope.clients = data.data;
					sendDemandQuantities();
					sharedData.setData( 'clientsMaster', $scope.clients );
					if ( !$rootScope.credentials.userLogged.admin ) { // client logged
						selectedIndex = $scope.clients.map( function( user ) { return user._id; }).indexOf( $rootScope.credentials.userLogged._id );
					}
					$scope.currentClient = $scope.clients[ selectedIndex ];
					// if ( typeof( callback ) === 'function' ) callback();
			})
			.catch(function(err) {
				console.log('err',err);
				$scope.codeAlert = '-10'; // reading db Error
			});
	}

	$scope.$watch( 'currentClient', function( newValue, oldValue ) {
		if ( newValue !== oldValue ) {
			if ( $scope.currentClient !== null && $scope.currentClient !== 'undefined' ) {
					$rootScope.$broadcast( 'clientChanged'  , $scope.currentClient );     // to sideMenu directive
					$scope.$broadcast(     'refreshProducts', $scope.currentClient._id ); // to products controller
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
				$scope.codeAlert = '+11'; // demand state updated ok
			})
			.catch( function ( data ) {
				$scope.codeAlert = '-11'; // demand state updated error
			});
		sendDemandQuantities();
	};

	$scope.$on( '$destroy', function() { // scope destroy
		$interval.cancel( promiseInterval ); // canceling polling on exit controller
	});

	function sendDemandQuantities() { // to send to navbar directive
		$rootScope.$broadcast( 'demandQuantities', $scope.clients ); // to navbar directive controller
	}
}

mainController.$inject = [ '$location', '$scope', '$rootScope', 'mainService', 'usersService', '$interval', 'sharedData', 'constData' ];
module.exports = mainController;
