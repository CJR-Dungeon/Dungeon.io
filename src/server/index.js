'use strict';

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3000;

const server = new Server(PORT);

//set namespace
server.on('connection', (socket) => {
  socket.onAny(console.log); // automatically logs and payloads
  console.log('socket connected', socket.id);

  // join
  socket.on('join', (payload) => {
    socket.join(payload.clientId);
  });
  
  // encounter
  socket.on('encounter', (payload) => {

  });
  
  // choice
  socket.on('choice', (payload) => {

  });
  
});
