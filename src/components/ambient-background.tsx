import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AmbientBackgroundProps {
  accentColor?: string;
}

class Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: { x: number; y: number };

  constructor(width: number, height: number, radiusMax: number, colors: string[]) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * radiusMax + 20;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.velocity = {
      x: Math.random() * 0.3 - 0.15,
      y: Math.random() * 0.3 - 0.15
    };
  }

  update(dimensions: { width: number; height: number }) {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    if (this.x + this.radius > dimensions.width || this.x - this.radius < 0) {
      this.velocity.x *= -1;
    }
    if (this.y + this.radius > dimensions.height || this.y - this.radius < 0) {
      this.velocity.y *= -1;
    }
  }
}

const AmbientBackground = ({ accentColor }: AmbientBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }, 150);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    const particleCount = 40;
    const particleRadius = 120;
    let colors: string[];
    if (accentColor) {
      colors = [`${accentColor}0d`, `${accentColor}14`, `${accentColor}1a`];
    } else {
      colors = ['rgba(194, 1, 20, 0.06)', 'rgba(12, 18, 12, 0.08)', 'rgba(194, 1, 20, 0.04)'];
    }
    const particles = Array.from({ length: particleCount }, () => new Particle(dimensions.width, dimensions.height, particleRadius, colors));
    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update(dimensions);
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, accentColor]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed top-0 left-0 -z-10 pointer-events-none transition-opacity duration-1000 opacity-60 blur-sm")}
      width={dimensions.width}
      height={dimensions.height}
    />
  );
};

export default AmbientBackground;
