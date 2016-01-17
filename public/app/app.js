var myApp = angular.module('myApp', [
    'ngRoute']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $routeProvider.when('/', {templateUrl: "/partials/home", controller: "homeController"});
        $routeProvider.otherwise({redirectTo: '/'});
        
        $locationProvider.html5Mode({enabled: true, requireBase: false});
    }])