module.exports = function(io){
    io.on('connection', (socket) => {
          console.log('Server connected!!');

          socket.on('join', (params, callback) => {
            socket.join(params.room)

            callback();
          });

          socket.on('createMessage', (message, callback) => {
              console.log(message);

              io.to(message.room).emit('newMessage', {
                  text: message.text,
                  room: message.room,
                  from: message.from
              });
              callback();
          });
    });
}