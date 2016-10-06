function productsServiceFn ( $http, authenticationService, $rootScope ) {

		getAllProductsBySupplier = function() {
			var token = authenticationService.getToken();
			var supplier = $rootScope.credentials.supplier;
			return $http.post( '/api/products/', {
				supplier    : supplier,
				token       : token,
				allProducts : true
			})
			.then( prepareProductsData )
			.catch( function ( err ) {
				if ( err.status == 403 ) authenticationService.logout();
			});
			function prepareProductsData( data ) {
				angular.forEach( data.data, function( product ) {
					product.action = '';
					product.selected = false;
				})
				return data;
			}
		}

		setProducts = function( products ) {
			var token = authenticationService.getToken();
			return $http.put( '/api/products/', {
				token       : token,
				products : products
			})
			.catch( function ( err ) {
				if ( err.status == 403 ) authenticationService.logout();
			});
		}

		return {
					getAllProductsBySupplier : getAllProductsBySupplier,
					setProducts : setProducts
		}

}

productsServiceFn.$inject = [ '$http', 'authenticationService', '$rootScope' ];
module.exports = productsServiceFn;
