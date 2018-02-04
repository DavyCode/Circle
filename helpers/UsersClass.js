class Usersobject {
    constructor(){
       this.users = [];
    }
    

    AddUserData(id, name, room){
        var user = {
            id,
            name,
            room
        };

        this.users.push(user);
        return user;
    }


    RemoveUser(id){
      var user = this.GetUser(id);

      if(user){
          this.users = this.users.filter(user => user.id !== id);
      }
      return user;
    }


    GetUser(id){
      var getUser = this.users.filter(userId => userId.id === id)[0]
      return getUser;
    }


    GetUsersList(room){
        var users = this.users.filter(user => user.room === room);

        var UsersNames = users.map(user => user.name);
        return UsersNames;
    }
}

module.exports = {Usersobject};
 