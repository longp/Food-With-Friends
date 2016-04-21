app.controller('createEventController', function($scope, $http, $location, $route, $rootScope) {
  $scope.newEvent = {
    term: "",
    location: "",
    eventUrl:''
  };
  $scope.createEvent = function () {
    $http({
      method: "POST",
      url: "/api/createEvent",
      data: $scope.newEvent
    }).success(function (data) {
      console.log(data)
      if (data.state == 'success') {
        $rootScope.message = data.message;
        $scope.newEvent.eventUrl = data.eventUrl;
        $location.path('/newEvent');
        // $location.path('/newEvent/' +data.eventUrl);
      } else {
        $rootScope.message = data.message;
        $location.path('/newEvent');
      }
    });
  };
});
