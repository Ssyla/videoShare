const express = require("express");
const app = express();
const http = require("http").createServer(app)
const cors = require('cors');
const sio = require('socket.io');

const io = sio(http, {
  cors: {
    origin: 'http://localhost:3000',
    cresentials: true
  }
});

const PORT = 4000;
http.listen(PORT, () => {
  console.log('listening on port', PORT);
});

let vlink = '';

io.on('connection', (socket) => {
  console.log('connected');
  socket.on('link', ({link}) => {
    vlink = link;
    console.log(link);
    io.emit('link', { link });
  });

  socket.on('play', ({}) => {
    console.log("play");
    io.emit('play', {});
  });

  socket.on('pause', ({}) => {
    console.log("pause");
    io.emit('pause', {});
  });

  socket.on('time', ({ newTime }) => {
    console.log('time:', newTime);
    io.emit('time', {newTime});
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  })
});


