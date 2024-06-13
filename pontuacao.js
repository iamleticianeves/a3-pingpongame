import unittest

def pontuacao_maxima(jogador1, jogador2):
    if jogador1 >= 21 or jogador2 >= 21:
        if abs(jogador1 - jogador2) >= 2:
            return max(jogador1, jogador2)
    return None

class TestPingPong(unittest.TestCase):
    
    def test_pontuacao_maxima(self):
        self.assertEqual(pontuacao_maxima(21, 19), 21)
        self.assertEqual(pontuacao_maxima(22, 24), 24)
        self.assertIsNone(pontuacao_maxima(18, 20))
        self.assertEqual(pontuacao_maxima(21, 20), 21)
        self.assertEqual(pontuacao_maxima(19, 21), 21)
        self.assertEqual(pontuacao_maxima(23, 21), 23)
        self.assertEqual(pontuacao_maxima(24, 22), 24)
        self.assertIsNone(pontuacao_maxima(15, 18))

if __name__ == '__main__':
    unittest.main()
