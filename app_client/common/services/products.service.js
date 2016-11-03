function productsServiceFn ( $q, $http, authenticationService, $rootScope ) {

		getAllProductsBySupplier = function() {
			var token    = authenticationService.getToken();
			var supplier = $rootScope.credentials.userLogged.supplier,
				defered = $q.defer(),
				promise = defered.promise;
			$http.post( '/api/products/', {
				supplier    : supplier,
				token       : token,
				allProducts : true
			})
			.then( function( data ) {
				defered.resolve( data );
			})
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
			products = products.filter( function( product ) { // to send just products modified, added or deleted
				return ( product.action !== '' );
			});
			var token    = authenticationService.getToken();
				supplier = $rootScope.credentials.userLogged.supplier;
			return $http.put( '/api/products/', {
				token    : token,
				supplier : supplier,
				products : products
			})
			.catch( function ( err ) {
				if ( err.status == 403 ) authenticationService.logout();
			});
		};

		return {
					getAllProductsBySupplier : getAllProductsBySupplier,
					setProducts              : setProducts,
					resetProductStatus       : resetProductStatus
		};

}

productsServiceFn.$inject = [ '$q', '$http', 'authenticationService', '$rootScope' ];
module.exports = productsServiceFn;
