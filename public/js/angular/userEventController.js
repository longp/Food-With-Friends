app.controller('userEventController', function($http, $scope, $rootScope, $location){

  $scope.events = [];

  if (!$rootScope.authenticated) {
    $location.path('/');
  } else {
    angular.element(document).ready(function () {
      var req = {
        method: 'POST',
        url: '/api/userEvents',
        headers: {
          'Content-Type': "application/JSON"
        },
        data: {
          user: $rootScope.current_user
        }
      };
      $http(req).success(function(data){
        if (data.state === "success"){
          $scope.events = data.data;
          console.log($scope.events);
        }
      });
    });
  }

})
