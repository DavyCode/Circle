$(document).ready(function(){
    var socket = io();

    var chatRoom = $('#groupName').val();
    var sender = $('#sender').val();

    //listen for connection
    socket.on('connect', function(){
         console.log('New user connection');

         var params = {
           room: chatRoom,
           name: sender
         }

         //emit join message to a group
         socket.emit('join', params, function(){
            console.log('New user joined channel', chatRoom);
         });
     });

     //
     socket.on('usersList', function(users) {
       console.log(users)
       var ol = $('<ol></ol>');

       for(var i = 0; i < users.length; i += 1){
          ol.append('<p> <a id="val" data-toggle="modal" data-target="#modelId">'+users[i]+'</a></p>')
       }

       
       $('#users').html(ol);
       $('#numOnline').text('('+users.length+')');
     })


    //listen for new message
    socket.on('newMessage', function(data){
        var template = $('#message-template').html();
        var incomingMessage = Mustache.render(template, {
            text: data.text,
            sender: data.from
        });

        $('#list-of-messages').append(incomingMessage)
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
