var app = angular.module('mainApp', ['ngRoute' ,'ezfb']).run(function($rootScope, ezfb) {
  $rootScope.authenticated = false;
  $rootScope.current_user = '';
  $rootScope.message = '';
  ezfb.init({
    // This is my FB app id for plunker demo app
    appId: '386469651480295'
  });
});

app.config(function($routeProvider, $locationProvider, ezfbProvider){
  // Default init function

ezfbProvider.setLoadSDKFunction(function (ezfbAsyncInit) {
   ezfbAsyncInit();
 });
  ezfbProvider.setInitParams({
    // This is my FB app id for plunker demo app
    appId: '386469651480295',

    // Module default is `v2.4`.
    // If you want to use Facebook platform `v2.3`, you'll have to add the following parameter.
    // https://developers.facebook.com/docs/javascript/reference/FB.init
    version: 'v2.3'
  });

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
    }
  )
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
