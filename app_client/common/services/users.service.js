function usersServiceFn ($http, $q, authenticationService, $rootScope) {

		getUsersBySupplier = function(justSupplier) { // get just supplier or clients
			const token = authenticationService.getToken();
			const supplier = $rootScope.credentials.userLogged.supplier;
			const defered = $q.defer();
			const promise = defered.promise;

			$http.defaults.headers.common['x-auth-token'] = token;

			$http.get('/api/users/' + supplier + '?justSupplier=' + justSupplier)
				.then(defered.resolve )
				.catch(function (err) {
					if (err.status == 403) authenticationService.logout();
					defered.reject(err);
				});
			return promise;
		};

		setUser = function(user, generatePassword) {
			const token = authenticationService.getToken();
			const defered = $q.defer();
			const promise = defered.promise;
			$http.defaults.headers.common['x-auth-token'] = token;

			$http.put('/api/users/', {
				user : user,
				generatePassword : generatePassword
			})
			.then(defered.resolve)
			.catch(function (err) {
				if (err.status == 403) authenticationService.logout();
				defered.reject(err);
			});
			return promise;
		};

		return {
					getUsersBySupplier : getUsersBySupplier,
					setUser            : setUser
		};
}

usersServiceFn.$inject = ['$http', '$q', 'authenticationService', '$rootScope'];
module.exports = usersServiceFn;
