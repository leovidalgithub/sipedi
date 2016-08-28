 ( function () {

	angular
		.module( 'sipediApp' )
		.service( 'mainService', mainServiceFn );

		mainServiceFn.$inject = [ '$http', 'authenticationService', '$rootScope' ];

		function mainServiceFn ( $http, authenticationService, $rootScope ) {

			getProductsByClientID = function() {
				var token = authenticationService.getToken();
				var clientID = $rootScope.credentials.clientID;
				return $http.get( '/api/products/' + clientID + '?token=' + token )
			}

			getClientsBySupplier = function() {
				var token = authenticationService.getToken();
				var supplier = $rootScope.credentials.supplier;
				return $http.get( '/api/clients/' + supplier + '?token=' + token )
			}

			getSupplierInfo = function() {
				var token = authenticationService.getToken();
				var supplier = $rootScope.credentials.supplier;
				return $http.get( '/api/supplier/' + supplier + '?token=' + token )
			}

			return {
				getProductsByClientID : getProductsByClientID,
				getClientsBySupplier  : getClientsBySupplier,
				getSupplierInfo       : getSupplierInfo
			}
		}

})()





				// GET 	/api/products
				// POST 	/api/products
				// GET 	/api/products/provider/:id
				// GET 	/api/product/:id 
				// POST 	/api/product/:id
				// DELETE 	/api/product/:id