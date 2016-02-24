app.directive('editItem', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/edit-item/editItem.html',
      controller: ['$scope', '$http', '$filter', 'UserServices', function($scope, $http, $filter, UserServices) {

        var currentUser  = getUser();

        //gets user
        function getUser(){
          return UserServices.getUser();
        }


    }]
  };

});
