(function() {

	angular.module( 'sipediApp' )
	.controller( 'main.controller', mainCtrlFn );
	mainCtrlFn.$inject = [ '$scope', 'mainService' ];

	function mainCtrlFn( $scope, mainService ) {
		mainService.giveMeData()
			// .then( function( data ) {
				// console.log(data);
		// 			console.log('.then givemedata');
		// 		$scope.var1 = data
			// })
	}

})();