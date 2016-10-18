function credentialsServiceFn ( $q, usersService, $rootScope, authenticationService, socket ) {
    return {
        setCredentials : function() {
            if ( !$rootScope.credentials ) {
                var deferred = $q.defer();
                $rootScope.credentials = {};
                $rootScope.credentials.userLogged = authenticationService.getUserLogged();
                usersService.getUsersBySupplier( true ) // just get supplier data
                    .then( function ( data ) {
                        $rootScope.credentials.supplier = data.data[0];
                        socket.socketConnet();
                        deferred.resolve( '' );
                    });
               return deferred.promise;
           }
        }
    };
}

credentialsServiceFn.$inject = [ '$q', 'usersService', '$rootScope', 'authenticationService', 'socket' ];
module.exports = credentialsServiceFn;
