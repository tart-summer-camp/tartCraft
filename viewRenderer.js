/**
 * Created with JetBrains PhpStorm.
 * User: denizece2686
 * Date: 8/16/12
 * Time: 5:32 PM
 * To change this template use File | Settings | File Templates.
 */
exports.viewRenderer = function (pagename) {
    //var that=this;
   content={
        sitecontent: ""
    };
    fs = require('fs');
    if (pagename == 'main') {
       return fs.readFileSync('./views/main.html','utf8').toString();
    }
};