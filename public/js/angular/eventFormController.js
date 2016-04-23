app.controller('eventFormController', function($scope, $http, $location, $routeParams){
  $scope.eventId = $routeParams.id;
  $scope.event = {
    name: "",
    places: []
  }
  $scope.form = {
    firstPlace: "0"
  };

  $scope.$watch('$viewContentLoaded', function() {
    var req = {
      method: 'POST',
      url: '/api/eventData',
      headers: {
        'Content-Type': "application/JSON"
      },
      data: {eventUrl: $scope.eventId}
    };

    $http(req).success(function(responce){
      if (responce.state === "success"){
        $scope.event = {
          name: responce.data.name,
          places: responce.data.places
        }
      }
    });
  });

  $scope.submit = function () {
    console.log($scope.form);
  };

});
