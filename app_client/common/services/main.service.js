 (function () {

	angular
		.module( 'sipediApp' )
		.service( 'mainService', mainServiceFn );

		mainServiceFn.$inject = [ '$http', '$window', 'authenticationService' ];

		function mainServiceFn ( $http, $window, authenticationService ) {

			giveMeData = function( user ) {
				var token = authenticationService.getToken();
				// console.log(token);
				// return;
 				// return $http.get( '/main', { token : token } )
				$http.get( '/main', { token : token } )
					.then( function( data ) {
						console.log(data)
					})
					.catch( function ( err ) {
						console.log(err)
					})


			}

			return {
				giveMeData : giveMeData
			};
		}

})();