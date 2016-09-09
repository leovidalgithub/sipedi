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
		    	$scope.demandLeyend = 'PEDIDO HECHO';
				$demandButton.addClass( 'btn-success' );
		        break;
		    case 2:
		    	$scope.demandLeyend = 'PEDIDO RECIBIDO';
				$demandButton.addClass( 'btn-danger' );
		        break;
		    default:
		}
	};

	$scope.demandButton = function() {
		$scope.changeQuantityMode = true; // to prevent products from update
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
		mainService.setUserDemand()
			.then( function( data ) {
				$scope.changeQuantityMode = false; // to restart products update
			})
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
			$scope.changeQuantityMode = true; // to prevent products from update
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
				$scope.refreshMode = true;
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
							try {
							$scope.clients[index].demandState = clientsTemp[index].demandState;
							$scope.clients[index].demandDate = clientsTemp[index].demandDate;
							} catch(e) {
								console.log(e);
							}
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
		if ( !$scope.changeQuantityMode ) { // while not in QuantityModal it can refresh products data
			mainService.getProductsByClientID()
				.then( function( data ) {
					var tabIndex = $scope.activeTabIndex || 0; // save tab-products active index before refresh

					if ( $scope.refreshMode ) {
						var products = data.data;
						products.forEach( function( product, index) {
							$scope.products[index].category = products[index].category;
							$scope.products[index].product = products[index].product;
							$scope.products[index].productOrdered = products[index].productOrdered;
							$scope.products[index].quantity = products[index].quantity;
							$scope.products[index].stock = products[index].stock;
					});
						$scope.refreshMode = false;
					} else {
						$scope.products = data.data;
					}

					$timeout(function() {
						$scope.activeTabIndex = tabIndex;
					});
				})
		}
	}


	// function getProducts() {
	// 	mainService.getProductsByClientID()
	// 		.then( function( data ) {
	// 			if ( !$scope.changeQuantityMode ) { // while not in QuantityModal it can refresh products data
	// 				var tabIndex = $scope.activeTabIndex || 0; // save tab-products active index before refresh
	// 				$scope.products = data.data;
	// 				$timeout(function() {
	// 					$scope.activeTabIndex = tabIndex;
	// 				});
	// 			}
	// 		})
	// }

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
				$scope.changeQuantityMode = false; // to restart products update
			})
			.catch( function( err ) {
			})
	}

	 // main init
	$scope.refreshMode = false;
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
