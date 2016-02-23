app.directive('addNewItem', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/add-new-item/newItem.html',
      controller: ['$scope', '$http', 'UserServices', function($scope, $http, UserServices) {

      //item form
      $scope.itemForm = {};

      //create new item function
      $scope.addItem = function(){
        var newItem = $scope.itemForm;
        newItem.created = moment();
        var id = UserServices.getUser();
        var update = {'newItem':newItem, 'id':id};

        //save item to database
        $http.post('/items/create', update)
        .then(function(data){
          $scope.itemForm = {};
        });
      };


    }]
  };

});
