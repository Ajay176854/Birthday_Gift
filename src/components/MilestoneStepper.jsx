import React from 'react';

const STEPS = [
  { step: 1, label: 'Gateway' },
  { step: 2, label: 'Balloons' },
  { step: 3, label: 'Cake & Candle' },
  { step: 4, label: 'Wishing Sky' },
  { step: 5, label: 'Rose Bouquet' },
  { step: 6, label: 'Special Cards' },
  { step: 7, label: 'Fireworks' },
  { step: 8, label: 'Royal Letter' }
];

export default function MilestoneStepper({ currentStage, maxUnlockedStage, onSelectStage }) {
  return (
    <div className="milestone-stepper">
      {STEPS.map((s) => {
        let cls = 'step-dot';
        if (s.step === currentStage) cls += ' active';
        else if (s.step < currentStage) cls += ' passed';

        const canClick = s.step <= maxUnlockedStage && s.step !== currentStage;

        return (
          <div
            key={s.step}
            className={cls}
            title={`${s.step}. ${s.label}`}
            onClick={() => canClick && onSelectStage(s.step)}
          />
        );
      })}
    </div>
  );
}
