
var app = require('express').createServer()
  , io = require('socket.io').listen(app);

app.listen(1337); // port number
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
var userlist = [
    {
        username:"falan",
        password:"filan",
        race: '',
        raceType: ''
    }
];
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});
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
	socket.on('login', function(data) {
		var limit = userlist.length;
        var user;
        var response = {
            status: false
        };
		for(var i = 0 ; i < limit ; i++){
			if(userlist[i].username == data.username){
				if(userlist[i].password == data.password){
					response.status = true;
                    user = userlist[i];
                    response.user = user;
				}
			}
		}

        if(response.status) {
            socket.emit('login', response);
        }else{
            response.error = {
                text: 'Wrong username or password.'
            };
            socket.emit('login', response);
        }

	});

    /**
     * register event listener
     * takes username or password
     * outputs true or false
     */
	socket.on('register', function(data) {
		var limit = userlist.length;
        var anyConflict = false;
        var response = {
            status: true
        };
		for(var i = 0 ; i < limit ; i++){
			if(userlist[i].username == data.username){
                anyConflict = true;
			}
		}

		if(!anyConflict) {
            // Trim the data
            var username = data.username.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            var password = data.password.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

            // Check the data is empty?
            if(username == "" || password == ""){
                response.status = false;
                response.error = {
                    text: 'Username or password cannot be empty.'
                };
            }else{
                // Ok, register
                userlist.push(data);
            }

        }else{
            response.status = false;
            response.error = {
                text: 'This username is registered before.'
            };
        }

		socket.emit('register', response);
	});
});

