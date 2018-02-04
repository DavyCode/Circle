$(document).ready(function(){
    var socket = io();

    var chatRoom = $('#groupName').val();
    var sender = $('#sender').val();

    //listen for connection
    socket.on('connect', function(){
         console.log('New user connection');

         var params = {
           room: chatRoom
         }

         //emit join message to a group
         socket.emit('join', params, function(){
            console.log('New user joined channel', chatRoom);
         });
     });

    //listen for new message
    socket.on('newMessage', function(data){
        console.log(data);
    });





    $('#chat-form').on('submit', function(e){
        e.preventDefault();

        var message = $('#chat-message').val();

        //emit create message
        socket.emit('createMessage', {
            text: message,
            room: chatRoom,
            from: sender
        }, function(){
            $('#chat-message').val('');
        });
    });
});
