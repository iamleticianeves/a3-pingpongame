const { initGame } = require('./game');

test('Inicialização do jogo', () => {
    const gameState = initGame();
    expect(gameState.player1Position).toBe(50); 
    expect(gameState.player2Position).toBe(50); 
    expect(gameState.ballPosition).toEqual({ x: 50, y: 50 }); 
    expect(gameState.score).toEqual({ player1: 0, player2: 0 });
});
