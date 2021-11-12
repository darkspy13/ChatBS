const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  io.emit('chat message','a user connected');
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg);
    console.log('message: ' + msg);
  });
  socket.on('disconnect', () => {
    io.emit('chat message','user disconnected');
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
