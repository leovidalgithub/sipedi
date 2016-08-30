// app-client / common / filters / uniqueCategory.filter

function uniqueCategory() {
	return function( collection, keyname ) {

		var output = [], 
			keys   = [];

		angular.forEach( collection, function( item ) {

			var key = item[keyname];

			if( keys.indexOf( key ) === -1 ) {
				keys.push( key );
				output.push( item );
			}
		})
		return output;
		}
}

module.exports = uniqueCategory;


// // app-client / common / filters / uniqueCategory.filter
// 	angular.module( 'sipediApp' )
// 		.filter( 'uniqueCategory', function() {
// 			return function( collection, keyname ) {
// 				var output = [], 
// 					keys   = [];
// 				angular.forEach( collection, function( item ) {
// 					var key = item[keyname];
// 					if( keys.indexOf( key ) === -1 ) {
// 						keys.push( key );
// 						output.push( item );
// 					}
// 			});
// 			return output;
// 			};
// 	});
