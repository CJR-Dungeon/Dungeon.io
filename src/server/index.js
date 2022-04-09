'use strict';

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3000;

const server = new Server(PORT);
const Chance = require('chance');
const chance = new Chance();
const { faker } = require('@faker-js/faker');

const players = {};

const goodChoices = ['counterattack', 'draw sword', 'intimidate', 'stuns', 'decapitate']

//set namespace
server.on('connection', (socket) => {
  socket.onAny(console.log); // automatically logs and payloads
  console.log('socket connected', socket.id);

  // join
  socket.on('join', (payload) => {
    socket.join(payload.clientId);
    // Adds new object with playerName if that object does not already exist.
    players[payload.clientId] = { playerName: payload.clientId, points: 0, ...players[payload.clientId] }
    console.log(players)
  });
  
  // encounter
  socket.on('ready', (payload) => {
    
    let flavorText = `${ faker.word.adjective() } ${ chance.animal() } ${ faker.word.verb() }s ${ faker.word.adverb() } ${ faker.word.preposition() } your ${ faker.word.adjective() } ${ faker.word.noun() } \nWhat Do You Do?`

    flavorText = flavorText.charAt(0).toUpperCase() + flavorText.slice(1);

    socket.emit('SEND-ENCOUNTER', { ...payload, flavorText  })
  });
  
  // choice
  socket.on('choice', (payload) => {
    let result = ''
    if(goodChoices.includes(payload.choice)) {
      result = 'Good Choice? +1'
      players[payload.clientId].points++
    } else {
      console.log(players);
      result = 'YOU DEAD'
      players[payload.clientId].points = 0;
    }
    socket.emit('resolution', { ...payload, result })
  });
  
});
