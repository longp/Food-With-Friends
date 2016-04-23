app.controller('eventFormController', function($scope, $http, $location, $routeParams){
  $scope.eventId = $routeParams.id;


  $scope.$watch('$viewContentLoaded', function() {

    $('select').material_select();

    var req = {
      method: 'POST',
      url: '/api/eventData',
      headers: {
        'Content-Type': "application/JSON"
      },
      data: {eventUrl: $scope.eventId}
    };

    $http(req).success(function(data){
      if (data.state === "success"){
        console.log(data.data);
      }
    });
  });
});
