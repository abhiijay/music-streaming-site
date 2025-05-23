
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AmbientBackgroundProps {
  accentColor?: string; // Optional accent color for the background
}

const AmbientBackground = ({ accentColor }: AmbientBackgroundProps) => {
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
    
    // Particles config - adjusted for Chord theme
    const particleCount = 40;
    const particleRadius = 120;
    const particles: any[] = [];
    
    // Colors based on accentColor
    let colors: string[];
    
    if (accentColor) {
      // Use accentColor with different opacity levels if provided
      colors = [
        `${accentColor}0d`, // ~5% opacity
        `${accentColor}14`, // ~8% opacity
        `${accentColor}1a`, // ~10% opacity
      ];
    } else {
      // Default colors based on Chord palette
      colors = [
        'rgba(194, 1, 20, 0.06)',  // Red accent
        'rgba(12, 18, 12, 0.08)',  // Blackish green background
        'rgba(194, 1, 20, 0.04)'   // Red accent with less opacity
      ];
    }
      
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        radius: Math.random() * particleRadius + 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: {
          x: Math.random() * 0.3 - 0.15,
          y: Math.random() * 0.3 - 0.15
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
  }, [dimensions, accentColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 -z-10 pointer-events-none transition-opacity duration-1000 opacity-60"
      width={dimensions.width}
      height={dimensions.height}
    />
  );
};

export default AmbientBackground;
