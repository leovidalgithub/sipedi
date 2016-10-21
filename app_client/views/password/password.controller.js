function passwordCtrl( $scope, $timeout, passwordService ) {

    $scope.changePass = function() {
        if ( $scope.passwordData.new === $scope.passwordData.repeat ) {
            var passwordData = angular.copy( $scope.passwordData );
            passwordService.setNewPassword( passwordData )
                .then( function( data ) {
                    showAlertMsg( 0 ); // pass successfully changed
                })
                .catch( function( err ) {
                    if ( err.status === 402 ) { // current pass incorrect
                        showAlertMsg( 1 );
                    } else {
                        showAlertMsg( 2 ); // api problem
                    }
                });
        } else { // not passwords match
            showAlertMsg( 3 );
        }
    };

    function showAlertMsg( codeAlert ) {
        $scope.status = codeAlert;
        switch ( codeAlert ) {
            case 0 :
                $scope.errorMsg = 'Contraseña cambiada exitosamente!';
                break;
            case 1 :
                $scope.errorMsg = 'La contraseña actual no es correcta.';
                break;
            case 2 :
                $scope.errorMsg = 'Hubo un problema cambiando la contraseña.';
                break;
            case 3 :
                $scope.errorMsg = 'Las contraseñas no coinciden.';
        }

        var $errorMsg = $( '#passWord .errorAlert' );
        $errorMsg.collapse( 'show' );
        $timeout( function() {
            $errorMsg.collapse( 'hide' );
            switch ( codeAlert ) {
                case 0 :
                    $scope.passwordData = {};
                    $scope.passwordForm.$setPristine();
                    $scope.passwordForm.$setUntouched();
                    break;
                case 1 :
                case 2 :
                    default:
                        document.getElementById( 'currentPass' ).focus();
                        break;
                case 3 :
                    document.getElementById( 'newPass' ).focus();
            }
        }, 3500 );
    }

    $scope.passwordMaskToggle = function () {
        $scope.showPass = $scope.showPass ? false : true;
        var maskType = $scope.showPass ? 'text' : 'password';
        document.getElementById( 'currentPass' ).type = maskType;
        document.getElementById( 'newPass' ).type = maskType;
        document.getElementById( 'repeatPass' ).type = maskType;
    };

}
passwordCtrl.$inject = [ '$scope', '$timeout', 'passwordService' ];
module.exports = passwordCtrl;
