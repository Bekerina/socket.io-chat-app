//Front-end

//socket variable. Running on front end.
/*var socket = io.connect(window.location.protocol + "//" + window.location.host);*/
var socket = io.connect('http://127.0.0.1:3000');

//Query DOM
var message, nameLine, btn, output, feedback, emojiButton, picker, inputEmoji, form, errorElement;

message = document.getElementById('message');
nameLine = document.getElementById('name-line');
btn = document.getElementById('send');
output = document.getElementById('output');
feedback = document.getElementById('feedback');
emojiButton = document.querySelector('#emoji-icon');
inputEmoji = document.querySelector('#message');
form = document.getElementById('form');
errorElement = document.getElementById('error');


//emoji picker
picker = new EmojiButton ({
    position: 'left-start'
});

picker.on('emoji', function(emoji) {
    inputEmoji.value += emoji;
});

emojiButton.addEventListener('click', function(){
    picker.pickerVisible ? picker.hidePicker() : picker.showPicker(input);
});

//when enter button is pushed message sends
message.addEventListener('keyup', function(e){
    if (e.keyCode === 13) {
        e.preventDefault();
        document.getElementById('send').click();
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
});

// emmit events when button is pushed
btn.addEventListener('click', function () {
        let messages = [];
        if (nameLine.value === '' || nameLine.value == null) {
            messages.push('Please enter the username');
        }

        if (message.value === '' || message.value == null) {
            messages.push('Please enter the message');
        }

        if (nameLine.value.length <= 2) {
            messages.push('Username has to be at least 2 characters long');
        }

        if(messages.length > 0) {
            errorElement.innerText = messages.join('. ');
            return
        }

    //this will emit message down to the web socket to the server.
    socket.emit('chat', {
        message: message.value,
        nameLine: nameLine.value
    });

    //after button is pushed, message input becomes empty
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
    //down to page bottom where last message is.
    output.scrollTo({
        top: output.scrollHeight,
        left: 0,
        behavior: 'smooth'
    });

});

//when someone is typing this message appears.
socket.on('typing', function(data) {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});