//Back-end
//requiring express because we are creating express app
var express = require('express');
var socket = require('socket.io');
const mongo = require('mongodb').MongoClient;
var os = require('os');

var fs = require('fs');
//Read the password file mounted by Docker
mongodb_password = fs.readFile(process.env.MONGODB_PASSWORD_FILE, "utf8", function(err,mongodb_password) {
    if (err) {
        console.log(err);
        os.exit(1)
    }
    //connect to mongo db based on the environment variables set by Docker
    mongo_connect_string = 'mongodb://' + process.env.MONGODB_USERNAME + ":" + mongodb_password + "@" + process.env.MONGODB_HOST + ':27017/' + process.env.MONGODB_DATABASE
    mongo.connect(mongo_connect_string, async function (err, db) {
        if (err) {
            console.log(err)
            os.exit(1)
        }
        var messagesCollection = await db.collection('messages');

        var io = socket(server);
        /* when client(browser) connects we connecting it to the server
        when connection is made, function starting to work, which then passes
        through this socket. This socket ir between client and server*/
        io.on('connection', function (socket) {
            console.log('made socket connection', socket.id);

            /*listening for that message being send to us from the clients. */
            socket.on('chat', function (data) {
                /*sending data to all connected clients. This is going to refer to
                all sockets that are connected to the server*/
                io.sockets.emit('chat', data);
            });
            /*listening for a typing message from front-end. data- username*/
            socket.on('typing', function (data) {

                messagesCollection.insertOne({text: message}, function (err, res) {
                    console.log('Inserted a document into messagesCollection');
                });
                //broadcasting this massage to every other single socket
                socket.broadcast.emit('typing', data);
            });
        });

    });

    //App setup
    //evoke function express
    var app = express();

    // creating server variable, app.listen listens specific port number
    var server = app.listen(3000, function () {
        console.log('listening for requests on port 3000');
    });

    // Static files
    // searching in public folder for static files and serves into the browser
    app.use(express.static('public'));
});