// Professional Purple Retro Portfolio JavaScript

// Starfield Animation
function initStarfield() {
    const canvas = document.getElementById('starfield-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Star class
    class Star {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speed = Math.random() * 0.5 + 0.1;
            this.opacity = Math.random() * 0.8 + 0.2;
            this.twinkleSpeed = Math.random() * 0.02 + 0.01;
            this.twinkleOffset = Math.random() * Math.PI * 2;
        }
        
        update() {
            this.y += this.speed;
            this.twinkleOffset += this.twinkleSpeed;
            
            if (this.y > canvas.height) {
                this.reset();
                this.y = -10;
            }
        }
        
        draw() {
            const twinkle = Math.sin(this.twinkleOffset) * 0.3 + 0.7;
            ctx.save();
            ctx.globalAlpha = this.opacity * twinkle;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Add subtle glow
            ctx.shadowColor = '#8b5cf6';
            ctx.shadowBlur = this.size * 2;
            ctx.fill();
            ctx.restore();
        }
    }
    
    // Meteor class
    class Meteor {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -50;
            this.length = Math.random() * 80 + 40;
            this.speed = Math.random() * 3 + 2;
            this.opacity = Math.random() * 0.6 + 0.4;
            this.active = false;
        }
        
        update() {
            if (!this.active) {
                // Randomly activate meteors
                if (Math.random() < 0.002) { // Very low probability
                    this.active = true;
                }
                return;
            }
            
            this.x += this.speed;
            this.y += this.speed;
            
            if (this.x > canvas.width || this.y > canvas.height) {
                this.reset();
            }
        }
        
        draw() {
            if (!this.active) return;
            
            ctx.save();
            ctx.globalAlpha = this.opacity;
            
            // Create gradient for meteor trail
            const gradient = ctx.createLinearGradient(
                this.x, this.y, 
                this.x - this.length, this.y - this.length
            );
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
            gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.6)');
            gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x - this.length, this.y - this.length);
            ctx.stroke();
            
            ctx.restore();
        }
    }
    
    // Performance optimization for mobile
    const isMobile = window.innerWidth <= 768;
    const starCount = isMobile ? 80 : 150;
    const meteorCount = isMobile ? 3 : 5;
    
    // Create stars and meteors
    const stars = Array.from({ length: starCount }, () => new Star());
    const meteors = Array.from({ length: meteorCount }, () => new Meteor());
    
    // Animation loop with performance optimization
    let frameCount = 0;
    const frameSkip = isMobile ? 2 : 1; // Skip frames on mobile for better performance
    
    function animate() {
        frameCount++;
        
        // Skip frames on mobile for better performance
        if (frameCount % frameSkip !== 0) {
            animationId = requestAnimationFrame(animate);
            return;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw stars
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        
        // Update and draw meteors
        meteors.forEach(meteor => {
            meteor.update();
            meteor.draw();
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Cleanup function
    function cleanup() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    }
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', cleanup);
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initStarfield();
    initAnimations();
    initScrollEffects();
    initFormHandling();
    initTypingEffect();
    initMeteorEffect();
    initFloatingTech();
    initSmoothScrolling();
});

// Initialize all animations
function initAnimations() {
    // Add animation classes to sections when they come into view
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

// Scroll effects
function initScrollEffects() {
    // Parallax effect for stars
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const stars = document.querySelector('.stars');
        if (stars) {
            stars.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const handleNavbarScroll = () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        
        window.addEventListener('scroll', throttle(handleNavbarScroll, 10));
        
        // Logo click to scroll to top
        const logoContainer = document.querySelector('.logo-container');
        if (logoContainer) {
            logoContainer.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
}

// Smooth scrolling for navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form handling
function initFormHandling() {
    const form = document.querySelector('.form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const message = form.querySelector('textarea').value;
            
            // Simulate form submission with retro effect
            showNotification('Message sent successfully!', 'success');
            
            // Reset form
            form.reset();
        });
    }
}

// Typing effect for roles
function initTypingEffect() {
    const roles = [
      "Frontend Developer",
      "AI Enthusiast",
      "API Specialist",
      "Problem Solver"
    ];
    const typingRole = document.querySelector('.typing-role');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Speed for typing
    let deletingSpeed = 50; // Speed for deleting

    function typeRole() {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        // Delete character by character
        typingRole.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
          // Finished deleting, move to next role
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(typeRole, 500); // Pause before typing next role
          return;
        }
        
        setTimeout(typeRole, deletingSpeed);
      } else {
        // Type character by character
        typingRole.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentRole.length) {
          // Finished typing, start deleting after a pause
          setTimeout(() => {
            isDeleting = true;
            typeRole();
          }, 1000); // Pause before deleting
          return;
        }
        
        setTimeout(typeRole, typingSpeed);
      }
    }

    // Start the typing effect
    if (typingRole) {
      typeRole();
    }
}

// Meteor effect
function initMeteorEffect() {
    const meteorsContainer = document.querySelector('.meteors');
    let meteorInterval;
    let isAccelerated = false;
    
    function createMeteor() {
        const meteor = document.createElement('div');
        meteor.className = 'meteor';
        
        // Random position and timing
        const startX = Math.random() * window.innerWidth;
        const startY = -50;
        const duration = isAccelerated ? (0.5 + Math.random() * 0.5) : (2 + Math.random() * 2);
        
        meteor.style.left = startX + 'px';
        meteor.style.top = startY + 'px';
        meteor.style.animationDuration = duration + 's';
        
        meteorsContainer.appendChild(meteor);
        
        // Remove meteor after animation
        setTimeout(() => {
            if (meteor.parentNode) {
                meteor.parentNode.removeChild(meteor);
            }
        }, duration * 1000);
    }
    
    function startMeteorCreation() {
        // Clear existing interval
        if (meteorInterval) {
            clearInterval(meteorInterval);
        }
        
        // Set new interval based on acceleration state
        const interval = isAccelerated ? 500 : 3000; // 500ms vs 3000ms
        meteorInterval = setInterval(createMeteor, interval);
    }
    
    // Function to accelerate meteors (only when cube is hovered)
    window.accelerateMeteors = function() {
        if (!isAccelerated) {
            isAccelerated = true;
            startMeteorCreation();
        }
    };
    
    // Function to reset meteors (only when cube hover ends)
    window.resetMeteors = function() {
        if (isAccelerated) {
            isAccelerated = false;
            startMeteorCreation();
        }
    };
    
    // Start initial meteor creation (normal state)
    startMeteorCreation();
    
    // Create initial meteors
    for (let i = 0; i < 3; i++) {
        setTimeout(createMeteor, i * 1000);
    }
}

// Floating tech elements
function initFloatingTech() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach((item, index) => {
        // Add hover effect
        item.addEventListener('mouseenter', () => {
            item.style.opacity = '0.8';
            item.style.transform = 'scale(1.2) translateY(-10px)';
            item.style.textShadow = '0 0 20px var(--glow-strong)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.opacity = '0.3';
            item.style.transform = 'scale(1) translateY(0)';
            item.style.textShadow = '0 0 10px var(--glow-purple)';
        });
    });
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(15, 15, 35, 0.95);
        border: 1px solid var(--primary-purple);
        color: var(--text-light);
        padding: 1rem 2rem;
        border-radius: 8px;
        font-family: 'Inter', sans-serif;
        font-size: 1rem;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 0 20px var(--shadow-purple);
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS for new animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    .notification.success {
        border-color: var(--primary-purple);
        box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
    }
    
    .notification.error {
        border-color: #ef4444;
        box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
    }
    
    .notification.info {
        border-color: var(--accent-purple);
        box-shadow: 0 0 20px rgba(192, 132, 252, 0.5);
    }
`;
document.head.appendChild(style);

// Interactive hover effects for project cards
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px var(--shadow-purple)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 20px var(--shadow-purple)';
        });
    });
});

// Animated counter for achievements
function animateCounters() {
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    achievementCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// Initialize counter animation when achievements section is in view
const achievementsSection = document.querySelector('#achievements');
if (achievementsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });
    observer.observe(achievementsSection);
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'ArrowUp':
            e.preventDefault();
            window.scrollBy(0, -100);
            break;
        case 'ArrowDown':
            e.preventDefault();
            window.scrollBy(0, 100);
            break;
        case 'Home':
            e.preventDefault();
            window.scrollTo(0, 0);
            break;
        case 'End':
            e.preventDefault();
            window.scrollTo(0, document.body.scrollHeight);
            break;
    }
});

// Retro sound effects (optional)
function playRetroSound(type) {
    // Create audio context for retro sounds
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    switch(type) {
        case 'hover':
            playBeep(audioContext, 800, 0.1);
            break;
        case 'click':
            playBeep(audioContext, 600, 0.2);
            break;
        case 'success':
            playBeep(audioContext, 1000, 0.3);
            break;
    }
}

function playBeep(audioContext, frequency, duration) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// Add hover sound effects to interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('.nav-link, .project-link, .btn, .skill-tag');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            // Uncomment the line below to enable sound effects
            // playRetroSound('hover');
        });
        
        element.addEventListener('click', () => {
            // Uncomment the line below to enable sound effects
            // playRetroSound('click');
        });
    });
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Activate special mode
        document.body.style.filter = 'hue-rotate(180deg)';
        showNotification('Special mode activated!', 'success');
        
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        
        konamiCode = [];
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations can go here
}, 16)); // ~60fps

// Add floating particles effect
function createFloatingParticles() {
    const background = document.querySelector('.background');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary-purple);
            border-radius: 50%;
            opacity: 0.3;
            animation: floatParticle ${3 + Math.random() * 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        background.appendChild(particle);
    }
}

// Add CSS for floating particles
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
        }
        50% {
            transform: translateY(-30px) rotate(180deg);
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize floating particles
document.addEventListener('DOMContentLoaded', function() {
    createFloatingParticles();
});

// Add glow effect to profile card
function initProfileGlow() {
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        profileCard.addEventListener('mouseenter', () => {
            profileCard.style.boxShadow = '0 0 50px var(--glow-strong)';
        });
        
        profileCard.addEventListener('mouseleave', () => {
            profileCard.style.boxShadow = 'none';
        });
    }
}

// Initialize profile glow effect
document.addEventListener('DOMContentLoaded', function() {
    initProfileGlow();
}); 