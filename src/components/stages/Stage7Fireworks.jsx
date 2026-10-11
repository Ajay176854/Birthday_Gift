import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { playBoom } from '../../utils/audio';

export default function Stage7Fireworks({ onNext }) {
  const canvasRef = useRef(null);
  const [wandMode, setWandMode] = useState(false);
  const stateRef = useRef({ rockets: [], particles: [], wand: false });

  stateRef.current.wand = wandMode;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const loop = () => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';

      const { rockets, particles } = stateRef.current;

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;
        r.traveled += r.speed;

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = r.color;
        ctx.fill();
        ctx.restore();

        if (r.traveled >= r.targetDist) {
          createExplosion(r.x, r.y, r.type, r.color);
          rockets.splice(i, 1);
        }
      }

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= 0.98;
        p.vy = p.vy * 0.98 + 0.05;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const createExplosion = (x, y, type, color) => {
    const { particles } = stateRef.current;
    if (type === 'heart') {
      const count = 45;
      for (let i = 0; i < count; i++) {
        const t = (Math.PI * 2 * i) / count;
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        particles.push({
          x,
          y,
          vx: hx * 0.22,
          vy: hy * 0.22,
          color: '#ff758c',
          alpha: 1,
          decay: 0.015
        });
      }
    } else {
      const count = 50;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = Math.random() * 5 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          alpha: 1,
          decay: Math.random() * 0.015 + 0.012
        });
      }
    }
  };

  const launch = (targetX, targetY, type = 'random') => {
    playBoom();
    const colors = ['#ff758c', '#ff7eb3', '#ffd166', '#a29bfe', '#55efc4'];
    const startX = targetX + (Math.random() * 40 - 20);
    const startY = window.innerHeight;
    const angle = Math.atan2(targetY - startY, targetX - startX);
    const speed = 14;

    stateRef.current.rockets.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      speed,
      targetDist: Math.hypot(targetX - startX, targetY - startY),
      traveled: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
      type
    });
  };

  const handlePointerDown = (e) => {
    launch(e.clientX, e.clientY, 'random');
  };

  const handlePointerMove = (e) => {
    if (!stateRef.current.wand) return;
    for (let i = 0; i < 2; i++) {
      stateRef.current.particles.push({
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        color: '#ffd166',
        alpha: 1,
        decay: 0.025
      });
    }
  };

  const handleHeartFirework = () => {
    launch(window.innerWidth / 2, window.innerHeight * 0.35, 'heart');
  };

  const handleGrandBlast = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 }
    });
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const rx = Math.random() * (window.innerWidth * 0.8) + window.innerWidth * 0.1;
        const ry = Math.random() * (window.innerHeight * 0.5) + window.innerHeight * 0.1;
        launch(rx, ry, Math.random() > 0.5 ? 'heart' : 'random');
      }, i * 160);
    }
  };

  return (
    <div className="stage-container" onPointerMove={handlePointerMove}>
      <canvas ref={canvasRef} className="fireworks-canvas" />

      <div className="section-header">
        <h2 className="page-title">A Sky Full Of Fireworks Just For You 🎆</h2>
        <p className="page-subtitle">Tap anywhere on the night sky to launch sparkling fireworks!</p>
      </div>

      <div className="fireworks-interactive-zone" onPointerDown={handlePointerDown}>
        <div className="tap-sky-guide">
          <span>👆 Tap anywhere on the sky! 🌟</span>
        </div>
      </div>

      <div className="firework-toolbar">
        <button className="toolbar-btn" onClick={handleHeartFirework}>
          💖 Launch Heart Firework
        </button>
        <button
          className={`toolbar-btn ${wandMode ? 'active' : ''}`}
          onClick={() => setWandMode(!wandMode)}
        >
          {wandMode ? '✨ Wand ON (Move Cursor)' : '✨ Sparkler Wand'}
        </button>
        <button className="toolbar-btn blast-btn" onClick={handleGrandBlast}>
          🚀 GRAND CELEBRATION BLAST!
        </button>
      </div>

      <div className="nav-controls">
        <button className="glow-button next-btn" onClick={onNext}>
          Open Final Surprise 🎁
        </button>
      </div>
    </div>
  );
}
