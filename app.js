
let socket = io();
let currentBid = 0;

document.getElementById('bid-btn').addEventListener('click', () => {
  socket.emit('placeBid', { bid: currentBid + 10 });
});

document.getElementById('pass-btn').addEventListener('click', () => {
  socket.emit('passTurn');
});

document.getElementById('mic-btn').addEventListener('click', () => {
  alert('Push-to-talk not implemented in this version.');
});

socket.on('leaderboard', (data) => {
  document.getElementById('leaderboard').innerText = `Player 1: ${data.player1Score} | Player 2: ${data.player2Score}`;
});

socket.on('updatePlayerCards', (players) => {
  let cardsContainer = document.getElementById('player-cards');
  cardsContainer.innerHTML = '';
  players.forEach(player => {
    let card = document.createElement('div');
    card.innerHTML = `<h3>${player.name}</h3><p>${player.role}</p><p>Base Price: ${player.basePrice}</p>`;
    cardsContainer.appendChild(card);
  });
});
