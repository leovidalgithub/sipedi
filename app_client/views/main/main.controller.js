function mainCtrlFn( $scope, mainService, $rootScope, $timeout, moment, authenticationService ) {

	function mainStart() {
		if ( $rootScope.credentials.admin ) { // SUPPLIER LOGGED
			getClients()
		} else { //								 CLIENT LOGGED
			getProducts();
			getSupplierInfo();
		}
		formatDemandDate();
		$scope.setLoadTimer();
	}

	formatDemandDate = function () {
		var $demandButton  = $( '#main .demandButton button' );
		var demandDate     = $rootScope.credentials.current.demandDate;
		$scope.demandState = $rootScope.credentials.current.demandState;
		$scope.demandDay   = moment( demandDate ).format( 'dddd' );
		$scope.demandDate  = moment( demandDate ).format( 'MM Do YYYY' );
		$scope.demandHour  = moment( demandDate ).format( 'h:mm a' );
		$demandButton.removeClass( 'btn-default btn-danger btn-success' );
		switch ( $scope.demandState ) {
		    case 0:
		    	$scope.demandLeyend = 'HACER PEDIDO';
				$demandButton.addClass( 'btn-default' );
		        break;
		    case 1:
		    	$scope.demandLeyend = 'PEDIDO HECHO:';
				$demandButton.addClass( 'btn-success' );
		        break;
		    case 2:
		    	$scope.demandLeyend = 'PEDIDO RECIBIDO:';
				$demandButton.addClass( 'btn-danger' );
		        break;
		    default:
		}
	};

	$scope.demandButton = function() {
		var demandState = $rootScope.credentials.current.demandState;
		if ( demandState === 0 ) {
			$rootScope.credentials.current.demandState = 1
		} else if ( demandState === 1 ) {
			if ( $rootScope.credentials.admin ) {
				$rootScope.credentials.current.demandState = 2
			} else {
				$rootScope.credentials.current.demandState = 0
			}		
		} else {
			$rootScope.credentials.current.demandState = 0
		}
		$rootScope.credentials.current.demandDate = Date.now();
		formatDemandDate();
		mainService.setUserDemand();
		if( $scope.clients ) {
			var currentClientId = $rootScope.credentials.current.clientID;
			var currentClientInfo = $scope.clients.filter( function( client ) {
				return client._id === currentClientId; 
			})
			currentClientInfo[0].demandDate = $rootScope.credentials.current.demandDate;
			currentClientInfo[0].demandState = $rootScope.credentials.current.demandState;
		}
	}

	$scope.productClicked = function( $event, product ) {
		if ( !$scope.changeQuantityMode ) { // if not in QuantityModal it means product click ordered
			product.productOrdered = product.productOrdered ? false : true;
			setProductOrdered( product )
		}
	}

	$scope.clientChanged = function() {
		if ( $rootScope.credentials.admin ) { // SUPPLIER LOGGED
			var currentClientId = $scope.selectedClientModel._id;
			var currentClientInfo = $scope.clients.filter( function( client ) {
				return client._id === currentClientId
			})
			$rootScope.credentials.current.clientID = currentClientId;
			$rootScope.credentials.current.demandState = currentClientInfo[0].demandState;
			$rootScope.credentials.current.demandDate = currentClientInfo[0].demandDate;
			$scope.currentLogo = currentClientInfo[0].logo.data;
		}
		formatDemandDate();
		getProducts()
	}

	$scope.setLoadTimer = function() {
		$scope.LoadTimerId = setInterval( function() {
			console.log('timer');
				updateClients();
		}, 10000)
	}

		function updateClients() {
		mainService.getClientsBySupplier()
			.then( function( data ) {
				if ( data.data.length > 0) {
					var clientsTemp = data.data;
					if ( $rootScope.credentials.admin ) {
						clientsTemp.forEach( function( client, index) {
							$scope.clients[index].demandState = clientsTemp[index].demandState;
							$scope.clients[index].demandDate = clientsTemp[index].demandDate;
						})
					} else {
						var clientInfo = clientsTemp.filter(function( client ) {
							return client._id == $rootScope.credentials.current.clientID;
						})
						$rootScope.credentials.current.demandState = clientInfo[0].demandState;
						$rootScope.credentials.current.demandDate = clientInfo[0].demandDate;
					}
				$scope.clientChanged();
				}
		})
	}

	function getProducts() {
		mainService.getProductsByClientID()
			.then( function( data ) {
				if ( !$scope.changeQuantityMode ) { // while not in QuantityModal it can refresh products data
					var tabIndex = $scope.activeTabIndex || 0; // save tab-products active index before refresh
					$scope.products = data.data;
					$timeout(function() {
						$scope.activeTabIndex = tabIndex;
					});
				}
			})
	}

	function getClients() {
		mainService.getClientsBySupplier()
			.then( function( data ) {
				if ( data.data.length > 0) {
					$scope.clients = data.data;
					$scope.selectedClientModel = $scope.clients[0]; // select first in select
					$scope.clientChanged()
				}
		})
	}

	function getSupplierInfo(){
		mainService.getSupplierInfo()
			.then( function( data ) {
				var supplier = data.data;
				$scope.currentLogo = supplier.logo.data;
		})
	}

	function setProductOrdered( product ){
		mainService.setProductOrdered( product )
			.then( function( data ) { 
				console.log( 'productOrdered set correctly' );
				// $scope.setLoadTimer();
			})
			.catch( function( err ) {
			})
	}

	 // main init
	if ( !$rootScope.credentials ) {
		authenticationService.updateClientToken()
			.then( function( token ) {
				mainStart()
			})
			.catch( function( err ) {
				console.log('Error at main init')
			})

	} else {
		mainStart()
	}

} // @end mainCtrlFn()

mainCtrlFn.$inject = [ '$scope', 'mainService', '$rootScope', '$timeout', 'moment', 'authenticationService' ];
module.exports = mainCtrlFn;
