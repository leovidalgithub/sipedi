function authenticationServiceFn ( $http, $window, $rootScope, jwtHelper, $location, $route ) {

		function saveToken( token ) {
			$window.localStorage['mean-token'] = token;
			console.log( 'Token saved' );
			setCredentials( token );
		}

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
				}
			} catch( e ) {
			}
			$rootScope.credentials = null;
			return false;
		}

		function getToken() {
			return $window.localStorage['mean-token']
		}

		function login( user ) {
			return $http.post( '/login', user );
		}

		function home() {
			$route.reload();
		}

		function logout() {
			$rootScope.credentials = null;
			$window.localStorage.removeItem( 'mean-token' );
			$location.path( '/' );
			console.log( 'logout bye...' )
		}

		// register = function( user ) {
		// 	return $http.post('/login/register', user)
		// }

		return {
			saveToken : saveToken,
			setCredentials : setCredentials,
			getToken : getToken,
			isLoggedIn : isLoggedIn,
			// register : register,
			login : login,
			home : home,
			logout : logout
		}
}

authenticationServiceFn.$inject = [ '$http', '$window', '$rootScope', 'jwtHelper', '$location', '$route' ];
module.exports = authenticationServiceFn;
