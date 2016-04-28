// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'escala.controller', 'ordem.controller', 'ngCordova', 'ngResource', 'apoio.factory'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })
  
  .state('telaescala', {
    url: '/telaescala',
    templateUrl: 'templates/telaescala.html',
    controller: 'telaescalaCtrl'
  })

  .state('ordem', {
    url: '/ordem',
    templateUrl: 'templates/ordem.html',
    controller: 'ordemCtrl'
  })

  .state('equipe', {
    url: '/equipe',
    templateUrl: 'templates/equipe.html',
    controller: 'equipeCtrl'
  })

   .state('chefe', {
    url: '/chefe',
    templateUrl: 'templates/chefe.html',
    controller: 'chefeCtrl'
  })

   .state('vtr', {
    url: '/vtr',
    templateUrl: 'templates/vtr.html',
    controller: 'vtrCtrl'
  })

    .state('acao', {
    url: '/acao',
    templateUrl: 'templates/acao.html',
    controller: 'acaoCtrl'
  })

   .state('agente', {
    url: '/agente',
    templateUrl: 'templates/agente.html',
    controller: 'agenteCtrl'
  })

    
  $urlRouterProvider.otherwise('/login');

})

