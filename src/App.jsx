import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import React, { useState, useRef } from "react";
// Animated pattern inside transparent box
function GlowingPatternBox({ position, title, children, color }) {
  const meshRef = useRef();
  const planeRef = useRef();
  const clock = useRef(new THREE.Clock());

  useFrame(() => {
    if (planeRef.current) {
      // Animate texture offset to simulate moving pattern
      planeRef.current.material.map.offset.x += 0.002;
      planeRef.current.material.map.offset.y += 0.001;
    }

    // Slow subtle rotation of the whole box for life
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x += 0.001;
    }
  });

  // Create a canvas texture with moving gradient lines for the pattern
  // To keep it simple, use a THREE.CanvasTexture with a gradient pattern

  // Setup gradient canvas texture once
  const texture = React.useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    // Draw vertical gradient lines
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.5, "transparent");
    gradient.addColorStop(1, color);

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = gradient;

    // Draw repeated diagonal stripes
    const stripeWidth = 15;
    for (let i = -size; i < size * 2; i += stripeWidth * 2) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + stripeWidth, 0);
      ctx.lineTo(i - size + stripeWidth, size);
      ctx.lineTo(i - size, size);
      ctx.closePath();
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
    tex.offset.set(0, 0);
    return tex;
  }, [color]);

  return (
    <group position={position} ref={meshRef}>
      {/* Transparent rounded box */}
      <mesh>
        <boxGeometry args={[6, 4, 1]} />
        <meshPhysicalMaterial
          color="#222"
          transparent
          opacity={0.1}
          roughness={0.1}
          metalness={0.7}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Animated glowing pattern plane inside */}
      <mesh position={[0, 0, 0.51]} ref={planeRef}>
        <planeGeometry args={[5.7, 3.7]} />
        <meshStandardMaterial
          map={texture}
          emissive={new THREE.Color(color)}
          emissiveIntensity={0.8}
          transparent
          opacity={0.7}
          toneMapped={false}
        />
      </mesh>

      {/* Text content on top */}
      <Html
        position={[0, 0, 0.55]}
        center
        style={{
          width: "480px",
          background: "rgba(255 255 255 / 0.85)",
          padding: "35px 50px",
          borderRadius: 24,
          boxShadow: `0 0 25px ${color}`,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: "#222",
          userSelect: "none",
          fontSize: "1.7em",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontWeight: "900",
            fontSize: "3.5em",
            marginBottom: "20px",
            color,
          }}
        >
          {title}
        </h2>
        {children}
      </Html>
    </group>
  );
}

// Your page components wrapped inside GlowingPatternBox

function About() {
  return (
    <GlowingPatternBox position={[-6, 0.5, 0]} title="About Me" color="#6c63ff">
      <p>
        I'm Ranita Maity, B.Tech in AEIE (2021–2025), CGPA: 7.80
      </p>
      <p>
        Skilled in Java, HTML, CSS, React, DSA, SQL, Python, and Web Dev.
      </p>
    </GlowingPatternBox>
  );
}

function Skills() {
  return (
    <GlowingPatternBox position={[-2, 0, 0]} title="Skills" color="#f49ac2">
      <ul style={{ textAlign: "left", paddingLeft: 30, fontSize: "1.5em", lineHeight: 1.8 }}>
        <li>Java</li>
        <li>React.js</li>
        <li>DSA</li>
        <li>SQL</li>
        <li>HTML/CSS</li>
        <li>Python, Node.js (Basic)</li>
        <li>Learning FastAPI</li>
      </ul>
    </GlowingPatternBox>
  );
}

function Projects() {
  return (
    <GlowingPatternBox position={[2, 0.5, 0]} title="Projects" color="#6ad3e0">
      <ul style={{ textAlign: "left", paddingLeft: 30, fontSize: "1.5em", lineHeight: 1.8 }}>
        <li>Keylogger Monitoring (Node.js + Python)</li>
        <li>Ongoing Photographer Event Manager (Full Stack)</li>
        <li>React Portfolio</li>
        <li>React Travel Project</li>
      </ul>
    </GlowingPatternBox>
  );
}

function Contact() {
  return (
    <GlowingPatternBox position={[6, 0, 0]} title="Contact" color="#d17aff">
      <p style={{ fontSize: "1.5em", marginBottom: 10 }}>
        Email:{" "}
        <a href="mailto:maityranita3@gmail.com" style={{ color: "#620085", textDecoration: "underline" }}>
          maityranita3@gmail.com
        </a>
      </p>
      <p style={{ fontSize: "1.5em", marginBottom: 10 }}>
        LinkedIn:{" "}
        <a href="https://linkedin.com/in/ranita-maity" target="_blank" rel="noopener noreferrer" style={{ color: "#620085", textDecoration: "underline" }}>
          ranita-maity
        </a>
      </p>
      <p style={{ fontSize: "1.5em", marginBottom: 10 }}>
        GitHub:{" "}
        <a href="https://github.com/ranitamaity" target="_blank" rel="noopener noreferrer" style={{ color: "#620085", textDecoration: "underline" }}>
          ranitamaity
        </a>
      </p>
      <p style={{ fontSize: "1.5em" }}>
        Phone:{" "}
        <a href="tel:+917501286938" style={{ color: "#620085", textDecoration: "underline" }}>
          7501286938
        </a>
      </p>
    </GlowingPatternBox>
  );
}
function AnimatedGroup({ activeIndex, positions }) {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      const targetX = -positions[activeIndex];
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <About />
      <Skills />
      <Projects />
      <Contact />
    </group>
  );
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const positions = [-6, -2, 2, 6];

  const goNext = () => setActiveIndex((i) => (i + 1) % positions.length);
  const goPrev = () => setActiveIndex((i) => (i - 1 + positions.length) % positions.length);

  return (
    <>
      {/* Navigation Arrows */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: 20,
          transform: "translateY(-50%)",
          zIndex: 10,
          userSelect: "none",
        }}
      >
        <button
          onClick={goPrev}
          style={{
            fontSize: "2.5rem",
            background: "rgba(0,0,0,0.3)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 60,
            height: 60,
            cursor: "pointer",
          }}
          aria-label="Previous"
        >
          ←
        </button>
      </div>
      <div
        style={{
          position: "fixed",
          top: "50%",
          right: 20,
          transform: "translateY(-50%)",
          zIndex: 10,
          userSelect: "none",
        }}
      >
        <button
          onClick={goNext}
          style={{
            fontSize: "2.5rem",
            background: "rgba(0,0,0,0.3)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 60,
            height: 60,
            cursor: "pointer",
          }}
          aria-label="Next"
        >
          →
        </button>
      </div>

      {/* Canvas */}
      <div style={{ height: "100vh", background: "#fff", overflow: "hidden" }}>
        <Canvas camera={{ position: [0, 0, 25], fov: 55 }} shadows>
          <ambientLight intensity={0.3} />
          <pointLight position={[15, 15, 15]} intensity={0.8} />
          <pointLight position={[-15, -15, -15]} intensity={0.5} />
          <OrbitControls enableZoom={false} enablePan={false} />

          <AnimatedGroup activeIndex={activeIndex} positions={positions} />
        </Canvas>
      </div>
    </>
  );
}
