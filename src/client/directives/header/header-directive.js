app.directive('headerInfo', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/header/header.html',
      controller: ['$scope', '$http', '$location', 'UserServices', function($scope, $http, $location, UserServices) {

        //highlights active navbar tab
        $scope.isActive = function (viewLocation) {
          return viewLocation === $location.path();
        };

        //checks if logged in
        $scope.isLoggedIn = function () {
          return UserServices.isLoggedIn();
        };

        //logout user
        $scope.logout = function () {
          return UserServices.logout();
        };

    }]
  };

});
