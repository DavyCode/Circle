'use strict'

module.exports = function() {
  return {
    SignUpValidation: (req, res, next) => {
        req.checkBody('username', 'Username is Required').notEmpty();
        req.checkBody('username', 'Username Must Be Greater Than 5').isLength({min: 5});
        req.checkBody('email', 'Email is Required').notEmpty();
        req.checkBody('email', 'Email is Invalid').isEmail();
        req.checkBody('password', 'Password is required').notEmpty();
        req.checkBody('password', 'Minimum of 6 Character Password').isLength({min: 6});

        req.getValidationResult()
          .then((result) => {
            const errors = result.array();
            const messages = [];
            errors.forEach(error => {
              messages.push(error.msg)
            });

            req.flash('error', messages);
            res.redirect('/signup');
          })
          .catch((err) => {
            return next();
          })
    },


    LoginValidation: (req, res, next) => {
      req.checkBody('email', 'Email is Required').notEmpty();
      req.checkBody('email', 'Email is Invalid').isEmail();
      req.checkBody('password', 'Password is required').notEmpty();
      req.checkBody('password', 'Password Minimum of 6 Characters').isLength({min: 6}); //add extra validation for password

      req.getValidationResult()
        .then((result) => {
          const errors = result.array();
          const messages = [];
          errors.forEach(error => {
            messages.push(error.msg)
          });

          req.flash('error', messages);
          res.redirect('/');
        })
        .catch((err) => {
          return next();
        })
  }
  }
}