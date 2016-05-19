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

    $scope.submit = function() {

      $location.path('/dashboard');

      return false;
    }

  });

  // .controller('LoginCtrl', function ($scope, LoginService, $state, $http) {
  //   $scope.service = LoginService;
  //
  //   $scope.login = function () {
  //       LoadingService.show();
  //       $scope.service.loginUser($scope.data.email, $scope.data.password).success(function (data) {
  //           $state.go('app.favourites');
  //       }).error(function (data) {
  //           var alertPopup = alert({
  //               title: 'Oops! Login failed',
  //               template: data
  //           });
  //       });
  //   }
  //
  // });
