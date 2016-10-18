var socketService = require( '../../../sockets' );

module.exports.disconnet = function( req, res ) {
    var _id = req.params._id;
    socketService.disconnectClient( _id );
    res.end();
};
module.exports.list = function( req, res ) {
    socketService.list();
    res.end();
};
