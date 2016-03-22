var app = angular.module('momentumApp', ['ngRoute', 'satellizer'
]);

// restrict pages to logged in users
app.run(['$rootScope', '$location', '$route', 'UserServices', function ($rootScope, $location, $route, UserServices) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.access.restricted && UserServices.isLoggedIn() === false) {
      $route.reload();
      $location.path('/');
    }
  });
}]);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      access: {restricted: false}
    })
    .when('/addNewItem', {
      templateUrl: 'partials/addNewItem.html',
      access: {restricted: true}
    })
    .when('/userItems', {
      templateUrl: 'partials/userItems.html',
      access: {restricted: true}
    })
    .when('/userLogin', {
      templateUrl: 'partials/userLogin.html',
      access: {restricted: false}
    })
     .when('/userRegister', {
      templateUrl: 'partials/userRegister.html',
      access: {restricted: false}
    })
    .otherwise({redirectTo: '/'});

}]);

