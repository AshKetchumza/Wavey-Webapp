'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')

.controller('ChatCtrl', function($scope, $timeout, $stateParams, Socket, $sce, _){

    //replaced with $scope.room.messages
    //$scope.messages = [];
    //do we really need these here?
    $scope.nickname = $stateParams.username;
    $scope.status_message = $stateParams.room + " Boardroom";

    var COLORS = ['#f44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#009688'];
    $scope.room = Socket.openRoom($stateParams.room);
    $scope.socketId = Socket.socketId;
    console.log($scope.room);
    // Socket.on("connect", function(){
    //     $scope.socketId = this.id;
    //     var data = {
    //                   message: $scope.nickname + " has joined the conversation",
    //                   sender: $scope.nickname,
    //                   socketId: $scope.socketId,
    //                   isLog: true,
    //                   color : $scope.getUsernameColor($scope.nickname)
    //                 };


    //     Socket.emit("Message", data);

    // });

    $scope.$watchCollection('room.messages', function(newValue, oldValue) {
  		// _.each($scope.room.messages, function(data) {
  		// 	data.isRead = true;
  		// });
  		// $scope.room.unreadMessages = false;
  		var start = 0;
  		var end = 0;
  		if (_.isArray(oldValue)) start = oldValue.length;
  		if (_.isArray(newValue)) end = newValue.length;
  		for(var i = start; i < end; i++) {
  		  $scope.room.messages[i].message = fillWithEmoticons($scope.room.messages[i].message);
  		  $scope.room.messages[i].message = $sce.trustAsHtml($scope.room.messages[i].message);
  		  if (_.isUndefined($scope.room.messages[i].color)) {
  		    $scope.room.messages[i].color = $scope.getUsernameColor($scope.room.messages[i].sender);
  		  }
  		}
  		console.log('message received');
  	  $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom(true);
    });

    // Socket.on("Message", function(data){

    //   data.message = fillWithEmoticons(data.message);
    //   data.message = $sce.trustAsHtml(data.message);
    //   $scope.messages.push(data);

    //   // if($scope.socketId == data.socketId)
    //   //   playAudio("audio/outgoing.mp3");
    //   // else
    //   //   playAudio("audio/incoming.mp3");

    //   $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom(true);
    // })

    var typing = false;
    var TYPING_TIMER_LENGTH = 2000;

    $scope.updateTyping = function(){
      if(!typing){
        typing = true;
        Socket.clientSocket.emit("typing", {socketId: Socket.socketId, sender: $scope.nickname});
      }

      lastTypingTime = (new Date()).getTime();

      $timeout(function(){
        var timeDiff = (new Date()).getTime() - lastTypingTime;

        if(timeDiff >= TYPING_TIMER_LENGTH && typing){
          Socket.clientSocket.emit('stop typing', {socketId: Socket.socketId, sender: $scope.nickname});
          typing = false;
        }
      }, TYPING_TIMER_LENGTH)
    }

    Socket.clientSocket.on('stop typing', function(data){
      $scope.status_message = "Welcome to";
    })

    Socket.clientSocket.on('typing', function(data){
      $scope.status_message = data.sender + " is typing...";
    })

    // var playAudio = function(src)
    // {
    //   if(ionic.Platform.isAndroid() || ionic.Platform.isIOS())
    //   {
    //     var newUrl = '';
    //     if(ionic.Platform.isAndroid()){
    //       newUrl = "/android_asset/www/" + src;
    //     }
    //     else
    //       newUrl = src;

    //     var media = new Media(newUrl, null, null, null);
    //     media.play();
    //   }
    //   else
    //   {
    //     new Audio(src).play();
    //   }
    // }

    $scope.sendMessage = function(){
      if($scope.message.length == 0)
        return;
      $scope.room.sendMessage({
        username: $scope.nickname,
        profilepic: $scope.service.user.profilepic,
        color: $scope.getUsernameColor($scope.nickname),
        message: $scope.message,
        socketId: Socket.socketId
      });
      // var newMessage = {sender:'', message:'', socketId:'', isLog:false, color:'' };
      // newMessage.sender = $scope.nickname;
      // newMessage.message = $scope.message;
      // newMessage.socketId = $scope.socketId;
      // newMessage.isLog = false;
      // newMessage.displayPicture = $scope.displayPicture;
      // newMessage.color = $scope.getUsernameColor($scope.nickname);

      // Socket.emit("Message", newMessage);

      $scope.message='';
    }

    var fillWithEmoticons = function(message)
    { //(y)
      message = message.replace(/;\)/g, "<img src='img/emoticons/1_27.png' width='20px' height='20px' />");
      message = message.replace(/\(y\)/g, "<img src='img/emoticons/1_01.png' width='20px' height='20px' />");
      message = message.replace(/O:\)/g, "<img src='img/emoticons/1_02.png' width='20px' height='20px' />");
      message = message.replace(/:3/g, "<img src='img/emoticons/1_03.png' width='20px' height='20px' />");
      message = message.replace(/o.O/g, "<img src='img/emoticons/1_04.png' width='20px' height='20px' />");
      message = message.replace(/O.o/g, "<img src='img/emoticons/1_05.png' width='20px' height='20px' />");
      message = message.replace(/:\'\(/g, "<img src='img/emoticons/1_06.png' width='20px' height='20px' />");
      message = message.replace(/3:\)/g, "<img src='img/emoticons/1_07.png' width='20px' height='20px' />");
      message = message.replace(/:\(/g, "<img src='img/emoticons/1_08.png' width='20px' height='20px' />");
      message = message.replace(/:O/g, "<img src='img/emoticons/1_09.png' width='20px' height='20px' />");
      message = message.replace(/8-\)/g, "<img src='img/emoticons/1_10.png' width='20px' height='20px' />");
      message = message.replace(/:D/g, "<img src='img/emoticons/1_11.png' width='20px' height='20px' />");
      message = message.replace(/>:\(/g, "<img src='img/emoticons/1_22.png' width='20px' height='20px' />");
      message = message.replace(/\<3/g, "<img src='img/emoticons/1_13.png' width='20px' height='20px' />");
      message = message.replace(/\^_\^/g, "<img src='img/emoticons/1_14.png' width='20px' height='20px' />");
      message = message.replace(/\:\*/g, "<img src='img/emoticons/1_15.png' width='20px' height='20px' />");
      message = message.replace(/\:v/g, "<img src='img/emoticons/1_16.png' width='20px' height='20px' />");
      message = message.replace(/\<\(\"\)/g, "<img src='img/emoticons/1_17.png' width='20px' height='20px' />");
      message = message.replace(/\:poop\:/g, "<img src='img/emoticons/1_18.png' width='20px' height='20px' />");
      message = message.replace(/\:putnam\:/g, "<img src='img/emoticons/1_19.png' width='20px' height='20px' />");
      message = message.replace(/\(\^\^\^\)/g, "<img src='img/emoticons/1_20.png' width='20px' height='20px' />");
      message = message.replace(/\:\)/g, "<img src='img/emoticons/1_21.png' width='20px' height='20px' />");
      message = message.replace(/\-\_\-/g, "<img src='img/emoticons/1_22.png' width='20px' height='20px' />");
      message = message.replace(/8\|/g, "<img src='img/emoticons/1_23.png' width='20px' height='20px' />");
      message = message.replace(/\:P/g, "<img src='img/emoticons/1_24.png' width='20px' height='20px' />");
      message = message.replace(/\:\//g, "<img src='img/emoticons/1_25.png' width='20px' height='20px' />");
      message = message.replace(/\>\:O/g, "<img src='img/emoticons/1_26.png' width='20px' height='20px' />");
      message = message.replace(/\:\|\]/g, "<img src='img/emoticons/1_28.png' width='20px' height='20px' />");
      return message;
    }

    $scope.getUsernameColor = function(username){
      var hash = 7;

      for(var i=0; i<username.length;i++)
      {
        hash = username.charCodeAt(i)+ (hash<<5) - hash;
      }

      var index = Math.abs(hash % COLORS.length);
      return COLORS[index];
    }
});
