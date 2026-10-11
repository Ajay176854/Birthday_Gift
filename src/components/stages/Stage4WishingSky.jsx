import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playPop, playChime } from '../../utils/audio';

const WISHES = [
  { id: 1, icon: '🌟', title: 'Endless Success & Dreams', text: 'May all your sweetest dreams and secret hopes come true this year! 🌟' },
  { id: 2, icon: '🕊️', title: 'Peace & Eternal Smiles', text: 'Peace, endless joy, beautiful smiles, and laughter that never ends! 🕊️' },
  { id: 3, icon: '💖', title: 'Everlasting Love & Care', text: 'May you always stay protected, deeply loved, and cherished forever! 💖' },
  { id: 4, icon: '🥺', title: 'Forever Pure & Cute', text: 'Never lose your innocent spark and adorable cute pout, my crybaby! 🥺✨' }
];

export default function Stage4WishingSky({ onNext }) {
  const [selectedWish, setSelectedWish] = useState(WISHES[0]);
  const [released, setReleased] = useState(false);
  const [showConstellation, setShowConstellation] = useState(false);

  const handleSelect = (w) => {
    setSelectedWish(w);
    playPop();
  };

  const handleRelease = () => {
    if (released) return;
    setReleased(true);
    playChime();

    setTimeout(() => {
      setShowConstellation(true);
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 }
      });
      playChime();
    }, 1800);
  };

  return (
    <div className="stage-container">
      <div className="section-header">
        <h2 className="page-title">Send Your Birthday Wish To The Stars 🏮✨</h2>
        <p className="page-subtitle">Choose a wish and release your glowing lantern into the galaxy</p>
      </div>

      <div className="wishing-container">
        {!released && (
          <div className="wish-options">
            {WISHES.map((w) => (
              <div
                key={w.id}
                className={`wish-card ${selectedWish.id === w.id ? 'active' : ''}`}
                onClick={() => handleSelect(w)}
              >
                <span className="wish-icon">{w.icon}</span>
                <span className="wish-text">{w.title}</span>
              </div>
            ))}
          </div>
        )}

        <div className="lantern-stage">
          <div className={`sky-lantern ${released ? 'floating-away' : ''}`}>
            <img src="/assets/lantern.jpg" alt="Sky Lantern" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {!released && (
          <button className="glow-button lantern-btn" onClick={handleRelease}>
            Release Lantern 🏮
          </button>
        )}

        {showConstellation && (
          <div className="constellation-card">
            <h3 className="constellation-title">✨ KAJAL'S CONSTELLATION ✨</h3>
            <p className="constellation-msg">
              "{selectedWish.text}"<br />
              <span style={{ color: '#ffd166', fontStyle: 'italic', marginTop: '8px', display: 'inline-block' }}>
                — The universe has carried your wish into the stars. May it shine forever! ✨
              </span>
            </p>
          </div>
        )}
      </div>

      <div className="nav-controls">
        {showConstellation && (
          <button className="glow-button next-btn" onClick={onNext}>
            Continue The Magic ➡️
          </button>
        )}
      </div>
    </div>
  );
}
