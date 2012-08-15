
var express = require('express')
    , app = express()
    , http = require('http')
    , routes = require('./routes')
    , path = require('path')
    , server = http.createServer(app)
    , io = require('socket.io').listen(server);

var userlist = [{username:"falan",password:"filan"}];

app.get('/', routes.index);

// express configuration

app.configure(function(){
    app.set('port', process.env.PORT || 1337);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.favicon(__dirname + 'favicon.ico'));
});


// i love tart.
// we all love tart.
// temp temp
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
		var loginSuccess = false;
		for(var i = 0 ; i < limit ; i++){
			if(userlist[i].username == data.username){
				if(userlist[i].password == data.password){
					loginSuccess = true;
				}
			}
		}
		socket.emit('login', loginSuccess);
	});

    /**
     * register event listener
     * takes username or password
     * outputs true or false
     */
	socket.on('register', function(data) {
		var limit = userlist.length;
		var registerSuccess = true;
		for(var i = 0 ; i < limit ; i++){
			if(userlist[i].username == data.username){
				if(userlist[i].password == data.password){
					registerSuccess = false;
				}
			}
		}
		if(registerSuccess)
			userlist.push(data);
		socket.emit('register', registerSuccess);
	});
});

app.listen(app.get('port')); // Start listening.
