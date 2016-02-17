app.controller('addNewItemCtrl', ['$scope', '$http', function($scope, $http) {

  //item form
  $scope.itemForm = {};

  //create new item function
  $scope.addItem = function(){
    var newItem = $scope.itemForm;
    //save item to database
    $http.post('/items/create', newItem)
    .then(function(data){
      $scope.itemForm = {};
    });
  };

}]);


app.controller('userItemsCtrl', ['$scope', '$http', function($scope, $http) {

  //get all items
  function getAllItems(){
    $http.get('/items/items')
    .then(function(data){
    $scope.allItems = data.data;
    });
  }

  //update streak
  $scope.doToday = function(id){
    console.log(id);
  };

  //get Items on load
  getAllItems();

}]);
