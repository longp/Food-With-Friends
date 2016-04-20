

  app.controller('formController', function () {
    console.log('yoyo')
    $http({
      method:'GET',
      url: '/api/form',
    }).success(function (data) {
      console.log('data');
    })
    .catch(function (err) {
      console.log(err)
    })
  })
