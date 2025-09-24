import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const DinoGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Game variables
  const gameState = useRef({
    dino: { x: 50, y: 150, width: 44, height: 47, jumping: false, yVelocity: 0 },
    obstacles: [] as Array<{ x: number; y: number; width: number; height: number }>,
    ground: { x: 0 },
    gameSpeed: 6,
    gravity: 0.6,
    jumpForce: -15,
    score: 0
  });

  const startGame = useCallback(() => {
    setIsGameRunning(true);
    setIsGameOver(false);
    setScore(0);
    gameState.current = {
      dino: { x: 50, y: 150, width: 44, height: 47, jumping: false, yVelocity: 0 },
      obstacles: [],
      ground: { x: 0 },
      gameSpeed: 6,
      gravity: 0.6,
      jumpForce: -15,
      score: 0
    };
  }, []);

  const jump = useCallback(() => {
    if (!gameState.current.dino.jumping && isGameRunning) {
      gameState.current.dino.jumping = true;
      gameState.current.dino.yVelocity = gameState.current.jumpForce;
    }
  }, [isGameRunning]);

  const endGame = useCallback(() => {
    setIsGameRunning(false);
    setIsGameOver(true);
    setScore(gameState.current.score);
    if (gameState.current.score > highScore) {
      setHighScore(gameState.current.score);
      localStorage.setItem('dinoHighScore', gameState.current.score.toString());
    }
  }, [highScore]);

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('dinoHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  // Handle keyboard and touch events
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        if (!isGameRunning && !isGameOver) {
          startGame();
        } else if (isGameOver) {
          startGame();
        } else {
          jump();
        }
      }
    };

    const handleTouch = () => {
      if (!isGameRunning && !isGameOver) {
        startGame();
      } else if (isGameOver) {
        startGame();
      } else {
        jump();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    const gameElement = gameRef.current;
    gameElement?.addEventListener('touchstart', handleTouch);
    gameElement?.addEventListener('click', handleTouch);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      gameElement?.removeEventListener('touchstart', handleTouch);
      gameElement?.removeEventListener('click', handleTouch);
    };
  }, [jump, startGame, isGameRunning, isGameOver]);

  // Game loop
  useEffect(() => {
    if (!isGameRunning) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const gameLoop = () => {
      // Clear canvas
      ctx.fillStyle = '#f7f7f7';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update game state
      const game = gameState.current;

      // Update dino physics
      if (game.dino.jumping) {
        game.dino.yVelocity += game.gravity;
        game.dino.y += game.dino.yVelocity;

        if (game.dino.y >= 150) {
          game.dino.y = 150;
          game.dino.jumping = false;
          game.dino.yVelocity = 0;
        }
      }

      // Update ground
      game.ground.x -= game.gameSpeed;
      if (game.ground.x <= -24) {
        game.ground.x = 0;
      }

      // Draw ground
      ctx.fillStyle = '#525252';
      for (let i = 0; i < canvas.width; i += 24) {
        ctx.fillRect(i + game.ground.x, 200, 12, 2);
      }

      // Spawn obstacles
      if (game.obstacles.length === 0 || game.obstacles[game.obstacles.length - 1].x < canvas.width - 300) {
        if (Math.random() < 0.02) {
          game.obstacles.push({
            x: canvas.width,
            y: 170,
            width: 17,
            height: 35
          });
        }
      }

      // Update and draw obstacles
      game.obstacles = game.obstacles.filter(obstacle => {
        obstacle.x -= game.gameSpeed;

        // Draw cactus (emoji)
        ctx.font = '30px Arial';
        ctx.fillText('🌵', obstacle.x, obstacle.y + 25);
        
        // Collision detection
        if (
          game.dino.x < obstacle.x + obstacle.width &&
          game.dino.x + game.dino.width > obstacle.x &&
          game.dino.y < obstacle.y + obstacle.height &&
          game.dino.y + game.dino.height > obstacle.y
        ) {
          endGame();
        }

        return obstacle.x > -obstacle.width;
      });

      // Draw dino (dinosaur character)
      ctx.fillStyle = '#525252';
      ctx.font = '40px Arial';
      ctx.fillText('🦕', game.dino.x, game.dino.y + 35);

      // Update score
      game.score += 1;
      if (game.score % 100 === 0) {
        game.gameSpeed += 0.5;
      }

      // Draw score
      ctx.fillStyle = '#525252';
      ctx.font = '16px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(String(Math.floor(game.score / 10)).padStart(5, '0'), canvas.width - 20, 30);

      if (isGameRunning) {
        animationId = requestAnimationFrame(gameLoop);
      }
    };

    gameLoop();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isGameRunning, endGame]);

  return (
    <motion.section 
      className="py-12 px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Title Section */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            🎮 Take a Break, Play Game!
          </h2>
          <p className="text-gray-400">Classic dinosaur runner game - tap or press space to jump</p>
        </motion.div>

        <motion.div
          ref={gameRef}
          className="relative bg-white rounded-xl overflow-hidden shadow-xl border-2 border-gray-300 cursor-pointer select-none mx-auto"
          style={{ maxWidth: '600px' }}
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <canvas
            ref={canvasRef}
            width={600}
            height={220}
            className="block w-full h-auto"
            style={{ imageRendering: 'pixelated' }}
          />
          
          {/* Touch Jump Button for Mobile */}
          <div className="absolute bottom-4 right-4 md:hidden">
            <button
              onTouchStart={(e) => {
                e.preventDefault();
                if (!isGameRunning && !isGameOver) {
                  startGame();
                } else if (isGameOver) {
                  startGame();
                } else {
                  jump();
                }
              }}
              className="bg-gray-800/80 hover:bg-gray-700/80 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg active:scale-95 transition-all"
            >
              🦘 JUMP
            </button>
          </div>
          
          {/* Game Over Screen */}
          {isGameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/90">
              <div className="text-center">
                <div className="text-gray-600 text-lg mb-2 font-mono">GAME OVER</div>
                <div className="text-gray-800 text-2xl mb-1 font-mono">{Math.floor(score / 10)}</div>
                <div className="text-gray-500 text-sm mb-4 font-mono">HI {Math.floor(highScore / 10)}</div>
                <div className="text-gray-600 text-xs font-mono">Tap screen or press SPACE to restart</div>
              </div>
            </div>
          )}

          {/* Start Screen */}
          {!isGameRunning && !isGameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/90">
              <div className="text-center">
                <div className="text-gray-600 text-lg mb-4 font-mono">Tap screen or press SPACE to play</div>
                <div className="text-gray-500 text-xs font-mono">HI {Math.floor(highScore / 10)}</div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default DinoGame;