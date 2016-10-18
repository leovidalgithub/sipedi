var sipediSocket,
    clients = [];

module.exports.initConnect = function ( io ) {
    sipediSocket = io.of('/sipedi');
    sipediSocket.on( 'connection', function ( socket ) {
        var _id         = socket.handshake.query.id,
            supplier   = socket.handshake.query.supplier,
            admin      = socket.handshake.query.admin,
            clientInfo = {
                socket   : socket,
                admin    : admin,
                supplier : supplier
            };

        clients[ _id ] = clientInfo;
        socket.join( supplier );
        console.log( 'CONNECT _ID ' + _id + ' / SOCKET_ID ' + socket.id + ' / SUPPLIER ' + supplier );

        socket.on( 'disconnect', function() {
            console.log('****************************');
            console.log( 'disconnect ID ' + socket.id );
            for ( var _id in clients ) {
                if ( clients[ _id ].socket.id === socket.id ) delete clients[ _id ];
            }
        });
    });
};

module.exports.sendUpdateMessage = function( admin, clientID, supplierID ) {
    if ( admin && ( clientID in clients ) ) { // send message from supplier to client
        var clientSocketID = clients[ clientID ].socket.id;
        sipediSocket.to( clientSocketID ).emit( 'socketGetUpdate' );
    } else if ( ( supplierID in clients ) ) { // send message from client to supplier
        var supplierSocketID = clients[ supplierID ].socket.id;
        sipediSocket.to( supplierSocketID ).emit( 'socketGetUpdate' );
    }
};
module.exports.sendUpdateMessageToAll = function( supplier ) {
    sipediSocket.to( supplier ).emit( 'socketGetUpdate' );
};

module.exports.disconnectClient = function( _id ) {
    clients[ _id ].socket.disconnect();
};
module.exports.list = function() {
    console.log('***********LIST*************');
    for( var _id in clients ) {
        console.log( '_id ' + _id + ' / socketID ' + clients[ _id ].socket.id );
    }
    console.log('****************************');
};
