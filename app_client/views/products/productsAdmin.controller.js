function productsAdminCtrl( $scope, productsService, sharedData ) {

	(function Init() {
		if ( sharedData.getData( 'products' ) ) {
			$scope.products = sharedData.getData( 'products' );
			$scope.categories = sharedData.getData( 'categories' );
			$scope.selectedCategory = $scope.categories[0];
		} else {
			getAllProducts();
		}
	})();

	function getAllProducts() {
		productsService.getAllProductsBySupplier()
				.then( function( data ) {
					$scope.products = data.data;
					fillCategories();
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
		// $scope.selectedCategory = $scope.selectedCategory || $scope.categories[0];
		if ( $scope.categories.indexOf( $scope.selectedCategory ) === -1 ) {
			$scope.selectedCategory = $scope.categories[0];
		} else {
			$scope.selectedCategory = $scope.selectedCategory;
		}
	};


	$scope.$watch( 'products' , function ( newVal, oldVal ) { // watch for $scope.products set and properties changes
		if ( !newVal ) return;
		// if ( !$scope.categories ) fillCategories();
		$scope.pendingChanges = $scope.products.some( function( element, index ) {
			return ( element.action != '' ); // ( element.action && element.action != '' )
		});
		$scope.productsSelected = $scope.products.filter( function ( element ) {
			return element.selected;
		}).length;
	}, true);


	$scope.saveChanges = function() {
		var productsToSend = $scope.products.filter( function( product ) {
			return ( product.action != '' )
		});
		productsService.setProducts( productsToSend )
			.then( function( data ) {
					console.log(' products correctly updated' );
					getAllProducts();
			})
			.catch( function ( err ) {
					console.log(' error updating products' );
			});
	};

	$scope.undoChanges = function() {
		getAllProducts();
	};

	(function() { // CATEGORIES ADMIN
		var tempCategory = '';
		$scope.addCategory = function () {
			$scope.category = '';
			$scope.modeCategory = 'addNew';
			$scope.openCategoriesAdmin();
		};
		$scope.editCategory = function () {
			$scope.category = angular.copy( $scope.selectedCategory );
			tempCategory = angular.copy( $scope.selectedCategory );
			$scope.modeCategory = 'edit';
			$scope.openCategoriesAdmin();
		};
		$scope.add_editCategory = function() {
			if ( $scope.modeCategory == 'addNew' ) {
				if ( categoryNotExist() ) { // adding new category
					$scope.categories.push( $scope.category.trim() );
					$scope.selectedCategory = $scope.category.trim();
				}
			} else { // changing category
				if ( categoryNotExist() ) {
					angular.forEach( $scope.products, function( element, index ) {
						if ( element.category == tempCategory ) {
							element.category = $scope.category.trim();
							element.action = 'added_modified';
						}
					});
					var indexCategory = $scope.categories.indexOf( tempCategory );
					$scope.categories[indexCategory] = $scope.category.trim(); 
					$scope.selectedCategory = $scope.category.trim();
				}
			}
			function categoryNotExist() {
				return ( $scope.categories.toString().toLowerCase().indexOf( $scope.category.trim().toLowerCase() ) === -1 );
			}
			$scope.closeCategoriesAdmin();
		};
		$scope.removeCategory = function() {
			angular.forEach( $scope.products, function( element, index ) {
				if ( element.category == $scope.selectedCategory ) {
					element.action = 'deleted';
				}
			});
			var indexCategory = $scope.categories.indexOf( $scope.selectedCategory );
			$scope.categories.splice( indexCategory, 1 );
			$scope.selectedCategory = $scope.categories[0];
		};
		$scope.openCategoriesAdmin = function () {
			$( '#productsAdmin .categoriesAdmin' ).collapse( 'show' );
			$( '#productsAdmin .categoriesAdmin input' ).focus();
		};
		$scope.closeCategoriesAdmin = function () { $( '#productsAdmin .categoriesAdmin' ).collapse( 'hide' ) };
	})();



	$scope.removeSelected = function() {
		angular.forEach( $scope.products, function( product, index ) {
			if ( product.selected ) {
				product.action = 'deleted';
				product.selected = '';
			} 
		});
	};

	$scope.$on( '$destroy', function() { // scope destroy when change route
		if ( $scope.pendingChanges ) {
			sharedData.setData( 'products', $scope.products );
			sharedData.setData( 'categories', $scope.categories );
		} else {
			sharedData.removeData( 'products' );
			sharedData.removeData( 'categories' );
		}
	});


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
