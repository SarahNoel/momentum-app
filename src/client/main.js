var app = angular.module('momentumApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html'
    })
    .when('/addNewItem', {
      templateUrl: 'partials/addNewItem.html'
    })
    .otherwise({redirectTo: '/'});
}]);