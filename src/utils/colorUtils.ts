
/**
 * Utility functions for color manipulation and extraction
 * Used for dynamic theming based on album artwork
 */

// Helper to convert RGB to HSL
const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h /= 6;
  }

  return [h, s, l];
};

// Helper to adjust color luminosity
export const adjustLuminosity = (hexColor: string, factor: number): string => {
  // Convert hex to RGB
  const hex = hexColor.replace('#', '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Convert RGB to HSL
  const [h, s, l] = rgbToHsl(r, g, b);
  
  // Adjust luminosity
  const newL = Math.min(Math.max(l * factor, 0), 1);
  
  // Convert back to RGB
  const newRgb = hslToRgb(h, s, newL);
  
  // Convert to hex
  return `#${((1 << 24) | (newRgb[0] << 16) | (newRgb[1] << 8) | newRgb[2]).toString(16).slice(1)}`;
};

// Helper to convert HSL to RGB
const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

// Check if a color is light or dark
export const isLightColor = (hexColor: string): boolean => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate perceived brightness (YIQ formula)
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return yiq >= 128;
};

// Create a color with adjusted transparency
export const withOpacity = (hexColor: string, opacity: number): string => {
  // Convert hex to RGB
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Extract dominant color from an image
export const extractDominantColor = async (imageUrl: string): Promise<string> => {
  try {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      
      img.onload = () => {
        // Create canvas to analyze the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve('#003049'); // Default MQ navy if canvas context is not available
          return;
        }
        
        // Set canvas dimensions and draw image
        const size = 50; // Small size for performance
        canvas.width = size;
        canvas.height = size;
        ctx.drawImage(img, 0, 0, size, size);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, size, size).data;
        
        // Simple color counting (basic implementation)
        const colorCount: Record<string, number> = {};
        
        for (let i = 0; i < imageData.length; i += 4) {
          const r = imageData[i];
          const g = imageData[i + 1];
          const b = imageData[i + 2];
          
          // Skip transparent pixels
          if (imageData[i + 3] < 128) continue;
          
          // Group similar colors (reduce precision)
          const key = `${Math.round(r/10)*10},${Math.round(g/10)*10},${Math.round(b/10)*10}`;
          
          if (!colorCount[key]) {
            colorCount[key] = 0;
          }
          colorCount[key]++;
        }
        
        // Find the most common color
        let maxCount = 0;
        let dominantColorKey = '0,0,0';
        
        Object.entries(colorCount).forEach(([key, count]) => {
          if (count > maxCount) {
            maxCount = count;
            dominantColorKey = key;
          }
        });
        
        // Convert back to RGB
        const [r, g, b] = dominantColorKey.split(',').map(Number);
        
        // Convert to hex
        const hex = `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
        
        // Adjust the color if it's too light or too dark
        const [h, s, l] = rgbToHsl(r, g, b);
        let adjustedColor = hex;
        
        if (l < 0.15) {
          // Too dark, lighten it
          adjustedColor = adjustLuminosity(hex, 1.6);
        } else if (l > 0.85) {
          // Too light, darken it
          adjustedColor = adjustLuminosity(hex, 0.6);
        }
        
        resolve(adjustedColor);
      };
      
      img.onerror = () => {
        resolve('#003049'); // Default MQ navy on error
      };
      
      img.src = imageUrl;
    });
  } catch (error) {
    console.error("Error extracting dominant color:", error);
    return '#003049'; // Default MQ navy on error
  }
};

// Create a contrasting text color based on background
export const getContrastingTextColor = (hexColor: string): string => {
  return isLightColor(hexColor) ? '#003049' : '#FFFFFF';
};

// Create a gradient from the dominant color
export const createGradientFromColor = (hexColor: string, isDark: boolean = true): string => {
  const baseColor = hexColor;
  const endColor = isDark ? 
    adjustLuminosity(hexColor, 0.5) : 
    adjustLuminosity(hexColor, 1.2);
  
  return `linear-gradient(to bottom, ${baseColor} 0%, ${endColor} 100%)`;
};
