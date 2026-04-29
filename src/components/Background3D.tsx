import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 1. SOFT MORPHING ORBS
    const orbGeom = new THREE.SphereGeometry(2, 32, 32);
    const orbs: { mesh: THREE.Mesh; phase: number; speed: number; orbit: number }[] = [];

    const colors = [0x8b5cf6, 0x06b6d4, 0xede9fe]; // Violet, Cyan, Soft Purple

    for (let i = 0; i < 3; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: colors[i % colors.length],
        transparent: true,
        opacity: i === 2 ? 0.1 : 0.15,
      });

      const mesh = new THREE.Mesh(orbGeom, material);
      group.add(mesh);

      orbs.push({
        mesh,
        phase: Math.random() * Math.PI * 2,
        speed: 0.0005 + Math.random() * 0.001,
        orbit: 3 + Math.random() * 2
      });
    }

    camera.position.z = 10;

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      orbs.forEach((orb, i) => {
        orb.mesh.position.x = Math.cos(time * orb.speed + orb.phase) * orb.orbit;
        orb.mesh.position.y = Math.sin(time * orb.speed * 1.5 + orb.phase) * (orb.orbit * 0.5);
        orb.mesh.position.z = Math.sin(time * orb.speed * 0.5 + orb.phase) * 2;
        
        // Morph scale subtly
        const s = 1 + Math.sin(time * 0.5 + i) * 0.2;
        orb.mesh.scale.set(s, s * 1.2, s);
      });

      group.rotation.y += 0.0002;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      orbGeom.dispose();
      orbs.forEach(o => (o.mesh.material as THREE.Material).dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 -z-10 bg-white"
    >
      <div 
        ref={containerRef} 
        className="w-full h-full filter blur-[120px] opacity-70"
      />
    </div>
  );
}
