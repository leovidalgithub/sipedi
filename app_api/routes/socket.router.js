var express       = require( 'express' ),
    socketRouter  = express.Router(),
    socketHandler = require( './handlers/socket.handler' );

socketRouter.get( '/disconnet/:_id', socketHandler.disconnet );
socketRouter.get( '/list/',          socketHandler.list );

module.exports = socketRouter;
