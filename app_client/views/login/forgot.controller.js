function forgotCtrlFn( $scope, authenticationService, $timeout ) {

		$scope.sendEmail = function() {
			$scope.sendButtonText = ' Enviando...';
			authenticationService.forgotPassword( $scope.forgotEmail )
				.then( function( data ) {
                    success();
				})
				.catch( function( err ) {
					if ( err.status === 401 ) $scope.errorMsg = 'Error al intentar enviar el correo.';
                    if ( err.status === 402 ) $scope.errorMsg = 'El correo introducido no consta en nuestra base de datos.';
                    failure();
				})
                .finally( function() {
                    $( '#login #stage1' ).collapse( 'hide' );
					$scope.sendButtonText = ' Enviar';
                    $scope.stage1 = false;
                });
		};

		$( '#forgotPassword' ).on( 'shown.bs.modal', function ( $event ) { // hidden.bs.modal
            $scope.$apply( function() {
                $scope.stage1 = true;
            });
            $( '#login #stage2' ).collapse( 'hide' );
            $( '#login #stage3' ).collapse( 'hide' );
			$( '#login #stage1' ).collapse( 'show' );
			$( '#emailInput' ).focus();
		});

        function success() {
            $( '#login #stage3' ).collapse( 'show' );
        }

        function failure() {
            $( '#login #stage2' ).collapse( 'show' );
            $timeout( function() {
                $( '#login #stage2' ).collapse( 'hide' );
                $( '#login #stage1' ).collapse( 'show' );
                $scope.stage1 = true;
                $( '#emailInput' ).focus();
            }, 5000 );

        }

		$scope.closeForgotModal = function() {
			$( '#forgotPassword' ).modal( 'hide' );
		};
}

forgotCtrlFn.$inject = [ '$scope', 'authenticationService', '$timeout' ];
module.exports = forgotCtrlFn;
