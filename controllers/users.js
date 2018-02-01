'use strict';

module.exports = function(_) {
  return  {
    SetRouting : function(router) {
      router.get('/', this.indexPage);
      router.get('/signup', this.signUp);
    },

    indexPage: function(req, res) {
      return res.render('index', {test: "Hello from the server side"})
    },
    signUp: function(req, res) {
      return res.render('auth/signup');
    }
  }
}