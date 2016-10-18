function authenticationServiceFn ( $http, socket, $window, $rootScope, jwtHelper, $location, $route, sharedData ) {

		function saveToken( token ) {
			$window.localStorage['mean-token'] = token;
			console.log( 'Token saved' );
		}

		function getUserLogged() {
			var token = getToken();
			return jwtHelper.decodeToken( token )._doc;
		}

		function isLoggedIn() {
			try {
				var token = getToken();
				if ( !jwtHelper.isTokenExpired( token ) ) { // token up-to-date
					return true;
				}
			} catch( e ) {
			}
			logout();
			return false;
		}

		function getToken() {
			return $window.localStorage['mean-token'];
		}

		function login( user ) {
			return $http.post( '/login', user );
		}

		function home() {
			$route.reload();
		}

		function logout() {
			socket.disconnectMe();
			$rootScope.credentials = null;
			sharedData.removeAll();
			$window.localStorage.removeItem( 'mean-token' );
			$location.path( '/' );
			console.log( 'logout bye...' );
		}

		return {
			saveToken : saveToken,
			getToken : getToken,
			getUserLogged : getUserLogged,
			isLoggedIn : isLoggedIn,
			login : login,
			home : home,
			logout : logout
		};
}

authenticationServiceFn.$inject = [ '$http', 'socket', '$window', '$rootScope', 'jwtHelper', '$location', '$route', 'sharedData' ];
module.exports = authenticationServiceFn;
