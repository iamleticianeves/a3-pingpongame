const { pauseGame, resumeGame } = require('./game'); 

test('Pausar e retomar o jogo', () => {
    let gameState = {
        isPaused: false,
        ballPosition: { x: 50, y: 50 },
        ballDirection: { x: 1, y: 1 }
    };
    
    gameState = pauseGame(gameState);
    expect(gameState.isPaused).toBe(true);     
    gameState = resumeGame(gameState);
    expect(gameState.isPaused).toBe(false); 
});
