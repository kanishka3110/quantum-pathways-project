import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface FutureSelfVisualizerProps {
  scenario: 'cheap' | 'quality' | 'comparison';
  isActive: boolean;
  emotionalState: 'happy' | 'neutral' | 'regret';
}

export const FutureSelfVisualizer = ({ 
  scenario, 
  isActive, 
  emotionalState 
}: FutureSelfVisualizerProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    avatar: THREE.Group;
    animationId: number;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mountRef.current || !isActive) return;

    setIsLoading(true);

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1f2e);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 3);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(
      mountRef.current.clientWidth, 
      mountRef.current.clientHeight
    );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    mountRef.current.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 10, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    // Accent lighting based on emotional state
    const accentColor = emotionalState === 'happy' ? 0x4ade80 :
                       emotionalState === 'regret' ? 0xef4444 : 0x6b7280;
    
    const accentLight = new THREE.PointLight(accentColor, 0.5, 10);
    accentLight.position.set(-3, 2, 2);
    scene.add(accentLight);

    // Create avatar group
    const avatar = new THREE.Group();

    // Body (simplified geometric representation)
    const bodyGeometry = new THREE.CapsuleGeometry(0.3, 1.2, 4, 8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: scenario === 'quality' ? 0x4a90e2 : 0x64748b,
      transparent: true,
      opacity: 0.9
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    avatar.add(body);

    // Head
    const headGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const headMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xfdbcbc,
      transparent: true,
      opacity: 0.95
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.5;
    avatar.add(head);

    // Emotional aura
    const auraGeometry = new THREE.SphereGeometry(1.5, 16, 16);
    const auraMaterial = new THREE.MeshBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide
    });
    const aura = new THREE.Mesh(auraGeometry, auraMaterial);
    aura.position.y = 0.5;
    avatar.add(aura);

    // Add posture variation based on scenario
    if (scenario === 'cheap') {
      avatar.rotation.z = -0.1; // Slightly slouched
      avatar.position.y = -0.1;
    } else if (scenario === 'quality') {
      avatar.rotation.z = 0.05; // Confident posture
      avatar.position.y = 0.1;
    }

    scene.add(avatar);

    // Environment elements
    const createParticles = () => {
      const particleCount = 100;
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
      }

      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const particleMaterial = new THREE.PointsMaterial({
        color: accentColor,
        size: 0.05,
        transparent: true,
        opacity: 0.6
      });

      const particleSystem = new THREE.Points(particles, particleMaterial);
      scene.add(particleSystem);

      return particleSystem;
    };

    const particles = createParticles();

    sceneRef.current = { scene, camera, renderer, avatar, animationId: 0 };

    // Animation loop
    const animate = () => {
      if (!sceneRef.current) return;

      sceneRef.current.animationId = requestAnimationFrame(animate);

      // Gentle floating animation
      sceneRef.current.avatar.position.y += Math.sin(Date.now() * 0.001) * 0.002;
      
      // Rotate aura
      const aura = sceneRef.current.avatar.children[2];
      if (aura) {
        aura.rotation.y += 0.01;
      }

      // Animate particles
      particles.rotation.y += 0.005;

      sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
    };

    // Start animation after a brief delay
    setTimeout(() => {
      setIsLoading(false);
      animate();
    }, 500);

    // Cleanup
    return () => {
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        if (mountRef.current && sceneRef.current.renderer.domElement) {
          mountRef.current.removeChild(sceneRef.current.renderer.domElement);
        }
        sceneRef.current.renderer.dispose();
      }
    };
  }, [scenario, isActive, emotionalState]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (!sceneRef.current || !mountRef.current) return;

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      sceneRef.current.camera.aspect = width / height;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden quantum-glass">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-2 border-quantum-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="quantum-label">Visualizing Future Self...</p>
          </div>
        </div>
      )}
      
      <div 
        ref={mountRef} 
        className="w-full h-full"
        style={{ opacity: isLoading ? 0.3 : 1 }}
      />
      
      {!isLoading && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="quantum-glass rounded-xl p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground/80">
                {scenario === 'cheap' ? 'Budget Choice' : 
                 scenario === 'quality' ? 'Quality Choice' : 'Comparison'}
              </span>
              <div className={`w-2 h-2 rounded-full ${
                emotionalState === 'happy' ? 'bg-emotion-happy' :
                emotionalState === 'regret' ? 'bg-emotion-regret' : 'bg-emotion-neutral'
              } animate-quantum-pulse`}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};