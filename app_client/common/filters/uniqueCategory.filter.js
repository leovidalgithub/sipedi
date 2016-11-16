// 	function uniqueCategory() {
// 		return function( collection, keyname ) {
// 			var arr = collection.filter( function( el ) {
// 				return el.category === keyname;
// 			});
// 		return arr;
// 	};
// 	}
// module.exports = uniqueCategory;

// function uniqueCategory() {
// 	return function( collection, keyname ) {
// 		var output = [],
// 			keys   = [];
// 		angular.forEach( collection, function( item ) {
// 			var key = item[keyname];
// 			if( keys.indexOf( key ) === -1 ) {
// 				keys.push( key );
// 				output.push( item );
// 			}
// 		});
// 		return output;
// 	};
// }
// module.exports = uniqueCategory;
