var app = angular.module('mainApp', ['ngRoute', 'ngResource']).run(function($rootScope) {
  $rootScope.authenticated = false;
  $rootScope.current_user = '';
  $rootScope.message = '';
});
app.config(function($routeProvider, $locationProvider){
  $routeProvider
    //The Welcome Cards are Displayed
    .when('/', {
      templateUrl: 'partials/welcome.html',
      controller: 'mainController'
    })
    //the login display
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'authController'
    })
    //the signup display
    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'authController'
    })
    //sendSMS route
    .when('/smssend', {
      templateUrl: 'partials/sendSMS.html',
      controller: 'mainController'
    })
    .otherwise({
        redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});


app.controller('mainController', function($scope, $rootScope){

  $scope.SMS = function () {

  var accountSid = 'ACac2c80a08f5af3c721cd57508e22402c';
  var authToken = "c97605c687ac79e81f300c94ea317d40";
  var client = require('twilio')(accountSid, authToken);
  client.messages.create({
      body: "Long please?! I love you <3",
      to: "+19087529887",
      from: "+19086529320"
  }, function(err, message) {
      process.stdout.write(message.sid);
  });
};
});


app.controller('authController', function($scope, $rootScope, $http, $location, $window){
  $scope.error_message = '';
  $scope.user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  };

  $scope.register = function () {

    var req = {
      method: 'POST',
      url: '/auth/register',
      headers: {
        'Content-Type': "application/json"
      },
      data: $scope.user
    }

    $http(req).success(function (data) {
      if (data.state == 'success') {
        $scope.message = data.message;
        $location.path('/');
      }
      else {
        $scope.message = data.message.errors;
        $location.path('/register');
        $window.scrollTo(0, 0);
      }
    });
  }

  $scope.login = function () {

    var req = {
      method: 'POST',
      url: '/auth/login',
      headers: {
        'Content-Type': "application/json"
      },
      data: $scope.user
    }


    $http(req).success(function (data) {
      if (data.state == 'success') {
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user;
        $rootScope.message = '';
        $location.path('/');
      }
      else {
        $rootScope.message = data.message;
        $location.path('/login');
      }
    });
  };

});
