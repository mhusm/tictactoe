const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    console.log("sending tic.html");
    res.sendFile(__dirname + '/tic.html');
});
app.use(express.static('public'));


io.on('connection', (socket) => {
    socket.on("click", data => {
        console.log(data);
        socket.broadcast.emit("click", data);
    });
});

let port = process.env.PORT || 8080;        // set our port
server.listen((port ), () => {
    console.log('server listening on *:' +port)
});