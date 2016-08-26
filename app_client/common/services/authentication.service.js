 (function () {

	angular
		.module( 'sipediApp' )
		.service( 'authenticationService', authenticationServiceFn );

		authenticationServiceFn.$inject = [ '$http', '$window', '$rootScope', 'jwtHelper' ];
		function authenticationServiceFn ( $http, $window, $rootScope, jwtHelper ) {

			function saveToken( token ) {
				$window.localStorage['mean-token'] = token;
				console.log( 'Token saved' );
			}

			function setCredentials(){
				$rootScope.credentials = {};
				var token = getToken();
				var tokenPayload = jwtHelper.decodeToken( token );
	
				// saving user credentials in $rootScope.credentials
				$rootScope.credentials.userID = tokenPayload._doc._id;
				$rootScope.credentials.admin = tokenPayload._doc.admin;
				$rootScope.credentials.supplier = tokenPayload._doc.supplier;
			}

			function getToken() {
				return $window.localStorage['mean-token'];
			}

			// verifies if token exists and if it has expired
			function isLoggedIn() {
				try {
					var token = getToken();
					var tokenPayload = jwtHelper.decodeToken( token );
					return !(jwtHelper.isTokenExpired( token ) );
				} catch(e) {
				}
				return false
			}

			function register( user ) {
				return $http.post( '/login/register', user )
			}

			function login( user ) {
				return $http.post( '/login', user )
			}

			function logout() {
				$window.localStorage.removeItem('mean-token');
				console.log('logout bye...')
			}

	    return {
	      saveToken : saveToken,
	      setCredentials : setCredentials,
	      getToken : getToken,
	      isLoggedIn : isLoggedIn,
	      register : register,
	      login : login,
	      logout : logout
	    };
  }

})();