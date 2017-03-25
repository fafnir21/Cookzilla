var express = require('express');
var router = express.Router();

var groupingModel = require('../models/grouping');
var membershipModel = require('../models/membership');
var checkLogin = require('../middlewares/check').checkLogin;

router.get('/', checkLogin, function(req, res, next) {
  groupingModel.queryAll(function(err, result){
    if(err){
      req.flash('error', err);
      console.log(err);
      return res.redirect('/');
    }
    res.render('group', {
      group: result
    });
  });
});

router.get('/create', checkLogin, function(req, res, next) {
  res.render('groupCreate');
});

router.post('/create', checkLogin, function(req, res, next) {
  var name = req.fields.gname;
  var user = req.session.user;
  var description = req.fields.gdescription;
  var cur_gid = 10000;
  try {
    if (!name.length) {
      throw new Error('Name should not be empty');
    }
  } catch (e) {
    req.flash('error', e.message);
    return res.redirect('back');
  }
  groupingModel.add([null,name,description],  function(err, result){
    if(err){
      console.log(err);
      return res.redirect('back');
    }
    groupingModel.queryCurId(req, function(err, result){
      if(err){
        console.log(err);
        return res.redirect('back');
      }
      cur_gid = result[0]['cur_gid'];
      membershipModel.add([user,cur_gid,1], function(err, result){
        if(err){
          console.log(err);
          return res.redirect('back');
        }
        req.flash('success', 'Successfully Create Group');
        return res.redirect('/group/'+cur_gid);
      });
    });
  });
});

router.get('/:groupId', checkLogin, function(req, res, next) {
  var groupId = req.params.groupId;
  groupingModel.queryMemById(groupId,  function(err, result){
    if(err){
      console.log(err);
      return res.redirect('back');
    }
    res.render('groupInfo', {
      info: result
    });
  });
});

router.get('/:groupId/join', checkLogin, function(req, res, next) {
  var groupId = req.params.groupId;
  var user = req.query.uname;
  membershipModel.add([user, groupId, 0],  function(err, result){
    if(err){
      console.log(err);
      req.flash('error', 'Has already been a member');
      return res.redirect('back');
    }
    req.flash('success', 'Successfully Join the group');
    return res.redirect('back');
  });
});


module.exports = router;
