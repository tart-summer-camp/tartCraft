var app = require('express').createServer()
  , io = require('socket.io').listen(app);

app.listen(1337);
var userlist = [{username:"falan",password:"filan"}];
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
io.sockets.on('connection', function (socket) {
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



