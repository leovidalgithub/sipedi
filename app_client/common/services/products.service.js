function productsServiceFn ( $q, $http, authenticationService, $rootScope ) {

		getAllProductsBySupplier = function() {
			var token    = authenticationService.getToken();
			var supplier = $rootScope.credentials.userLogged.supplier,
				defered  = $q.defer(),
				promise  = defered.promise;
			$http.defaults.headers.common['x-auth-token'] = token;

			$http.get( '/api/products/noID?supplier=' + supplier + '&allProducts=true' )
				.then( defered.resolve )
				.catch( function ( err ) {
					if ( err.status == 403 ) authenticationService.logout();
					defered.reject( err );
				});
			return promise;
		};

		resetProductStatus = function( products ){
			products = products.filter( function( product ) { // remove items with action='deleted'
				return product.action !== 'deleted';
			});
			angular.forEach( products, function( product ) { // reset .action & .selected
				product.action   = '';
				product.selected = false;
			});
			return products;
		};

		setProducts = function( products ) {
			console.log('setProducts');
			products = products.filter( function( product ) { // to send just products modified, added or deleted
				return ( product.action !== '' );
			});
			var token    = authenticationService.getToken(),
				supplier = $rootScope.credentials.userLogged.supplier,
				defered  = $q.defer(),
				promise  = defered.promise;
			$http.defaults.headers.common['x-auth-token'] = token;

			$http.put( '/api/products/', {
				supplier : supplier,
				products : products
			})
			.then( defered.resolve )
			.catch( function ( err ) {
				if ( err.status == 403 ) authenticationService.logout();
				defered.reject( err );
			});
			return promise;
		};

		return {
					getAllProductsBySupplier : getAllProductsBySupplier,
					setProducts              : setProducts,
					resetProductStatus       : resetProductStatus
		};

}

productsServiceFn.$inject = [ '$q', '$http', 'authenticationService', '$rootScope' ];
module.exports = productsServiceFn;
