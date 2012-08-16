
/*
 * GET home page.
 */

exports.index = function(req, res){
    var races = {
        'mage': {
            readableName : 'mage',
            raceTypes: ['dps']
        },
        'priest': {
            readableName : 'priest',
            raceTypes: ['healer', 'dps']
        },
        'warrior': {
            readableName : 'warrior',
            raceTypes: ['tank', 'dps']
        },
        'paladin': {
            readableName : 'paladin',
            raceTypes: ['tank', 'healer', 'dps']
        }
    };
    res.render('index', { title: "tartCraft", racesObj: races })
};
