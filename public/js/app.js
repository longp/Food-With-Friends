var app = angular.module('mainApp', ['ngRoute', 'ngResource']).run(function($rootScope) {
  $rootScope.authenticated = false;
  $rootScope.current_user = '';
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
    .when("/yelp", {
      templateUrl:'partials/yelp.html',
      controller: 'yelpController',
      // resolve: {
      //   yelpkey: function ($http) {
      //     return $http({
      //       method:'GET',
      //       url:'/yelpKey'
      //     })
      //       .then(function (data) {
      //         console.log(data);
      //       })
      //   }
      // }
    })
    .otherwise({
        redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});


app.controller('mainController', function($scope, $rootScope){


});

app.controller('authController', function($scope, $rootScope, $http, $location){
  $scope.error_message = '';
  $scope.user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  };

  $scope.register = function () {
    $http.post("/auth/register", $scope.user).success(function (data) {
      if(data.state == 'success') {
        $scope.message = data.message;
        $location.path('/');
      }
      else {
        $scope.message = data.message.errors;
        $location.path('/register');
      }
    });
  }

});


app.controller('yelpController', function($scope, $http, $location, $route) {
  $scope.yelp = {
    term:"",
    location:"",
  };
  $scope.yelpSubmit = function () {
    $http({
      method:"POST",
      url:"/yelp",
      data:$scope.yelp
    })
    .then(function(data) {
      console.log(data.config.data.location)
      $scope.term = data.term,
      $scope.location = data.location
    })
  }

})
