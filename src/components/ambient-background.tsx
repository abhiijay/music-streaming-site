
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AmbientBackgroundProps {
  theme: "dark" | "light";
}

const AmbientBackground = ({ theme }: AmbientBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Set canvas dimensions and handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Animation logic
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    // Particles config
    const particleCount = 50;
    const particleRadius = 80;
    const particles: any[] = [];
    
    // Colors based on theme
    const colors = theme === 'dark' 
      ? ['rgba(0, 99, 229, 0.05)', 'rgba(155, 135, 245, 0.05)', 'rgba(0, 255, 221, 0.05)']
      : ['rgba(0, 99, 229, 0.03)', 'rgba(155, 135, 245, 0.03)', 'rgba(0, 255, 221, 0.03)'];
      
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        radius: Math.random() * particleRadius + 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: {
          x: Math.random() * 0.4 - 0.2,
          y: Math.random() * 0.4 - 0.2
        }
      });
    }
    
    // Animation loop
    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Update position
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        
        // Boundary check
        if (particle.x + particle.radius > dimensions.width || particle.x - particle.radius < 0) {
          particle.velocity.x = -particle.velocity.x;
        }
        
        if (particle.y + particle.radius > dimensions.height || particle.y - particle.radius < 0) {
          particle.velocity.y = -particle.velocity.y;
        }
        
        // Draw gradient blob
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius
        );
        
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, theme]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "fixed top-0 left-0 -z-10 pointer-events-none opacity-50 transition-opacity duration-1000",
        theme === "light" ? "opacity-30" : "opacity-40"
      )}
      width={dimensions.width}
      height={dimensions.height}
    />
  );
};

export default AmbientBackground;
