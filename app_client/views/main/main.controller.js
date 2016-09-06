function mainCtrlFn( $scope, mainService, $rootScope, $timeout ) {

	// function initializeClientsSelect() {
	// 	$('.selectpicker').selectpicker({
	// 	    style: 'btn-primary',
	// 	    showIcon: true,
	// 	    title: 'Mis clientes',
	// 	    'font-size' : '23'
	// 	});
	// 	$('select').selectpicker('refresh')
	// }

	if ( $rootScope.credentials.admin ) { // SUPPLIER LOGGED
		getClients()
	} else { //								 CLIENT LOGGED
		$rootScope.credentials.currentClientID = $rootScope.credentials.userID;
		getProducts();
		getSupplierInfo()
	}

	$scope.productClicked = function( $event, product ) {
		if ( !$scope.changeQuantityMode ) { // if not in QuantityModal it means product click ordered
			// $scope.changeQuantityMode = false;
			// return;
			product.productOrdered = product.productOrdered ? false : true;
			setProductOrdered( product )
		}
	}

	$scope.clientChanged = function( client ) {
		$rootScope.credentials.currentClientID = $scope.selectedClientModel._id;
		getProducts()
	}

	$scope.setLoadTimer = function() {
		$scope.LoadTimerId = setInterval( function() {
			getProducts()
		}, 6000)
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
					console.log('timer');
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
				$scope.credentials.supplier = data.data
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

	$scope.setLoadTimer();
} // @end mainCtrlFn()

mainCtrlFn.$inject = [ '$scope', 'mainService', '$rootScope', '$timeout' ];
module.exports = mainCtrlFn;
