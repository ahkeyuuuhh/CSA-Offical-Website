'use client';

import { useEffect, useRef } from 'react';

interface SilkBackgroundProps {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
}

export default function SilkBackground({
  speed = 5,
  scale = 1,
  color = '#231f1f',
  noiseIntensity = 1.5,
  rotation = 0,
}: SilkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      time += speed * 0.001;

      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Create silk-like flowing lines
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 + Math.sin(time + i) * 0.02})`;
        ctx.lineWidth = 2 + Math.sin(time * 0.5 + i) * 1;

        for (let x = 0; x < canvas.width; x += 5) {
          const angle = (x / canvas.width) * Math.PI * 2 * scale + time + i * 0.5;
          const y =
            centerY +
            Math.sin(angle) * 100 * scale +
            Math.sin(time * 2 + i) * 50 * noiseIntensity +
            Math.cos(angle * 0.5 + time) * 30;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      }

      // Add noise effect
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        if (Math.random() < 0.02 * noiseIntensity) {
          const noise = (Math.random() - 0.5) * 20;
          data[i] += noise;
          data[i + 1] += noise;
          data[i + 2] += noise;
        }
      }

      ctx.putImageData(imageData, 0, 0);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, scale, color, noiseIntensity, rotation]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ transform: `rotate(${rotation}deg)` }}
    />
  );
}
