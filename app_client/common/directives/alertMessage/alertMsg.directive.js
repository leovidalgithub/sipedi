function alertMsgFn ( constData ) {
    return {
        restrict: 'E',
        scope: {
            code : '='
        },
        transclude: false,
        templateUrl: 'common/directives/alertMessage/alertMsg.template.html',
        controller : function( $scope, $timeout, $window ) {
            var $alertSome = $( '#alertMessage .msgAlert' );
            $scope.$watch( 'code', function( value ) {
                if ( value !== '' ) {
                    $scope.horizontalMode = ( $window.innerWidth >= 400 ) ? true : false;
                    $scope.alertMessage = constData.getData( 'alertMessage' + $scope.code.toString() );
                    $alertSome.collapse( 'show' );
                    $timeout( function() {
                        $scope.code = '';
                        $alertSome.collapse( 'hide' );
                    }, $scope.code < 0 ? 8000 : 3000 );
                }
            });
        },
        link : function( scope, elem, attrs ) {
            scope.code = '';
        }
    };
}

alertMsgFn.$inject = [ 'constData' ];
module.exports = alertMsgFn;
