
var app = angular.module('mainApp', ['ngRoute']).run(function($rootScope) {
  $rootScope.authenticated = false;
  $rootScope.current_user = '';
  $rootScope.message = '';
});

app.config(function($routeProvider, $locationProvider){
  $routeProvider
    //The Welcome Cards are Displayed
    .when('/', {
      templateUrl: 'partials/welcome.html',
      controller: 'authController'
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
    // createEvent partial
    .when("/newEvent", {
      templateUrl:'partials/createEvent.html',
      controller: 'createEventController',
    })
    // //events page
    // .when('/event/:eventUrl', {
    //   templateUrl:'partials/event.html',
    //   // controller:'eventController'
    // })
    .when('/event', {
      templateUrl:'partials/event.html',
      controller:'myEventController'
    })
    //form page
    .when('/form', {
      templateUrl:'partials/form.html',
      controller: 'formController'
    } )
    //send sms
    .when('/send', {
      templateUrl: 'partials/send.html',
      controller: 'mainController'
    })
    //user account page
    .when('/myaccount', {
      templateUrl: 'partials/myaccount.html',
      controller: 'mainController'

    })
    .otherwise({
        redirectTo: '/'
    });
  $locationProvider.html5Mode(true);
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
    };
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
  };
  $scope.login = function () {
    var req = {
      method: 'POST',
      url: '/auth/login',
      headers: {
        'Content-Type': "application/json"
      },
      data: $scope.user
    };
    $http(req).success(function (data) {
      // console.log($scope.user)
      if (data.state == 'success') {
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user;
        $scope.user = data.user;
        $rootScope.message = '';
        $location.path('/');
        console.log(data.user)
      }
      else {
        $rootScope.message = data.message;
        $location.path('/login');
      }
    });
  };
});

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

  app.controller('formController', function ($http, $scope) {
    console.log('yoyo');
    $scope.form={
      term:'',
      location:''
    };
    $scope.formSubmit = function () {
      $http({
        method:'POST',
        url: '/form/form',
        data:$scope.form
      }).success(function (data) {
        console.log(data);
      })
      .catch(function (err) {
        console.log(err)
      })
    }

  })


app.controller('mainController', function($scope, $rootScope, $http){
  $scope.sms = function(){
    var req = {
      method: 'POST',
      url: '/api/sendSMS',
      headers: {
        'Content-Type': "application/JSON"
      },
      data: $scope.number
    };
    $http(req).success(function(data){
      if (data.state === success){
        console.log(data);
      }
    });
  };
});

  app.controller('myEventController', function ($http, $scope) {
    console.log('yoyo');
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
