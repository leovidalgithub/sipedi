function assignCtrlFn( $scope, sharedData, constData, productsService, $window ) {
    (function Init() {
        $scope.sipediLogo = constData.getData( 'sipediLogo' );
        getUsers();
        setVerticalMode();
        if ( sharedData.getData( 'assignProductos' ) ) {
            $scope.products = sharedData.getData( 'assignProductos' );
            fillCategories();
            $scope.modified = true;
        } else {
            getAllProducts();
        }
    })();

    function getUsers() {
        if ( angular.isDefined( $scope.clients ) ) $scope.currentClientIndex = $scope.clients.indexOf( $scope.currentClient );
        $scope.clients = angular.copy( sharedData.getData( 'clientsMaster' ) );
        $scope.currentClient = $scope.clients[ $scope.currentClientIndex ] || $scope.clients[ 0 ];
    }

    function getAllProducts() {
        productsService.getAllProductsBySupplier()
                .then( function( data ) {
                    $scope.products = data.data;
                    fillCategories();
                })
                .catch( function ( err ) {
                })
                .finally( function() {
                    $scope.modified = false;
                });
    }

    function fillCategories() {
        $scope.categories = [];
        $scope.products.forEach( function( product ) { $scope.categories.push( product.category ); });
        function onlyUnique( value, index, self ) { // extract unique categories
            return self.indexOf( value ) === index;
        }
        $scope.categories = $scope.categories.filter( onlyUnique );
        if ( $scope.categories.indexOf( $scope.selectedCategory ) === -1 ) { // $scope.selectedCategory = $scope.selectedCategory || $scope.categories[0];
            $scope.selectedCategory = $scope.categories[0];
        } else {
            $scope.selectedCategory = $scope.selectedCategory;
        }
    }

    $scope.assign = function( productsSelected, supplierToClient ) {
        angular.forEach( productsSelected, function( productSelected ) {
            $scope.modified = true;
            var productIndex = $scope.products.map( function( product ) { return product._id; }).indexOf( productSelected._id );
            $scope.products[productIndex].action = 'added_modified';
            if ( supplierToClient ) {
                var client = {
                        _id            : $scope.currentClient._id,
                        productOrdered : false,
                        quantity       : 0
                };
                $scope.products[productIndex].clients.push( client );
            } else {
                var clientIndex = $scope.products[productIndex].clients.map( function( client ) { return client._id; }).indexOf( $scope.currentClient._id );
                $scope.products[productIndex].clients.splice( clientIndex, 1 );
            }
        });
    };

    // FILTER
    $scope.userFilter = function( supplier ) {
        return function( product ) {
            var itemBack = product.clients.some( function( el ) {
                return el._id === $scope.currentClient._id;
            });
            return ( supplier ? !itemBack : itemBack );
        };
    };

    $scope.saveChanges = function() {
		$( '#assignProducts #saveButton' ).button( 'loading' );
		productsService.setProducts( $scope.products )
			.then( function( data ) {
					$scope.codeAlert = '+40'; // assign products updated ok
                    $scope.products = productsService.resetProductStatus( $scope.products ); // reset .action & .selected to null
			})
			.catch( function ( err ) {
				$scope.codeAlert = '-40'; // assign products updated error
			})
			.finally( function() {
				$( '#assignProducts #saveButton' ).button( 'reset' );
			});
	};

    $scope.undoChanges = function() {
        getAllProducts();
    };

    $scope.$on( '$destroy', function() {
		if ( $scope.modified ) { // pending changes
			sharedData.setData( 'assignProductos', $scope.products );
		} else { // no pending changes
			sharedData.removeData( 'assignProductos' );
		}
        angular.element( $window ).off( 'resize' ); // unbind verticalMode event
	});

    angular.element( $window ).bind( 'resize', function() { // verticalMode event
        setVerticalMode();
        $scope.$digest();
    });

    function setVerticalMode() {
        $scope.verticalMode = ( $window.innerWidth >= 768 ) ? false : true;
    }


}
assignCtrlFn.$inject = [ '$scope', 'sharedData', 'constData', 'productsService', '$window' ];
module.exports = assignCtrlFn;
