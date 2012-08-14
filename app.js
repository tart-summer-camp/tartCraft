var app = require('express').createServer()
  , io = require('socket.io').listen(app);

app.listen(1337);
var userlist = [{username:"falan",password:"filan"}];
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
io.sockets.on('connection', function (socket) {
	socket.on('login', function(data) {
	});
	socket.on('register', function(data) {
	});
});



