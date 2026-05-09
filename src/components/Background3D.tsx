import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 1. PARTICLES FIELD
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i=0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 40;
    }
    const particlesGeom = new THREE.BufferGeometry();
    particlesGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.4,
      blending: THREE.NormalBlending
    });
    const particlesMesh = new THREE.Points(particlesGeom, particlesMat);
    scene.add(particlesMesh);

    // 2. GLOWING ORBS
    const orbGeom = new THREE.IcosahedronGeometry(2, 4);
    const orbs: { mesh: THREE.Mesh; phase: number; speed: number; orbit: number }[] = [];
    const colors = [0x3b82f6, 0x0ea5e9, 0x6366f1];

    for (let i = 0; i < 4; i++) {
      const material = new THREE.MeshPhongMaterial({
        color: colors[i % colors.length],
        transparent: true,
        opacity: 0.15,
        wireframe: i % 2 === 0,
        emissive: colors[i % colors.length],
        emissiveIntensity: 0.5
      });

      const mesh = new THREE.Mesh(orbGeom, material);
      group.add(mesh);

      orbs.push({
        mesh,
        phase: Math.random() * Math.PI * 2,
        speed: 0.0002 + Math.random() * 0.0005,
        orbit: 5 + Math.random() * 5
      });
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x000000, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 12;

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      orbs.forEach((orb, i) => {
        orb.mesh.position.x = Math.cos(time * orb.speed + orb.phase) * orb.orbit;
        orb.mesh.position.y = Math.sin(time * orb.speed * 1.5 + orb.phase) * (orb.orbit * 0.5);
        orb.mesh.position.z = Math.sin(time * orb.speed * 0.5 + orb.phase) * 3;
        orb.mesh.rotation.x += 0.005;
        orb.mesh.rotation.y += 0.005;
      });

      particlesMesh.rotation.y = time * 0.05;
      particlesMesh.position.x += (mousePosition.current.x * 0.5 - particlesMesh.position.x) * 0.05;
      particlesMesh.position.y += (mousePosition.current.y * 0.5 - particlesMesh.position.y) * 0.05;

      group.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      orbGeom.dispose();
      particlesGeom.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-bg">
      <div className="noise-overlay" />
      <div 
        ref={containerRef} 
        className="w-full h-full filter blur-[40px] lg:blur-[80px] opacity-60"
      />
    </div>
  );
}
