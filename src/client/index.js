'use strict';

const { io } = require('socket.io-client');

const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:3000';

const socket = io(SOCKET_URL);

socket.emit('join', { clientId: 'testClient' });

socket.emit('ready', { clientId: 'testClient' })

socket.on('SEND-ENCOUNTER', (payload) => {
  console.log(payload.flavorText)
})

socket.emit('choice', { clientId: 'testClient', choice: 'counterattack'})

socket.on('resolution', (payload) => {
  console.log(payload.result)
})