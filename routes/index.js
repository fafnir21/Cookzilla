module.exports = function (app) {
  app.get('/', function (req, res) {
    if(req.session.user!=null){
      res.redirect('/recipe');
    } else {
      res.redirect('/signup');
    }
  });
  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
  app.use('/signout', require('./signout'));
  app.use('/posts', require('./posts'));
  app.use('/post', require('./post'));
  app.use('/recipe', require('./recipe'));
  app.use('/profile', require('./profile'));
  app.use('/tag', require('./tag'));
  app.use('/ingredient', require('./ingredient'));
  app.use('/review', require('./review'));
  app.use('/group', require('./group'));
  app.use('/meeting', require('./meeting'));
  // 404 page
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.render('404');
    }
  });
};
