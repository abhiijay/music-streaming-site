
import { useState, useCallback } from "react";

interface RippleStyle {
  left: number;
  top: number;
  width: number;
  height: number;
  opacity: number;
}

interface UseRippleReturnType {
  ripples: RippleStyle[];
  addRipple: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  rippleStyles: React.CSSProperties;
}

export const useRipple = (): UseRippleReturnType => {
  const [ripples, setRipples] = useState<RippleStyle[]>([]);

  const addRipple = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const size = rippleContainer.width > rippleContainer.height 
      ? rippleContainer.width 
      : rippleContainer.height;
    
    const x = event.clientX - rippleContainer.left - size / 2;
    const y = event.clientY - rippleContainer.top - size / 2;
    
    const newRipple = {
      left: x,
      top: y,
      width: size,
      height: size,
      opacity: 1
    };
    
    setRipples((prevRipples) => [...prevRipples, newRipple]);
    
    // Clean up ripple after animation
    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.slice(1));
    }, 600);
  }, []);

  const rippleStyles: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden'
  };

  return { ripples, addRipple, rippleStyles };
};
