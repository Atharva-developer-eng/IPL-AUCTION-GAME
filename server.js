
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let players = [
  { name: 'Virat Kohli', role: 'Batsman', basePrice: 100 },
  { name: 'MS Dhoni', role: 'Wicketkeeper', basePrice: 90 },
  { name: 'Rohit Sharma', role: 'Batsman', basePrice: 95 },
  { name: 'Hardik Pandya', role: 'All-Rounder', basePrice: 85 }
];

let player1Score = 0;
let player2Score = 0;

app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.emit('updatePlayerCards', players);

  socket.on('placeBid', (data) => {
    player1Score += 10;
    io.emit('leaderboard', { player1Score, player2Score });
  });

  socket.on('passTurn', () => {
    console.log('Turn passed');
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
