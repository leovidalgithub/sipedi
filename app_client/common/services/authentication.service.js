 (function () {

	angular
		.module( 'sipediApp' )
		.service( 'authenticationService', authenticationServiceFn );

		authenticationServiceFn.$inject = [ '$http', '$window' ];
		function authenticationServiceFn ( $http, $window ) {

			var saveToken = function (token) {
				$window.localStorage['mean-token'] = token;
				console.log( 'Token saved' );
			}

			var getToken = function () {
				return $window.localStorage['mean-token'];
			}

			var isLoggedIn = function() {
				var token = $window.localStorage['mean-token'];
				return $http.post( '/main', { token : token } )
			}

			register = function( user ) {
				return $http.post( '/login/register', user )
			}

			login = function( user ) {
				return $http.post( '/login', user )
			}

			logout = function() {
				$window.localStorage.removeItem('mean-token');
				console.log('logout bye...')
			}

	    // var currentUser = function() {
	    //   if(isLoggedIn()){
	    //     var token = getToken();
	    //     var payload = token.split('.')[1];
	    //     payload = $window.atob(payload);
	    //     payload = JSON.parse(payload);
	    //     return {
	    //       email : payload.email,
	    //       name : payload.name
	    //     };
	    //   }
	    // };

	    return {
	      // currentUser : currentUser,
	      saveToken : saveToken,
	      getToken : getToken,
	      isLoggedIn : isLoggedIn,
	      register : register,
	      login : login,
	      logout : logout
	    };
  }

})();