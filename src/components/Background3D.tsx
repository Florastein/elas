import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Particles Data
    const particlesCount = 120;
    const positions = new Float32Array(particlesCount * 3);
    const particlesData: { velocity: THREE.Vector3; numConnections: number }[] = [];

    const minDistance = 2.5;
    const maxParticles = particlesCount;

    for (let i = 0; i < maxParticles; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      particlesData.push({
        velocity: new THREE.Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2).multiplyScalar(0.01),
        numConnections: 0
      });
    }

    // Points
    const pMaterial = new THREE.PointsMaterial({
      color: 0x8b5cf6, // Violet
      size: 0.05,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true
    });

    const pGeometry = new THREE.BufferGeometry();
    pGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));

    const pointCloud = new THREE.Points(pGeometry, pMaterial);
    group.add(pointCloud);

    // Lines
    const lMaterial = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.1,
    });

    const lGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(maxParticles * maxParticles * 3);
    lGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));

    const lineMesh = new THREE.LineSegments(lGeometry, lMaterial);
    group.add(lineMesh);

    camera.position.z = 5;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      let vertexpos = 0;
      let linepos = 0;

      for (let i = 0; i < maxParticles; i++) {
        const pData = particlesData[i];

        positions[i * 3] += pData.velocity.x;
        positions[i * 3 + 1] += pData.velocity.y;
        positions[i * 3 + 2] += pData.velocity.z;

        // Bounce
        if (positions[i * 3] < -5 || positions[i * 3] > 5) pData.velocity.x = -pData.velocity.x;
        if (positions[i * 3 + 1] < -5 || positions[i * 3 + 1] > 5) pData.velocity.y = -pData.velocity.y;
        if (positions[i * 3 + 2] < -5 || positions[i * 3 + 2] > 5) pData.velocity.z = -pData.velocity.z;

        // Connections
        for (let j = i + 1; j < maxParticles; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < minDistance) {
            linePositions[linepos++] = positions[i * 3];
            linePositions[linepos++] = positions[i * 3 + 1];
            linePositions[linepos++] = positions[i * 3 + 2];

            linePositions[linepos++] = positions[j * 3];
            linePositions[linepos++] = positions[j * 3 + 1];
            linePositions[linepos++] = positions[j * 3 + 2];
          }
        }
      }

      lineMesh.geometry.setDrawRange(0, linepos / 3);
      lineMesh.geometry.attributes.position.needsUpdate = true;
      pointCloud.geometry.attributes.position.needsUpdate = true;

      // Rotation
      group.rotation.y += 0.001;
      
      // Follow mouse
      group.position.x += (mouseX * 0.5 - group.position.x) * 0.05;
      group.position.y += (mouseY * 0.5 - group.position.y) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      pGeometry.dispose();
      pMaterial.dispose();
      lGeometry.dispose();
      lMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 pointer-events-none bg-white"
    />
  );
}
