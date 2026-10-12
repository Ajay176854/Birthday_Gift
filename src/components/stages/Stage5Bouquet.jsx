import React, { useState } from 'react';
import { playPop } from '../../utils/audio';

const SECRETS = [
  { id: 1, text: 'Always Happy 😊', class: 'msg-1' },
  { id: 2, text: 'You are so cute 🥰', class: 'msg-2' },
  { id: 3, text: 'My Cry Baby 😭', class: 'msg-3' },
  { id: 4, text: 'Sweetest Person 🍬', class: 'msg-4' },
  { id: 5, text: 'Stay Blessed 😇', class: 'msg-5' },
  { id: 6, text: 'Beautiful Soul 🌸', class: 'msg-6' },
  { id: 7, text: 'Precious ✨', class: 'msg-7' },
  { id: 8, text: 'Cutie Pie 🥧', class: 'msg-8' },
  { id: 9, text: 'Never Change 🥺', class: 'msg-9' },
  { id: 10, text: 'Lots of Love ❤️', class: 'msg-10' }
];

export default function Stage5Bouquet({ onNext }) {
  const [activeBadge, setActiveBadge] = useState(null);

  const handleClickBadge = (id) => {
    setActiveBadge(id);
    playPop();
    setTimeout(() => setActiveBadge(null), 800);
  };

  return (
    <div className="stage-container">
      <div className="section-header">
        <h2 className="page-title">A Bouquet Of 10 Sweet Thoughts 🌹</h2>
        <p className="page-subtitle">Tap each floating secret badge around the roses!</p>
      </div>

      <div className="bouquet-container">
        <img src="/assets/rose.jpg" alt="Rose Bouquet" className="bouquet-img" />

        <div className="bouquet-badges-wrapper">
          {SECRETS.map((s) => (
            <div
              key={s.id}
              className={`msg ${s.class}`}
              style={{
                transform: activeBadge === s.id ? 'scale(1.25)' : undefined,
                transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
              onClick={() => handleClickBadge(s.id)}
            >
              {s.text}
            </div>
          ))}
        </div>
      </div>

      <div className="nav-controls">
        <button className="glow-button next-btn" onClick={onNext}>
          Discover Next ➡️
        </button>
      </div>
    </div>
  );
}
