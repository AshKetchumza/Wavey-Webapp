'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')

.controller('FavouritesCtrl', function ($scope, LoginService, SpotsService, $filter, _) {
    $scope.spots = [];

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $scope.refresh();
    });

     $scope.refresh = function () {
       $scope.spots = [];
       _.each(LoginService.user.favourites, function(f) {
          var region = _.find(SpotsService.regions, function(r) { return r._id == f.region; });
          var spot = _.find(region.spots, function(s) { return s.name == f.name; });
          $scope.spots.push({ region: region._id, name: spot.name });
       });
     };

     $scope.refresh();

});
