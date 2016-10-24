angular.module( 'sipediApp')

	.directive( 'dgwProducts', function () {
		return {
			restrict: 'E',
			scope: {
				products         : '=',
				selectedcategory : '@',
				userfilter       : '@',
				productsselected : '@',
				editone          : '&',
				disablefilter    : '='
			},
			transclude: false,
			templateUrl: 'common/directives/dgvProducts/dgvProducts.template.html',
			controller : function( $scope ) {
			},
			link : function( scope, elem, attrs ) {
				scope.mofifyGroup = attrs.mofifygroup == 'true' ? true : false;
				scope.stockChange = function( produ ) {
					produ.action = 'added_modified';
				};
			}
		}
	});
