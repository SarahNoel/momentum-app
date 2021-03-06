var express = require('express');
var router = express.Router();
var moment = require('moment');
var jwt = require('jwt-simple');
var mongoose = require('mongoose');
var config = require('../../../_config');
var User = mongoose.model('users');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

// *** login required *** //
function ensureAuthenticated(req, res, next) {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).send({
      message: 'You did not provide a JSON Web Token in the authorization header.'
    });
  }

  // decode the token
  var header = req.headers.authorization.split(' ');
  var token = header[1];
  var payload = jwt.decode(token, config.TOKEN_SECRET);
  var now = moment().unix();

  // check if the token has expired
  if (now > payload.exp) {
    return res.status(401).send({
      message: 'Token has expired. '
    });
  }

  // check if the user still exists in the db
  User.findById(payload.sub, function(err, user) {
    if (!user) {
      return res.status(400).send({
        message: 'User no longer exists. '
      });
    }
    req.user = user;
    next();
  });
}

// *** generate token *** //
function createToken(user) {
  var payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user._id
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

// *** register route *** //
router.post('/signup', function(req, res) {
  console.log('HERRO?');
  User.findOne({email: req.body.email}, function(err, existingUser) {
    if (existingUser) {
      return res.status(409).send({
        message: 'Email is already taken'
      });
    }
    var user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(user);
    user.save(function() {
      var token = createToken(user);
      console.log('token ', token);
      res.send({
        token: token,
        user: user
      });
    });
  });
});

// *** login route *** //
router.post('/login', function(req, res) {
  User.findOne({email: req.body.email}, '+password', function(err, user) {
    if (!user) {
      return res.status(401).send({
        message: {
          email: 'Incorrect email'
        }
      });
    }
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({
          message: 'Wrong email address and/or password'
        });
      }
      user = user.toObject();
      delete user.password;
      var token = createToken(user);
      res.send({
        token: token,
        user: user
      });
    });
  });
});

module.exports = router;
