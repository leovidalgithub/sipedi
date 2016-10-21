function passwordServiceFn ( $q, $http, authenticationService, $rootScope ) {

		setNewPassword = function( passwordData ) {
			var token   = authenticationService.getToken(),
				userID  =  $rootScope.credentials.userLogged._id,
				defered = $q.defer(),
				promise = defered.promise;

			$http.put( '/api/users/password/', {
				token        : token,
				userID       : userID,
				passwordData : passwordData
			})
            .then( function( data ) {
				defered.resolve( data );
            })
			.catch( function ( err ) {
                console.log('service ' + err.status);
				if ( err.status == 403 ) authenticationService.logout();
				defered.reject( err );
			});
			return promise;
		};

		return {
				setNewPassword : setNewPassword
		};
}

passwordServiceFn.$inject = [ '$q', '$http', 'authenticationService', '$rootScope' ];
module.exports = passwordServiceFn;
