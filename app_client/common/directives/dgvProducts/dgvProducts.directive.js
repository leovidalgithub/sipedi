// angular.module( 'directives', [])
angular.module( 'sipediApp')

.directive('dgwProducts', function () {
    return {
        restrict: 'E',
        scope: {
            products : '=',
            selectedcategory : '@',
            userfilter : '@',
            productsselected : '@',
            editclicked : '&'
        },
        templateUrl: 'common/directives/dgvProducts/dgvProducts.template.html',
        controller : function( $scope ) {
        },
        link : function( scope, elem, attrs ) {
            scope.mofifyGroup = attrs.mofifygroup == 'true' ? true : false;

        }
    }
});
