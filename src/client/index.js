'use strict';

const { io } = require('socket.io-client');

const { program } = require('commander');

const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:3000';

const socket = io(SOCKET_URL);

socket.emit('join', { clientId: 'testClient' });

program.parse();
let choice = program.args[0] || 'start';
console.log("I choose to", choice);
if(choice === 'start' || !choice ) {

  socket.emit('ready', { clientId: 'testClient' })
  
  socket.on('SEND-ENCOUNTER', (payload) => {
    console.log(payload.flavorText)
    process.exit();
  })
} else {
  socket.emit('choice', { clientId: 'testClient', choice: choice })
  
  socket.on('resolution', (payload) => {
    console.log(payload.result)
    process.exit();
  })
}



