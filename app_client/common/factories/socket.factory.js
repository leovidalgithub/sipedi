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
            // var sipediSocket = io.connect( 'http://test.sipedi.net', { path:'/sipedi/socket.io', query: clientInfo } );
            // var sipediSocket = io.connect( '127.0.0.1:8080/sipedi', { query: clientInfo } );
            // var sipediSocket = io.connect( 'http://test.sipedi.net:8000/sipedi', { query: clientInfo } );
            // var sipediSocket = io.connect( '85.214.196.189:80/sipedi', { query: clientInfo } );
            // var sipediSocket = io.connect( 'http://85.214.196.189:8080/sipedi', { query: clientInfo } );
            // var sipediSocket = io.connect( 'ws://test.sipedi.net/sipedi', { query: clientInfo } );
            // var sipediSocket = io.connect( 'ws:/sipedi', { query: clientInfo } );
            // var sipediSocket = io.connect( 'ws://85.214.196.189:8000/sipedi', { query: clientInfo } );
            // console.log('socket-17');

            sipediSocket.on( 'socketGetUpdate', function() { // send to controller to update
                $rootScope.$broadcast( 'socketGetUpdate' );
            });
        },

        disconnectMe : function() {
            if ( $rootScope.credentials ) {
                var _id = $rootScope.credentials.userLogged._id;
                $http.get( '/socket/disconnet/' + _id );
            }
        },
        listConnected : function() {
            $http.get( '/socket/list/' );
        }
    };
}

socketService.$inject = [ '$rootScope', '$http' ];
module.exports = socketService;
