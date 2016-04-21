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
  $scope.facebook = function () {
    $http({
      method:'post',
      url:'/auth/facebook',
      data:$scope.user
    }).success(function (data) {
      console.log(data)
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

app.controller('facebookController', function($scope, ezfb, $window, $location) {

  updateLoginStatus(updateApiMe);

  $scope.login = function () {
    /**
     * Calling FB.login with required permissions specified
     * https://developers.facebook.com/docs/reference/javascript/FB.login/v2.0
     */
    ezfb.login(function (res) {
      /**
       * no manual $scope.$apply, I got that handled
       */
      if (res.authResponse) {
        updateLoginStatus(updateApiMe);
      }
    }, {scope: 'email,user_likes'});
  };

  $scope.logout = function () {
    /**
     * Calling FB.logout
     * https://developers.facebook.com/docs/reference/javascript/FB.logout
     */
    ezfb.logout(function () {
      updateLoginStatus(updateApiMe);
    });
  };

  $scope.share = function () {
    ezfb.ui(
      {
        method: 'feed',
        name: 'angular-easyfb API demo',
        picture: 'http://plnkr.co/img/plunker.png',
        link: 'http://plnkr.co/edit/qclqht?p=preview',
        description: 'angular-easyfb is an AngularJS module wrapping Facebook SDK.' +
                     ' Facebook integration in AngularJS made easy!' +
                     ' Please try it and feel free to give feedbacks.'
      },
      function (res) {
        // res: FB.ui response
      }
    );
  };

  /**
   * For generating better looking JSON results
   */
  var autoToJSON = ['loginStatus', 'apiMe'];
  angular.forEach(autoToJSON, function (varName) {
    $scope.$watch(varName, function (val) {
      $scope[varName + 'JSON'] = JSON.stringify(val, null, 2);
    }, true);
  });

  /**
   * Update loginStatus result
   */
  function updateLoginStatus (more) {
    ezfb.getLoginStatus(function (res) {
      $scope.loginStatus = res;

      (more || angular.noop)();
    });
  }

  /**
   * Update api('/me') result
   */
  function updateApiMe () {
    ezfb.api('/me', function (res) {
      $scope.apiMe = res;
    });
  }
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
    var self = this;
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
