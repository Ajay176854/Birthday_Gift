import React from 'react';
import { toggleMusic } from '../utils/audio';

export default function MusicController({ isPlaying, setIsPlaying }) {
  const handleClick = () => {
    toggleMusic((playing) => setIsPlaying(playing));
  };

  return (
    <div className="music-controller" onClick={handleClick} title="Toggle Birthday Music">
      <div className={`vinyl-disk ${!isPlaying ? 'paused' : ''}`}>
        <span className="music-icon">🎵</span>
      </div>
      <div className="music-info">
        <span className="music-title">Birthday Melody</span>
        <div className={`sound-wave ${!isPlaying ? 'paused' : ''}`}>
          <span></span><span></span><span></span><span></span>
        </div>
      </div>
    </div>
  );
}
