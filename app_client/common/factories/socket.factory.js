function socketService ( $rootScope, $http ) {
    return {
        socketConnet : function() {
            var id         = $rootScope.credentials.userLogged._id,
                admin      = $rootScope.credentials.userLogged.admin,
                supplier   = $rootScope.credentials.userLogged.supplier,
                clientInfo = {
                id       : id,
                admin    : admin,
                supplier : supplier
            };
            var sipediSocket = io.connect( '/sipedi', { query: clientInfo } );

            sipediSocket.on( 'socketGetUpdate', function() { // send to controller to update
                $rootScope.$broadcast( 'socketGetUpdate' );
            });
        },
        disconnectMe : function() {
            var _id = $rootScope.credentials.userLogged._id;
            $http.get( '/socket/disconnet/' + _id );
        },
        listConnected : function() {
            $http.get( '/socket/list/' );
        }
    };
}

socketService.$inject = [ '$rootScope', '$http' ];
module.exports = socketService;
