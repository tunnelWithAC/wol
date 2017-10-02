var app = angular.module('wol3', [ 'todoService', 'workoutService', 'ui.router', 'ngSanitize', 'ngCookies','ngResource']);

app.config(function($stateProvider, $sceDelegateProvider, $urlRouterProvider) {

  /*$sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'http://srv*.assets.example.com/**'
  ]);

  // The blacklist overrides the whitelist so the open redirect here is blocked.
  $sceDelegateProvider.resourceUrlBlacklist([
    'http://myapp.example.com/clickThru**'
  ]);*/

    $urlRouterProvider.otherwise('/home/create');

    $stateProvider
    // HOME STATES AND NESTED VIEWS
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html'
        })
        .state('home.log', {
            url: '/logs',
            templateUrl: 'templates/log.html'
        })
        .state('home.dashboard', {
            url: '/dashboard',
            templateUrl: 'templates/dashboard.html'
        })
        .state('home.create', {
            url: '/create',
            templateUrl: 'templates/create.html'
        });
});
