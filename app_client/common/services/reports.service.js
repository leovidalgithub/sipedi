function reportsdServiceFn ( $q, $http, authenticationService, $rootScope ) {

		sendPDF = function( pdf, reportName, email ) {
			var token   = authenticationService.getToken(),
				defered = $q.defer(),
				promise = defered.promise;
			$http.post( '/api/reports/pdf/', {
									token      : token,
					                pdf        : pdf,
									email      : email,
									reportName : reportName
			})
            .then( function( data ) {
				defered.resolve( data );
            })
			.catch( function ( err ) {
				if ( err.status == 403 ) authenticationService.logout();
				defered.reject( err );
			});
			return promise;
		};

		setUsers = function( users ) {
			var token   = authenticationService.getToken(),
				supplier = $rootScope.credentials.userLogged.supplier,
				defered = $q.defer(),
				promise = defered.promise;
			$http.put( '/api/reports/users/', {
				token    : token,
				supplier : supplier,
				users    : users
			})
			.then( function ( data ) {
				defered.resolve( data );
			})
			.catch( function ( err ) {
				if ( err.status == 403 ) authenticationService.logout();
				defered.reject( err );
			});
			return promise;
		};

		return {
				sendPDF  : sendPDF,
				setUsers : setUsers
		};
}

reportsdServiceFn.$inject = [ '$q', '$http', 'authenticationService', '$rootScope' ];
module.exports = reportsdServiceFn;
