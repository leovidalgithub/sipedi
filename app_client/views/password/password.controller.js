function passwordCtrl( $scope, $timeout ) {

    $scope.changePass = function() {
        if ( $scope.passwordData.new !== $scope.passwordData.repeat ) {
            $scope.errorMsg = 'Las contraseñas NUEVA y REPETIR no coinciden.';
            showErrorMsg();
        }
    };

    function showErrorMsg() {
        var $errorMsg = $( '#passWord .errorAlert' );
        $errorMsg.collapse( 'show' );
        $timeout( function() {
            $errorMsg.collapse( 'hide' );
        }, 3000 );
    }

    $scope.passwordMaskToggle = function () {
        $scope.showPass = $scope.showPass ? false : true;
        var maskType = '';
        if ( $scope.showPass ) {
            maskType = 'text';
        } else {
            maskType = 'password';
        }
        document.getElementById('currentPass').type = maskType;
        document.getElementById('newPass').type = maskType;
        document.getElementById('repeatPass').type = maskType;
    };

	// (function Init() {
	// })();

}
passwordCtrl.$inject = [ '$scope', '$timeout' ];
module.exports = passwordCtrl;
