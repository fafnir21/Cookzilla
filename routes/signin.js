var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var user = require('../models/user');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signin 登录页
router.get('/', checkNotLogin, function(req, res, next) {
  res.render('signin');
});

// POST /signin 用户登录
router.post('/', checkNotLogin, function(req, res, next) {
  var name = req.fields.name;
  var password = req.fields.password;

  user.check([name, password], function(err, result){
    if(err) {
      req.flash('error', 'error occurred');
      console.log(err);
      return res.redirect('/signup');
    }
    if(result.length!=0){
      req.session.user = name;
      req.flash('succrss', 'Successfully Loging in');
      res.redirect('/recipe');
    } else {
      req.flash('error', 'wrong username or password');
      res.redirect('back');
    }

  });
});

module.exports = router;
