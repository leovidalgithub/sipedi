function modalCtrlFn( $scope, $rootScope, mainService ) {

	$scope.$parent.$parent.quantityClicked = function( $event, product ) {
		clearInterval( $scope.$parent.$parent.LoadTimerId );

		$scope.product = product;
		$scope.modalQuantityNumber = product.quantity;
		$scope.$parent.$parent.changeQuantityMode = true;
		// $event.stopPropagation()
	}

	$scope.modalSaveButton = function() {
		$scope.product.quantity = $scope.modalQuantityNumber;
		mainService.setProductQuantity( $scope.product )
			.then( function( data ) { 
				console.log( 'productQuantity set correctly' )
			})
			.catch( function( err ) {
			})
	}

	$scope.incrementButton = function() {
		$scope.modalQuantityNumber++
	}
	$scope.decrementButton = function() {
		$scope.modalQuantityNumber--
	}

	$scope.$watch('modalQuantityNumber', function() {
		if ( $scope.modalQuantityNumber > 100) $scope.modalQuantityNumber = 100;
		if ( $scope.modalQuantityNumber < 0) $scope.modalQuantityNumber = 0;
	});

	$('#myModal').on('hide.bs.modal', function ( e ) { // hidden.bs.modal fires after modal closes
		$scope.$parent.$parent.setLoadTimer();
	})

} // @end modalCtrlFn()

modalCtrlFn.$inject = [ '$scope', '$rootScope', 'mainService' ];
module.exports = modalCtrlFn;

	// OPEN MODAL EVENT
	// $('#myModal').on('show.bs.modal', function (e) {})
	// CLOSED MODAL EVENT
