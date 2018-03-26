var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');

  // socket.emit('createEmail', {
  //   to: 'jen@example.com',
  //   text: 'Hey Hey'
  // });
  // 
  // socket.emit('createMessage', {
  //   from: 'Mike',
  //   text: 'Hey Hey'
  // });
});

socket.on('disconnect', function() {
  console.log('Disonnected from server');
});

// socket.on('newEmail', function(email) {
//   console.log('New e-mail', email);
// });

socket.on('newMessage', function(message) {
  console.log('New message', message);
});
