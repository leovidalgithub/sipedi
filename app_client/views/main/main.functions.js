// formatDemandDate = function () {
// 	var $demandButton  = $( '#main .demandButton button' );
// 	var demandDate     = $rootScope.credentials.current.demandDate;
// 	$scope.demandState = $rootScope.credentials.current.demandState;
// 	$scope.demandDay   = moment( demandDate ).format( 'dddd' );
// 	$scope.demandDate  = moment( demandDate ).format( 'MM Do YYYY' );
// 	$scope.demandHour  = moment( demandDate ).format( 'h:mm a' );
// 	$demandButton.removeClass( 'btn-default btn-danger btn-success' );
// 	switch ( $scope.demandState ) {
// 	    case 0:
// 	    	$scope.demandLeyend = 'HACER PEDIDO';
// 			$demandButton.addClass( 'btn-default' );
// 	        break;
// 	    case 1:
// 	    	$scope.demandLeyend = 'PEDIDO HECHO:';
// 			$demandButton.addClass( 'btn-success' );
// 	        break;
// 	    case 2:
// 	    	$scope.demandLeyend = 'PEDIDO RECIBIDO:';
// 			$demandButton.addClass( 'btn-danger' );
// 	        break;
// 	    default:
// 	}
// };


module.exports = {
	formatDemandDate : formatDemandDate
}