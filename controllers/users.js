'use strict';

module.exports = function(_, passport, User) {
  return  {
    SetRouting : function(router) {
      // GET ROUTES
      router.get('/', this.indexPage);
      router.get('/signup', this.getSignUp);
      router.get('/home', this.homePage);
      router.get('/auth/facebook', this.getFacebookLogin)
      router.get('/auth/facebook/callback', this.facebooklogin)


      //AUTH POST ROUTES
      router.post('/signup', User.SignUpValidation, this.postSignUp);
      router.post('/', User.LoginValidation, this.postLogin)
    },

    //Login
    indexPage: function(req, res) {
      const errors = req.flash('error');
      return res.render('index', {title: 'Circle | Login', messages: errors, hasErrors: errors.length > 0})
    },
    //Login
    postLogin: passport.authenticate('local.authLogin', {
      successRedirect: '/home',
      failureRedirect: '/',
      failureFlash: true
    }),

    //Signup
    getSignUp: function(req, res) {
      const errors = req.flash('error');
      return res.render('auth/signup', {title: 'Circle | SignUp', messages: errors, hasErrors: errors.length > 0});
    },

    //Signup  
    postSignUp: passport.authenticate('local.auth', {
      successRedirect: '/home',
      failureRedirect: '/signup',
      failureFlash: true
    }),

    //Facebook Auth
    getFacebookLogin : passport.authenticate('facebook',{
      scope: 'email'
    }),

    facebooklogin: passport.authenticate('facebook', {
      successRedirect: '/home',
      failureRedirect: '/signup',
      failureFlash: true
    }),

    homePage: function(req, res) {
      return res.render('home')
    }

    

  }
}