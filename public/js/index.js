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
  var li = $('<li></li>');
  li.html('<b>' + message.from + '</b>: ' + message.text);
  $('#messages').append(li);
});

// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hi'
// }, function(callbackMsg) {
//   console.log('Got it!', callbackMsg);
// });

$('#messages-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function() {

  });
});
