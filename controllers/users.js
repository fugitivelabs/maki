
module.exports = {

  list: function(req, res, next) {
    User.find().exec(function(err, users) {
      res.provide( err, users , {
        template: 'users'
      });
    });
  }

  , view: function(req, res, next) {
    User.findOne({ slug: req.param('usernameSlug') }).exec(function(err, users) {
      res.provide( err, users , {
        template: 'user'
      });
    });
  }

  , registerForm: function(req, res, next) {
    res.render('register');
  }

  , registerAction: function(req, res, next) {
    User.register(new User({ email : req.body.email, username : req.body.username }), req.body.password, function(err, user) {
      if (err) {
        console.log(err);
        return res.render('register', { 
          user : user
          , errorMessage: "There was an error registering. Please check your information and try again!"
        });
      }
      else {
        res.redirect('/');
      }
    });
  }

  , loginForm: function(req, res, next) {
    res.render('login');
  }

}