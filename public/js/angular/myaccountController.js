app.controller('myaccountController', function($http, $scope){
  console.log("suh dude");
  $scope.users = {
    firstName: '',
    lastName:''
  }

  $scope.myAccount = function(){
    $http({
      method:'POST',
      url: '/acc/myaccount',
      data:$scope.users
    }).success(function (users){
      console.log(users);
    }).catch(function(err){
      console.log(err)
    })
  }
  $scope.myAccount();
})
