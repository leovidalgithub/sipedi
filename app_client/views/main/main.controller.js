( function() {

	angular.module( 'sipediApp' )
		.controller( 'main.controller', mainCtrlFn );
		mainCtrlFn.$inject = [ '$scope', 'mainService', '$rootScope' ];

		function mainCtrlFn( $scope, mainService, $rootScope ) {

			$( '.selectpicker' ).selectpicker( {
				style: 'btn-info',
				size: 4
			});

			if ( $rootScope.credentials.admin ) { // SUPPLIER LOGGED
				getClients()
			} else { //								 CLIENT LOGGED
				$rootScope.credentials.clientID = $rootScope.credentials.userID;
				getProducts();
				getSupplierInfo()
			}

			$scope.productClicked = function( $event, product ) {
				var productID = product._id;
				var clientID = $rootScope.credentials.clientID; 
				var product = $scope.products.find( function( product ) {
					return product._id === productID
				})
				product.ordered = product.ordered ? false : true;
				var newOrdered = product.ordered;
				setProductOrdered( productID, clientID, newOrdered );
			}

			$scope.quantityClicked = function( $event, product ) {
				var productID = product._id;
				var productQuantity = product.quantity;
				console.log( productID );
				console.log( productQuantity );
				$event.stopPropagation()
			}

			$scope.clientChanged = function( client ) {
				$rootScope.credentials.clientID = $scope.selectedClientModel._id
				getProducts();
			}

			function getProducts() {
				mainService.getProductsByClientID()
					.then( function( data ) {
						$scope.products = data.data;
					})
			}

			function getClients() {

				mainService.getClientsBySupplier()
					.then( function( data ) {
						$scope.clients = data.data;
						$scope.selectedClientModel = $scope.clients[0]; // select first in select
						$scope.clientChanged()
				})
			}

			function getSupplierInfo(){
				mainService.getSupplierInfo()
					.then( function( data ) {
						$scope.credentials.supplier = data.data[0]
				})
			}

			function setProductOrdered( productID, clientID, newOrdered ){
				mainService.setProductOrdered( productID, clientID, newOrdered )
				// 		.then( function( data ) {
				// 				console.log( data )
				// 		})
			}
		} // @end mainCtrlFn()

})();