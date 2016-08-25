(function() {

	angular.module( 'sipediApp' )
	.controller( 'main.controller', mainCtrlFn );
	mainCtrlFn.$inject = [ '$scope', 'mainService', '$rootScope' ];

	function mainCtrlFn( $scope, mainService, $rootScope ) {

		mainService.getProducts()
			.then( function( data ) {
				$scope.products = data;
			})
			.catch( function ( err ) {
				console.log(err)
			})
	}

})();