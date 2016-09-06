function mainServiceFn ( $http, authenticationService, $rootScope ) {

		getProductsByClientID = function() {
			var token = authenticationService.getToken();
			var clientID = $rootScope.credentials.currentClientID;
			return $http.get( '/api/products/' + clientID + '?token=' + token )
				.then( prepareProductsData.bind( null, clientID ) )
				// .then( function( data ) {
					// prepareProductsData( clientID, data )
				// })
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

		setProductOrdered = function( product ) {
			var token = authenticationService.getToken();
			var clientID = $rootScope.credentials.currentClientID;
			return $http.post( '/api/products/setOrdered/', {
				token : token,
				productID : product._id,
				clientID : clientID,
				newProductOrdered : product.productOrdered } )
		}

		setProductQuantity = function( product ) {
			var token = authenticationService.getToken();
			var clientID = $rootScope.credentials.currentClientID;
			return $http.post( '/api/products/setQuantity/', {
				token : token,
				productID : product._id,
				clientID : clientID,
				newProductQuantity : product.quantity } )
		}

		return {
			getProductsByClientID : getProductsByClientID,
			getClientsBySupplier  : getClientsBySupplier,
			getSupplierInfo       : getSupplierInfo,
			setProductOrdered     : setProductOrdered,
			setProductQuantity     : setProductQuantity
		}

		function prepareProductsData( clientID, data ) {
			data.data.forEach( function( product, index ) {
				var getClient = product.clients.find( function( client ) {
					return client._id === clientID
				});
				product.quantity = getClient.quantity;
				product.productOrdered = getClient.productOrdered;
				product.clients = [] // not need this
			})
			return data
		}

}

mainServiceFn.$inject = [ '$http', 'authenticationService', '$rootScope' ];
module.exports = mainServiceFn;



				// GET 	/api/products
				// POST 	/api/products
				// GET 	/api/products/provider/:id
				// GET 	/api/product/:id 
				// POST 	/api/product/:id
				// DELETE 	/api/product/:id