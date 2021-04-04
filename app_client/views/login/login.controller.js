function loginCtrlFn(authenticationService, $rootScope) {
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

	vm.loginButton = function() { // login button
		authenticationService.login(vm.loginData)
			.catch(function(err) { // login failed
				authenticationService.logout();
				vm.codeAlert = '-70'; // password or email wrong
			});
	}
}

loginCtrlFn.$inject = [ 'authenticationService', '$rootScope' ];
module.exports = loginCtrlFn;