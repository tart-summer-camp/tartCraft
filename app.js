var app = require('express').createServer()
  , io = require('socket.io').listen(app);

app.listen(1337);
