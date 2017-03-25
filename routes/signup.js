var path = require('path');
var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

//var UserModel = require('../models/users');
var checkNotLogin = require('../middlewares/check').checkNotLogin;
var user = require('../models/user');

router.get('/', checkNotLogin, function(req, res, next) {
  res.render('signup');
});

router.post('/', checkNotLogin, function(req, res, next) {
  var name = req.fields.name;
  // var gender = req.fields.gender;
  // var bio = req.fields.bio;
  // var avatar = req.files.avatar.path.split(path.sep).pop();
  var password = req.fields.password;
  var repassword = req.fields.repassword;

  // check the input
  try {
    if (!(name.length >= 1 && name.length <= 20)) {
      throw new Error('The length of username is restricted to 1 to 20 characters.');
    }
    if (password.length < 4) {
      throw new Error('The length of password should be no less than 4 characters.');
    }
    if (password !== repassword) {
      throw new Error('The two passwords you entered did not match.');
    }
  } catch (e) {
    req.flash('error', e.message);
    console.log(e.message);
    return res.redirect('/signup');
  }

  // 明文密码加密
  //password = sha1(password);

  user.add([name, password, name, null, null, null], function(err, result){
    if(err) {
      req.flash('error', 'This username is already taken.');
      console.log(err);
      return res.redirect('/signup');
    }
    req.session.user = name;
    req.flash('success', 'Successfully Signing up!');
    return res.redirect('/recipe?author='+name);
  });


});

module.exports = router;
