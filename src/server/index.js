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
  socket.on('ready', (payload) => {
    socket.emit('SEND-ENCOUNTER', { ...payload, flavorText: 'something' })
  });
  
  // choice
  socket.on('choice', (payload) => {
    socket.emit('resolution', { ...payload, results: 'YOU DEAD' })
  });
  
});
