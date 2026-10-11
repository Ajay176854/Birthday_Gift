import React, { useState } from 'react';
import { playChime } from '../../utils/audio';

export default function Stage1Login({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [error, setError] = useState(false);

  const handleUnlock = (e) => {
    if (e) e.preventDefault();
    const val = password.trim().toLowerCase();
    if (val === 'crybaby' || val === 'cry baby' || val === 'kajal' || val === 'sona' || val === 'cry' || val === '') {
      setError(false);
      playChime();
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div className="stage-container">
      <div className="glass-card entrance-card">
        <div className="lock-icon-wrapper">
          <span className="lock-emoji">🔐</span>
        </div>
        <h4 className="sub-title">A LITTLE SURPRISE FOR YOU ✨</h4>
        <h1 className="main-title">One Small Gift From Me</h1>
        <p className="tagline">I’ve always wanted to call you like this 💗</p>

        <form onSubmit={handleUnlock} className="input-group">
          <input
            type="password"
            placeholder="Enter secret code..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <button type="submit" className="glow-button">
            Unlock ✨
          </button>
        </form>

        <div className="hint-container">
          <span className="hint-toggle" onClick={() => setShowHint(!showHint)}>
            Need a hint? 🤫
          </span>
          {showHint && (
            <p className="hint-text">
              Password hint: What I lovingly call you (starts with "c", ends with "y" - 7 letters) 🥺
            </p>
          )}
        </div>

        {error && (
          <p className="shake-text" style={{ color: '#ff4d6d', marginTop: '12px' }}>
            Wrong password, cute crybaby! Try again 🥺💕
          </p>
        )}
      </div>
    </div>
  );
}
