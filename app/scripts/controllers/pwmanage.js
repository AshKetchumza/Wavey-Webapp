'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')

.controller('PasswordCtrl', function ($scope, $state, LoginService) {
    $scope.service = LoginService;

    $scope.changePassword = function () {
        $scope.modal.show();
        LoadingService.show();
        $scope.service.updatePassword($scope.data.password).success(function (data) {
            $scope.closePassword();
            $state.go('app.settings');
            LoadingService.hide();
        }).error(function (data) {
            LoadingService.hide();
            var alertPopup = alert({
                title: 'Oops!',
                template: data//'Incorrect old password!'
            });
        });
    }
});
