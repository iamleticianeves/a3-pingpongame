const { checkForWinner } = require('./main.js');

describe('Teste de Verificação de Vencedor', () => {

    beforeEach(() => {
        // Se houvesse algum mock para limpar, faria aqui.
    });

    it('Deve detectar a vitória do jogador 1', () => {
        let gameState = {
            score: { player1: 10, player2: 5 },
            winningScore: 10
        };
        const winner = checkForWinner(gameState);
        expect(winner).toBe('player1');
    });

    it('Deve detectar a vitória do jogador 2', () => {
        let gameState = {
            score: { player1: 8, player2: 10 },
            winningScore: 10
        };
        const winner = checkForWinner(gameState);
        expect(winner).toBe('player2');
    });

    it('Não deve haver vencedor se nenhum jogador atingiu a pontuação de vitória', () => {
        let gameState = {
            score: { player1: 8, player2: 9 },
            winningScore: 10
        };
        const winner = checkForWinner(gameState);
        expect(winner).toBeNull(); // ou qualquer valor que a função retorne quando não há vencedor
    });

    it('Deve detectar vitória quando ambos os jogadores atingem a pontuação de vitória, mas o jogador 1 tem mais pontos', () => {
        let gameState = {
            score: { player1: 12, player2: 10 },
            winningScore: 10
        };
        const winner = checkForWinner(gameState);
        expect(winner).toBe('player1');
    });

    it('Deve detectar vitória quando ambos os jogadores atingem a pontuação de vitória, mas o jogador 2 tem mais pontos', () => {
        let gameState = {
            score: { player1: 10, player2: 15 },
            winningScore: 10
        };
        const winner = checkForWinner(gameState);
        expect(winner).toBe('player2');
    });
});

