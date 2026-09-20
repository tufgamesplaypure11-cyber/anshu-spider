import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Zap } from 'lucide-react';

interface Obstacle {
  x: number;
  w: number;
  h: number;
  passed: boolean;
}

interface Building {
  x: number;
  w: number;
  h: number;
  color: string;
}

export const SpiderSwingGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [gameRunning, setGameRunning] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [overlayTitle, setOverlayTitle] = useState<string>('ANSHU SPIDER ROOFTOP RUN');
  const [overlayDesc, setOverlayDesc] = useState<string>(
    'Rhythmic flow: 1 tap & hold swings you cleanly over an obstacle, release to soar across, then tap again for the next one!'
  );
  const [showOverlay, setShowOverlay] = useState<boolean>(true);

  // References for mutable game state inside requestAnimationFrame
  const gameStateRef = useRef({
    running: false,
    score: 0,
    highScore: 0,
    player: {
      x: 120,
      y: 180,
      vx: 2.4,
      vy: 0,
      radius: 13,
      isWebbed: false,
      anchorX: 0,
      anchorY: 0,
      ropeLength: 0,
    },
    obstacles: [] as Obstacle[],
    bgBuildings: [] as Building[],
    frame: 0,
    animId: 0,
  });

  const getGameBaseSpeed = (currentScore: number) => {
    return Math.min(5.2, 2.4 + currentScore * 0.04);
  };

  const spawnObstacle = useCallback((lastX: number, canvasHeight: number): Obstacle => {
    const speed = getGameBaseSpeed(gameStateRef.current.score);
    const minGap = 360 + speed * 20;
    const randGap = Math.random() * 90;
    const x = lastX + minGap + randGap;
    const w = 45 + Math.random() * 35;
    const maxH = Math.min(canvasHeight * 0.48, 170);
    const minH = 75;
    const h = minH + Math.random() * (maxH - minH);
    return { x, w, h, passed: false };
  }, []);

  const initSkyline = () => {
    const buildings: Building[] = [];
    let curX = 0;
    while (curX < 3500) {
      const w = 40 + Math.random() * 60;
      buildings.push({
        x: curX,
        w: w,
        h: 80 + Math.random() * 120,
        color: Math.random() > 0.5 ? '#0c1224' : '#080d1a',
      });
      curX += w + 8;
    }
    gameStateRef.current.bgBuildings = buildings;
  };

  const attachWeb = useCallback(() => {
    if (!gameStateRef.current.running) return;
    const { player } = gameStateRef.current;
    if (player.isWebbed) return;

    player.isWebbed = true;
    const forwardLead = 85 + getGameBaseSpeed(gameStateRef.current.score) * 10;
    player.anchorX = player.x + forwardLead;
    player.anchorY = 0;

    const dx = player.x - player.anchorX;
    const dy = player.y - player.anchorY;
    player.ropeLength = Math.max(120, Math.sqrt(dx * dx + dy * dy));

    if (player.vy > 0) {
      player.vy *= 0.25;
    }
  }, []);

  const detachWeb = useCallback(() => {
    const { player } = gameStateRef.current;
    if (!player.isWebbed) return;
    player.isWebbed = false;

    const currentSpeed = getGameBaseSpeed(gameStateRef.current.score);
    if (player.vx < currentSpeed * 1.1) {
      player.vx = Math.min(currentSpeed * 1.35, player.vx + 0.8);
    }
    if (player.vy < -1) {
      player.vy -= 0.6;
    }
  }, []);

  const gameOver = useCallback(() => {
    gameStateRef.current.running = false;
    setGameRunning(false);

    const finalScore = gameStateRef.current.score;
    if (finalScore > gameStateRef.current.highScore) {
      gameStateRef.current.highScore = finalScore;
      setHighScore(finalScore);
    }
    setOverlayTitle(`FINAL SCORE: ${finalScore}`);
    setOverlayDesc('Hit a rooftop spire! Timing your 1-tap swings gives maximum airtime. Try again!');
    setShowOverlay(true);
  }, []);

  const startGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    initSkyline();
    const baseSpeed = 2.4;
    const g = gameStateRef.current;

    g.player.x = 120;
    g.player.y = canvas.height * 0.42;
    g.player.vx = baseSpeed;
    g.player.vy = -0.5;
    g.player.isWebbed = false;
    g.player.anchorX = 0;
    g.player.anchorY = 0;
    g.player.ropeLength = 0;

    g.obstacles = [];
    g.score = 0;
    setScore(0);

    let nextX = 520;
    for (let i = 0; i < 4; i++) {
      const obs = spawnObstacle(nextX, canvas.height);
      nextX = obs.x;
      g.obstacles.push(obs);
    }

    g.running = true;
    setGameRunning(true);
    setShowOverlay(false);
  }, [spawnObstacle]);

  // Main animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const g = gameStateRef.current;
      if (!g.running) {
        animId = requestAnimationFrame(render);
        return;
      }

      g.frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const targetBaseSpeed = getGameBaseSpeed(g.score);
      const cameraOffset = g.player.x - 140;

      // Deep night sky
      ctx.fillStyle = '#050811';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Nebula glow
      const nebulaGrad = ctx.createRadialGradient(
        canvas.width * 0.7,
        80,
        20,
        canvas.width * 0.7,
        80,
        260
      );
      nebulaGrad.addColorStop(0, 'rgba(255, 42, 95, 0.12)');
      nebulaGrad.addColorStop(0.5, 'rgba(0, 102, 255, 0.08)');
      nebulaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars
      ctx.fillStyle = '#ffffff';
      for (let s = 0; s < 25; s++) {
        const sx = (s * 73 - cameraOffset * 0.15) % canvas.width;
        const normalizedSx = sx < 0 ? sx + canvas.width : sx;
        const sy = 25 + ((s * 37) % (canvas.height * 0.45));
        const alpha = 0.3 + 0.5 * Math.sin(g.frame * 0.03 + s);
        ctx.globalAlpha = Math.max(0.1, alpha);
        ctx.fillRect(normalizedSx, sy, s % 3 === 0 ? 2 : 1.5, s % 3 === 0 ? 2 : 1.5);
      }
      ctx.globalAlpha = 1.0;

      // Parallax background buildings
      for (let b = 0; b < g.bgBuildings.length; b++) {
        const bg = g.bgBuildings[b];
        const screenX = bg.x - cameraOffset * 0.35;
        if (screenX > -100 && screenX < canvas.width + 100) {
          ctx.fillStyle = bg.color;
          ctx.fillRect(screenX, canvas.height - bg.h, bg.w, bg.h);
        }
      }

      // Ceiling grid
      ctx.fillStyle = '#172033';
      ctx.fillRect(0, 0, canvas.width, 10);
      ctx.fillStyle = '#ff2a5f';
      for (let x = 0; x < canvas.width + 50; x += 36) {
        ctx.fillRect(x - (cameraOffset % 36), 7, 14, 3);
      }

      // Physics update
      const gravity = 0.22;
      g.player.vy += gravity;

      if (g.player.isWebbed) {
        const dx = g.player.x - g.player.anchorX;
        const dy = g.player.y - g.player.anchorY;
        const currentDist = Math.sqrt(dx * dx + dy * dy);

        if (currentDist > g.player.ropeLength) {
          const nx = dx / currentDist;
          const ny = dy / currentDist;
          const dot = g.player.vx * nx + g.player.vy * ny;
          g.player.vx -= dot * nx;
          g.player.vy -= dot * ny;

          g.player.vy -= 0.16;
          g.player.vx += 0.22;

          g.player.x = g.player.anchorX + nx * g.player.ropeLength;
          g.player.y = g.player.anchorY + ny * g.player.ropeLength;
        }

        // Draw web line
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(g.player.anchorX - cameraOffset, g.player.anchorY);
        ctx.lineTo(g.player.x - cameraOffset, g.player.y);
        ctx.stroke();

        // Anchor node
        ctx.fillStyle = '#00f2fe';
        ctx.beginPath();
        ctx.arc(g.player.anchorX - cameraOffset, g.player.anchorY + 6, 4.5, 0, Math.PI * 2);
        ctx.fill();

        g.player.anchorX -= targetBaseSpeed * 0.45;
      } else {
        if (g.player.vx > targetBaseSpeed) {
          g.player.vx -= 0.015;
        } else if (g.player.vx < targetBaseSpeed * 0.9) {
          g.player.vx += 0.03;
        }
      }

      g.player.x += g.player.vx;
      g.player.y += g.player.vy;

      // Ceiling and floor bounds
      if (g.player.y < 24) {
        g.player.y = 24;
        g.player.vy = Math.max(0, g.player.vy);
      }
      if (g.player.y > canvas.height - 18) {
        gameOver();
        return;
      }

      // Spawn next obstacles
      const lastObs = g.obstacles[g.obstacles.length - 1];
      if (lastObs && lastObs.x < cameraOffset + canvas.width + 200) {
        g.obstacles.push(spawnObstacle(lastObs.x, canvas.height));
      }

      // Draw and check obstacles
      for (let i = 0; i < g.obstacles.length; i++) {
        const obs = g.obstacles[i];
        const screenX = obs.x - cameraOffset;
        const obsY = canvas.height - obs.h;

        const grad = ctx.createLinearGradient(screenX, obsY, screenX + obs.w, canvas.height);
        grad.addColorStop(0, '#1a1836');
        grad.addColorStop(1, '#090d18');
        ctx.fillStyle = grad;
        ctx.fillRect(screenX, obsY, obs.w, obs.h);

        // Rooftop rim
        ctx.fillStyle = '#ff2a5f';
        ctx.fillRect(screenX, obsY, obs.w, 4);

        // Spire antenna
        const spireX = screenX + obs.w / 2 - 1.5;
        ctx.fillStyle = '#00f2fe';
        ctx.fillRect(spireX, obsY - 14, 3, 14);
        ctx.beginPath();
        ctx.arc(spireX + 1.5, obsY - 15, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ff2a5f';
        ctx.fill();

        // Building windows
        ctx.fillStyle = 'rgba(254, 240, 138, 0.85)';
        for (let wy = obsY + 16; wy < canvas.height - 10; wy += 20) {
          for (let wx = screenX + 8; wx < screenX + obs.w - 8; wx += 14) {
            if ((wx + wy) % 4 !== 0) {
              ctx.fillRect(wx, wy, 6, 9);
            }
          }
        }

        // Score increment
        if (!obs.passed && g.player.x > obs.x + obs.w) {
          obs.passed = true;
          g.score += 10;
          setScore(g.score);
        }

        // Collision check
        const pScreenX = g.player.x - cameraOffset;
        if (
          pScreenX + g.player.radius > screenX &&
          pScreenX - g.player.radius < screenX + obs.w &&
          g.player.y + g.player.radius > obsY
        ) {
          gameOver();
          return;
        }
      }

      // Cleanup passed obstacles
      if (g.obstacles.length > 0 && g.obstacles[0].x - cameraOffset < -200) {
        g.obstacles.shift();
      }

      // Draw Spider-Man Character
      const pScreenX = g.player.x - cameraOffset;
      ctx.save();
      ctx.translate(pScreenX, g.player.y);

      const tilt = Math.max(-0.6, Math.min(0.6, g.player.vy * 0.08));
      ctx.rotate(tilt);

      // Trailing web cape streamer
      ctx.strokeStyle = '#0066ff';
      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.moveTo(-10, 4);
      ctx.quadraticCurveTo(-18, 6 + Math.sin(g.frame * 0.25) * 5, -24, 2);
      ctx.stroke();

      // Body (Red sphere)
      ctx.fillStyle = '#ff2a5f';
      ctx.beginPath();
      ctx.arc(0, 0, g.player.radius, 0, Math.PI * 2);
      ctx.fill();

      // Outer glow rim
      ctx.strokeStyle = 'rgba(255, 42, 95, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // White eyes with dark outline
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(-3, -2, 3.5, 5, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(4, -2, 3.5, 5, 0.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [gameOver, spawnObstacle]);

  // Window resize observer
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        if (!gameStateRef.current.running) {
          startGame();
        } else {
          attachWeb();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        detachWeb();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [attachWeb, detachWeb, startGame]);

  return (
    <section className="scroll-mt-24" id="minigame">
      <div className="bg-gradient-to-b from-[#0e1628] to-[#070b14] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-spiderRed/20 text-spiderRed border border-spiderRed/40 text-xs font-tech font-bold">
                2D ARCADE
              </span>
              <h2 className="text-2xl sm:text-3xl font-fun text-white">Spider Rooftop Swing</h2>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Tap &amp; hold anywhere or Spacebar to anchor a web line to the ceiling grid and swing cleanly over rooftop spires!
            </p>
          </div>

          {/* Controls & Score HUD */}
          <div className="flex items-center gap-4">
            <div className="bg-black/50 border border-white/10 px-4 py-2 rounded-2xl text-center min-w-[90px]">
              <div className="text-[10px] font-tech text-slate-400 uppercase">Score</div>
              <div className="text-2xl font-fun text-spiderCyber" id="game-score">
                {score}
              </div>
            </div>
            <div className="bg-black/50 border border-white/10 px-4 py-2 rounded-2xl text-center min-w-[90px]">
              <div className="text-[10px] font-tech text-slate-400 uppercase">High Score</div>
              <div className="text-2xl font-fun text-amber-400" id="game-highscore">
                {highScore}
              </div>
            </div>
            <button
              id="btn-start-game"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-spiderRed to-pink-600 hover:from-pink-600 hover:to-spiderRed font-fun text-sm tracking-wider text-white shadow-lg shadow-spiderRed/30 transition-transform active:scale-95 cursor-pointer"
              onClick={startGame}
            >
              {gameRunning ? 'RESTART' : 'PLAY NOW'}
            </button>
          </div>
        </div>

        {/* Canvas Container */}
        <div
          ref={containerRef}
          className="relative w-full h-[360px] sm:h-[420px] bg-[#050811] rounded-2xl overflow-hidden border border-white/15 select-none"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full block cursor-crosshair"
            id="spiderCanvas"
            onMouseDown={(e) => {
              e.preventDefault();
              if (!gameStateRef.current.running) startGame();
              else attachWeb();
            }}
            onMouseUp={() => {
              if (gameStateRef.current.running) detachWeb();
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              if (!gameStateRef.current.running) startGame();
              else attachWeb();
            }}
            onTouchEnd={() => {
              if (gameStateRef.current.running) detachWeb();
            }}
          />

          {/* Start / Game Over Overlay */}
          {showOverlay && (
            <div
              className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-10 transition-opacity"
              id="game-overlay"
            >
              <div className="w-16 h-16 rounded-2xl bg-spiderRed/20 border border-spiderRed flex items-center justify-center mb-4 text-spiderRed">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="font-fun text-3xl sm:text-4xl text-white mb-2" id="overlay-title">
                {overlayTitle}
              </h3>
              <p className="text-slate-300 text-sm max-w-md mb-6 font-tech" id="overlay-desc">
                {overlayDesc}
              </p>
              <button
                id="btn-overlay-start"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-spiderRed via-pink-500 to-amber-400 text-white font-fun text-base tracking-wider hover:scale-105 active:scale-95 transition-all shadow-xl shadow-spiderRed/40 cursor-pointer"
                onClick={startGame}
              >
                START SWINGING
              </button>
            </div>
          )}

          {/* Mobile / Quick Tap Action Hint */}
          <div className="absolute bottom-3 left-4 text-[11px] font-tech text-slate-400 bg-black/60 px-3 py-1 rounded-lg pointer-events-none">
            Rhythm: Tap to web-swing • Release to glide effortlessly over obstacles
          </div>
        </div>
      </div>
    </section>
  );
};
