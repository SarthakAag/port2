

"use client";

import { useEffect, useRef } from "react";

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Fewer particles and snippets for reduced intensity
    const numParticles = isMobile ? 12 : 20;
    const numSymbols = isMobile ? 6 : 10;

    const particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const snippets = [
      "if()", "for{}", "=>", "const", "let", "return", "<div>", "class{}"
    ];
    const floatingCodes: {
      x: number;
      y: number;
      speed: number;
      symbol: string;
      size: number;
    }[] = [];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4, // slower
        vy: (Math.random() - 0.5) * 0.4,
      });
    }

    for (let i = 0; i < numSymbols; i++) {
      floatingCodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.15 + Math.random() * 0.3, // slower inward speed
        symbol: snippets[Math.floor(Math.random() * snippets.length)],
        size: 10 + Math.random() * 14,
      });
    }

    // Cap FPS for smoother performance
    let lastTime = 0;
    const fps = isMobile ? 20 : 28;

    const animate = (time: number) => {
      if (time - lastTime < 1000 / fps) {
        requestAnimationFrame(animate);
        return;
      }
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "#00bfff";
        ctx.fill();
      });

      // Gradient for lines
      for (let i = 0; i < numParticles; i++) {
        for (let j = i + 1; j < numParticles; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) { // shorter connection range
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, "rgba(0, 180, 255, 0.5)");
            gradient.addColorStop(1, "rgba(0, 100, 200, 0.3)");

            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update particle positions
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      // Floating inward code snippets
      floatingCodes.forEach((fc) => {
        ctx.font = `${fc.size}px monospace`;
        ctx.fillStyle = "rgba(0,180,255,0.5)";
        ctx.fillText(fc.symbol, fc.x, fc.y);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const dx = centerX - fc.x;
        const dy = centerY - fc.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 1) {
          fc.x += (dx / dist) * fc.speed;
          fc.y += (dy / dist) * fc.speed;
        }

        if (dist < 25) {
          fc.x = Math.random() * canvas.width;
          fc.y = Math.random() * canvas.height;
        }
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    // Debounced resize
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }, 200);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-20 will-change-transform"
    />
  );
}
