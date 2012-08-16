
var app = require('express').createServer()
  , io = require('socket.io').listen(app);

app.listen(1337); // port number
var userlist = [{username:"falan",password:"filan"}];
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
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

		if(registerSuccess) {
            // Trim the data
            var username = data.username.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            var password = data.password.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

            // Check the data is empty?
            if(username == "" || password == ""){
                registerSuccess = false;
            }else{
                // Ok, register
                userlist.push(data);
            }

        }

		socket.emit('register', registerSuccess);
	});
});

