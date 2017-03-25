var express = require('express');
var router = express.Router();

var tagModel = require('../models/tag');
var tag_of_recipe_Model = require('../models/tag_of_recipe');
var ingredientModel = require('../models/ingredient');
var containModel = require('../models/contain');

var checkLogin = require('../middlewares/check').checkLogin;

//   eg: GET /tag?rid=xxx
router.get('/', checkLogin, function(req, res, next) {
  var rid = req.query.rid;
  if(rid==null){
    return res.redirect('back');
  }
  res.render('tagAdd', {
    rid: rid
  });
});

router.post('/', checkLogin, function(req, res, next) {

  var cur_rid = req.query.rid;
  if(cur_rid==null){
    return res.redirect('back');
  }

  var tag = req.fields.tag;

  var cur_tid = 10000;
  if(tag.length==0){
    req.flash('error', 'Please Input a Tag');
    return res.redirect('back');
  }
  tagModel.queryByName(tag, function(err, result){
    if(err){
      console.log(err);
      return res.redirect('back');
    }
    if(result.length==0){
      console.log("///////////////  not exist this tag ");
      tagModel.add([null, tag], function(err, result){
        if(err){
          console.log(err);
          return res.redirect('back');
        }
        tagModel.queryCurId(req, function(err, result){
          if(err){
            console.log(err);
            return res.redirect('back');
          }
          cur_tid = result[0]['cur_tid'];
          console.log("/////////////// cur_tid : "+cur_tid);
          tag_of_recipe_Model.add([cur_rid, cur_tid], function(err, result){
            if(err){
              req.flash('error', err);
              console.log(err);
              return res.redirect('back');
            }
            req.flash('success', 'Successfully Insert');
            return res.redirect('/recipe/'+cur_rid);
          });
        });
      });
    }
    else { //tag exists
      console.log(result[0]);
      tag_of_recipe_Model.add([cur_rid, result[0]['tid']], function(err, result){
        if(err){
          req.flash('error', 'Exist this tag');
          console.log(err);
          return res.redirect('back');
        }
        req.flash('success', 'Successfully Insert');
        return res.redirect('/recipe/'+cur_rid);
      });
    }
  });

});

router.get('/delete', checkLogin, function(req, res, next) {
  var rid = req.query.rid;
  var tid = req.query.tid;
  if(rid==null || tid==null){
    return res.redirect('back');
  }
  tag_of_recipe_Model.delete([rid, tid], function(err, result){
    if(err){
      console.log(err);
      req.flash('error', 'Fail to delete tag');
      return res.redirect('back');
    }
    req.flash('success', 'Successfully Delete Tag');
    return res.redirect('back');
  });
});

module.exports = router;
