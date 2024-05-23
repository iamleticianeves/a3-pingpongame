const { updateBallPosition } = require('./game'); 

test('Colisão da bola com a borda superior', () => {
    let gameState = { ballPosition: { x: 50, y: 1 }, ballDirection: { x: 1, y: -1 } };
    gameState = updateBallPosition(gameState);
    expect(gameState.ballDirection.y).toBe(1);
});

