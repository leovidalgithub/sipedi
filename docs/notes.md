
Sin eliminar el supplier del objeto $scope.users:

```
	$scope.current.supplier = $scope.users.find( function( user ) { return user.admin === true });
	if ( $rootScope.credentials.admin ) { // supplier logged
		$scope.selectedClientModel = $scope.users[0].admin ? $scope.users[1] : $scope.users[0];
```


***********************************************************************************************

1. Agergar otro campo al modelo User con un segundo ACTIVE para el administrador de SIPEDI
2. Al entrar correr una función que verifique ambos ACTIVE
3. Poner un $interval de 5 minutos que lea de la API los ACTIVE del $rootScope.credentials._id y ejecute la misma función




