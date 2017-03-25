var express = require('express');
var moment = require('moment');
var router = express.Router();

var userModel = require('../models/user');
var checkLogin = require('../middlewares/check').checkLogin;

router.get('/', function(req, res, next) {
  var user = req.session.user;
  if(user==null){
    req.flash('error', 'Need to sign in');
    return res.redirect('/signin');
  }
  userModel.queryById(user, function(err, result){
    if(err){
      req.flash('error', err);
      console.log(err);
      return res.redirect('/');
    }
    res.render('profile', {
      profile: result

    });
  });
});

router.get('/edit', function(req, res, next) {
  var user = req.session.user;
  if(user==null){
    req.flash('error', 'Need to sign in');
    return res.redirect('/signin');
  }
  userModel.queryById(user, function(err, result){
    if(err){
      req.flash('error', err);
      console.log(err);
      return res.redirect('/');
    }
    var formattedDate = moment(result[0].birth_day).format('YYYY-MM-DD');
    res.render('profileEdit', {
      profile: result,
      date: formattedDate
    });
  });
});

router.post('/edit', function(req, res, next) {
  var user = req.session.user;
  var address = req.fields.address;
  var birthday = req.fields.birthday;
  var phone = req.fields.phone;

  userModel.update([address, birthday, phone, user], function(err, result){
    if(err){
      req.flash('error', err);
      console.log(err);
      return res.redirect('back');
    }
    req.flash('success', 'Edit Successfully!');
    return res.redirect('/profile');
  });
});


module.exports = router;
