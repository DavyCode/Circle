$(document).ready(function(){
    var socket = io();

    var chatRoom = $('#groupName').val();
    var sender = $('#sender').val();


    socket.on('connect', function(){
        var params = {
              sender: sender
        };

        socket.emit('joinRequest', params, function(){
          console.log('joined')
        });
    });

    socket.on('newFriendRequest', function(friend){
      console.log(friend);
    });


    


    $('#add-friendRequest').on('submit', function(e){
      e.preventDefault();

          var receiver = $('#receiverName').val();

          $.ajax({ 
              url: '/group/'+chatRoom,
              type: 'POST',
              data: {
                receiver: receiver
              },
              success: function(){
                socket.emit('friendRequest', {
                  receiver: receiver,
                  sender: sender
                }, function(){
                  console.log('Request sent!!')
                })
              }
          });
    });


     


});

