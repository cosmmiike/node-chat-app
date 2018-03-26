var path = require('path');
var http = require('http');
var express = require('express');
var socketIO = require('socket.io');

var publicPath = path.join(__dirname, '/../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function(socket) {
  console.log('New user connected');

  // socket.emit('newEmail', {
  //     from: 'mike@example.com',
  //     text: 'Hey',
  //     createdAt: 123
  //   });
  //
  // socket.on('createEmail', function(newEmail) {
  //   console.log('Create e-mail', newEmail);
  // });

    socket.emit('newMessage', {
        from: 'mike@example.com',
        text: 'Hey',
        createdAt: 123
      });

    socket.on('createMessage', function(message) {
      console.log('Create message', message);
    });

  socket.on('disconnect', function() {
    console.log('User was disconnected');
  });
});

server.listen(port, function() {
  console.log('Server is up on port ' + port);
});
