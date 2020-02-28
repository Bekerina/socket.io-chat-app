//Front-end
// Make connection
/*socket variable is running on front end, it has nothing to do with server
variable socket*/
var socket = io.connect(window.location.protocol + "//" + window.location.host);

//Query DOM
var message = document.getElementById('message');
var nameLine = document.getElementById('name-line');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

// emmit events when button is pushed
btn.addEventListener('click', function () {
    /*this will emit message down to the web socket to the server.
    second parameter is object*/

    socket.emit('chat', {
        message: message.value,
        nameLine: nameLine.value
    });
    message.value = "";
});

/*attaching an event listener to input field - message. Event that we want
to listen for is when we're typing (key press event) when this event occurs
we're going to emit a message to the server which in turn can broadcast message
to the rest of the clients, but not this one*/
message.addEventListener('keypress', function () {
    socket.emit('typing', nameLine.value);
});

//listen for events. Adding messages in div to see in browser
socket.on('chat', function (data) {
    //removes message typing, when message is sent
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.nameLine + ':</strong> ' + data.message + '</p>';
});

socket.on('typing', function(data) {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});