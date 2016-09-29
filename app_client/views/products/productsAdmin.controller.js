function productsAdminCtrl( $scope, productsService ) {

console.log('productsAdmin controller');

		productsService.getAllProductsBySupplier()
			.then( function( data ) {
				$scope.products = data.data;
				$scope.selectedCategory = $scope.products[1]; 
				console.log($scope.products);
			})
			.catch( function ( err ) {
			})


$scope.stockChange = function( product ) {
	product.stock = product.stock ? false : true;
}

$scope.editClicked = function( e, v ) {
	console.log(e);
	console.log(v);
}

}

productsAdminCtrl.$inject = [ '$scope', 'productsService' ];
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