import React, { useState } from 'react';
import MusicController from './components/MusicController';
import MilestoneStepper from './components/MilestoneStepper';
import AmbientBackground from './components/AmbientBackground';

import Stage1Login from './components/stages/Stage1Login';
import Stage2Balloons from './components/stages/Stage2Balloons';
import Stage3Cake from './components/stages/Stage3Cake';
import Stage4WishingSky from './components/stages/Stage4WishingSky';
import Stage5Bouquet from './components/stages/Stage5Bouquet';
import Stage6FlipCards from './components/stages/Stage6FlipCards';
import Stage7Fireworks from './components/stages/Stage7Fireworks';
import Stage8FinalLetter from './components/stages/Stage8FinalLetter';

import { startMusic } from './utils/audio';

export default function App() {
  const [currentStage, setCurrentStage] = useState(1);
  const [maxUnlockedStage, setMaxUnlockedStage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const goToStage = (step) => {
    setCurrentStage(step);
    if (step > maxUnlockedStage) {
      setMaxUnlockedStage(step);
    }
  };

  const handleUnlock = () => {
    startMusic((playing) => setIsPlaying(playing));
    goToStage(2);
  };

  const handleReplay = () => {
    setCurrentStage(1);
  };

  return (
    <main>
      <AmbientBackground />
      <MusicController isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <MilestoneStepper
        currentStage={currentStage}
        maxUnlockedStage={maxUnlockedStage}
        onSelectStage={(step) => setCurrentStage(step)}
      />

      {currentStage === 1 && <Stage1Login onUnlock={handleUnlock} />}
      {currentStage === 2 && <Stage2Balloons onNext={() => goToStage(3)} />}
      {currentStage === 3 && <Stage3Cake onNext={() => goToStage(4)} />}
      {currentStage === 4 && <Stage4WishingSky onNext={() => goToStage(5)} />}
      {currentStage === 5 && <Stage5Bouquet onNext={() => goToStage(6)} />}
      {currentStage === 6 && <Stage6FlipCards onNext={() => goToStage(7)} />}
      {currentStage === 7 && <Stage7Fireworks onNext={() => goToStage(8)} />}
      {currentStage === 8 && <Stage8FinalLetter onReplay={handleReplay} />}
    </main>
  );
}
