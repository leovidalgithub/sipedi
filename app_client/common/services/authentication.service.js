function authenticationServiceFn ( $http, $window, $rootScope, jwtHelper, $location ) {

		function saveToken( token ) {
			$window.localStorage['mean-token'] = token;
			console.log( 'Token saved' );
			setCredentials( token );
		}

		// function updateClientToken() {
		// 	var token = getToken();
		// 	var tokenPayload = jwtHelper.decodeToken( token );
		// 	var clientId = tokenPayload._doc._id;
		// 	return $http.get( '/login/getClientToken/' + clientId )
		// 		.then( function( token ) {
		// 			saveToken( token.data );
		// 			return;
		// 		})
		// }

		function setCredentials( token ) { // get -> token & payload and set credentials 
			var tokenPayload = jwtHelper.decodeToken( token );
			$rootScope.credentials = tokenPayload._doc;
		}

		function isLoggedIn() {
			try {
				var token = getToken();
				var tokenPayload = jwtHelper.decodeToken( token );
				if ( !jwtHelper.isTokenExpired( token ) ) { // token up-to-date
					setCredentials( token );
					return true;
				} else {
					return false;
				}
				// return !( jwtHelper.isTokenExpired( token ) )
			} catch( e ) {
				alert('catch');
				return false
			}
		}

		function getToken() {
			return $window.localStorage['mean-token']
		}

		function login( user ) {
			return $http.post( '/login', user )
		}

		function logout() {
			$window.localStorage.removeItem( 'mean-token' );
			$location.path( '/' );
			console.log( 'logout bye...' )
		}

		register = function( user ) {
			return $http.post('/login/register', user)
		}

		return {
			saveToken : saveToken,
			setCredentials : setCredentials,
			getToken : getToken,
			isLoggedIn : isLoggedIn,
			register : register,
			login : login,
			logout : logout
			// updateClientToken : updateClientToken
		}
}

authenticationServiceFn.$inject = [ '$http', '$window', '$rootScope', 'jwtHelper', '$location' ];
module.exports = authenticationServiceFn;
