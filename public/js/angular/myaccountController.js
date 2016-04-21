app.controller('myaccountController', function($http, $scope){
  console.log("suh dude");

  $scope.myAccount = function(){
    $http({
      method:'GET',
      url: '/myaccount'
    }).success(function (data){
      console.log(data);
    }).catch(function(err){
      console.log(err)
    })
  }
  $scope.myAccount();
})
