const mongoose = require('mongoose');

const groupNames = mongoose.Schema ({
   groupname: {type: String, default: ''},
   category: {type: String, default: ''},
   image: {type: String, default: 'default.png'},
   groupmembers : [{
      username: {type: String, default: ''},
      email: { type: String, default: ''}
   }]
});

module.exports = mongoose.model('Group', groupNames)