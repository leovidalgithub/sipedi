function modifyProductsCtrl( $scope, $rootScope ) {

	$scope.mode = '';
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
	};

	$scope.$parent.$parent.newProductClicked = function() {
		function productReset() {
			$scope.mode = 'addNew';
			$scope.product._id = '';
			$scope.product.stock = true;
			$scope.product.product = '';
			$scope.product.clients = [];
			$scope.product.action = 'added_modified';
			$scope.product.selected = false;
			$scope.product.supplier = $rootScope.credentials.userLogged.supplier;
		}
		$scope.addNewProduct = function () {
			$scope.$parent.$parent.products.push( angular.copy( $scope.product ) );
			productReset();
		};
		productReset();
		$scope.product.category = null;
		$( '#modifyProductModal' ).modal( 'show' );
	};

	$( '#modifyProductModal' ).on( 'shown.bs.modal', function () {
		$( '#modifyProductModal #productName' ).focus();
	});
	// $( '#modifyProductModal' ).on( 'hide.bs.modal', function ( $event ) {});

	$scope.modiProductOK = function() {
		if ( $scope.mode == 'mofifyGroup' ) { // setting products selected
			angular.forEach( $scope.$parent.products, function( element, index ) {
				if ( element.selected ) {
					element.category = $scope.product.category;
					element.selected = false;
					element.action = 'added_modified'; //if ( element.action != 'added' )
				}
			});
		} else if ( $scope.mode == 'modifyOne' ) { // setting just the one product selected
			$scope.productReference.product = $scope.product.product;
			$scope.productReference.stock = $scope.product.stock;
			$scope.productReference.category = $scope.product.category;
			$scope.productReference.action = 'added_modified';
		}
		$( '#modifyProductModal' ).modal( 'hide' );
	};
}

modifyProductsCtrl.$inject = [ '$scope', '$rootScope' ];
module.exports = modifyProductsCtrl;
