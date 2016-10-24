function passwordCtrl( $scope, $timeout, passwordService ) {

     function Init() {
         formCleanUp();
     }

    $scope.changePass = function() {
        if ( $scope.passwordData.new === $scope.passwordData.repeat ) {
            $( '#passWord #saveButton' ).button( 'loading' );
            var passwordData = angular.copy( $scope.passwordData );
            passwordService.setNewPassword( passwordData )
                .then( function( data ) {
                    $scope.codeAlert = '+60'; // pass successfully changed
                    formCleanUp();
                })
                .catch( function( err ) {
                    if ( err.status === 402 ) {
                        $scope.codeAlert = '-60'; // current pass incorrect
                    } else {
                        $scope.codeAlert = '-61'; // api problem
                }
                })
                .finally( function() {
                    document.getElementById( 'currentPass' ).focus();
                    $( '#passWord #saveButton' ).button( 'reset' );
                });
        } else {
            $scope.codeAlert = '-62'; // passwords not match
            document.getElementById( 'newPass' ).focus();
        }
    };

    $scope.passwordMaskToggle = function () {
        $scope.showPass = $scope.showPass ? false : true;
        var maskType = $scope.showPass ? 'text' : 'password';
        document.getElementById( 'currentPass' ).type = maskType;
        document.getElementById( 'newPass'     ).type = maskType;
        document.getElementById( 'repeatPass'  ).type = maskType;
    };

    function formCleanUp() {
        $timeout(function(){
            $scope.passwordData = {};
            $scope.passwordForm.$setPristine();
            $scope.passwordForm.$setUntouched();
        });
    }

}
passwordCtrl.$inject = [ '$scope', '$timeout', 'passwordService' ];
module.exports = passwordCtrl;
