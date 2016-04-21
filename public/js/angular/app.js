
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
      controller: 'myaccountController'

    })
    .otherwise({
        redirectTo: '/'
    });
  $locationProvider.html5Mode(true);
});
