  app.controller('myEventController', function ($http, $scope) {
    console.log('yoyo');
    var self = this;
    $scope.events={
      name:'',
      places:'',
      location:'',
      friends:''
    };
    $scope.myEventSubmit = function () {
      $http({
        method:'POST',
        url: '/event/mine',
        data:$scope.events
      }).success(function (data) {
        $scope.events = data;
        // $scope.event.name= data[0].name;
        // $scope.event.places= data[0].places[0];
        // $scope.event.location= data[0].location;
        console.log($scope.events)
        // console.log(data.data);
      })
      .catch(function (err) {
        console.log(err)
      })
    }
  })
