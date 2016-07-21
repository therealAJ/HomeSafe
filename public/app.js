angular.module('myApp', [
    'ngRoute']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $routeProvider.when('/home', {templateUrl: "/partials/home", controller: "homeController"});
        $routeProvider.otherwise('/home');

        $locationProvider.html5Mode({enabled: true, requireBase: false});
    }]);