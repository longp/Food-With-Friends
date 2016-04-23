
app.controller('mainController', function($scope, $rootScope, $http){
  
  $scope.sms = function(){
    var req = {
      method: 'POST',
      url: '/api/sendSMS',
      headers: {
        'Content-Type': "application/JSON"
      },
      data: $scope.number
    };
    $http(req).success(function(data){
      if (data.state === success){
        console.log(data);
      }
    });
  };
});
