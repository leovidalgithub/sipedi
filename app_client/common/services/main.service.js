function mainServiceFn ( $http, $q, authenticationService, $rootScope ) {

		getProductsByClientID = function( clientID ) {
			var token    = authenticationService.getToken(),
				supplier = $rootScope.credentials.userLogged.supplier;
			$http.defaults.headers.common['x-auth-token'] = token;

			return $http.get( '/api/products/' + clientID + '?supplier=' + supplier + '&allProducts=false' )
				.then( prepareProductsData.bind( null, clientID ) )
				.catch( function ( err ) {
					if ( err.status == 403 ) authenticationService.logout();
			});
		};

		setProductOrder = function( clientID, product ) {
			var token      = authenticationService.getToken(),
				admin      = $rootScope.credentials.userLogged.admin,
				supplierID = $rootScope.credentials.supplier._id,
				defered    = $q.defer(),
				promise    = defered.promise;
			$http.defaults.headers.common['x-auth-token'] = token;

			$http.post( '/api/products/setOrder/', {
								clientID       : clientID,
								supplierID     : supplierID,
								admin          : admin,
								productID      : product._id,
								productOrdered : product.productOrdered,
								quantity       : product.quantity } )
				.then( defered.resolve )
				.catch( function ( err ) {
					if ( err.status == 403 ) authenticationService.logout();
					defered.reject( err );
				});
			return promise;
		};

		setUserDemand = function( data ) {
			var token = authenticationService.getToken(),
				defered = $q.defer(),
				promise = defered.promise;
			$http.defaults.headers.common['x-auth-token'] = token;

			$http.post( '/api/user/setUserDemand/', data )
				.then( defered.resolve )
				.catch( function ( err ) {
					if ( err.status == 403 ) authenticationService.logout();
					defered.reject( err );
				});
			return promise;
		};

		function prepareProductsData( clientID, data ) {
			data.data.forEach( function( product, index ) {
				var getClient = product.clients.find( function( client ) {
					return client._id === clientID;
				});
				product.quantity = getClient.quantity;
				product.productOrdered = getClient.productOrdered;
				product.clients = []; // not need this
			});
			return data;
		}

		return {
					getProductsByClientID : getProductsByClientID,
					setProductOrder     : setProductOrder,
					setUserDemand         : setUserDemand
		};
}

mainServiceFn.$inject = [ '$http', '$q', 'authenticationService', '$rootScope' ];
module.exports = mainServiceFn;
