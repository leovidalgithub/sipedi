function productsServiceFn ( $http, authenticationService, $rootScope ) {

		getAllProductsBySupplier = function() {
			var token = authenticationService.getToken();
			var supplier = $rootScope.credentials.supplier;
			return $http.post( '/api/products/', {
				supplier    : supplier,
				token       : token,
				allProducts : true
			})
			.catch( function ( err ) {
				if ( err.status == 403 ) authenticationService.logout();
			});
		}

		return {
					getAllProductsBySupplier : getAllProductsBySupplier
		}
}

productsServiceFn.$inject = [ '$http', 'authenticationService', '$rootScope' ];
module.exports = productsServiceFn;
