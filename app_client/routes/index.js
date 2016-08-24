(function () {

  function config ( $routeProvider, $locationProvider ) {
    $routeProvider
      .when('/', {
        templateUrl: 'login/login.view.html',
        controller: 'login.controller'
        // controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: 'login/login.view.html',
        controller: 'login.controller'
        // controllerAs: 'vm'
      })
      .when('/main', {
        templateUrl: '/main/main.view.html',
        controller: 'main.controller'
        // controllerAs: 'vm'
      })
      // .when('/profile', {
      //   templateUrl: '/profile/profile.view.html',
      //   controller: 'profileCtrl',
      //   controllerAs: 'vm'
      // })
      .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    // $locationProvider.html5Mode(true);
  }

    function run( $rootScope, $location, authentication ) {
      $rootScope.$on( '$routeChangeStart', function( event, nextRoute, currentRoute ) {
        // console.log('RUN ' + nextRoute);
        // console.log('RUN ' + currentRoute);
        // if ( $location.path() === '/main' && !authentication.isLoggedIn()) {
        //   $location.path('/');
        // }
          if ( $location.path() === '/main' ) {
            authentication.isLoggedIn()
              .then( function() {})
              .catch( function() {
                console.log( 'No vas pal baile' );
                  $location.path('/');
              })
          }
      });
    }
  
  angular
    .module('sipediApp')
    .config(['$routeProvider', '$locationProvider', config])
    .run(['$rootScope', '$location', 'authentication', run]);

})();