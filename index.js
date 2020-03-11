//Back-end
//requiring express because we are creating express app

var express = require('express');
var socket = require('socket.io');


//App setup
//evoke function express
var app = express();

// creating server variable, app.listen listens specific port number
var server = app.listen(3000, function(){
    console.log('listening for requests on port 3000');
});


// Static files
// searching in public folder for static files and serves into the browser
app.use(express.static('public'));


// Socket setup
// setting up socket to work on this server
var io = socket(server);

/* when client(browser) connects we connecting it to the server
when connection is made, function starting to work, which then passes
through this socket. This socket ir between client and server*/
io.on('connection', function(socket){
    console.log('made socket connection', socket.id);

    /*listening for that message being send to us from the clients. */
    socket.on('chat', function(data) {
    /*sending data to all connected clients. This is going to refer to
    all sockets that are connected to the server*/
        io.sockets.emit('chat', data);
    });
    /*listening for a typing message from front-end. data- username*/
    socket.on('typing', function(data) {
        //broadcasting this massage to every other single socket
        socket.broadcast.emit('typing', data);
    });
});

