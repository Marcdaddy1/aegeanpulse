"use client";

// Vendor component from 21st.dev (dhileepkumargm/woven-light-hero), dropped in
// per the hero swap contract in CLAUDE.md. Two intentional changes from the
// registry source:
//   1. `WovenCanvas` is exported so the adapter (../vendor-hero.tsx) can reuse
//      the Three.js background while feeding it AegeanPulse content via HeroProps.
//   2. The particle palette is tinted to the brand teal (see setHSL below) — the
//      original used a random-hue rainbow.
//   3. Mouse interaction is mapped to the canvas's on-screen rect (instead of the
//      raw window) so cursor repulsion aligns with the offset hero, and the
//      animation frame is now cancelled + the renderer disposed on cleanup to
//      stop a dev double-mount leak.
//   4. Repel radius/strength are pulled out into REPEL_RADIUS / REPEL_STRENGTH
//      constants and tuned up from the vendor defaults for a punchier effect.
//   5. Mobile support: touch listeners mirror the cursor; particle count and
//      pixel ratio scale down on small screens; the per-particle loop reuses
//      scratch vectors instead of allocating ~250k Vector3/frame.
// The particle physics is otherwise unchanged.

import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import * as THREE from 'three';

// Cursor interaction tuning (vendor defaults were 1.5 / 0.01). Larger radius =
// wider zone of particles that react; larger strength = harder push.
const REPEL_RADIUS = 2.6;
const REPEL_STRENGTH = 0.025;

// --- Main Hero Component ---
export const WovenLightHero = () => {
  const textControls = useAnimation();
  const buttonControls = useAnimation();

  useEffect(() => {
    // Add a more elegant font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    textControls.start(i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 1.5,
        duration: 1.2,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }));
    buttonControls.start({
        opacity: 1,
        transition: { delay: 2.5, duration: 1 }
    });

    return () => {
        document.head.removeChild(link);
    }
  }, [textControls, buttonControls]);

  const headline = "Woven by Light";

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black dark:bg-white">
      <WovenCanvas />
      <HeroNav />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl md:text-8xl text-white dark:text-slate-900" style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 0 50px rgba(255, 255, 255, 0.3)' }}>
            {headline.split(" ").map((word, i) => (
                <span key={i} className="inline-block">
                    {word.split("").map((char, j) => (
                        <motion.span key={j} custom={i * 5 + j} initial={{ opacity: 0, y: 50 }} animate={textControls} style={{ display: 'inline-block' }}>
                            {char}
                        </motion.span>
                    ))}
                    {i < headline.split(" ").length - 1 && <span>&nbsp;</span>}
                </span>
            ))}
        </h1>
        <motion.p
          custom={headline.length}
          initial={{ opacity: 0, y: 30 }}
          animate={textControls}
          className="mx-auto mt-6 max-w-xl text-lg text-slate-300 dark:text-slate-600"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          An interactive tapestry of light and motion, crafted with code and creativity.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={buttonControls} className="mt-10">
          <button className="rounded-full border-2 border-white/20 bg-white/10 px-8 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 dark:border-slate-800/20 dark:bg-slate-800/5 dark:text-slate-800 dark:hover:bg-slate-800/10" style={{ fontFamily: "'Inter', sans-serif" }}>
            Explore the Weave
          </button>
        </motion.div>
      </div>
    </div>
  );
};

// --- Navigation Component ---
const HeroNav = () => {
    return (
        <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 1, duration: 1 } }}
            className="absolute top-0 left-0 right-0 z-20 p-6"
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white dark:text-slate-800">◆</span>
                    <span className="text-xl font-bold text-white dark:text-slate-800" style={{ fontFamily: "'Inter', sans-serif" }}>Woven</span>
                </div>
            </div>
        </motion.nav>
    );
};

// --- Three.js Canvas Component ---
export const WovenCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    // Scale cost to the device: phones get fewer particles and a capped pixel
    // ratio (a 3x-DPR phone rendering 50k points at full res is the main source
    // of jank). Read once on mount — no live breakpoint tracking needed.
    const isSmall = window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({ antialias: !isSmall, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 2));
    mountRef.current.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);
    const clock = new THREE.Timer();

    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // --- Woven Silk ---
    const particleCount = isSmall ? 16000 : 50000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);

    for (let i = 0; i < particleCount; i++) {
        const vertexIndex = i % torusKnot.attributes.position.count;
        const x = torusKnot.attributes.position.getX(vertexIndex);
        const y = torusKnot.attributes.position.getY(vertexIndex);
        const z = torusKnot.attributes.position.getZ(vertexIndex);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        originalPositions[i * 3] = x;
        originalPositions[i * 3 + 1] = y;
        originalPositions[i * 3 + 2] = z;

        const color = new THREE.Color();
        // Brand teal particle field (originally random rainbow). Hue centered on
        // the AegeanPulse accent (#0e7c6b, ~171deg -> 0.475) with a small spread
        // toward cyan/emerald for depth.
        color.setHSL(0.45 + Math.random() * 0.07, 0.7, isDarkMode ? 0.5 : 0.6);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;

        velocities[i * 3] = 0;
        velocities[i * 3 + 1] = 0;
        velocities[i * 3 + 2] = 0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.026,
        vertexColors: true,
        blending: isDarkMode ? THREE.NormalBlending : THREE.AdditiveBlending,
        transparent: true,
        opacity: isDarkMode ? 1.0 : 0.85,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Map a client (x, y) to normalized device coords relative to the canvas's
    // actual on-screen rect (not the raw window) so the repel point lines up
    // with where particles render, regardless of the hero's offset beneath the
    // sticky header or the current scroll position.
    const setMouseFromClient = (clientX: number, clientY: number) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleMouseMove = (event: MouseEvent) => {
        setMouseFromClient(event.clientX, event.clientY);
    };
    // Touch: mirror the cursor so the field is interactive on phones/tablets.
    // Passive listeners — we never preventDefault, so vertical scroll still works
    // while a finger drag also pushes the particles.
    const handleTouch = (event: TouchEvent) => {
        const t = event.touches[0];
        if (t) setMouseFromClient(t.clientX, t.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });

    // Reusable scratch vectors — hoisted out of the per-particle loop. The
    // original code allocated ~5 Vector3 per particle per frame (≈250k objects/
    // frame at 50k), which thrashes the GC and stutters badly on mobile. Same
    // physics, no allocations in the hot path.
    const _cur = new THREE.Vector3();
    const _orig = new THREE.Vector3();
    const _vel = new THREE.Vector3();
    const _dir = new THREE.Vector3();
    const _mouseWorld = new THREE.Vector3();

    let frameId = 0;
    const animate = () => {
        frameId = requestAnimationFrame(animate);
        clock.update();
        const elapsedTime = clock.getElapsed();

        _mouseWorld.set(mouse.x * 3, mouse.y * 3, 0);

        for (let i = 0; i < particleCount; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            _cur.set(positions[ix], positions[iy], positions[iz]);
            _orig.set(originalPositions[ix], originalPositions[iy], originalPositions[iz]);
            _vel.set(velocities[ix], velocities[iy], velocities[iz]);

            const dist = _cur.distanceTo(_mouseWorld);
            if (dist < REPEL_RADIUS) {
                const force = (REPEL_RADIUS - dist) * REPEL_STRENGTH;
                _dir.subVectors(_cur, _mouseWorld).normalize().multiplyScalar(force);
                _vel.add(_dir);
            }

            // Return to original position
            _dir.subVectors(_orig, _cur).multiplyScalar(0.001);
            _vel.add(_dir);

            // Damping
            _vel.multiplyScalar(0.95);

            positions[ix] += _vel.x;
            positions[iy] += _vel.y;
            positions[iz] += _vel.z;

            velocities[ix] = _vel.x;
            velocities[iy] = _vel.y;
            velocities[iz] = _vel.z;
        }
        geometry.attributes.position.needsUpdate = true;

        points.rotation.y = elapsedTime * 0.12;
        renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const mount = mountRef.current;
    return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchstart', handleTouch);
        window.removeEventListener('touchmove', handleTouch);
        renderer.dispose();
        mount?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};
