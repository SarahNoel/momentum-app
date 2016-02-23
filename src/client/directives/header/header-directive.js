app.directive('headerInfo', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/header/header.html',
      controller: ['$scope', '$http', '$location', '$window', function($scope, $http, $location, $window) {

        //highlights active navbar tab
        $scope.isActive = function (viewLocation) {
          return viewLocation === $location.path();
        };


    }]
  };

});
