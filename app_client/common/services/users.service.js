function usersServiceFn ( $http, $q, authenticationService, $rootScope ) {

		getUsersBySupplier = function( justSupplier ) { // get just supplier or clients
			var token    = authenticationService.getToken();
			var supplier = $rootScope.credentials.userLogged.supplier,
				defered = $q.defer(),
				promise = defered.promise;
			$http.post( '/api/users/', {
				token        : token,
				supplier     : supplier,
				justSupplier : justSupplier
			})
			.then( defered.resolve )
			.catch( function ( err ) {
				if ( err.status == 403 ) authenticationService.logout();
				defered.reject( err );
			});
			return promise;
		};

		setUser = function( user, generatePassword ) {
			var token   = authenticationService.getToken(),
				defered = $q.defer(),
				promise = defered.promise;
			$http.put( '/api/users/', {
				token            : token,
				user             : user,
				generatePassword : generatePassword
			})
			.then( defered.resolve )
			.catch( function ( err ) {
				if ( err.status == 403 ) authenticationService.logout();
				defered.reject( err );
			});
			return promise;
		};

		return {
					getUsersBySupplier : getUsersBySupplier,
					setUser            : setUser
		};
}

usersServiceFn.$inject = [ '$http', '$q', 'authenticationService', '$rootScope' ];
module.exports = usersServiceFn;
