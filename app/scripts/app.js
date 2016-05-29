'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */

 angular.module('App.filters', []).filter('dayFilter', [function(){
   return function(dayString) {
     return new Date(dayString).getDayName().substring(0,3);
  };
    }]).filter('hourFilter', [function(){
        return function(time) {
            return ((time < 1000 ? '0' : '') + time).substring(0,2) + 'h';
          }
    }]);

angular
  .module('yapp', [
    'ui.router',
    'ngAnimate',
    'App.filters'
  ])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/dashboard', '/dashboard/regions');
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/base.html'
      })
        .state('login', {
          url: '/login',
          parent: 'base',
          templateUrl: 'views/login.html',
          controller: 'NavigationController'
        })
        .state('signup', {
          url: '/signup',
          parent: 'base',
          templateUrl: 'views/signup.html',
          controller: 'SignUpController'
        })
        .state('dashboard', {
          url: '/dashboard',
          parent: 'base',
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardCtrl'
        })
          .state('regions', {
            url: '/regions',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/regions.html'
          })
          .state('mySpots', {
            url: '/mySpots',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/mySpots.html'
          })
          .state('boardroom', {
            url: '/boardroom',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/boardroom.html'
          })
          .state('settings', {
            url: '/settings',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/settings.html'
          })
          .state('news', {
            url: '/news',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/news.html'
          })
          .state('spots', {
            url: '/spots',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/spots.html'
          })
          .state('report', {
            url: '/report',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/report.html'
          })
          .state('room', {
            url: '/room',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/room.html'
          });

  });
