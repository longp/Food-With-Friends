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
    // yelp partial
    .when("/yelp", {
      templateUrl:'partials/yelp.html',
      controller: 'yelpController',
    })
    //send sms
    .when('/send', {
      templateUrl: 'partials/send.html',
      controller: 'mainController'

    })
    .otherwise({
        redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});

app.controller('mainController', function($scope, $rootScope, $http){

  $scope.sms = function(){
    var req = {
      method: 'POST',
      url: '/api/sendSMS',
      headers: {
        'Content-Type': "application/JSON"
      },
      data: $scope.number
    }
    $http(req).success(function(data){
      if (data.state === success){
        console.log(data);
      }
    })
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


app.controller('yelpController', function($scope, $http, $location, $route) {
  $scope.yelp = {
    term:"",
    location:"",
    restaurant: {
      name:[],
      location:[]
    }
  };
  var newArr = []


  $scope.yelpSubmit = function () {
    $http({
      method:"POST",
      url:"/yelp",
      data:$scope.yelp
    })
    .then(function(data) {
      console.log(data)
      for (i=0;i<data.data.length;i++) {
        // debugger
        // emparr.push(data.data[i].name);
        $scope.yelp.restaurant.name.push(data.data[i].name);
      }
      console.log($scope.yelp.restaurant)

      // console.log(newArr)
      //
      // $scope.yelp.restaurant = newArr;
    })
  }

})
