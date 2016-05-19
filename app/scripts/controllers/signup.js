'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')

.controller('SignupCtrl', function ($scope, LoginService, $state) {
    $scope.service = LoginService;

    $scope.signup = function () {
        $scope.data.username = '';
        //$scope.data.email = '';
        $scope.data.password = '';
        $scope.data.confirmPassword = '';
        $scope.modal.show();
    };

    $scope.doSignup = function () {
        LoadingService.show();
        $scope.service.signupUser($scope.data.username, $scope.data.email, $scope.data.password, $scope.data.confirmPassword).success(function (data) {
            $scope.service.loginUser($scope.data.email, $scope.data.password);
            $scope.closeSignup();
            $scope.closeLogin();
            LoadingService.hide();
        }).error(function (data) {
            LoadingService.hide();
            var alertPopup = alert({
                title: 'Oops! Signup failed',
                template: data
            });
        });
    };

});
