'use strict';

module.exports = function() {
   return {
     SetRouting: function (router) {
       router.get('/dashboard',this.getAdmin);
     },

     getAdmin : function (req, res) {
       res.render('admin/dashboard')
     }
   } 
}

