import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
  pulsePhase: number;
}

// Blue particle palette
const COLORS = [
  'rgba(37,99,235,',   // primary #2563EB
  'rgba(30,64,175,',   // primary-dark #1E40AF
  'rgba(96,165,250,',  // primary-light #60A5FA
  'rgba(59,130,246,',  // blue-500
];

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let particles: Particle[] = [];
    let mouseX = -9999;
    let mouseY = -9999;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();

    const spawnParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 22000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.4 + 0.3,
          alpha: Math.random() * 0.4 + 0.08,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };
    spawnParticles();

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY + window.scrollY;
    };
    window.addEventListener('mousemove', onMouseMove);

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;

      // Draw subtle blue aurora blobs (very light on white bg)
      const blobs = [
        { x: canvas.width * 0.15, y: canvas.height * 0.08, r: canvas.width * 0.38, color: 'rgba(37,99,235,0.025)' },
        { x: canvas.width * 0.85, y: canvas.height * 0.12, r: canvas.width * 0.32, color: 'rgba(96,165,250,0.02)' },
        { x: canvas.width * 0.5, y: canvas.height * 0.5, r: canvas.width * 0.28, color: 'rgba(220,232,248,0.04)' },
      ];

      blobs.forEach((blob, i) => {
        const ox = Math.sin(t + i * 1.7) * canvas.width * 0.04;
        const oy = Math.cos(t + i * 2.1) * canvas.height * 0.03;
        const grad = ctx.createRadialGradient(blob.x + ox, blob.y + oy, 0, blob.x + ox, blob.y + oy, blob.r);
        grad.addColorStop(0, blob.color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(blob.x + ox, blob.y + oy, blob.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(37,99,235,${(1 - dist / 130) * 0.06})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw + animate particles
      particles.forEach((p) => {
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 120) {
          const force = (120 - mdist) / 120;
          p.vx += (mdx / mdist) * force * 0.3;
          p.vy += (mdy / mdist) * force * 0.3;
        }

        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;
        if (p.y < -5) p.y = canvas.height + 5;
        if (p.y > canvas.height + 5) p.y = -5;

        const pulse = Math.sin(t * 2.5 + p.pulsePhase) * 0.15 + 0.85;
        const a = p.alpha * pulse;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${a})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      resize();
      spawnParticles();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
    />
  );
};
