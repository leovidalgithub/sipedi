function mainServiceFn ( $http, $q, authenticationService, $rootScope ) {

		getProductsByClientID = function( id ) {
			var token    = authenticationService.getToken();
			var supplier = $rootScope.credentials.userLogged.supplier;
			return $http.post( '/api/products/', {
				clientID    : id,
				supplier    : supplier,
				token       : token,
				allProducts : false
			})
				.then( prepareProductsData.bind( null, id ) )
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
			$http.post( '/api/products/setOrder/', {
								token          : token,
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
			data.token = authenticationService.getToken();
			var defered = $q.defer(),
				promise = defered.promise;
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
