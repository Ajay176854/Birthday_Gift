document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    // --- Page 1: Login ---
    const loginBtn = document.getElementById('loginBtn');
    const passwordInput = document.getElementById('passwordInput');
    const errorMsg = document.getElementById('errorMsg');

    loginBtn.addEventListener('click', () => {
        if (passwordInput.value.toLowerCase() === 'crybaby') {
            switchPage('page1', 'page2');
        } else {
            errorMsg.classList.remove('hidden');
        }
    });

    // --- Page 2: Balloons ---
    const balloons = document.querySelectorAll('.balloon');
    const sentenceContainer = document.getElementById('sentenceContainer');
    const nextBtn2 = document.getElementById('nextBtn2');
    let poppedCount = 0;

    balloons.forEach((balloon) => {
        balloon.addEventListener('click', () => {
            if (!balloon.classList.contains('popped')) {
                // Pop animation
                balloon.classList.add('popped');
                
                // Add word to sentence
                const word = balloon.getAttribute('data-word');
                const span = document.createElement('span');
                span.innerText = word;
                sentenceContainer.appendChild(span);
                
                poppedCount++;
                if (poppedCount === balloons.length) {
                    setTimeout(() => {
                        nextBtn2.classList.remove('hidden');
                    }, 1000);
                }
            }
        });
    });

    nextBtn2.addEventListener('click', () => {
        switchPage('page2', 'page3');
        startCakeSequence();
    });

    // --- Page 3: Cake ---
    const nextBtn3 = document.getElementById('nextBtn3');
    function startCakeSequence() {
        const overlay = document.querySelector('.dark-overlay');
        const heading = document.getElementById('cakeHeading');
        const bdayText = document.getElementById('bdayText');

        // Wait 2 seconds, then light off
        setTimeout(() => {
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.background = 'rgba(0,0,0,0.95)';
            overlay.style.opacity = '1';
            overlay.style.zIndex = '50';
            
            // Wait 3 seconds in dark, then back to normal
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.style.zIndex = '-1';
                    heading.classList.add('hidden');
                    bdayText.classList.remove('hidden');
                    bdayText.classList.add('fade-in');
                    nextBtn3.classList.remove('hidden');
                }, 500); // transition time
            }, 3000);

        }, 2000);
    }

    nextBtn3.addEventListener('click', () => {
        switchPage('page3', 'page4');
    });

    // --- Page 4: Bouquet ---
    const nextBtn4 = document.getElementById('nextBtn4');
    nextBtn4.addEventListener('click', () => {
        switchPage('page4', 'page5');
        startGiftSequence();
    });

    // --- Page 5: Gift ---
    function startGiftSequence() {
        const giftWrapper = document.getElementById('giftWrapper');
        const countdownEl = document.getElementById('countdown');
        const greetingCard = document.getElementById('greetingCard');
        const lastGiftText = document.getElementById('lastGiftText');
        
        // Auto trigger after a slight delay
        setTimeout(() => {
            countdownEl.style.opacity = '1';
            let count = 3;
            countdownEl.innerText = count;
            
            const interval = setInterval(() => {
                count--;
                if (count > 0) {
                    countdownEl.innerText = count;
                } else {
                    clearInterval(interval);
                    countdownEl.style.opacity = '0';
                    giftWrapper.style.display = 'none'; // hide gift box
                    lastGiftText.style.display = 'none'; // hide title
                    
                    shootConfetti();
                    greetingCard.classList.remove('hidden');
                }
            }, 1000);
        }, 1000);
    }

    // Utility function to switch pages
    function switchPage(oldPageId, newPageId) {
        const oldPage = document.getElementById(oldPageId);
        const newPage = document.getElementById(newPageId);
        
        oldPage.classList.remove('active');
        setTimeout(() => {
            oldPage.classList.add('hidden');
            newPage.classList.remove('hidden');
            // Trigger reflow to restart animations
            void newPage.offsetWidth; 
            newPage.classList.add('active');
        }, 1000); // Wait for fade out
    }

    // --- Particle Animations ---
    function createParticles() {
        const container = document.getElementById('particles-container');
        const emojis = ['✨', '💖', '🦋', '🌸', '💫'];
        
        setInterval(() => {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
            
            // Random properties
            particle.style.left = Math.random() * 100 + 'vw';
            const duration = Math.random() * 5 + 5; // 5 to 10 seconds
            particle.style.animationDuration = duration + 's';
            
            container.appendChild(particle);
            
            // Cleanup
            setTimeout(() => {
                particle.remove();
            }, duration * 1000);
        }, 300); // Spawn every 300ms
    }

    // --- Confetti Animation ---
    function shootConfetti() {
        const colors = ['#ff7eb3', '#ff758c', '#fad0c4', '#ff9a9e', '#fff'];
        
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Random properties
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            const duration = Math.random() * 3 + 2; // 2 to 5 seconds
            const delay = Math.random() * 1;
            confetti.style.animationDuration = duration + 's';
            confetti.style.animationDelay = delay + 's';
            
            document.body.appendChild(confetti);
            
            // Cleanup
            setTimeout(() => {
                confetti.remove();
            }, (duration + delay) * 1000);
        }
    }
});
