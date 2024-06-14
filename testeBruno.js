// tests/game.test.js
const io = require(&#39;socket.io-client&#39;);
const { Server } = require(&#39;http&#39;);
const { startServer, stopServer } = require(&#39;../index&#39;); // ajuste o
caminho conforme necessário
const socketOptions = {
  transports: [&#39;websocket&#39;],
  forceNew: true,
};
let socket1, socket2;
beforeAll(async () =&gt; {
  await startServer(); // iniciar o servidor para testes
});
afterAll(async () =&gt; {
  await stopServer(); // parar o servidor após os testes
});
beforeEach((done) =&gt; {
  socket1 = io(&#39;http://localhost:3000&#39;, socketOptions);
  socket2 = io(&#39;http://localhost:3000&#39;, socketOptions);
  socket1.on(&#39;connect&#39;, () =&gt; {
    socket2.on(&#39;connect&#39;, () =&gt; {
      done();
    });
  });
});
afterEach((done) =&gt; {
  socket1.disconnect();
  socket2.disconnect();
  done();
});
describe(&#39;Game mechanics tests&#39;, () =&gt; {
  test(&#39;Player movement updates correctly&#39;, (done) =&gt; {
    // simular movimento do jogador
    socket1.emit(&#39;join&#39;);
    socket1.on(&#39;playerNo&#39;, (playerNo) =&gt; {
      expect(playerNo).toBe(1);
      socket1.emit(&#39;move&#39;, { roomID: 1, direction: &#39;up&#39;, playerNo: 1 });
      socket1.on(&#39;updateGame&#39;, (room) =&gt; {
        expect(room.players[0].y).toBeLessThan(200); // verificar
movimento para cima
        done();
      });

    });
  });
  test(&#39;Game state updates correctly after player scores&#39;, (done) =&gt; {
    // simular pontuação de um jogador
    socket1.emit(&#39;join&#39;);
    socket1.on(&#39;playerNo&#39;, () =&gt; {
      socket2.emit(&#39;join&#39;);
      socket2.on(&#39;playerNo&#39;, () =&gt; {
        // Emular pontuação para jogador 1
        const roomID = 1;
        const initialScore = 0;
        socket1.emit(&#39;move&#39;, { roomID, direction: &#39;up&#39;, playerNo: 1 });
// move player 1
        socket1.on(&#39;updateGame&#39;, (room) =&gt; {
          if (room.players[0].score === initialScore + 1) {
            expect(room.players[0].score).toBe(1); // verificar se a
pontuação do jogador 1 aumentou
            done();
          }
        });
      });
    });
  });
});
