app.directive('userRegister', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/user-register/userRegister.html',
      controller: ['$scope', '$http', '$location', '$auth', 'UserServices', function($scope, $http, $location, $auth, UserServices) {

        $scope.userForm = {};

        //register user
        $scope.signup = function() {
          var user = {
            email: $scope.userForm.email.trim(),
            password: $scope.userForm.password.trim(),
            username: $scope.userForm.username.trim()
          };
          $auth.signup(user)
            .then(function(data){
              UserServices.storeUser(data.data.user);
              $location.path('/userItems');
            })
            .catch(function(data) {
              $scope.errorMessage = data.data.message;
            });
        };
    }]
  };

});
