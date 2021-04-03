function productsCtrl( $scope, mainService ) {

	$scope.product = {};

	$scope.$on( 'refreshProducts', function( event, clientId ) {
		// console.log(' refreshProducts calling mainService');
			mainService.getProductsByClientID( clientId )
				.then( function( data ) {
					$scope.products = data.data;
					fillCategories();
				})
				.catch( function ( err ) {
					$scope.$parent.$parent.codeAlert = '-10'; // reading db Error
				});
	});

	function fillCategories() {
		$scope.categories = [];
		$scope.products.forEach( function( product ) { $scope.categories.push( product.category ); });
		function onlyUnique( value, index, self ) { // extract unique categories
			return self.indexOf( value ) === index;
		}
		$scope.categories = $scope.categories.filter( onlyUnique );
	}

	$scope.productClicked = function( $event, product ) {
		product.productOrdered = product.productOrdered ? false : true;
		setProductOrder( product );
	};

	function setProductOrder( product ) {
		var currentUserId = $scope.$parent.currentClient._id;
		mainService.setProductOrder( currentUserId, product )
			.catch( function( err ) {
				$scope.$parent.$parent.codeAlert = '-12'; // productOrder set error
			});
	}

	$scope.quantityClicked = function( $event, product ) {
		$scope.product = product;
		$event.stopPropagation(); // prevent from productClicked()
		$( '#quantityModal' ).modal( 'show' ); // because of $event.stopPropagation()
	};

	$scope.$watch( 'product.quantity', function() {
		if ( $scope.product.quantity > 100 ) $scope.product.quantity = 100;
		if ( $scope.product.quantity < 0 ) $scope.product.quantity = 0;
	});

	$( '#quantityModal' ).on( 'hide.bs.modal', function ( $event ) { // hidden.bs.modal fires after modal closes
		setProductOrder( $scope.product );
	});

}

productsCtrl.$inject = [ '$scope', 'mainService' ];
module.exports = productsCtrl;
