function modifyProductsCtrl( $scope ) {

	$scope.$parent.$parent.stockChange = function( product ) {
		product.stock = product.stock ? false : true;
		product.action = 'modified';
	}

	$scope.$parent.$parent.editClicked = function( $event, product ) {
		// $scope.modiProductForm.$setPristine();
		// $scope.modiProductForm.$setUntouched();
		$scope.productReference = product;
		$scope.product = angular.copy( product );
		$( '#modifyProductModal' ).modal( 'show' );

	};

	$( '#modifyProductModal' ).on( 'shown.bs.modal', function () {
		$( '#modifyProductModal #productName' ).focus();
	});
	// $( '#modifyProductModal' ).on( 'hide.bs.modal', function ( $event ) {});


	$scope.$parent.$parent.modiProductOK = function() {
		$scope.productReference.product = $scope.product.product;
		$scope.productReference.stock = $scope.product.stock;
		$scope.productReference.category = $scope.product.category;
		$scope.productReference.action = 'modified';
		// $scope.$emit( 'reloadProducts');
	}

	$scope.$parent.$parent.trashClicked = function( $event, product ) {
		product.action = 'deleted';
	};

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