function mainServiceFn ( $http, authenticationService, $rootScope ) {

		getProductsByClientID = function( id ) {
			var token = authenticationService.getToken();
			var supplier = $rootScope.credentials.supplier;
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
		}

		getUsersBySupplier = function() {
			var token = authenticationService.getToken();
			var supplier = $rootScope.credentials.supplier;
			return $http.post( '/api/users/', {
				supplier : supplier,
				token    : token
			})
			.catch( function ( err ) {
				if ( err.status == 403 ) authenticationService.logout();
			});

		}

		setProductOrder = function( clientID, product ) {
			var token = authenticationService.getToken();
			return $http.post( '/api/products/setOrder/', {
				token : token,
				clientID : clientID,
				productID : product._id,
				productOrdered : product.productOrdered,
				quantity : product.quantity } )
				.catch( function ( err ) {
					if ( err.status == 403 ) authenticationService.logout();
				});
		}

		setUserDemand = function( data ) {
			data.token = authenticationService.getToken();
			return $http.post( '/api/user/setUserDemand/', data )
				.catch( function ( err ) {
					if ( err.status == 403 ) authenticationService.logout();
				});
		}

		function prepareProductsData( clientID, data ) {
			data.data.forEach( function( product, index ) {
				var getClient = product.clients.find( function( client ) {
					return client._id === clientID;
				});
				product.quantity = getClient.quantity;
				product.productOrdered = getClient.productOrdered;
				product.clients = []; // not need this
			})
			return data;
		}

		return {
					getProductsByClientID : getProductsByClientID,
					getUsersBySupplier  : getUsersBySupplier,
					setProductOrder     : setProductOrder,
					setUserDemand         : setUserDemand
		}
}

mainServiceFn.$inject = [ '$http', 'authenticationService', '$rootScope' ];
module.exports = mainServiceFn;
