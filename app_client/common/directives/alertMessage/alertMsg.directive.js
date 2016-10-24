function alertMsgFn ( constData ) {
    return {
        restrict: 'E',
        scope: {
            code : '='
        },
        transclude: false,
        templateUrl: 'common/directives/alertMessage/alertMsg.template.html',
        controller : function( $scope, $timeout ) {
            var $alertSome = $( '#alertMessage .msgAlert' );
            $scope.$watch( 'code', function( value ) {
                if ( value !== '' ) {
                    $scope.alertMessage = constData.getData( 'alertMessage' + $scope.code.toString() );
                    $alertSome.collapse( 'show' );
                    $timeout( function() {
                        $scope.code = '';
                        $alertSome.collapse( 'hide' );
                    }, $scope.code < 0 ? 5000 : 3000 );
                }
            });
        },
        link : function( scope, elem, attrs, $timeout ) {
            scope.code = '';
        }
    };
}

alertMsgFn.$inject = [ 'constData' ];
module.exports = alertMsgFn;
