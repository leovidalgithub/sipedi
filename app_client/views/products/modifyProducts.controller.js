function modifyProductsCtrl( $scope ) {

	$scope.$parent.$parent.editClicked = function( product ) {
		// $scope.modiProductForm.$setPristine();
		// $scope.modiProductForm.$setUntouched();

			$scope.product = null;
		if ( $scope.$parent.productsSelected == 0 ) { // just one product selected
			$scope.productReference = product;
			$scope.product = angular.copy( product );
			// $scope.productsReference  = $scope.$parent.products.filter(function( elem ) {
				// return elem.selected;
			// });
		}

		$( '#modifyProductModal' ).modal( 'show' );

	};

	$( '#modifyProductModal' ).on( 'shown.bs.modal', function () {
		$( '#modifyProductModal #productName' ).focus();
	});
	// $( '#modifyProductModal' ).on( 'hide.bs.modal', function ( $event ) {});


	$scope.$parent.$parent.modiProductOK = function() {

		if ( $scope.$parent.productsSelected ) { // setting products selected
			angular.forEach( $scope.$parent.products, function( element, index ) {
				if ( element.selected ) {
					element.category = $scope.product.category;
					element.action = 'modified';
					element.selected = false;
				}
			});
		} else { // setting just the one product selected
			$scope.productReference.product = $scope.product.product;
			$scope.productReference.stock = $scope.product.stock;
			$scope.productReference.category = $scope.product.category;
			$scope.productReference.action = 'modified';
		}
		$( '#modifyProductModal' ).modal( 'hide' );
	}

}

modifyProductsCtrl.$inject = [ '$scope' ];
module.exports = modifyProductsCtrl;



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