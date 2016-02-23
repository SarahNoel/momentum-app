app.directive('userRegister', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/user-register/userRegister.html',
      controller: ['$scope', '$http', '$location', '$auth', function($scope, $http, $location, $auth) {

        $scope.userForm = {};

        //register user
        $scope.signup = function() {
          var user = {
            email: $scope.userForm.email.trim(),
            password: $scope.userForm.password.trim()
          };
          $auth.signup(user)
            .then(function(data){
              $auth.login(user);
              $location.path('/userItems');
            })
            .catch(function(data) {
              $scope.errorMessage = data.data.message;
            });
        };
    }]
  };

});
