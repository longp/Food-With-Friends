
app.controller('mainController', function($scope, $rootScope, $http){

  $scope.submitted=false;

  $scope.sms = function(){
    var req = {
      method: 'POST',
      url: '/api/sendSMS',
      headers: {
        'Content-Type': "application/JSON"
      },
      data: {
        number: $scope.number,
        url: $rootScope.urlPath
      }
    };
    $http(req).success(function(data){
      if (data.state === "success"){
        $scope.submitted=true;
        console.log(data);
      }
    });
  };
});
