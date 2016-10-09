function productsCtrl( $scope, mainService ) {

	$scope.product = {};

	$scope.$on( 'refreshProducts', function( event, clientId ) {
		mainService.getProductsByClientID( clientId )
			.then( function( data ) {
					$scope.products = data.data;
			})
			.catch( function ( err ) {
				$scope.$parent.showErrorAlert( 'Error al intentar leer la lista de productos.' );
			})
	});

	$scope.productClicked = function( $event, product ) {
		product.productOrdered = product.productOrdered ? false : true;
		setProductOrder( product );
	};

	function setProductOrder( product ) {
		var currentUserId = $scope.$parent.userData.currentClient._id;
		mainService.setProductOrder( currentUserId, product )
			.then( function( data ) { 
				console.log( 'productOrder set correctly' );
				$scope.$parent.showSuccessAlert( 'Información de producto guardada.' );
			})
			.catch( function( err ) {
				console.log( 'ERROR setting productOrder' );
				$scope.$parent.showErrorAlert( 'Información de producto NO guardada.' );
			});
	}

	$scope.quantityClicked = function( $event, product ) {
		$scope.product = product;
		$event.stopPropagation(); // prevent from productClicked()
		$( '#quantityModal' ).modal( 'show' ); // because of $event.stopPropagation()
	}

	$scope.$watch('product.quantity', function() {
		if ( $scope.product.quantity > 100) $scope.product.quantity = 100;
		if ( $scope.product.quantity < 0) $scope.product.quantity = 0;
	});

	$( '#quantityModal' ).on( 'hide.bs.modal', function ( $event ) { // hidden.bs.modal fires after modal closes
		setProductOrder( $scope.product );
	});

}

productsCtrl.$inject = [ '$scope', 'mainService' ];
module.exports = productsCtrl;

