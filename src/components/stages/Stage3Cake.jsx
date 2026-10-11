import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playBlow, playSlice, playChime } from '../../utils/audio';

export default function Stage3Cake({ onNext }) {
  const [blown, setBlown] = useState(false);
  const [cut, setCut] = useState(false);
  const [dimmed, setDimmed] = useState(false);
  const [sparklers, setSparklers] = useState(false);

  const handleBlow = () => {
    if (blown) return;
    setBlown(true);
    playBlow();
    setDimmed(true);

    setTimeout(() => {
      setDimmed(false);
      setSparklers(true);
      playChime();
    }, 1400);
  };

  const handleCut = () => {
    if (cut) return;
    setCut(true);
    playSlice();

    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 }
      });
      playChime();
    }, 800);
  };

  return (
    <div className="stage-container">
      <div className="section-header">
        <h2 className="page-title">Make A Wish & Blow The Candle 🕯️✨</h2>
        <p className="page-subtitle">
          {!blown ? 'Tap the candle or button to blow out the flame!' : 'Now cut your birthday cake!'}
        </p>
      </div>

      <div className="cake-stage">
        {sparklers && (
          <>
            <div className="sparkler sparkler-left" />
            <div className="sparkler sparkler-right" />
          </>
        )}

        <div className="cake-box">
          <img src="/assets/cake.jpg" alt="Birthday Cake" className="cake-img" />

          <div className="candle-wrapper" onClick={handleBlow} title="Tap to blow candle">
            <div className="candle-stick" />
            <div className={`flame ${blown ? 'extinguished' : ''}`}>
              <div className="flame-inner" />
              <div className="flame-glow" />
            </div>
            {blown && <div className="smoke" />}
          </div>

          {cut && <div className="cake-knife">🔪</div>}
        </div>
      </div>

      <div className="cake-actions" style={{ display: 'flex', gap: '15px', zIndex: 20 }}>
        {!blown ? (
          <button className="glow-button" onClick={handleBlow}>
            Blow Candle 🕯️💨
          </button>
        ) : !cut ? (
          <button className="glow-button" onClick={handleCut}>
            Cut The Cake 🎂🔪
          </button>
        ) : null}
      </div>

      {cut && (
        <h1 className="bday-text">Happy 23rd Birthday Sona Kajal! 🎉💖</h1>
      )}

      <div className="nav-controls">
        {cut && (
          <button className="glow-button next-btn" onClick={onNext}>
            Next Surprise ➡️
          </button>
        )}
      </div>

      <div className={`dark-overlay ${dimmed ? 'dimmed' : ''}`} />
    </div>
  );
}
