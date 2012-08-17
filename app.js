

var express = require('express'),
    app = module.exports = express.createServer(),
    routes = require('./routes'),
    viewRenderer= require('./viewRenderer').viewRenderer,
    io = require('socket.io').listen(app);


// Configuration

app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname+'/public/js/viewRenderer.js'));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.use(express.favicon(__dirname + 'favicon.ico'))
});

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

app.listen(1337); // port number
var races = {
    'mage':{
        readableName:'mage',
        raceTypes:['dps']
    },
    'priest':{
        readableName:'priest',
        raceTypes:['healer', 'dps']
    },
    'warrior':{
        readableName:'warrior',
        raceTypes:['tank', 'dps']
    },
    'paladin':{
        readableName:'paladin',
        raceTypes:['tank', 'healer', 'dps']
    }
};
var userlist = [
    {
        username:"falan",
        password:"filan",
        race:'',
        raceType:''
    }
];

var onlineUsers = [];

var duels = [];

app.get('/', routes.index);

//app.get('/', function (req, res) {
//  res.sendfile(__dirname + '/public/index.html');
//});
app.get('/public/js/Bootstrapper.js', function (req, res) {
    res.sendfile(__dirname + '/public/js/Bootstrapper.js');
});

/**
 * connection event listener
 * When someone connects, starts to listen events
 */
io.sockets.on('connection', function (socket) {

    /**
     * login event listener
     * takes username and password as an object
     * outputs true or false
     */
    socket.on('login', function (data) {
        var limit = userlist.length;
        var user;
        var response = {
            status:false
        };
        for (var i = 0; i < limit; i++) {
            if (userlist[i].username == data.username) {
                if (userlist[i].password == data.password) {
                    response.status = true;
                    user = userlist[i];
                    response.user = user;
                }
            }
        }

        if (response.status) {
            socket.emit('login', response);
            socket.emit('mainPageData',viewRenderer("main"));
            onlineUsers.push({user:response.user.username, userRace:response.user.race, userType:response.user.type, gameSession:socket.id});
            socket.emit('onlineUserChanged',onlineUsers);
            socket.broadcast.emit('onlineUserChanged',onlineUsers);

            //console.log(viewRenderer("main"));
            //console.log(jscripts.viewRenderer("main"));
        } else {
            response.error = {
                text:'Wrong username or password.'
            };
            socket.emit('login', response);
        }


    });

    /**
     * register event listener
     * takes username or password
     * outputs true or false
     */
    socket.on('register', function (data) {
        var limit = userlist.length;
        var anyConflict = false;
        var response = {
            status:true
        };
        for (var i = 0; i < limit; i++) {
            if (userlist[i].username == data.username) {
                anyConflict = true;
            }
        }

        if (!anyConflict) {
            // Trim the data
            var username = data.username.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            var password = data.password.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

            // Check the data is empty?
            if (username == "" || password == "") {
                response.status = false;
                response.error = {
                    text:'Username or password cannot be empty.'
                };
            } else {
                // Ok, register
                userlist.push(data);
            }

        } else {
            response.status = false;
            response.error = {
                text:'This username is registered before.'
            };
        }

        socket.emit('register', response);
    });
    socket.on('getRace', function(data){
        socket.emit('catchRace', races[data.race]);
    });

    socket.on('chatSend', function(data){
        socket.broadcast.emit('chatReceive', data);
        socket.emit('chatReceive', data);
    });
    socket.on('disconnect', function(data){
        var userCount = onlineUsers.length;
        var found;
        for(var i = 0 ; i < userCount ; i++){
            if(onlineUsers[i].gameSession == socket.id){
                onlineUsers.splice(i,1);
                userCount--;
            }
        }
        socket.broadcast.emit('onlineUserChanged',onlineUsers);
    });

    socket.on('duelStart', function(data){
        duels.push(data);
        socket.broadcast.emit('duelRequest',data);
        socket.emit('duelRequest',data);
    });

    socket.on('acceptDuel', function(data){
        var duelCount = duels.length;
        var userCount = userlist.length;
        var response = {};
        var loser = "";
        for(var i = 0 ; i < duelCount ; i++){
            if(duels[i].user2 == data){
                if(Math.floor(Math.random() * 2) == 1){
                    response = {
                        winner: duels[i].user1,
                        loser: duels[i].user2
                    };
                    loser = duels[i].user2;
                    socket.emit('duelEnd', response);
                    socket.broadcast.emit('duelEnd', response);
					i == duelCount+5;
                }
                else{
                    response = {
                            winner: duels[i].user2,
                            loser: duels[i].user1
                        };
                    socket.emit('duelEnd', response);
                    socket.broadcast.emit('duelEnd', response);
					i == duelCount+5;
                }
            }
        }
		for(var j = 0 ; j < userCount ; j++){
            if(userlist[j].username == loser){
				userlist.splice(j,1);
                j = userCount + 10;
            }
        }
    });
});

