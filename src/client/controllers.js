//----------------ADD ITEM CONTROLLER----------------\\

app.controller('addNewItemCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {

  //item form
  $scope.itemForm = {};

  //create new item function
  $scope.addItem = function(){
    var newItem = $scope.itemForm;
    newItem.created = $filter('date')(new Date(),'MM-dd-yyyy');

    //save item to database
    $http.post('/items/create', newItem)
    .then(function(data){
      $scope.itemForm = {};
    });
  };

}]);



//----------------USER CONTROLLER----------------\\
app.controller('userItemsCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {

  //get all items
  function getAllItems(){
    $http.get('/items/items')
    .then(function(data){
    $scope.allItems = data.data;
    });
  }

  //update streak
  $scope.doToday = function(id, streak){
    var today = $filter('date')(new Date(),'MM-dd-yyyy');
    var update = {'streak': streak+=1, lastDay: today};
    $http.put('/items/updateStreak/' + id, update)
    .then(function(data){
      getAllItems();
    });
  };

  //check if done today
  $scope.doneToday = function(lastDay){
    var today = $filter('date')(new Date(),'MM-dd-yyyy');
    if(lastDay === today){
      return false;
    }
    else{
      return true;
    }
  };

  //delete Item
  $scope.deleteItem = function(id){
   $http.delete('/items/delete/' + id)
    .then(function(data){
      getAllItems();
    });
  };


  //get Items on load
  getAllItems();

}]);


















