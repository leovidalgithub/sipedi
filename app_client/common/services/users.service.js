function usersServiceFn ( $http, $q, authenticationService, $rootScope ) {

		getUsersBySupplier = function( justSupplier ) { // get just supplier or clients
			var token    = authenticationService.getToken();
			var supplier = $rootScope.credentials.userLogged.supplier;
			return $http.post( '/api/users/', {
				token        : token,
				supplier     : supplier,
				justSupplier : justSupplier
			})
			.catch( function ( err ) {
				if ( err.status == 403 ) authenticationService.logout();
			});
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
			.then( function ( data ) {
				console.log('user service OK');
				defered.resolve( data );
			})
			.catch( function ( err ) {
				console.log('user service ERR');
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
