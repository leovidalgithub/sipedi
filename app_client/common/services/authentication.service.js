function authenticationServiceFn ( $http, $window, $rootScope, jwtHelper, $location ) {

		function saveToken( token ) {
			$window.localStorage['mean-token'] = token;
			console.log( 'Token saved' );
			setCredentials( token );
		}

		function updateClientToken() {
			var token = getToken();
			var tokenPayload = jwtHelper.decodeToken( token );
			var clientId = tokenPayload._doc._id;
			return $http.get( '/login/getClientToken/' + clientId )
				.then( function( token ) {
					saveToken( token.data );
					return;
				})
		}

		function setCredentials( token ) { // get -> token & payload and set credentials 
			$rootScope.credentials = {};
			$rootScope.credentials.current = {};
			var tokenPayload = jwtHelper.decodeToken( token );
			// logged user credentials
			$rootScope.credentials.userID = tokenPayload._doc._id;
			$rootScope.credentials.name = tokenPayload._doc.name;
			$rootScope.credentials.admin = tokenPayload._doc.admin;
			$rootScope.credentials.supplier = tokenPayload._doc.supplier;
			// current client info
			$rootScope.credentials.current.clientID = tokenPayload._doc._id;
			$rootScope.credentials.current.demandState = tokenPayload._doc.demandState;
			$rootScope.credentials.current.demandDate = tokenPayload._doc.demandDate;
		}

		function isLoggedIn() {
			try {
				var token = getToken();
				var tokenPayload = jwtHelper.decodeToken( token );
				return !( jwtHelper.isTokenExpired( token ) )
			} catch( e ) {
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
			logout : logout,
			updateClientToken : updateClientToken
		}
}

authenticationServiceFn.$inject = [ '$http', '$window', '$rootScope', 'jwtHelper', '$location' ];
module.exports = authenticationServiceFn;
