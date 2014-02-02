
/*
 * GET home page.
 */

//exports.index = function(req, res){
//  res.render('index', { title: 'Express' });
//};

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.redirect('login');
};

/*
 * GET login page.
 */

exports.login = function(req, res) {
  res.render('login');
};

