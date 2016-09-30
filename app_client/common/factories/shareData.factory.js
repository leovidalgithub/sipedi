module.exports = function () {
	var headInfo = [];
	return {
		setData: function ( key, data ) {
			headInfo[ key ] = data;
		},
		getData: function ( key ) {
			return headInfo[ key ];
		},
		removeData: function ( key ) {
			delete headInfo[ key ];
		}
	}
};
