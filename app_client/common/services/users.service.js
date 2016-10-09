function usersServiceFn ( $http, authenticationService, $rootScope ) {

		getUsersBySupplier = function() {
			var token    = authenticationService.getToken();
			var supplier = $rootScope.credentials.supplier;
			return $http.post( '/api/users/', {
				token    : token,
				supplier : supplier
			})
			.catch( function ( err ) {
				if ( err.status == 403 ) authenticationService.logout();
			});
		};

		setUser = function( user ) {
			var token    = authenticationService.getToken();
			return $http.put( '/api/users/', {
				token : token,
				user  : user
			})
			.catch( function ( err ) {
				if ( err.status == 403 ) authenticationService.logout();
			});
		};

		return {
					getUsersBySupplier : getUsersBySupplier,
					setUser           : setUser
		};
}

usersServiceFn.$inject = [ '$http', 'authenticationService', '$rootScope' ];
module.exports = usersServiceFn;
