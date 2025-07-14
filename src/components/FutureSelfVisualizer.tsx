import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

interface FutureSelfVisualizerProps {
  scenario: 'cheap' | 'quality' | null;
  impact: {
    health: number;
    finance: number;
    happiness: number;
  };
}

const FutureSelfVisualizer: React.FC<FutureSelfVisualizerProps> = ({ scenario, impact }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const avatarRef = useRef<THREE.Group | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  const createAvatar = useCallback((type: 'cheap' | 'quality') => {
    const avatarGroup = new THREE.Group();
    
    // Enhanced avatar based on type
    const healthLevel = type === 'quality' ? 0.9 : 0.3;
    const happinessLevel = type === 'quality' ? 0.8 : 0.2;
    
    // Head with emotional expression
    const headGeometry = new THREE.SphereGeometry(0.35, 32, 32);
    const headColor = type === 'quality' 
      ? new THREE.Color().setHSL(0.3, 0.6, 0.7) // Healthy green
      : new THREE.Color().setHSL(0.0, 0.6, 0.5); // Stressed red
    
    const headMaterial = new THREE.MeshPhongMaterial({ 
      color: headColor,
      shininess: 30,
      transparent: true,
      opacity: 0.9
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.6;
    head.castShadow = true;
    avatarGroup.add(head);

    // Body with posture reflecting choice
    const bodyHeight = type === 'quality' ? 1.2 : 1.0;
    const bodyGeometry = new THREE.CylinderGeometry(0.25, 0.35, bodyHeight, 12);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: type === 'quality' ? 0x3b82f6 : 0x6b7280,
      shininess: 20
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.6;
    body.castShadow = true;
    if (type === 'cheap') {
      body.rotation.x = 0.1; // Slouched posture
    }
    avatarGroup.add(body);

    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.08, 0.12, 0.8, 8);
    const armMaterial = new THREE.MeshPhongMaterial({ color: headColor });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.4, 0.8, 0);
    leftArm.rotation.z = type === 'quality' ? -0.3 : -0.1;
    leftArm.castShadow = true;
    avatarGroup.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.4, 0.8, 0);
    rightArm.rotation.z = type === 'quality' ? 0.3 : 0.1;
    rightArm.castShadow = true;
    avatarGroup.add(rightArm);

    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.1, 0.15, 1, 8);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0x1f2937 });
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.15, -0.5, 0);
    leftLeg.castShadow = true;
    avatarGroup.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.15, -0.5, 0);
    rightLeg.castShadow = true;
    avatarGroup.add(rightLeg);

    // Aura effect based on choice
    const auraGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const auraMaterial = new THREE.MeshBasicMaterial({
      color: type === 'quality' ? 0x22c55e : 0xef4444,
      transparent: true,
      opacity: type === 'quality' ? 0.15 : 0.08,
      side: THREE.BackSide
    });
    const aura = new THREE.Mesh(auraGeometry, auraMaterial);
    avatarGroup.add(aura);

    // Floating particles for quality choice
    if (type === 'quality') {
      const particleGeometry = new THREE.SphereGeometry(0.02, 8, 8);
      const particleMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xfbbf24,
        transparent: true,
        opacity: 0.8
      });
      
      for (let i = 0; i < 8; i++) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        particle.position.set(
          (Math.random() - 0.5) * 3,
          Math.random() * 3,
          (Math.random() - 0.5) * 3
        );
        particle.userData = { 
          originalY: particle.position.y,
          floatSpeed: 0.5 + Math.random() * 0.5
        };
        avatarGroup.add(particle);
      }
    }

    return avatarGroup;
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup with Apple-inspired aesthetics
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc); // Light Apple background

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 2, 6);
    camera.lookAt(0, 1, 0);

    // Renderer with enhanced quality
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0xf1f5f9, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    scene.add(directionalLight);

    // Soft fill light
    const fillLight = new THREE.DirectionalLight(0x3b82f6, 0.3);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // Create platform
    const platformGeometry = new THREE.CylinderGeometry(2, 2, 0.1, 32);
    const platformMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xe2e8f0,
      transparent: true,
      opacity: 0.8
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = -1;
    platform.receiveShadow = true;
    scene.add(platform);

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    setIsLoaded(true);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        try {
          mountRef.current.removeChild(renderer.domElement);
        } catch (e) {
          // Handle case where element was already removed
        }
      }
      renderer.dispose();
    };
  }, []);

  // Update avatar based on scenario
  useEffect(() => {
    if (!sceneRef.current || !scenario) return;

    // Remove existing avatar
    if (avatarRef.current) {
      sceneRef.current.remove(avatarRef.current);
    }

    // Create new avatar
    const newAvatar = createAvatar(scenario);
    sceneRef.current.add(newAvatar);
    avatarRef.current = newAvatar;

    // Enhanced animation loop
    const animate = () => {
      if (!rendererRef.current || !cameraRef.current || !sceneRef.current) return;
      
      animationFrameRef.current = requestAnimationFrame(animate);
      
      if (avatarRef.current) {
        // Smooth rotation
        avatarRef.current.rotation.y += 0.008;
        
        // Floating animation based on happiness level
        const happinessFloat = scenario === 'quality' ? 0.15 : 0.05;
        avatarRef.current.position.y = Math.sin(Date.now() * 0.002) * happinessFloat;
        
        // Subtle breathing effect
        const breathScale = 1 + Math.sin(Date.now() * 0.003) * 0.02;
        avatarRef.current.scale.set(breathScale, breathScale, breathScale);

        // Animate particles for quality avatar
        if (scenario === 'quality') {
          avatarRef.current.children.forEach((child) => {
            if (child instanceof THREE.Mesh && child.geometry instanceof THREE.SphereGeometry && 
                child.geometry.parameters.radius === 0.02) {
              const userData = child.userData as any;
              if (userData.originalY !== undefined) {
                child.position.y = userData.originalY + Math.sin(Date.now() * 0.001 * userData.floatSpeed) * 0.3;
                child.rotation.y += 0.02;
              }
            }
          });
        }

        // Animate aura
        const aura = avatarRef.current.children.find(child => 
          child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial
        );
        if (aura) {
          aura.rotation.y += 0.01;
        }
      }
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    
    animate();
  }, [scenario, createAvatar]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getScenarioMessage = () => {
    if (!scenario) return "Select a purchase option to see your future self";
    
    if (scenario === 'quality') {
      return "5 years later: Confident, healthy, and thriving. Quality choices compound into a better life.";
    } else {
      return "5 years later: Stressed, struggling with cheaper choices. Short-term savings, long-term costs.";
    }
  };

  return (
    <div className="apple-card p-8">
      <h3 className="text-2xl font-semibold mb-6 text-center">Future Self Visualization</h3>
      
      <div 
        ref={mountRef} 
        className="w-full h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-white border border-gray-200"
        style={{ minHeight: '400px' }}
      />
      
      {!isLoaded && (
        <div className="flex items-center justify-center h-96">
          <div className="animate-apple-pulse text-gray-600">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            Loading future visualization...
          </div>
        </div>
      )}
      
      {scenario && (
        <div className="mt-6">
          <div className="apple-glass rounded-xl p-6 mb-6">
            <p className="text-center text-gray-700 font-medium">
              {getScenarioMessage()}
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold mb-1" style={{
                color: impact.health > 0 ? '#22c55e' : '#ef4444'
              }}>
                {impact.health > 0 ? '+' : ''}{impact.health}
              </div>
              <div className="text-sm text-gray-600">Health</div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold mb-1" style={{
                color: impact.finance > 0 ? '#22c55e' : '#ef4444'
              }}>
                {impact.finance > 0 ? '+' : ''}{impact.finance}
              </div>
              <div className="text-sm text-gray-600">Finance</div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold mb-1" style={{
                color: impact.happiness > 0 ? '#22c55e' : '#ef4444'
              }}>
                {impact.happiness > 0 ? '+' : ''}{impact.happiness}
              </div>
              <div className="text-sm text-gray-600">Happiness</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FutureSelfVisualizer;