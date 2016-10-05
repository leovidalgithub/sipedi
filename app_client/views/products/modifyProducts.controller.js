function modifyProductsCtrl( $scope, $rootScope ) {

$scope.mode;
$scope.product = {};

	$scope.$parent.$parent.editOne = function( product ) {
		$scope.mode = 'modifyOne';
		$scope.productReference = product;
		$scope.product = angular.copy( product );
		$( '#modifyProductModal' ).modal( 'show' );
	};

	$scope.$parent.$parent.editGroup = function() {
		$scope.product.category = null; // reset category
		$scope.mode = 'mofifyGroup';
		$( '#modifyProductModal' ).modal( 'show' );
	}

	$scope.$parent.$parent.newProductClicked = function() {
		function productReset() {
			$scope.mode = 'addNew';
			$scope.product.stock = true;
			$scope.product.product = '';
			$scope.product.action = 'added';
			$scope.product.supplier = $rootScope.credentials.supplier;
		}
		$scope.addNewProduct = function () {
			$scope.$parent.$parent.products.push( angular.copy( $scope.product ) );
			productReset();
		}
		productReset();
		$scope.product.category = null;
		$( '#modifyProductModal' ).modal( 'show' );
	};

	$( '#modifyProductModal' ).on( 'shown.bs.modal', function () {
		$( '#modifyProductModal #productName' ).focus();
	});
	// $( '#modifyProductModal' ).on( 'hide.bs.modal', function ( $event ) {});


	$scope.modiProductOK = function() {
		if ( $scope.$parent.productsSelected ) { // setting products selected
			angular.forEach( $scope.$parent.products, function( element, index ) {
				if ( element.selected ) {
					element.category = $scope.product.category;
					element.selected = false;
					if ( element.action != 'added' ) element.action = 'modified';
				}
			});
		} else { // setting just the one product selected
			$scope.productReference.product = $scope.product.product;
			$scope.productReference.stock = $scope.product.stock;
			$scope.productReference.category = $scope.product.category;
			if ( $scope.productReference.action != 'added' ) $scope.productReference.action = 'modified';
		}
		$( '#modifyProductModal' ).modal( 'hide' );
	}

}

modifyProductsCtrl.$inject = [ '$scope', '$rootScope' ];
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