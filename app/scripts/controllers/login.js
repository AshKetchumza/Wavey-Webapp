'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', function($scope, $location) {

    $scope.login = function() {

      $location.path('/dashboard');

      return false;
    }

  });

  // .controller('LoginCtrl', function ($scope, LoginService, $state, $http, $location) {
  //   $scope.service = LoginService;
  //
  //   $scope.login = function () {
  //       $scope.service.loginUser($scope.data.email, $scope.data.password).success(function (data) {
  //         $location.path('/dashboard');
  //       }).error(function (data) {
  //           var alertPopup = alert({
  //               title: 'Oops! Login failed',
  //               template: data
  //           });
  //       });
  //   }
  //
  // });
