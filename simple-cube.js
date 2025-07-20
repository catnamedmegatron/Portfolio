// Simple 3D Cube using CSS transforms
class SimpleCube {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.init();
    }

    init() {
        // Create cube HTML structure
        this.container.innerHTML = `
            <div class="simple-cube">
                <div class="cube-face front"></div>
                <div class="cube-face back"></div>
                <div class="cube-face right"></div>
                <div class="cube-face left"></div>
                <div class="cube-face top"></div>
                <div class="cube-face bottom"></div>
            </div>
        `;

        // Add CSS styles dynamically
        this.addStyles();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .simple-cube {
                width: 220px;
                height: 220px;
                position: relative;
                transform-style: preserve-3d;
                animation: simpleCubeRotate 8s linear infinite;
                margin: auto;
                transform: rotateX(-15deg) rotateY(15deg);
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                cursor: pointer;
            }

            .simple-cube:hover {
                width: 100px;
                height: 100px;
                animation: simpleCubeRotate 0.8s linear infinite;
            }

            .cube-face {
                position: absolute;
                width: 220px;
                height: 220px;
                background: rgba(139, 92, 246, 0.1);
                border: 2px solid rgba(139, 92, 246, 0.8);
                box-shadow: 0 0 15px rgba(139, 92, 246, 0.4);
                border-radius: 0;
                backface-visibility: visible;
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .simple-cube:hover .cube-face {
                width: 100px;
                height: 100px;
                border: 4px solid rgba(139, 92, 246, 1);
                box-shadow: 0 0 35px rgba(139, 92, 246, 0.9);
            }

            .cube-face.front { 
                transform: translateZ(110px);
                background: rgba(139, 92, 246, 0.15);
            }
            .cube-face.back { 
                transform: translateZ(-110px);
                background: rgba(139, 92, 246, 0.05);
            }
            .cube-face.right { 
                transform: rotateY(90deg) translateZ(110px);
                background: rgba(139, 92, 246, 0.12);
            }
            .cube-face.left { 
                transform: rotateY(-90deg) translateZ(110px);
                background: rgba(139, 92, 246, 0.12);
            }
            .cube-face.top { 
                transform: rotateX(90deg) translateZ(110px);
                background: rgba(139, 92, 246, 0.18);
            }
            .cube-face.bottom { 
                transform: rotateX(-90deg) translateZ(110px);
                background: rgba(139, 92, 246, 0.08);
            }

            .simple-cube:hover .cube-face.front { 
                transform: translateZ(50px);
                background: rgba(139, 92, 246, 0.35);
            }
            .simple-cube:hover .cube-face.back { 
                transform: translateZ(-50px);
                background: rgba(139, 92, 246, 0.25);
            }
            .simple-cube:hover .cube-face.right { 
                transform: rotateY(90deg) translateZ(50px);
                background: rgba(139, 92, 246, 0.32);
            }
            .simple-cube:hover .cube-face.left { 
                transform: rotateY(-90deg) translateZ(50px);
                background: rgba(139, 92, 246, 0.32);
            }
            .simple-cube:hover .cube-face.top { 
                transform: rotateX(90deg) translateZ(50px);
                background: rgba(139, 92, 246, 0.38);
            }
            .simple-cube:hover .cube-face.bottom { 
                transform: rotateX(-90deg) translateZ(50px);
                background: rgba(139, 92, 246, 0.28);
            }

            @keyframes simpleCubeRotate {
                0% {
                    transform: rotateX(-15deg) rotateY(0deg);
                }
                100% {
                    transform: rotateX(-15deg) rotateY(360deg);
                }
            }

            .simple-cube::before {
                content: '';
                position: absolute;
                width: 240px;
                height: 240px;
                background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
                top: -10px;
                left: -10px;
                animation: glowPulse 3s ease-in-out infinite;
                border-radius: 0;
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .simple-cube:hover::before {
                width: 120px;
                height: 120px;
                background: radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 50%);
                animation: glowPulseHover 0.6s ease-in-out infinite;
            }

            @keyframes glowPulse {
                0%, 100% {
                    opacity: 0.3;
                    transform: scale(1);
                }
                50% {
                    opacity: 0.6;
                    transform: scale(1.05);
                }
            }

            @keyframes glowPulseHover {
                0%, 100% {
                    opacity: 0.6;
                    transform: scale(1.1);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.2);
                }
            }


        `;
        document.head.appendChild(style);
    }
}

// Initialize the simple cube
document.addEventListener('DOMContentLoaded', function() {
    const cube = new SimpleCube('hero-visual');
    
    // Add hover event listener to the cube
    const cubeElement = document.querySelector('.simple-cube');
    if (cubeElement) {
        cubeElement.addEventListener('mouseenter', function() {
            // Accelerate meteors
            if (window.accelerateMeteors) {
                window.accelerateMeteors();
            }
        });
        
        cubeElement.addEventListener('mouseleave', function() {
            // Reset meteors
            if (window.resetMeteors) {
                window.resetMeteors();
            }
        });
    }
}); 