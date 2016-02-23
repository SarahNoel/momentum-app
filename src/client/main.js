var app = angular.module('momentumApp', ['ngRoute', 'satellizer'
]);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html'
    })
    .when('/addNewItem', {
      templateUrl: 'partials/addNewItem.html'
    })
    .when('/userItems', {
      templateUrl: 'partials/userItems.html'
    })
    .when('/userLogin', {
      templateUrl: 'partials/userLogin.html'
    })
     .when('/userRegister', {
      templateUrl: 'partials/userRegister.html'
    })
    .otherwise({redirectTo: '/'});
}]);

