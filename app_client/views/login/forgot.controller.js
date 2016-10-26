function forgotCtrlFn( $scope, authenticationService, $timeout ) {

		$scope.sendEmail = function() {
            $scope.stage1 = false;
			authenticationService.forgotPassword( $scope.forgotEmail )
				.then( function( data ) {
                    success();
				})
				.catch( function( err ) {
					if ( err.status === 401 ) $scope.errorMsg = 'Se produjo un error en el proceso.';
                    if ( err.status === 402 ) $scope.errorMsg = 'El correo introducido no consta en nuestra base de datos.';
                    failure();
				})
                .finally( function() {
                    $( '#login #stage1' ).collapse( 'hide' );
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
            }, 4500 );

        }

}

forgotCtrlFn.$inject = [ '$scope', 'authenticationService', '$timeout' ];
module.exports = forgotCtrlFn;
