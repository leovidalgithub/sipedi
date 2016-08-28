( function() {

	angular.module( 'sipediApp' )
		.controller( 'main.controller', mainCtrlFn );
		mainCtrlFn.$inject = [ '$scope', 'mainService', '$rootScope' ];

		function mainCtrlFn( $scope, mainService, $rootScope ) {

			if ( $rootScope.credentials.admin ) { // SUPPLIER LOGGED
				getClients()
			} else { //								 CLIENT LOGGED
				$rootScope.credentials.clientID = $rootScope.credentials.userID;
				getProducts();
				getSupplierInfo()
			}

			$scope.clientChanged = function( client ) {
				$rootScope.credentials.clientID = $scope.selectedClientModel._id
				getProducts();
			}

			function getProducts() {
				mainService.getProductsByClientID()
					.then( function( data ) {
						$scope.products = data
					})
			}

			function getClients() {
				mainService.getClientsBySupplier()
					.then( function( data ) {
						$scope.clients = data.data;
						$scope.selectedClientModel = $scope.clients[0];
						$scope.clientChanged()
				})
			}

			function getSupplierInfo(){
				mainService.getSupplierInfo()
					.then( function( data ) {
						$scope.credentials.supplier = data.data[0]
				})
			}

		} // @end mainCtrlFn()

})();