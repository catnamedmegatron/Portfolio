// Three.js 3D Cube for Portfolio
class ThreeCube {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.cube = null;
        this.wireframe = null;
        
        this.init();
    }

    init() {
        // Create scene
        this.scene = new THREE.Scene();
        
        // Create camera
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        this.camera.position.z = 5;

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setClearColor(0x000000, 0); // Transparent background
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        this.container.appendChild(this.renderer.domElement);

        // Create cube geometry
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        
        // Create glassy material
        const material = new THREE.MeshPhongMaterial({
            color: 0x8b5cf6, // Purple color matching your theme
            transparent: true,
            opacity: 0.2,
            shininess: 200,
            specular: 0xffffff,
            side: THREE.DoubleSide
        });

        // Create cube mesh
        this.cube = new THREE.Mesh(geometry, material);
        this.cube.castShadow = true;
        this.cube.receiveShadow = true;
        this.scene.add(this.cube);

        // Add wireframe edges
        const edges = new THREE.EdgesGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 0x8b5cf6,
            transparent: true,
            opacity: 0.8,
            linewidth: 2
        });
        this.wireframe = new THREE.LineSegments(edges, lineMaterial);
        this.scene.add(this.wireframe);

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        // Add purple point light for glow effect
        const pointLight = new THREE.PointLight(0x8b5cf6, 1, 100);
        pointLight.position.set(0, 0, 5);
        this.scene.add(pointLight);

        // Add subtle purple glow around cube
        const glowGeometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x8b5cf6,
            transparent: true,
            opacity: 0.1,
            side: THREE.BackSide
        });
        const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
        this.scene.add(glowMesh);

        // Start animation
        this.animate();

        // Handle resize
        window.addEventListener('resize', () => this.onWindowResize(), false);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001;

        // Rotate cube smoothly
        this.cube.rotation.x += 0.008;
        this.cube.rotation.y += 0.012;
        this.wireframe.rotation.x += 0.008;
        this.wireframe.rotation.y += 0.012;

        // Add floating motion
        this.cube.position.y = Math.sin(time * 2) * 0.3;
        this.wireframe.position.y = Math.sin(time * 2) * 0.3;

        // Add subtle scale animation
        const scale = 1 + Math.sin(time * 3) * 0.05;
        this.cube.scale.set(scale, scale, scale);
        this.wireframe.scale.set(scale, scale, scale);

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }
}

// Initialize cube when Three.js is loaded
function initCube() {
    if (typeof THREE !== 'undefined') {
        new ThreeCube('hero-visual');
    } else {
        // Fallback to CSS cube if Three.js fails to load
        console.log('Three.js not loaded, using CSS fallback');
    }
}

// Load Three.js and initialize
if (typeof THREE === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = initCube;
    document.head.appendChild(script);
} else {
    initCube();
} 