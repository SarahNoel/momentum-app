app.directive('userLogin', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/user-login/userLogin.html',
      controller: ['$scope', '$http', '$location', '$window', '$rootScope', '$auth', function($scope, $http, $location, $window, $rootScope, $auth) {

        $scope.login = function() {
          var user = {
            email: $scope.userLogin.email,
            password: $scope.userLogin.password,
          };
          $auth.login(user)
            .then(function(response) {
              $window.localStorage.currentUser = JSON.stringify(response.data.user);
              $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
              UserServices.storeUser($rootScope.currentUser);
              $scope.userForm = {};
              $location.path('/userItems');

            })
            .catch(function(response) {
              if(response.data.message.email){
              $scope.errorMessage = 'Sorry, that email is not registered.';
              }
              else{
              $scope.errorMessage = 'Sorry, incorrect password.';
              }
            });
        };
    }]
  };

});
