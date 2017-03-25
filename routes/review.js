var express = require('express');
var router = express.Router();

var reviewModel = require('../models/review');

var checkLogin = require('../middlewares/check').checkLogin;

//   eg: GET /review?rid=xxx
router.get('/', checkLogin, function(req, res, next) {
  var rid = req.query.rid;
  if(rid==null){
    return res.redirect('back');
  }
  res.render('reviewAdd', {
    rid: rid
  });
});

router.post('/', checkLogin, function(req, res, next) {
  var cur_rid = req.query.rid;
  var author = req.query.uname;
  if(cur_rid==null || author==null){
    return res.redirect('back');
  }

  var revtitle = req.fields.revtitle;
  var revtext = req.fields.revtext;
  var suggestion = req.fields.suggestion;
  var rating = req.fields.rating;

  var cur_revid = 10000;
  if(revtitle.length==0){
    req.flash('error', 'Please Input a Title');
    return res.redirect('back');
  }
  reviewModel.add([null, cur_rid, author, revtitle, revtext, suggestion, rating], function(err, result){
    if(err){
      console.log(err);
      return res.redirect('back');
    }
    req.flash('success', 'Successfully Review');
    return res.redirect('/recipe/'+cur_rid);
  })

});

router.get('/delete', checkLogin, function(req, res, next) {
  var revid = req.query.revid;
  if(revid==null){
    return res.redirect('back');
  }
  reviewModel.delete(revid, function(err, result){
    if(err){
      console.log(err);
      req.flash('error', 'Fail to delete review');
      return res.redirect('back');
    }
    req.flash('success', 'Successfully Delete Review');
    return res.redirect('back');
  });
});


module.exports = router;
