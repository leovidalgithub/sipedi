function productsAdminCtrl( $scope, productsService, sharedData ) {

	(function Init() {
		if ( sharedData.getData( 'products' ) ) {
			$scope.products = sharedData.getData( 'products' );
		} else {
			getAllProducts();
		}
	})();

	function getAllProducts() {
		productsService.getAllProductsBySupplier()
				.then( function( data ) {
					$scope.products = data.data;
				})
				.catch( function ( err ) {
				});
	};

	function fillCategories() {
		$scope.categories = [];
		$scope.products.forEach( function( product ) { $scope.categories.push( product.category ) });
		function onlyUnique( value, index, self ) { // extract unique categories
			return self.indexOf( value ) === index;
		}
		$scope.categories = $scope.categories.filter( onlyUnique );
		$scope.selectedCategory = $scope.selectedCategory || $scope.categories[0];
	};


	$scope.$watch( 'products' , function ( newVal, oldVal ) { // watch for $scope.products set and properties changes
		if ( !newVal ) return;
		if ( !$scope.categories ) fillCategories();
		$scope.pendingChanges = $scope.products.some( function( element, index ) {
			return ( element.action && element.action != '' );
		});
		$scope.productsSelected = $scope.products.filter( function ( element ) {
			return element.selected;
		}).length;
	}, true);

	$scope.saveChanges = function() {
		// mandar a guardar API
		// getAllProducts();
	}

	$scope.undoChanges = function() {
		getAllProducts();
	}

	$scope.removeSelected = function() {
		angular.forEach( $scope.products, function( product, index ) {
			if ( product.selected ) {
				product.action = 'deleted';
				product.selected = '';
			} 
		});

	}

	$scope.$on( '$destroy', function() { // scope destroy when change route
		if ( $scope.pendingChanges ) {
			sharedData.setData( 'products', $scope.products );
		} else {
			sharedData.removeData( 'products' );
		}
	})


// *********************** TESTING *
// $scope.fn1 = function() {};

}

productsAdminCtrl.$inject = [ '$scope', 'productsService', 'sharedData' ];
module.exports = productsAdminCtrl;



// <button type="button" id="myButton" data-loading-text="Loading..." class="btn btn-primary" autocomplete="off">
//   Loading state
// </button>
// <script>
//   $('#myButton').on('click', function () {
//     var $btn = $(this).button('loading')
//     // business logic...
//     $btn.button('reset')
//   })
// </script>

	// $scope.$watch( function( $scope ) { // just watch for $scope.products.action
	// 	if ( !$scope.products ) return;
	// 	return $scope.products.map( function( obj ) { return obj.action } );
	// 	}, function ( newVal, oldVal ) {
	// 		if ( !newVal ) return;
	// 		$scope.pendingChanges = $scope.products.some( function( element, index ) {
	// 			return ( element.action && element.action != '' );
	// 		});
	// }, true);
