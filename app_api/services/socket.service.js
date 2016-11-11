var sipediSocket,
    clients = [];

module.exports.initConnect = function ( io ) {
    sipediSocket = io.of( '/sipedi' );
    sipediSocket.on( 'connection', function ( socket ) {
        var _id        = socket.handshake.query.id,
            supplier   = socket.handshake.query.supplier,
            admin      = socket.handshake.query.admin,
            clientInfo = {
                socket   : socket,
                admin    : admin,
                supplier : supplier
            };

        clients[ _id ] = clientInfo;
        socket.join( supplier );
        console.log( '_ID ' + _id + ' /SOC_ID ' + socket.id + '/ADMIN ' + admin + ' /SUP ' + supplier );

        socket.on( 'disconnect', function() {
            console.log( '****** disconnect ID ' + socket.id + ' ******************' );
            for ( var _id in clients ) {
                if ( clients[ _id ].socket.id === socket.id ) delete clients[ _id ];
            }
        });
    });
};

module.exports.sendUpdateMessage = function( admin, clientID, supplierID ) {
    // console.log('ADMIN ' + admin + ' / clientID ' + clientID + ' / SUPID ' + supplierID);
    if ( admin && ( clientID in clients ) ) { // send message from supplier to client
        var clientSocketID = clients[ clientID ].socket.id;
        // console.log( '*/*/*/*/*/*/**/*/* emit supplier to client ' + clientSocketID );
        sipediSocket.to( clientSocketID ).emit( 'socketGetUpdate' );
    } else if ( !admin && ( supplierID in clients ) ) { // send message from client to supplier
        var supplierSocketID = clients[ supplierID ].socket.id;
        // console.log( '*/*/*/*/*/*/**/*/* emit client to supplier ' + supplierSocketID );
        sipediSocket.to( supplierSocketID ).emit( 'socketGetUpdate' );
    }
};
module.exports.sendUpdateMessageToAll = function( supplier ) {
    // console.log( '*/*/*/*/*/*/**/*/* emit to all in ' + supplier );
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
