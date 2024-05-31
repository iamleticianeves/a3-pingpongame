const { checkForWinner } = require('./main.js');

test('Detecção de vitória do jogador 1', () => {
    let gameState = {
        score: { player1: 10, player2: 5 },
        winningScore: 10
    };
    const winner = checkForWinner(gameState);
    expect(winner).toBe('player1');
});

test('Detecção de vitória do jogador 2', () => {
    let gameState = {
        score: { player1: 8, player2: 10 },
        winningScore: 10
    };
    const winner = checkForWinner(gameState);
    expect(winner).toBe('player2');
});
