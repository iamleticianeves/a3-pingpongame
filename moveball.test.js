const PingPongGame = require('./pingpong');
const { performance } = require('perf_hooks');

describe('Teste de Desempenho do PingPongGame', () => {
    let game;

    beforeEach(() => {
        game = new PingPongGame();
    });

    test('desempenho do moveBall', () => {
        const startTime = performance.now();
        for (let i = 0; i < 1000; i++) {
            game.moveBall();
        }
        const endTime = performance.now();
        const duration = endTime - startTime;

        console.log(`moveBall took ${duration}ms for 1000 iterations`);
        expect(duration).toBeLessThan(50); // Ajuste o valor conforme necessário para seu contexto
    });

    it('Deve inicializar sem contas', () => {
        expect(game.score).toEqual([0, 0]);
        expect(game.ball.x).toBe(400);
        expect(game.ball.y).toBe(300);
    });

    it('deve movimentar a bola corretamente', () => {
        game.moveBall();
        expect(game.ball.x).toBe(405);
        expect(game.ball.y).toBe(305);
    });

    test('deve colidir com as bordas superior e inferior', () => {
        game.ball.y = 0;
        game.ball.speedY = -5;
        game.moveBall();
        expect(game.ball.speedY).toBe(5);

        game.ball.y = game.screenHeight - game.ball.size;
        game.ball.speedY = 5;
        game.moveBall();
        expect(game.ball.speedY).toBe(-5);
    });

    test('deve colidir com as raquetes', () => {
        game.ball.x = game.paddles[0].width;
        game.ball.y = game.paddles[0].y + game.paddles[0].height / 2;
        game.ball.speedX = -5;
        game.moveBall();
        expect(game.ball.speedX).toBe(5);

        game.ball.x = game.screenWidth - game.paddles[1].width - game.ball.size;
        game.ball.y = game.paddles[1].y + game.paddles[1].height / 2;
        game.ball.speedX = 5;
        game.moveBall();
        expect(game.ball.speedX).toBe(-5);
    });

    test('deve atualizar o placar e reiniciar a bola quando passa pelas bordas esquerda ou direita', () => {
        game.ball.x = -1;
        game.moveBall();
        expect(game.score[1]).toBe(1);
        expect(game.ball.x).toBe(game.screenWidth / 2);

        game.ball.x = game.screenWidth + 1;
        game.moveBall();
        expect(game.score[0]).toBe(1);
        expect(game.ball.x).toBe(game.screenWidth / 2);
    });
});
