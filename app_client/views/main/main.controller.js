function mainCtrlFn( $scope, mainService, $rootScope ) {

	// $( '.selectpicker' ).selectpicker( {
	// 	style: 'btn-info',
	// 	size: 1
	// });

	function initializeClientsSelect() {
		$('.selectpicker').selectpicker({
		    style: 'btn-primary',
		    showIcon: true,
		    title: 'Mis clientes',
		    'font-size' : '23'
		});
		$('select').selectpicker('refresh')
	}

	if ( $rootScope.credentials.admin ) { // SUPPLIER LOGGED
		getClients()
	} else { //								 CLIENT LOGGED
		$rootScope.credentials.clientID = $rootScope.credentials.userID;
		getProducts();
		getSupplierInfo()
	}

	$scope.productClicked = function( $event, product ) {
		if ( $scope.changeQuantityMode ) {
			// $scope.product = product;
			$scope.changeQuantityMode = false;
			return;
		}
		product.productOrdered = product.productOrdered ? false : true;
		setProductOrdered( product )
	}

	$scope.clientChanged = function( client ) {
		$rootScope.credentials.clientID = $scope.selectedClientModel._id;
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
				$scope.products = data.data;
				console.log($scope.products);
				initializeClientsSelect();
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

mainCtrlFn.$inject = [ '$scope', 'mainService', '$rootScope' ];
module.exports = mainCtrlFn;
