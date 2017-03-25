var express = require('express');
var router = express.Router();

var meetingModel = require('../models/meeting');
var reportModel = require('../models/report');
var rsvpModel = require('../models/rsvp');
var checkLogin = require('../middlewares/check').checkLogin;


router.get('/', checkLogin, function(req, res, next) {
  var user = req.session.user;
  meetingModel.queryByUser(user, function(err, result){
    if(err){
      req.flash('error', err);
      console.log(err);
      return res.redirect('/');
    }
    res.render('meeting', {
      meeting: result
    });
  });
});


router.get('/:meetingId', checkLogin, function(req, res, next) {
  var meetingId = req.params.meetingId;
  var user = req.session.user;
  meetingModel.queryById(meetingId,  function(err, resultInfo){
    if(err){
      console.log(err);
      return res.redirect('back');
    }
    reportModel.queryByMid(meetingId, function(err, resultRep){
      if(err){
        console.log(err);
        return res.redirect('back');
      }
      rsvpModel.queryById([user, meetingId], function(err, resultRSVP){
        if(err){
          console.log(err);
          return res.redirect('back');
        }
        res.render('meetingInfo', {
          info: resultInfo,
          report: resultRep,
          rsvp: resultRSVP
        });
      });
    });
  });
});

router.get('/:meetingId/attend', checkLogin, function(req, res, next) {
  var meetingId = req.params.meetingId;
  var user = req.session.user;
  rsvpModel.add([user, meetingId], function(err, result){
    if(err){
      console.log(err);
      return res.redirect('back');
    }
    req.flash('success', 'Attend Successfully!');
    res.redirect('back');
  });
});

router.get('/:meetingId/report', checkLogin, function(req, res, next) {
  res.render('reportAdd');
});

router.post('/:meetingId/report', checkLogin, function(req, res, next) {
  var meetingId = req.params.meetingId;
  var user = req.session.user;
  var title = req.fields.reptitle;
  var text = req.fields.reptext;

  var description = req.fields.gdescription;

  reportModel.add([meetingId,user,title,text], function(err, result){
    if(err){
      console.log(err);
      return res.redirect('back');
    }
    req.flash('success', 'Report Successfully!');
    res.redirect('/meeting/'+meetingId);
  });

});






module.exports = router;
