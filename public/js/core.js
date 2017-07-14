//var app = angular.module('myApp', ['ui.router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngCookies','ngResource']);

/*
OLD
angular.module('todoController', [])

inject the Todo service factory into our controller
    .controller('mainController', ['$scope','$http','Todos','Workouts', function($scope, $http, Todos, Workouts) {

    }

CURRENT

 app.controller('homeCtrl',
 function ($scope, $cookies,$filter, $location,$http, loginService) {

    */
var app = angular.module('wol3', [ 'todoService', 'workoutService', 'ui.router', 'ngCookies','ngResource']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

    // HOME STATES AND NESTED VIEWS
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html'
        });
});