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
          controller: 'LoginCtrl'
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
          });

  });

  app.factory('Socket', function (socketFactory, _) {
    var socket = { rooms: [], serverSocket: undefined, socketId: undefined, clientSocket: undefined};

    socket.init = function() {
      socket.serverSocket = io.connect('http://37.139.16.48:8080/');//'http://37.139.16.48:8080/');
      socket.clientSocket = socketFactory({ ioSocket: socket.serverSocket });
      socket.clientSocket.on('connect', function() {
        socket.socketId = this.id;
      });

      socket.clientSocket.on("Message", function (data) {
        console.log('incoming message data', data);
  			var room = _.find(socket.rooms, function(r) { return r.name == data.room; });
  			if (!_.isUndefined(room)) {
  				room.messages.push(data);
  				//room.unreadMessages = true;
  			}
  		});

  		socket.clientSocket.on('chatHistory', function(data) {
  		  console.log('chatHistory', data);
  			var room = _.find(socket.rooms, function(r) { return r.name == data.room; });
  			if (!_.isUndefined(room)) {
  				room.messages = data.messages;
  			}
  		});

      socket.clientSocket.on('Rooms', function(rooms) {
        console.log('rooms', rooms);
        socket.rooms = [];
        _.each(rooms, function(r) {
          var room = new Room({name: r, clientSocket: socket.clientSocket});
          socket.rooms.push(room);
        });
      });
    };

    socket.openRoom = function(name) {
      console.log(socket.rooms);
      var room = _.find(socket.rooms, function(r) { return r.name == name; });
      if (!_.isUndefined(room)) {
        socket.clientSocket.emit('Join', room.name);
        return room;
      }
    };

    socket.userLoggedIn = function(user) {
      console.log('login->username', {username: user.username} );
      socket.clientSocket.emit('Connect', {username: user.username} );
    };

    socket.userLoggedOut = function(user) {
      console.log('logout->username', user.username);
      socket.clientSocket.emit('Leave', user.username);
    };

    return socket;
});
