'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function RalphLoop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 1000;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance' 
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // --- 1. Floating Blobs Layer ---
    const blobs: THREE.Mesh[] = [];
    const blobColors = [0x3b82f6, 0x8b5cf6, 0x6366f1];
    
    blobColors.forEach((color, i) => {
      const geometry = new THREE.SphereGeometry(350, 64, 64);
      const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.15,
      });
      const blob = new THREE.Mesh(geometry, material);
      blob.position.set(
        (Math.random() - 0.5) * 1500,
        (Math.random() - 0.5) * 1500,
        -500
      );
      scene.add(blob);
      blobs.push(blob);
    });

    // --- 2. Subtle Particles Layer ---
    const particlesCount = 2000;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 3000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3000;
    }

    const partGeo = new THREE.BufferGeometry();
    partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const partMat = new THREE.PointsMaterial({
      size: 2,
      color: 0xffffff,
      transparent: true,
      opacity: 0.2,
      sizeAttenuation: true
    });
    const particles = new THREE.Points(partGeo, partMat);
    scene.add(particles);

    // --- Interaction ---
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      currentX = (event.clientX - window.innerWidth / 2) / 100;
      currentY = (event.clientY - window.innerHeight / 2) / 100;
      setMouse({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      // Animate Blobs
      const time = Date.now() * 0.0005;
      blobs.forEach((blob, i) => {
        blob.position.x += Math.sin(time + i) * 1.5;
        blob.position.y += Math.cos(time + i * 1.5) * 1.2;
        blob.scale.setScalar(1 + Math.sin(time * 0.5 + i) * 0.1);
      });

      // Subtle Parallax
      camera.position.x += (currentX - camera.position.x) * 0.05;
      camera.position.y += (-currentY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <div 
        ref={containerRef} 
        className="fixed inset-0 overflow-hidden pointer-events-none -z-50 bg-[#0a0a0f]"
      />
      {/* Noise Texture Layer */}
      <div className="noise-overlay" />
      {/* Cursor Glow Layer */}
      <div 
        className="fixed inset-0 pointer-events-none z-[1000] opacity-30"
        style={{
          background: `radial-gradient(circle 400px at ${mouse.x}px ${mouse.y}px, rgba(59, 130, 246, 0.08), transparent)`
        }}
      />
    </>
  );
}
