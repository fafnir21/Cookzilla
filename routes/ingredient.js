var express = require('express');
var router = express.Router();

var ingredientModel = require('../models/ingredient');
var containModel = require('../models/contain');

var checkLogin = require('../middlewares/check').checkLogin;

//   eg: GET /ingredient?rid=xxx
router.get('/', checkLogin, function(req, res, next) {
  var rid = req.query.rid;
  if(rid==null){
    return res.redirect('back');
  }
  res.render('ingredientAdd', {
    rid: rid
  });
});

router.post('/', checkLogin, function(req, res, next) {

  var cur_rid = req.query.rid;
  if(cur_rid==null){
    return res.redirect('back');
  }

  var ingredient = req.fields.ingredient;
  var quantity = req.fields.quantity;

  var cur_iid = 10000;
  if(ingredient.length==0){
    req.flash('error', 'Please Input a Ingredient');
    return res.redirect('back');
  }
  ingredientModel.queryByName(ingredient, function(err, result){
    if(err){
      console.log(err);
      return res.redirect('back');
    }
    if(result.length==0){
      console.log("///////////////  not exist this ingredient ");
      ingredientModel.add([null, ingredient], function(err, result){
        if(err){
          console.log(err);
          return res.redirect('back');
        }
        ingredientModel.queryCurId(req, function(err, result){
          if(err){
            console.log(err);
            return res.redirect('back');
          }
          cur_iid = result[0]['cur_iid'];
          console.log("/////////////// cur_iid : "+cur_iid);
          containModel.add([cur_rid, cur_iid, quantity], function(err, result){
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
    else { //ingredient exists
      console.log(result[0]);
      containModel.add([cur_rid, result[0]['iid'], quantity], function(err, result){
        if(err){
          req.flash('error', 'Exist this ingredient');
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
  var iid = req.query.iid;
  if(rid==null || iid==null){
    return res.redirect('back');
  }
  containModel.delete([rid, iid], function(err, result){
    if(err){
      console.log(err);
      req.flash('error', 'Fail to delete ingredient');
      return res.redirect('back');
    }
    req.flash('success', 'Successfully Delete Ingredient');
    return res.redirect('back');
  });
});

module.exports = router;
