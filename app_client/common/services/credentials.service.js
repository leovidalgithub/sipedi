function credentialsServiceFn ($q, usersService, $rootScope, authenticationService, socket) {
	return {
		setCredentials : function() {
			if (!$rootScope.credentials) {
				var deferred = $q.defer();
				$rootScope.credentials = {};
				$rootScope.credentials.userLogged = authenticationService.getUserLogged();
				$rootScope.credentials.userLogged.logo = authenticationService.getUserLoggedLogo();

				usersService.getUsersBySupplier(true) // just get supplier data
					.then( function ( data ) {
						$rootScope.credentials.supplier = data.data[0];
						deferred.resolve( '' );
					})
					.catch( function( err ) {
						deferred.resolve( '' ); // if error, let's it continues anyway
					})
					.finally( socket.socketConnet() );
			return deferred.promise;
		}
		}
	};
}

credentialsServiceFn.$inject = [ '$q', 'usersService', '$rootScope', 'authenticationService', 'socket' ];
module.exports = credentialsServiceFn;
