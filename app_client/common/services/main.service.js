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
					.then( prepareProductsData.bind( null, clientID ) )
					// .then( function( data ) {
					// 	prepareProductsData( data )
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

			setProductOrdered = function( productID, clientID, newOrdered ) {
				var token = authenticationService.getToken();
				$http.post( '/api/products/setOrdered/', {
					token : token,
					productID : productID,
					clientID : clientID,
					newOrdered : newOrdered 
				} ).then( function( data ) { console.log( data )})
			}

			return {
				getProductsByClientID : getProductsByClientID,
				getClientsBySupplier  : getClientsBySupplier,
				getSupplierInfo       : getSupplierInfo,
				setProductOrdered     : setProductOrdered
			}
		}

		prepareProductsData = function( clientID, data ) {
			data.data.forEach( function( product, index ) {
				var getClient = product.clients.find( function( client ) {
					return client._id === clientID
				});
				product.quantity = getClient.quantity;
				product.ordered = getClient.ordered;
				product.clients = [] // not need this
			})
			return data
		}

})()





				// GET 	/api/products
				// POST 	/api/products
				// GET 	/api/products/provider/:id
				// GET 	/api/product/:id 
				// POST 	/api/product/:id
				// DELETE 	/api/product/:id