function reportsCtrlFn( $scope, $rootScope, productsService, moment, usersService, reportsdService, $window ) {

    (function generateReport() {
        $scope.generateReport = function() {
            $( '#reports #generateButton' ).button( 'loading' );
            $scope.taskRunning = true;
            $scope.data = {};
            $scope.reportText = '';
            Promise.all( getDataPromises() )
                .then( function( responses ){
                    $scope.data.clients  = responses[0].data;
                    $scope.data.products = responses[1].data;
                    $scope.data.clients  = $scope.data.clients.filter( function ( client ) { // get clients on demandState 1
                        return client.demandState === 1;
                    });
                    $scope.$apply( startReport() );
                })
                .catch( function ( err ) {
                    $scope.$apply( $scope.codeAlert = '-50' ); // getting clients & products error
                    $( '#reports #generateButton' ).button( 'reset' );
                    $scope.taskRunning = false;
                });
        };

        function startReport() {
            $scope.reportDate = Date.now();
            $scope.reportText += '<div class="title"><h3>Informe de Pedidos Pendientes</h3>';
            $scope.reportText += '<code>' + moment( $scope.reportDate ).format( 'dddd MM Do YYYY / h:mm a' ) + '</code></div>';
            $scope.reportText += '<h3>' + $rootScope.credentials.userLogged.name + '</h3>';
			$scope.reportText += '<h5 class="clientsLength">Número de clientes en el informe: <span>' + $scope.data.clients.length + '</span></h5>';

            if ( !$scope.data.clients.length ) {
                $scope.reportText += '<br><h3>NO HAY DATOS PARA MOSTRAR</h3>';
                $( '#reports #generateButton' ).button( 'reset' );
                $scope.taskRunning = false;
            }

            angular.forEach( $scope.data.clients, function( client ) {
                $scope.reportText += '<div class="report">';
                $scope.reportText += '<p>****************************************************</p>';
                $scope.reportText += '<h3>' + client.name + '</h3>';
                $scope.reportText += '<code>' + moment( client.demandDate ).format( 'dddd MM Do YYYY / h:mm a' ) + '</code>';
                $scope.reportText += '<p>----------------------------------------------------</p>';
                fillProducts( client._id );
            });
        }

        function fillProducts( clientID ) {
            var products   = [],
                categories = [];
            angular.forEach( $scope.data.products, function( product ) {
                angular.forEach( product.clients, function( client ) {
                    if ( ( client._id === clientID ) && ( client.productOrdered === true ) ) {
                        products.push( { category : product.category, product : product.product, quantity : client.quantity } );
                        if ( categories.indexOf( product.category ) === -1 ) categories.push( product.category );
                    }
                });
            });
            categories.sort();
            printOut( products, categories );
        }
        function printOut( products, categories ) {
            angular.forEach( categories, function( category ) {
                $scope.reportText += '<p class="category"># ' + category + '</p>';
                $scope.reportText += '<ul>';
                angular.forEach( products, function( product ) {
                    if ( product.category === category ) {
                        $scope.reportText += '<li class="product">' + formatQuantity( product.quantity ) + ' - ' + product.product + '</li>';
                    }
                });
                $scope.reportText += '</ul>';
            });
            $scope.reportText += '</div>';
            $( '#reports #generateButton' ).button( 'reset' );
            $scope.taskRunning = false;
        }
        function getDataPromises() {
            var dataPromises = [];
            dataPromises.push( usersService.getUsersBySupplier( false ) );
            dataPromises.push( productsService.getAllProductsBySupplier() );
            return dataPromises;
        }
    })(); // @generateReport

    $scope.saveToDisk = function() {
        var doc = getPDFJsObt();
        doc.save( getReportName() + '.pdf' );
    };

    $scope.sendMail = function() {
        $scope.closeEmailInput();
        $( '#reports #sendEmailButton' ).button( 'loading' );
        $scope.taskRunning = true;
        var reportName = getReportName();
        var doc = getPDFJsObt();
        var pdf = doc.output( 'datauristring' );
        reportsdService.sendPDF( pdf, reportName, $scope.emailToSend )
            .then( function( data ) {
                $scope.codeAlert = '+51'; // send pdf email Ok
            })
            .catch( function( err ) {
                $scope.codeAlert = '-51'; // send pdf email Error
            })
            .finally( function() {
                $( '#reports #sendEmailButton' ).button( 'reset' );
                $scope.taskRunning = false;
            });
    };

    $scope.printReport = function() {
            var table = document.getElementById( 'reportBody' ).innerHTML;
            var myWindow = $window.open( '', '', 'width=800, height=600' );
            myWindow.document.write( table );
            myWindow.print();
    };

    $scope.setDemandTo2 = function() {
        $( '#reports #setDemandButton' ).button( 'loading' );
        $scope.taskRunning = true;
        angular.forEach( $scope.data.clients, function( client ) {
            client.demandDate = Date.now(); // set new Date
            client.demandState = 2;
        });
        reportsdService.setUsers( $scope.data.clients )
            .then( function( data ) {
                $scope.codeAlert = '+52'; // set demandState to 2 Ok
            })
            .catch( function( err ) {
                $scope.codeAlert = '-52'; // set demandState to 2 Error
            })
            .finally( function() {
                $( '#reports #setDemandButton' ).button( 'reset' );
                $scope.taskRunning = false;
            });
    };

    function getPDFJsObt() {
        var doc = new jsPDF( 'p','mm','a4' );
        var specialElementHandlers = {
            '#editor': function ( element, renderer ) {
                return true;
            }
        };
        doc.fromHTML( $( '#reportBody' ).html(), 15, 15, {
            'width': 170,
            'elementHandlers': specialElementHandlers
        });
        doc.setProperties( {
        title: 'Informe Pedidos Pendientes - ' + $rootScope.credentials.userLogged.name,
        // subject: 'This is it',
        author: 'SiPEDi',
        // keywords: 'pdf, javascript,generated',
        // creator: 'KRS'
        });
        return doc;
    }
    function getReportName() {
        return 'PP_' + moment( $scope.reportDate ).format( 'DDMMYYYY_HH-mm' );
    }
    function formatQuantity( quantity ) {
        quantity = quantity.toString();
        if ( quantity.length === 1 ) {
            quantity = '00' + quantity;
        } else if ( quantity.length === 2 ) {
            quantity = '0' + quantity;
        } else {
            quantity = quantity;
        }
        return quantity;
    }

    $scope.openEmailInput = function () {
        $( '#reports .emailReportSend' ).collapse( 'show' );
        $( '#reports .emailReportSend input' ).focus();
    };
    $scope.closeEmailInput = function () { $( '#reports .emailReportSend' ).collapse( 'hide' ); };

}
reportsCtrlFn.$inject = [ '$scope', '$rootScope', 'productsService', 'moment', 'usersService', 'reportsdService', '$window' ];
module.exports = reportsCtrlFn;
