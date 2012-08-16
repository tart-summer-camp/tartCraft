/**
 * Created with JetBrains PhpStorm.
 * User: denizece2686
 * Date: 8/16/12
 * Time: 3:02 PM
 * To change this template use File | Settings | File Templates.
 */
exports.main = function(req, res){
res.render('main', { title: "tartCraft", racesObj: races });
};