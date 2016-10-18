function loginCtrlFn( $location, authenticationService, $rootScope, $timeout ) {
	$rootScope.credentials = null;
	vm = this;
	vm.loginData = {};
	vm.loginData.rememberMe = false;

	(function Init() {
		var loginData = authenticationService.getLoginData();
		if ( loginData ) {
			vm.loginData = angular.copy( loginData );
		}
	})();

	vm.loginButton = function() { // ---------------- login
		authenticationService.login( vm.loginData )
			.catch( function( err ) { // login failed
				authenticationService.logout();
				var $errorMsg = $( '#login .errorAlert' );
				$errorMsg.collapse( 'show' );
				$timeout( function() {
					$errorMsg.collapse( 'hide' );
				}, 2000 );
			});
	};
}

loginCtrlFn.$inject = [ '$location', 'authenticationService', '$rootScope', '$timeout' ];
module.exports = loginCtrlFn;
