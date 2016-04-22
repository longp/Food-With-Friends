app.controller('eventFormController', function($scope, $http, $location, $routeParams){
  // console.log("Hello I am at the right controller!");
  $scope.eventId = $routeParams.id;
});
