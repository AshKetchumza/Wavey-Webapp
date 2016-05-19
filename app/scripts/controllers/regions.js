'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')

.controller('RegionsCtrl', function ($scope, LoginService, regions, SpotsService) {
    $scope.$on('spots:regions', function (event, data) {
        // you could inspect the data to see if what you care about changed, or just update your own scope
        $scope.regions = SpotsService.regions;
    });
    $scope.regions = regions;
});
