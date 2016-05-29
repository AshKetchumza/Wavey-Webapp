(function(){
  angular.module('yapp')
  .controller('NavigationController', ['$scope', '$http', '$state',
    function($scope, $http, $state){
      $scope.logUserIn = function (){
        $http.post('api/user/login', $scope.login).success(function(res){
          localStorage.setItem('User-Data', JSON.stringify(res));
        }).error(function(error){
          console.error(error);
        });
      }
    }]);
}());
