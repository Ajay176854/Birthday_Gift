import React, { useState } from 'react';
import { playChime } from '../../utils/audio';

const CARDS = [
  {
    id: 1,
    badge: '👑 AWARD #1',
    icon: '😭',
    title: 'The Crybaby Trophy',
    backTitle: "World's Cutest Crybaby 🏆",
    backText: 'Officially certified for shedding tears over cute reels, silly moments, and dramatic pouts. Even with tears, you look 100x adorable!'
  },
  {
    id: 2,
    badge: '✨ SUPERPOWER',
    icon: '😊',
    title: 'Million-Dollar Smile',
    backTitle: 'Instant Mood Lifter ☀️',
    backText: 'Your smile has a magical power to light up the whole room and turn the gloomiest day into a warm festival of happiness.'
  },
  {
    id: 3,
    badge: '💛 TREASURE',
    icon: '🌸',
    title: 'Heart of Pure Gold',
    backTitle: 'Rare & Precious Soul 💎',
    backText: 'In a loud and chaotic world, you carry genuine kindness, empathy, and care for everyone around you. Never lose this gem.'
  },
  {
    id: 4,
    badge: '🎀 VIBES',
    icon: '👑',
    title: 'Queen of Drama',
    backTitle: 'Sweetest Drama Queen 💅',
    backText: 'Life would be utterly boring without your cute angry faces, dramatic voice notes, and playful little tantrums!'
  }
];

export default function Stage6FlipCards({ onNext }) {
  const [flipped, setFlipped] = useState([]);

  const handleCardClick = (id) => {
    playChime();
    setFlipped((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="stage-container">
      <div className="section-header">
        <h2 className="page-title">Official Birthday Honors For Sona Kajal 👑</h2>
        <p className="page-subtitle">Tap each card to flip and reveal the secret honors!</p>
      </div>

      <div className="cards-grid">
        {CARDS.map((c) => {
          const isFlipped = flipped.includes(c.id);
          return (
            <div
              key={c.id}
              className={`flip-card ${isFlipped ? 'flipped' : ''}`}
              onClick={() => handleCardClick(c.id)}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="card-badge">{c.badge}</div>
                  <div className="card-icon">{c.icon}</div>
                  <h3>{c.title}</h3>
                  <p className="tap-hint" style={{ fontSize: '0.75rem', color: '#ffb8b8', marginTop: '10px' }}>
                    Tap to flip 🔄
                  </p>
                </div>
                <div className="flip-card-back">
                  <h4>{c.backTitle}</h4>
                  <p>{c.backText}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="award-banner">
        <img src="/assets/crown.jpg" alt="Princess Crown" className="award-crown-img" />
        <div className="award-text">
          <span className="royal-title">Honored Princess Sona Kajal</span>
          <span className="royal-sub">Reigning Queen of Smiles & Cuteness 💖</span>
        </div>
      </div>

      <div className="nav-controls">
        <button className="glow-button next-btn" onClick={onNext}>
          To The Grand Celebration 🎆
        </button>
      </div>
    </div>
  );
}
