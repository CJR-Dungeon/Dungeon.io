'use strict';

const { io } = require('socket.io-client');

const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:3000';

const socket = io(SOCKET_URL);

socket.emit('join', { clientId: 'testClient' });
