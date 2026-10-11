import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playPop, playChime } from '../../utils/audio';

const BALLOONS = [
  { id: 1, word: 'You 🫵', class: 'balloon-1' },
  { id: 2, word: 'are 💫', class: 'balloon-2' },
  { id: 3, word: 'so ✨', class: 'balloon-3' },
  { id: 4, word: 'special 💖', class: 'balloon-4' },
  { id: 5, word: 'to 🎀', class: 'balloon-5' },
  { id: 6, word: 'me 🥺', class: 'balloon-6' }
];

export default function Stage2Balloons({ onNext }) {
  const [popped, setPopped] = useState([]);

  const handlePop = (b) => {
    if (popped.includes(b.id)) return;
    playPop();
    const nextPopped = [...popped, b.id];
    setPopped(nextPopped);

    if (nextPopped.length === BALLOONS.length) {
      playChime();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const allPopped = popped.length === BALLOONS.length;

  return (
    <div className="stage-container">
      <div className="section-header">
        <h2 className="page-title">Pop Every Balloon To Reveal The Secret 🎈</h2>
        <p className="page-subtitle">Tap each floating balloon one by one!</p>
        <div className="progress-pill">
          {allPopped ? 'All balloons popped! 🎉💖' : `Popped: ${popped.length} / ${BALLOONS.length}`}
        </div>
      </div>

      <div className="balloon-container">
        {BALLOONS.map((b) => {
          const isPopped = popped.includes(b.id);
          return (
            <div
              key={b.id}
              className={`balloon ${b.class} ${isPopped ? 'popped' : ''}`}
              onClick={() => handlePop(b)}
            >
              <div className="balloon-string" />
            </div>
          );
        })}
      </div>

      <div className="sentence">
        {BALLOONS.filter((b) => popped.includes(b.id)).map((b) => (
          <span key={b.id}>{b.word}</span>
        ))}
      </div>

      <div className="nav-controls">
        {allPopped && (
          <button className="glow-button next-btn" onClick={onNext}>
            Continue Journey ➡️
          </button>
        )}
      </div>
    </div>
  );
}
