app.controller('createEventController', function($scope, $http, $location, $route, $rootScope) {
  $scope.newEvent = {
    id:'',
    term: "",
    location: "",
    eventUrl:''
  };
  // for local testing
  var urlBegin = 'localhost:3000/eventform/'
  // develop/heroku testng
  // var urlBegin = 'http://getfoodwithfriends.herokuapp.com/eventform/'
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
        $scope.newEvent.id = data.eventId;
        $scope.urlPath= urlBegin + data.eventUrl;
        $location.path('/newEvent');

      } else {
        $rootScope.message = data.message;
        $location.path('/newEvent');
      }
    });
  };
});
