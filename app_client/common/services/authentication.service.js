function authenticationServiceFn ( $http, socket, $window, $rootScope, jwtHelper, $location, $route, sharedData ) {

		function saveToken( token ) {
			$window.localStorage['mean-token'] = token;
		}

		function saveUserLoggedLogo(logo) {
			$window.localStorage['logo'] = logo;
		}

		function getUserLogged() {
			const token = getToken();
			return jwtHelper.decodeToken(token);
		}

		function getUserLoggedLogo() {
			return $window.localStorage['logo'];
		}

		function isLoggedIn() {
			try {
				var token = getToken();
				if ( !jwtHelper.isTokenExpired( token ) ) { // token up-to-date
					return true;
				}
			} catch( e ) { }
			logout();
			return false;
		}

		function getToken() {
			return $window.localStorage['mean-token'];
		}

		function login(loginData) {
			setLoginData(loginData);
			return $http.post('/login', loginData)
				.then(function(data) { // login Ok
					saveToken(data.data.token);
					saveUserLoggedLogo(data.data.logo);
					$location.path('/main');
				})
				.catch(function(err) {
					console.log('login error', err);
				})
				function setLoginData( loginData ) {
					if (loginData.rememberMe) {
						$window.localStorage.setItem('login-data', JSON.stringify(loginData));
					} else {
						$window.localStorage.removeItem('login-data');
					}
				}
		}

		function getLoginData() {
			return JSON.parse($window.localStorage.getItem('login-data'));
		}

		function home() {
			$location.path('/main');
			// $route.reload();
		}

		function refresh() {
			$route.reload();
		}

		function logout() {
			socket.disconnectMe();
			$rootScope.credentials = null;
			sharedData.removeAll();
			$window.localStorage.removeItem('mean-token');
			$location.path('/login');
		}

		function forgotPassword(email) {
			return $http.get('/login/forgot/' + email);
		}

		return {
			getToken          : getToken,
			getUserLogged     : getUserLogged,
			getUserLoggedLogo : getUserLoggedLogo,
			isLoggedIn        : isLoggedIn,
			login             : login,
			getLoginData      : getLoginData,
			home              : home,
			refresh           : refresh,
			logout            : logout,
			forgotPassword    : forgotPassword
		};
}

authenticationServiceFn.$inject = [ '$http', 'socket', '$window', '$rootScope', 'jwtHelper', '$location', '$route', 'sharedData' ];
module.exports = authenticationServiceFn;
