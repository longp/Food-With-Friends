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
    .otherwise({
        redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});


app.controller('mainController', function($scope, $rootScope){


});

app.controller('authController', function($scope, $rootScope, $http, $location){
  // $scope.user = {username: '', password: ''};
  // $scope.error_message = '';

  // $scope.login = function () {
  //   console.log($scope.user);
  //   $http.post("/login", $scope.user).success(function(data){
  //     if(data.state == 'success'){
  //       $rootScope.authenticated = true;
  //       $rootScope.current_user = data.user.username;
  //       $location.path('/');
  //     }
  //     else{
  //       $scope.error_message = data.message;
  //       $location.path('/login');
  //     }
  //   });
  // }

});
