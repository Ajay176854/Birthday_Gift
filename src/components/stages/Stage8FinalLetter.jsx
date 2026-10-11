import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { playBoom, playChime, playPop } from '../../utils/audio';

export default function Stage8FinalLetter({ onReplay }) {
  const [opened, setOpened] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (opened) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          triggerOpen();
          return 0;
        }
        playPop();
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [opened]);

  const triggerOpen = () => {
    setOpened(true);
    playBoom();
    confetti({
      particleCount: 180,
      spread: 120,
      origin: { y: 0.5 }
    });
  };

  const handleCelebrateMore = () => {
    playChime();
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="stage-container">
      <div className="final-container">
        {!opened ? (
          <>
            <h2 className="page-title">One Last Gift Straight From My Heart 🎁</h2>
            <p className="page-subtitle">Tap the gift box to unwrap your special birthday letter</p>

            <div className="gift-wrapper" onClick={triggerOpen}>
              <div className="gift-glow" />
              <img src="/assets/gift.jpg" alt="Gift Box" className="gift-img" />
              <div className="gift-bow">🎀</div>
              <div className="countdown">{countdown}</div>
            </div>
          </>
        ) : (
          <div className="greeting-card">
            <div className="card-ribbon-top">
              <span>A Letter For My Sona Kajal 💌</span>
            </div>

            <div className="letter-body">
              <p className="letter-intro">My dearest Sona Kajal,</p>

              <p>
                Today is entirely your special day, and I wanted to leave you with these words written straight from my heart. 💗
              </p>

              <p>
                You are genuinely such a rare and special person. Your smile, your presence, your innocence, and even the silly little things you do can instantly turn the heaviest moments into pure sunshine. Never ever forget how precious and irreplaceable you are. ✨
              </p>

              <p>
                I pray this birthday blesses you with boundless happiness, unforgettable memories, triumph in every single dream you chase, and people in your life who always cherish, respect, and love you wholeheartedly. 🦋
              </p>

              <p>
                Whenever life feels overwhelming or heavy, remember that you are far stronger than you realise and more loved than words can ever capture. Keep smiling, keep laughing, and most importantly, keep being your wonderfully unique self. 💕
              </p>

              <p>
                I built this entire little digital universe just to bring that radiant smile to your face. It might be code, animations, and glowing lights, but every single spark was crafted with love especially for you. If it made your heart feel warm even for a second, my gift has succeeded completely. ❤️
              </p>

              <p>
                May this new year of your life be filled with prosperity, good health, peace, laughter, and magical milestones! 🌹✨
              </p>

              <div className="letter-signature">
                <p className="highlight">Happy 23rd Birthday Sona Kajal! 🎂💐</p>
                <p className="highlight-sub">
                  Forever with endless love & blessings,<br />
                  Happy Birthday My Cutest Cry Baby! 🎉💖
                </p>
              </div>

              <div className="wax-seal">
                <span>💌 Kajal</span>
              </div>
            </div>

            <div className="final-actions">
              <button className="glow-button final-btn" onClick={handleCelebrateMore}>
                Celebrate Again 🎉
              </button>
              <button className="final-btn secondary-btn" onClick={onReplay}>
                Replay Journey 🔄
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
