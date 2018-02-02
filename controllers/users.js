'use strict';

module.exports = function(_, passport, User) {
  return  {
    SetRouting : function(router) {
      // GET ROUTES
      router.get('/', this.indexPage);
      router.get('/login', this.getLogin);
      router.get('/home', this.homePage);
      router.get('/auth/facebook', this.getFacebookLogin);
      router.get('/auth/facebook/callback', this.facebookLogin);
      router.get('/auth/google', this.getGoogleLogin);
      router.get('/auth/google/callback', this.googleLogin);


      //AUTH POST ROUTES
      router.post('/', User.SignUpValidation, this.postSignUp);
      router.post('/login', User.LoginValidation, this.postLogin)
    },

    //Signup
    indexPage: function(req, res) {
      const errors = req.flash('error');
      return res.render('index', {title: 'Circle | Signup', messages: errors, hasErrors: errors.length > 0})
    },
    //Login
    postLogin: passport.authenticate('local.authLogin', {
      successRedirect: '/home',
      failureRedirect: '/login',
      failureFlash: true
    }),

    //Login
    getLogin: function(req, res) {
      const errors = req.flash('error');
      return res.render('auth/login', {title: 'Circle | Login', messages: errors, hasErrors: errors.length > 0});
    },

    //Signup  
    postSignUp: passport.authenticate('local.auth', {
      successRedirect: '/home',
      failureRedirect: '/',
      failureFlash: true
    }),

    //Facebook Auth
    getFacebookLogin : passport.authenticate('facebook',{
      scope: 'email'
    }),

    facebookLogin: passport.authenticate('facebook', {
      successRedirect: '/home',
      failureRedirect: '/login',
      failureFlash: true
    }),

    //Google Auth
    getGoogleLogin : passport.authenticate('google',{
      // scope: ['profile','email']
      scope: ['https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read'
      ]
    }),

    googleLogin: passport.authenticate('google', {
      successRedirect: '/home',
      failureRedirect: '/login',
      failureFlash: true
    }),

    homePage: function(req, res) {
      return res.render('home')
    }

    

  }
}