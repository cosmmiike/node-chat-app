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
  li.text(message.from + ': ' + message.text);
  $('#messages').append(li);
});

// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hi'
// }, function(callbackMsg) {
//   console.log('Got it!', callbackMsg);
// });

socket.on('newLocationMessage', function(message) {
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');
  li.text(message.from + ': ');
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
});

$('#messages-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextBox = $('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function() {
    messageTextBox.val('');
  });
});

var locationButton = $('#send-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});
