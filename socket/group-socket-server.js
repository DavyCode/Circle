module.exports = function(io, Usersobject){
    
     const users = new Usersobject();

    io.on('connection', (socket) => {
          console.log('Server connected!!');

          socket.on('join', (params, callback) => {
            socket.join(params.room)

            users.AddUserData(socket.id, params.name, params.room);
            
            io.to(params.room).emit('usersList', users.GetUsersList(params.room));

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


          socket.on('disconnect', () => {
              var user = users.RemoveUser(socket.id);

              if(user){
                  io.to(user.room).emit('usersList', users.GetUsersList(user.room));
              }
          });
    });
}