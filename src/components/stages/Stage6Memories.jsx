import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playPop, playChime } from '../../utils/audio';

const MEMORIES = [
  {
    id: 1,
    img: '/assets/memory_1.jpg',
    badge: '🌿 ADVENTURES TOGETHER',
    title: 'Laughs & Sunshine',
    date: 'Everyday Bliss ✨',
    quote: 'Walking beside you with endless laughter. You make every simple moment feel like an unforgettable adventure! 🥰',
    emoji: '👫'
  },
  {
    id: 2,
    img: '/assets/memory_2.jpg',
    badge: '🌼 DAISY QUEEN',
    title: 'Innocence & Grace',
    date: 'Cutest Mood 🌸',
    quote: 'Look at this sweet cutie with flower petals! Your gentle smile can light up the entire room and melt any heart. 🥺💖',
    emoji: '👑'
  },
  {
    id: 3,
    img: '/assets/memory_3.jpg',
    badge: '✨ ELEGANT & CHARMING',
    title: 'My Favorite Smile',
    date: 'Pure Radiance 💫',
    quote: 'That gorgeous pose, those glasses, and that sweet smile. Truly the most precious and beautiful soul inside and out. 💖',
    emoji: '💎'
  },
  {
    id: 4,
    img: '/assets/memory_4.jpg',
    badge: '☕ COZY & CANDID',
    title: 'Warm Little Talks',
    date: 'Cherished Times 🎀',
    quote: 'Sitting together, sharing sweet conversations, and collecting quiet moments that I will cherish forever. 💕',
    emoji: '🌹'
  }
];

export default function Stage6Memories({ onNext }) {
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [liked, setLiked] = useState({});

  const handleCardClick = (mem) => {
    playChime();
    setSelectedMemory(mem);
  };

  const handleLike = (e, id) => {
    e.stopPropagation();
    playPop();
    const isNowLiked = !liked[id];
    setLiked((prev) => ({ ...prev, [id]: isNowLiked }));

    if (isNowLiked) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleNextModal = (e) => {
    e.stopPropagation();
    playPop();
    if (!selectedMemory) return;
    const curIdx = MEMORIES.findIndex((m) => m.id === selectedMemory.id);
    const nextIdx = (curIdx + 1) % MEMORIES.length;
    setSelectedMemory(MEMORIES[nextIdx]);
  };

  const handlePrevModal = (e) => {
    e.stopPropagation();
    playPop();
    if (!selectedMemory) return;
    const curIdx = MEMORIES.findIndex((m) => m.id === selectedMemory.id);
    const prevIdx = (curIdx - 1 + MEMORIES.length) % MEMORIES.length;
    setSelectedMemory(MEMORIES[prevIdx]);
  };

  const likedCount = Object.values(liked).filter(Boolean).length;

  return (
    <div className="stage-container">
      <div className="section-header">
        <h2 className="page-title">Our Treasured Memories 📸💖</h2>
        <p className="page-subtitle">Every photograph holds a piece of happiness we shared together</p>
        <div className="progress-pill">
          {likedCount > 0 ? `Loved ${likedCount} of 4 Moments ❤️` : 'Tap any photo to open & relive the memory! ✨'}
        </div>
      </div>

      <div className="memories-grid">
        {MEMORIES.map((m) => {
          const isLoved = !!liked[m.id];
          return (
            <div
              key={m.id}
              className={`polaroid-card ${isLoved ? 'loved' : ''}`}
              onClick={() => handleCardClick(m)}
              title="Tap to view photo"
            >
              <div className="polaroid-pin">📌</div>
              <div className="polaroid-img-box">
                <img src={m.img} alt={m.title} className="polaroid-img" loading="lazy" />
                <button
                  type="button"
                  className={`heart-stamp ${isLoved ? 'active' : ''}`}
                  onClick={(e) => handleLike(e, m.id)}
                  title={isLoved ? 'Loved!' : 'Love this memory'}
                >
                  {isLoved ? '❤️' : '🤍'}
                </button>
              </div>

              <div className="polaroid-caption">
                <span className="polaroid-badge">{m.badge}</span>
                <h3 className="polaroid-title">{m.title}</h3>
                <p className="polaroid-date">{m.date}</p>
              </div>
            </div>
          );
        })}
      </div>

      {selectedMemory && (
        <div className="memory-modal-overlay" onClick={() => setSelectedMemory(null)}>
          <div className="memory-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setSelectedMemory(null)}
              aria-label="Close"
            >
              ✕
            </button>

            <div className="modal-content-grid">
              <div className="modal-img-wrap">
                <img
                  src={selectedMemory.img}
                  alt={selectedMemory.title}
                  className="modal-img"
                />
              </div>

              <div className="modal-details">
                <span className="modal-badge">{selectedMemory.badge}</span>
                <h3 className="modal-title">{selectedMemory.title}</h3>
                <span className="modal-date">{selectedMemory.date}</span>
                <p className="modal-quote">"{selectedMemory.quote}"</p>

                <div className="modal-actions">
                  <button
                    type="button"
                    className={`glow-button modal-heart-btn ${liked[selectedMemory.id] ? 'active' : ''}`}
                    onClick={(e) => handleLike(e, selectedMemory.id)}
                  >
                    {liked[selectedMemory.id] ? '❤️ Loved Forever' : '🤍 Love This Memory'}
                  </button>

                  <div className="modal-nav-arrows">
                    <button type="button" className="arrow-btn" onClick={handlePrevModal} title="Previous Memory">
                      ◀
                    </button>
                    <button type="button" className="arrow-btn" onClick={handleNextModal} title="Next Memory">
                      ▶
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="nav-controls">
        <button type="button" className="glow-button next-btn" onClick={onNext}>
          To Birthday Honors ➡️
        </button>
      </div>
    </div>
  );
}
