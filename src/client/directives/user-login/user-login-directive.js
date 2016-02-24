app.directive('userLogin', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/user-login/userLogin.html',
      controller: ['$scope', '$http', '$location', '$window', '$rootScope', '$auth', 'UserServices', function($scope, $http, $location, $window, $rootScope, $auth, UserServices) {

        $scope.userLogin = {};

        $scope.userLogin.email = 'test@gmail.com';
        $scope.userLogin.password = '123';

        $scope.login = function() {
          var user = {
            email: $scope.userLogin.email,
            password: $scope.userLogin.password,
          };
          $auth.login(user)
            .then(function(data) {
              UserServices.storeUser(data.data.user);
              $scope.userForm = {};
              $location.path('/userItems');

            })
            .catch(function(data) {
              if(data.data.message.email){
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
