'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')

.controller('SpotCtrl', function ($scope, $http, region, spot, SpotsService, LoginService) {
    LoadingService.show();
    console.log('SpotCtrl->region', region);
    console.log('SpotCtrl->spot', spot);
    $scope.$on('spot:toggleFavourite', function (event, data) {
	    // you could inspect the data to see if what you care about changed, or just update your own scope
        $scope.isFavourited = LoginService.isFavourited($scope.region._id, $scope.spot.name);
        LoadingService.hide();
    });
    $scope.region = region;
    $scope.spot = spot;
    $scope.spot.webcamAvailable = true;//($scope.spot.webcamURL != '');
    if ($scope.spot.webcamURL == '') {
    	 $scope.spot.webcamURL = 'http://www.wavey.co.za/img/nocam.png';
    }

    $scope.isFavourited = LoginService.isFavourited($scope.region._id, $scope.spot.name);
    console.log('$scope.isFavourited', $scope.isFavourited);
    $scope.sunRise = "...";
    $scope.sunset = "...";
    $scope.airTemp = "...";
    $scope.weatherCondition = "...";
    $scope.windSpeed = "...";
    $scope.windDirection = "...";

    $scope.swellDirection = "...";
    $scope.waterTemp = "...";
    $scope.swellPeriod = "...";
    $scope.swellHeight = "...";

    $scope.tideType1 = "...";
    $scope.tideType2 = "...";
    $scope.tideType3 = "...";
    $scope.tideType4 = "...";
    $scope.tideTime1 = "...";
    $scope.tideTime2 = "...";
    $scope.tideTime3 = "...";
    $scope.tideTime4 = "...";

    $scope.toggleFavourite = function () {
        if (!LoginService.user.isLoggedIn) {
            var alertPopup = $ionicPopup.alert({
                title: 'Want to Favourite?',
                template: 'Please Login or Signup to favourite this spot'
            });
        }
        else {
            LoadingService.show();
            LoginService.toggleFavourite($scope.region._id, $scope.spot.name);

        }
	};

    SpotsService.getMarineWeather($scope.spot).success(function (marineWeather) {
        $scope.marineWeather = marineWeather;
        // Sunrise
        $scope.sunRise = marineWeather.data.weather[0].astronomy[0].sunrise;

        // Sunset
        $scope.sunSet = marineWeather.data.weather[0].astronomy[0].sunset;

        // Air temp
        $scope.airTemp = marineWeather.data.weather[0].hourly[0].tempC;

        // Weather conditions
        $scope.weatherCondition = marineWeather.data.weather[0].hourly[0].weatherDesc[0].value;

        // Wind speed
        $scope.windSpeed0 = marineWeather.data.weather[0].hourly[0].windspeedKmph;
        $scope.windSpeed1 = marineWeather.data.weather[0].hourly[3].windspeedKmph;
        $scope.windSpeed2 = marineWeather.data.weather[0].hourly[6].windspeedKmph;
        $scope.windSpeed3 = marineWeather.data.weather[0].hourly[0].windspeedKmph;
        $scope.windSpeed4 = marineWeather.data.weather[0].hourly[0].windspeedKmph;

        // Wind direction
        $scope.windDirection0 = marineWeather.data.weather[0].hourly[0].winddir16Point;
        $scope.windDirection1 = marineWeather.data.weather[0].hourly[3].winddir16Point;
        $scope.windDirection2 = marineWeather.data.weather[0].hourly[6].winddir16Point;
        $scope.windDirection3 = marineWeather.data.weather[0].hourly[0].winddir16Point;
        $scope.windDirection4 = marineWeather.data.weather[0].hourly[0].winddir16Point;

        // Swell direction
        $scope.swellDirection0 = marineWeather.data.weather[0].hourly[0].swellDir16Point;
        $scope.swellDirection1 = marineWeather.data.weather[0].hourly[3].swellDir16Point;
        $scope.swellDirection2 = marineWeather.data.weather[0].hourly[6].swellDir16Point;
        $scope.swellDirection3 = marineWeather.data.weather[0].hourly[0].swellDir16Point;
        $scope.swellDirection4 = marineWeather.data.weather[0].hourly[0].swellDir16Point;

        // Water temp
        $scope.waterTemp = marineWeather.data.weather[0].hourly[0].waterTemp_C;

        // Swell period
        $scope.swellPeriod0 = marineWeather.data.weather[0].hourly[0].swellPeriod_secs;
        $scope.swellPeriod1 = marineWeather.data.weather[0].hourly[0].swellPeriod_secs;
        $scope.swellPeriod2 = marineWeather.data.weather[0].hourly[0].swellPeriod_secs;
        $scope.swellPeriod3 = marineWeather.data.weather[0].hourly[0].swellPeriod_secs;
        $scope.swellPeriod4 = marineWeather.data.weather[0].hourly[0].swellPeriod_secs;

        // Swell height
        $scope.swellHeight0 = marineWeather.data.weather[0].hourly[0].swellHeight_m;
        $scope.swellHeight1 = marineWeather.data.weather[0].hourly[3].swellHeight_m;
        $scope.swellHeight2 = marineWeather.data.weather[0].hourly[6].swellHeight_m;
        $scope.swellHeight3 = marineWeather.data.weather[0].hourly[0].swellHeight_m;
        $scope.swellHeight4 = marineWeather.data.weather[0].hourly[0].swellHeight_m;

        // Check if there is tide data
        try {
            var tideData = marineWeather.data.weather[0].tides[0].tide_data;
            $scope.tideType1 = tideData[0].tide_type;
            $scope.tideTime1 = tideData[0].tideTime;

            $scope.tideType2 = tideData[1].tide_type;
            $scope.tideTime2 = tideData[1].tideTime;

            $scope.tideType3 = tideData[2].tide_type;
            $scope.tideTime3 = tideData[2].tideTime;
            if (tideData.length > 3) {
                $scope.tideType4 = tideData[3].tide_type;
                $scope.tideTime4 = tideData[3].tideTime;
            }
            else $('#tide4').hide();
        } catch (err) {
            $('#tide1').hide();
            $('#tide2').hide();
            $('#tide3').hide();
            $('#tide4').hide();
        }

        LoadingService.hide();
    }).error(function (data) {
        LoadingService.hide();
        var alertPopup = $ionicPopup.alert({
            title: 'Oops! Problem retrieving Marine Weather',
            template: data
        });
    });
});
