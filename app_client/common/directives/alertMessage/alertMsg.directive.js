function alertMsgFn ( constData ) {
    return {
        restrict: 'E',
        scope: {
            code : '='
        },
        transclude: false,
        templateUrl: 'common/directives/alertMessage/alertMsg.template.html',
        controller : function( $scope, $interval, $window ) {
            var $alertSome = $( '#alertMessage .msgAlert' );
            var promiseInterval;
            $scope.$watch( 'code', function( value ) {
                if ( value !== '' ) {
                    $interval.cancel( promiseInterval );
                    $scope.horizontalMode = ( $window.innerWidth >= 400 ) ? true : false;
                    $scope.alertMessage = constData.getData( 'alertMessage' + $scope.code.toString() );
                    $alertSome.collapse( 'show' );
                    promiseInterval = $interval( function() {
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
