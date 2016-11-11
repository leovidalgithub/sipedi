function usersCtrl( $scope, usersService, $timeout, sharedData, constData, $rootScope ) {

	(function Init() {
		$scope.genericLogo = constData.getData( 'genericLogo' );
		if ( sharedData.getData( 'clientsTemp' ) ) {
			var usersState       = sharedData.getData( 'clientsTemp' );
			$scope.clients       = usersState.users;
			$scope.currentClient = $scope.clients[ usersState.usersCurrentClientIndex ];
			$timeout( function() {
				$scope.userForm.$pristine = usersState.usersFormPristine;
			});
		} else {
			getUsers();
		}
	})();

	function getUsers() {
		if ( angular.isDefined( $scope.clients ) ) $scope.currentClientIndex = $scope.clients.indexOf( $scope.currentClient );
		$scope.clients = angular.copy( sharedData.getData( 'clientsMaster' ) );
		$scope.currentClient = $scope.clients[ $scope.currentClientIndex ] || $scope.clients[ 0 ];
	}

	$scope.undoChanges = function() {
		getUsers();
		$scope.userForm.$setPristine();
		$scope.userForm.$setUntouched();
		$scope.closeLogoAdmin();
	};

	$scope.saveChanges = function( generatePassword ) {
		if ( generatePassword) {
			$scope.generatePassButtonText = ' Generando...';
		} else {
			$scope.saveButtonText = ' Guardando...';
		}
		usersService.setUser( $scope.currentClient, generatePassword )
			.then( function( userUpdated ) {
				$scope.codeAlert = generatePassword ? '+21' : '+20'; // updating client info ok
				$scope.userForm.$setPristine();
				$scope.userForm.$setUntouched(); // $scope.userForm.$setValidity(name, null);
			})
			.catch( function ( err ) {
				$scope.codeAlert = generatePassword ? '-21' : '-20'; // updating client info ok
			})
			.finally( function() {
				$scope.saveButtonText = 'Guardar';
				$scope.generatePassButtonText = ' Generar contraseña';
			});
	};

	$scope.$on( '$destroy', function() { // scope destroy when change route
		if ( !$scope.userForm.$pristine ) { // pending changes
			var usersState = {
				users                   : $scope.clients,
				usersFormPristine       : $scope.userForm.$pristine,
				usersCurrentClientIndex : $scope.clients.indexOf( $scope.currentClient )
			};
			sharedData.setData( 'clientsTemp', usersState );
		} else { // no pending changes
			sharedData.removeData( 'clientsTemp' );
		}
	});

	// IMAGE ADMIN
	(function LogoAdmin() {
		document.getElementById( 'imageInput' ).addEventListener( 'change', newLogoSelected, false );
		function newLogoSelected( event ) {
			var logoSelected      = URL.createObjectURL( event.target.files[0] ),
				imageObj          = new Image(),
				logoCanvas        = document.createElement( 'canvas' );
				ctx               = logoCanvas.getContext( '2d' );
				imageObj.src      = logoSelected,
				logoCanvas.width  = 140; // RESIZE LOGO
				logoCanvas.height = 90;

			imageObj.onload = function() {
				ctx.drawImage( imageObj, 0, 0, logoCanvas.width, logoCanvas.height );
				var mydataURL = logoCanvas.toDataURL( 'image/jpeg', 1.0 );
				$scope.$apply( function () {
					$scope.logoTempSRC = mydataURL;
				});
			};
		}
		$scope.setNewLogo = function() {
			$scope.currentClient.logo = angular.copy( $scope.logoTempSRC );
			$scope.closeLogoAdmin();
			$scope.userForm.$pristine = false;
		};
		$scope.openLogoAdmin = function() {
			$scope.logoAdminOpened = true;
			$scope.logoTempSRC = angular.copy( $scope.currentClient.logo );
			$( '#usersAdmin .logoAdmin' ).collapse( 'show' );
		};
		$scope.closeLogoAdmin = function() {
			$scope.logoAdminOpened = false;
			$( '#usersAdmin .logoAdmin' ).collapse( 'hide' );
		};
	})();
}
usersCtrl.$inject = [ '$scope', 'usersService', '$timeout', 'sharedData', 'constData', '$rootScope' ];
module.exports = usersCtrl;
