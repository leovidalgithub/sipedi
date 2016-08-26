 (function () {

	angular
		.module( 'sipediApp' )
		.service( 'mainService', mainServiceFn );

		mainServiceFn.$inject = [ '$http', '$window', 'authenticationService', '$rootScope', '$location' ];

		function mainServiceFn ( $http, $window, authenticationService, $rootScope, $location ) {

			getProducts = function() {
				var token = authenticationService.getToken();
				var clientID = $rootScope.credentials.userID;
				var supplier;

				// GET 	/api/products
				// POST 	/api/products
				// GET 	/api/products/provider/:id
				// GET 	/api/product/:id 
				// POST 	/api/product/:id
				// DELETE 	/api/product/:id

				return $http.get( '/api/products/' + clientID + '?token=' + token );

				// return $http.post( '/api/getProductsBySupplier', { token : token, credentials : credentials } )
			}

			return {
				getProducts : getProducts
			};
		}

})();