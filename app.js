var app = require('express').createServer()
  , io = require('socket.io').listen(app);

app.listen(1337);
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
