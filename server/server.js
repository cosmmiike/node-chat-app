var path = require('path');
var http = require('http');
var express = require('express');
var socketIO = require('socket.io');

var {generateMessage} = require('./utils/message');
var publicPath = path.join(__dirname, '/../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function(socket) {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  // socket.emit('newMessage', {
  //   from: 'Admin',
  //   text: 'Welcome to the chat app',
  //   createdAt: new Date().getTime()
  // });
  //
  // socket.broadcast.emit('newMessage', {
  //   from: 'Admin',
  //   text: 'New user joined',
  //   createdAt: new Date().getTime()
  // });
  //
  // socket.emit('newEmail', {
  //     from: 'mike@example.com',
  //     text: 'Hey',
  //     createdAt: 123
  //   });
  //
  // socket.on('createEmail', function(newEmail) {
  //   console.log('Create e-mail', newEmail);
  // });
  //
  // socket.emit('newMessage', {
  //     from: 'mike@example.com',
  //     text: 'Hey',
  //     createdAt: 123
  //   });

  socket.on('createMessage', function(message) {
    console.log('Create message', message);
    io.emit('newMessage', generateMessage(message.from, message.text));

    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });

    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', function() {
    console.log('User was disconnected');
  });
});

server.listen(port, function() {
  console.log('Server is up on port ' + port);
});
