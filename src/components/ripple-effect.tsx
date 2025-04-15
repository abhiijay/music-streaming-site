
import { useEffect, useState } from "react";

interface RippleEffectProps {
  color?: string;
  duration?: number;
}

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

export const RippleEffect = ({ color = "rgba(255, 255, 255, 0.3)", duration = 600 }: RippleEffectProps) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  
  useEffect(() => {
    const element = document.documentElement;
    let rippleCount = 0;
    
    const createRipple = (e: MouseEvent) => {
      // Only create ripple on buttons, links, and elements with ripple class
      const target = e.target as HTMLElement;
      
      if (
        target.tagName === "BUTTON" || 
        target.tagName === "A" ||
        target.classList.contains("ripple-effect") ||
        target.closest(".btn") ||
        target.closest(".ripple-effect")
      ) {
        // Get element position
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Determine ripple size based on element's diagonal
        const size = Math.max(rect.width, rect.height) * 2;
        
        // Create new ripple
        const newRipple: Ripple = {
          x,
          y,
          size,
          id: rippleCount++
        };
        
        setRipples(prevRipples => [...prevRipples, newRipple]);
        
        // Remove ripple after animation
        setTimeout(() => {
          setRipples(prevRipples => prevRipples.filter(r => r.id !== newRipple.id));
        }, duration);
      }
    };
    
    // Add click listener to document
    document.addEventListener('mousedown', createRipple);
    
    return () => {
      document.removeEventListener('mousedown', createRipple);
    };
  }, [duration, color]);
  
  return (
    <>
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="ripple absolute pointer-events-none rounded-full"
          style={{
            left: ripple.x - ripple.size / 2 + 'px',
            top: ripple.y - ripple.size / 2 + 'px',
            width: ripple.size + 'px',
            height: ripple.size + 'px',
            backgroundColor: color,
            animationDuration: duration + 'ms'
          }}
        />
      ))}
    </>
  );
};

export default RippleEffect;
