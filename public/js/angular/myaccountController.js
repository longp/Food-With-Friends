app.controller('myaccountController', function($http, $scope){
  console.log("suh dude");
  var self = this;
  $scope.users = {
    firstName: '',
    lastName: ''
  };
  $scope.myAccount = function(){
    $http({
      method:'GET',
      url: '/myaccount',
      data: $scope.users
    }).sucess(function (data){
      console.log($scope.users)
    }).catch(function(err){
      console.log(err)
    })
  }
})
