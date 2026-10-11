import React, { useMemo } from 'react';

export default function AmbientBackground() {
  const particles = useMemo(() => {
    const emojis = ['✨', '💖', '🌸', '🦋', '💫'];
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      left: `${(i * 7 + Math.random() * 5) % 100}vw`,
      duration: `${6 + (i % 5) * 1.5}s`,
      delay: `${(i * 0.8) % 6}s`
    }));
  }, []);

  const petals = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${(i * 9 + Math.random() * 6) % 100}vw`,
      duration: `${5 + (i % 4) * 1.5}s`,
      delay: `${(i * 0.7) % 5}s`
    }));
  }, []);

  return (
    <>
      <div className="particles-container">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              animationDuration: p.duration,
              animationDelay: p.delay
            }}
          >
            {p.emoji}
          </div>
        ))}
      </div>

      <div className="petals-container">
        {petals.map((pet) => (
          <div
            key={pet.id}
            className="petal"
            style={{
              left: pet.left,
              animationDuration: pet.duration,
              animationDelay: pet.delay
            }}
          />
        ))}
      </div>
    </>
  );
}
