module.exports = {
  checkLogin: function checkLogin(req, res, next) {
    if (!req.session.user) {
      req.flash('error', 'Not signed in');
      return res.redirect('/signin');
    }
    next();
  },

  checkNotLogin: function checkNotLogin(req, res, next) {
    if (req.session.user) {
      req.flash('error', 'You have signed in');
      return res.redirect('back');
    }
    next();
  }
};
