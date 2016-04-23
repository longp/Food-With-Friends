var app = angular.module('mainApp', ['ngRoute', 'ngFacebook'])

app.run(function($rootScope) {
  $rootScope.authenticated = false;
  $rootScope.current_user = '';
  $rootScope.message = '';

  // Load the facebook SDK asynchronously
  (function(){
     // If we've already installed the SDK, we're done
     if (document.getElementById('facebook-jssdk')) {return;}

     // Get the first script element, which we'll use to find the parent node
     var firstScriptElement = document.getElementsByTagName('script')[0];

     // Create a new script element and set its id
     var facebookJS = document.createElement('script');
     facebookJS.id = 'facebook-jssdk';

     // Set the new script's source to the source of the Facebook JS SDK
     facebookJS.src = '//connect.facebook.net/en_US/sdk.js';

     // Insert the Facebook JS SDK into the DOM
     firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
   }());
});



app.config(function($routeProvider, $locationProvider, $facebookProvider){
  $facebookProvider.setAppId('1702470703324769');
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
    //logout route
    .when('/logout', {
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
    .when('/event', {
      templateUrl:'partials/event.html',
      controller:'myEventController'
    })
    //form page
    .when('/form', {
      templateUrl:'partials/form.html',
      controller: 'formController'
    })
    .when('/facebook',{
      templateUrl:'partials/facebook.html',
      controller: 'facebookController'
    })
    .when('/map', {
      templateUrl:'partials/googleMap.html',
      controller: 'googleController'
    })
    //send sms
    .when('/send', {
      templateUrl: 'partials/send.html',
      controller: 'mainController'
    })
    //user account page
    .when('/myaccount', {
      templateUrl: 'partials/myaccount.html',
      controller: 'myaccountController'

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
        console.log("booyah");
        console.log(data.user)
      }
      else {
        $rootScope.message = data.message;
        $location.path('/login');
      }
    });
  };
  $scope.facebook = function () {
    $http({
      method:'post',
      url:'/auth/facebook',
      data:$scope.user
    }).success(function (data) {
      console.log(data)
    })
  }
  $scope.logout = function () {
    $http({
      method:'post',
      url:'/auth/logout',
      data:$scope.user
    }).success(function (data) {
      // $scope.user= data;
      console.log($scope.user)
    })
  }
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

app.controller('facebookController', function ($scope, $facebook)  {
  $scope.isLoggedIn = false;
  $scope.login = function() {
    $facebook.login().then(function() {
      refresh();
    });
  }
  function refresh() {
    $facebook.api("/me").then(
      function(response) {
        $scope.welcomeMsg = "Welcome " + response.name;
        $scope.isLoggedIn = true;
      },
      function(err) {
        $scope.welcomeMsg = "Please log in";
      });
  }

  refresh();
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

app.controller('myaccountController', function($http, $scope){
  console.log("suh dude");
  $scope.users = {
    firstName: '',
    lastName:''
  }

  $scope.myAccount = function(){
    $http({
      method:'POST',
      url: '/acc/myaccount',
      data:$scope.users
    }).success(function (users){
      console.log(users);
      $scope.users.firstName = users.firstName;
      $scope.users.lastName = users.lastName;
      $scope.users.createdAt = users.createdAt;
    }).catch(function(err){
      console.log(err)
    })
  }
  $scope.myAccount();
})

  app.controller('myEventController', function ($http, $scope) {
    $scope.findMyEvents = function () {
      $http({
        method:'POST',
        url: '/event/mine',
        data:$scope.search
      }).success(function (data) {
        $scope.events = data;
        console.log(data)
      })
      .catch(function (err) {
        console.log(err)
      })
    }
  })
