

  app.controller('formController', function ($http) {
    console.log('yoyo');
    $http({
      method:'GET',
      url: '/api/form',
    }).success(function (data) {
      console.log(data);
      console.log('12312123datssssa');
    })
    .catch(function (err) {
      console.log(err)
    })
  })
