
/*
 * GET home page.
 */


exports.index = function(req, res){
    res.render('index', { title: "tartCraft"})
};

exports.main = function(req, res){
     res.render('main', { title: "main"});
}
