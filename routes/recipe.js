var express = require('express');
var router = express.Router();

var recipeModel = require('../models/recipe');
var reviewModel = require('../models/review');
var checkLogin = require('../middlewares/check').checkLogin;

// GET /recipe 所有用户或者特定用户的文章页
//   eg: GET /recipe?author=xxx
router.get('/', checkLogin, function(req, res, next) {
  var author = req.query.author;
  if(author==null){
    author = req.session.user;
  }
  recipeModel.queryByAuthor(author, function(err, result){
    if(err){
      req.flash('error', err);
      console.log(err);
      return res.redirect('/');
    }
    res.render('recipe', {
      recipe: result
    });
  });
});

// GET /recipe/:recipeId
router.get('/:recipeId', checkLogin, function(req, res, next) {
  var recipeId = req.params.recipeId;
  recipeModel.queryById(recipeId,  function(err, resultRecipe){
    if(err){
      console.log(err);
      return res.redirect('back');
    }
    recipeModel.queryTagById(recipeId,  function(err, resultTag){
      if(err){
        console.log(err);
        return res.redirect('back');
      }
      recipeModel.queryIngById(recipeId,  function(err, resultIng){
        if(err){
          console.log(err);
          return res.redirect('back');
        }
        recipeModel.queryRevById(recipeId,  function(err, resultRev){
          if(err){
            console.log(err);
            return res.redirect('back');
          }
          res.render('info', {
            recipe: resultRecipe,
            tag: resultTag,
            ingredient: resultIng,
            review: resultRev
          });
        });
      });
    });
  });
});

// GET /recipe/:recipeId/edit
router.get('/:recipeId/edit', checkLogin, function(req, res, next) {
  var recipeId = req.params.recipeId;
  var user = req.session.user;

  recipeModel.queryById(recipeId,  function(err, result){
    if(err){
      console.log(err);
      return res.redirect('back');
    }
    if(result[0]['author']!=user){
      throw new Error('Permission denied');
    }
    res.render('recipeEdit', {
      recipe: result
    });
  });
});

// POST /posts/:recipeId/edit
router.post('/:recipeId/edit', checkLogin, function(req, res, next) {

  var recipeId = req.params.recipeId;
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
    return res.redirect('back');
  }
  recipeModel.update([title, servings, description, recipeId],  function(err, result){
    if(err){
      console.log(err);
      return res.redirect('back');
    }
    req.flash('success', 'Edit Successfully!');
    res.redirect('/recipe/'+recipeId);
  });
});

// POST /recipe/:recipeId/delete
router.get('/:recipeId/delete', checkLogin, function(req, res, next) {

  var recipeId = req.params.recipeId;
  var author = req.session.user._id;

  recipeModel.delete(recipeId,  function(err, result){
    if(err){
      console.log(err);
      return res.redirect('back');
    }
    req.flash('success', 'Delete Successfully!');
    res.redirect('/recipe');
  });
});

// POST /recipe/:postId/comment 创建一条留言
router.post('/:postId/comment', checkLogin, function(req, res, next) {
  var author = req.session.user._id;
  var postId = req.params.postId;
  var content = req.fields.content;
  var comment = {
    author: author,
    postId: postId,
    content: content
  };

  CommentModel.create(comment)
    .then(function () {
      req.flash('success', '留言成功');
      // 留言成功后跳转到上一页
      res.redirect('back');
    })
    .catch(next);
});

// GET /recipe/:postId/comment/:commentId/remove 删除一条留言
router.get('/:postId/comment/:commentId/remove', checkLogin, function(req, res, next) {
  var commentId = req.params.commentId;
  var author = req.session.user._id;

  CommentModel.delCommentById(commentId, author)
    .then(function () {
      req.flash('success', '删除留言成功');
      // 删除成功后跳转到上一页
      res.redirect('back');
    })
    .catch(next);
});

module.exports = router;
