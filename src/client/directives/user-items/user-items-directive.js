app.directive('userItems', function(){
    return {
      restrict: 'E',
      templateUrl: 'directives/user-items/userItems.html',
      controller: ['$scope', '$http', '$filter', 'UserServices', function($scope, $http, $filter, UserServices) {

        var currentUser  = getUser();

        //gets user
        function getUser(){
          return UserServices.getUser();
        }

        //get all items
        function getAllItems(){
          //get items to filter
          $http.get('/items/items')
          .then(function(data){
            var allItems = data.data;
            //loop through all Items
            for (var i = 0; i < allItems.length; i++) {
              //if it has been done
              if(allItems[i].lastDay){
                //get day of last complete
                var lastDone = moment(allItems[i].lastDay).dayOfYear();
                //get day of today
                var today = moment().dayOfYear();
                //check for leap year
                if(today === 366){
                  today = 367;
                }
                //check for last day of year
                if(today === 1){
                  today = 366;
                }
                //check if completed within 24 hours
                if(today - lastDone > 1){
                  //if not, update streak to zero
                  $http.put('/items/resetStreak/' + allItems[i]._id)
                  .then(function(data){
                  });
                }
              }
            }
            //load all items

            $http.get('/items/items/' + currentUser._id)
            .then(function(data){
              console.log(data);
              $scope.allItems = data.data.items;
            });
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

        //get all items
        $scope.checkStreak = function(id, lastDay){
          $http.put('/items/resetStreak/' + id)
          .then(function(data){
            getAllItems();
          });
        };


        //get Items on load
        getAllItems();


    }]
  };

});
