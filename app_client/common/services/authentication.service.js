 (function () {

  angular
    .module( 'sipediApp' )
    .service( 'authentication', authentication );

  authentication.$inject = [ '$http', '$window' ];
  function authentication ( $http, $window ) {

		var saveToken = function (token) {
			$window.localStorage['mean-token'] = token;
			console.log( 'Token saved' );
		};

		var getToken = function () {
			return $window.localStorage['mean-token'];
		};

    var isLoggedIn = function() {
				var token = $window.localStorage['mean-token'];
				return $http.post( '/main', { token : token } )
					// .then( function ( data ) {
					// 	return true
					// })
					// .catch( function ( err ) {
					// 	return false
					// })

    //   var token = getToken();
    //   var payload;

    //   if(token){
    //     payload = token.split('.')[1];
    //     payload = $window.atob(payload);
    //     payload = JSON.parse(payload);

    //     return payload.exp > Date.now() / 1000;
    //   } else {
    //     return false;
    //   }
    };

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

		register = function( user ) {
			return $http.post( '/login/register', user )
				.then( function( data ) {
					console.log( 'register - saveToken' );
					console.log( data );
					saveToken( data.token );
			});
		};

		login = function( user ) {
			return $http.post( '/login', user )
				.then( function( data ) {
					saveToken( data.data.token );
				})
				// .catch( function( err ) {
				// 		alert(err);
				// })
		}

		token = function() {
				var token = $window.localStorage['mean-token'];
				return $http.post( '/main', { token : token } )
					.then( function ( data ) {
						console.log('token ok')
					})
		}

		logout = function() {
			$window.localStorage.removeItem('mean-token');
			console.log('logout bye...')
		};

    return {
      // currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      login : login,
      logout : logout,
      token : token
    };
  }


})();