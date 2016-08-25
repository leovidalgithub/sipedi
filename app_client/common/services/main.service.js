 (function () {

	angular
		.module( 'sipediApp' )
		.service( 'mainService', mainServiceFn );

		mainServiceFn.$inject = [ '$http', '$window', 'authenticationService' ];

		function mainServiceFn ( $http, $window, authenticationService ) {

			getProducts = function( user ) {
				var token = authenticationService.getToken();
				return $http.post( '/main', { token : token } )
			}

			return {
				getProducts : getProducts
			};
		}

})();