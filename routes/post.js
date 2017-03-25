var express = require('express');
var router = express.Router();

var recipeModel = require('../models/recipe');
var postModel = require('../models/post');
var tagModel = require('../models/tag');
var tag_of_recipe_Model = require('../models/tag_of_recipe');
var ingredientModel = require('../models/ingredient');
var containModel = require('../models/contain');

var checkLogin = require('../middlewares/check').checkLogin;

router.get('/',  function(req, res, next) {
  res.render('post');
});

router.post('/',  function(req, res, next) {
  var author = req.session.user;
  var title = req.fields.title;
  var servings = req.fields.servings;
  var description = req.fields.description;

  try {
    if (!title.length) {
      throw new Error('Title should not be empty');
    }
  } catch (e) {
    req.flash('error', e.message);
    return res.redirect('/');
  }

  recipeModel.add([title, servings, description, author],  function(err, result){
    if(err){
      req.flash('error', err);
      return res.redirect('/');
    }
    req.flash('success', 'Successfully Post');
    res.redirect('/recipe');
  });
});

module.exports = router;
