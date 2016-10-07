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
		if ( $scope.categories.indexOf( $scope.selectedCategory ) === -1 ) { // $scope.selectedCategory = $scope.selectedCategory || $scope.categories[0];
			$scope.selectedCategory = $scope.categories[0];
		} else {
			$scope.selectedCategory = $scope.selectedCategory;
		}
	};

	$scope.$watch( 'products' , function ( newVal, oldVal ) { // watch for $scope.products set and properties changes
		if ( !newVal ) return;
		$scope.pendingChanges = $scope.products.some( function( element, index ) {
			return ( element.action != '' ); // ( element.action && element.action != '' )
		});
		$scope.productsSelected = $scope.products.filter( function ( element ) {
			return element.selected;
		}).length;
	}, true );

	$scope.saveChanges = function() {
		$( '#saveButton' ).button( 'loading' );
		var productsToSend = $scope.products.filter( function( product ) {
			return ( product.action != '' )
		});
		productsService.setProducts( productsToSend )
			.then( function( data ) {
					console.log(' products correctly updated' );
					getAllProducts();
					$( '#saveButton' ).button( 'reset' );
			})
			.catch( function ( err ) {
					console.log(' error updating products' );
					$( '#saveButton' ).button( 'reset' );
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
			$scope.category  = angular.copy( $scope.selectedCategory );
			tempCategory     = angular.copy( $scope.selectedCategory );
			$scope.modeCategory = 'edit';
			$scope.openCategoriesAdmin();
		};
		$scope.add_editCategory = function() {
			$scope.category = $scope.category.trim();
			if ( $scope.modeCategory == 'addNew' ) { // adding new category
				if ( !categoryExist() ) {
					$scope.categories.push( $scope.category );
					$scope.selectedCategory = $scope.category;
				};
			} else { // changing category
				if ( !categoryExist() ) {
					angular.forEach( $scope.products, function( element ) {
						if ( element.category == tempCategory ) {
							element.category = $scope.category;
							element.action = 'added_modified';
						}
					});
					var indexCategory = $scope.categories.indexOf( tempCategory );
					$scope.categories[indexCategory] = $scope.category; 
					$scope.selectedCategory = $scope.category;
				}
			};
			function categoryExist() {
				return $scope.categories.some( function( catego ) {
					return ( catego.toLowerCase() == $scope.category.toLowerCase() );
				});
			};
			$scope.closeCategoriesAdmin();
		};
		$scope.removeCategory = function() {
			angular.forEach( $scope.products, function( element ) {
				if ( element.category == $scope.selectedCategory ) {
					element.action = 'deleted';
				};
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

	// $scope.$watch( function( $scope ) { // just watch for $scope.products.action
	// 	if ( !$scope.products ) return;
	// 	return $scope.products.map( function( obj ) { return obj.action } );
	// 	}, function ( newVal, oldVal ) {
	// 		if ( !newVal ) return;
	// 		$scope.pendingChanges = $scope.products.some( function( element, index ) {
	// 			return ( element.action && element.action != '' );
	// 		});
	// }, true);
