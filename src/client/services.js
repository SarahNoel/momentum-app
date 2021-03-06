//--------------FILTER FOR COMPLETE-------------------//

app.filter('doneFilter', function(){
  return function(input){
    if(input){
      var months = {'01':'January', '02':'February', '03':'March', '04':'April', '05':'May', '06':'June', '07':'July', '08': 'August', '09':'September', '10':'October', '11':'November', '12':'December'};
      var date = input.split('-');
      var monthNum = date[0];
      var day = date[1];
      var year = date[2];

      var month = months[monthNum];

      var final = month + ' ' + day + ', ' + year;

      return final;
    }
    else{
      return 'Not started yet.';
    }
  };
});


//--------------USER FACTORY-------------------//

app.factory('UserServices', ['$http', function($http){

  var currentUser = '';

  //checks for logged in user
  function isLoggedIn(){
    if(currentUser === ''){
      return false;
    }
    else{
      return true;
    }
  }

  //stores user to access from all controllers
  function storeUser(user){
    currentUser = user;
  }

  //gets user
  function getUser(){
    if(currentUser === ''){
      return false;
    }
    return currentUser;
  }

  //logout
  function logout(){
    currentUser = '';
  }

  return{
    isLoggedIn: isLoggedIn,
    storeUser: storeUser,
    getUser: getUser,
    logout: logout
  };
}]);
