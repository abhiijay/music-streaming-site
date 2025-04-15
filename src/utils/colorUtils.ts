
/**
 * Enhanced color utilities for MQ theme:
 * - Dynamic color extraction from album art
 * - Color manipulation functions
 * - Accessibility helpers for contrast
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

// Extract dominant color from an image - Enhanced for MQ theme
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

// Generate a complementary color
export const getComplementaryColor = (hexColor: string): string => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Compute complementary color
  const rComp = 255 - r;
  const gComp = 255 - g;
  const bComp = 255 - b;
  
  // Convert to hex
  return `#${((1 << 24) | (rComp << 16) | (gComp << 8) | bComp).toString(16).slice(1)}`;
};

// Create color palette from base color (for theme generation)
export const createPaletteFromColor = (baseColor: string): {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
} => {
  const hex = baseColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Convert to HSL for easier manipulation
  const [h, s, l] = rgbToHsl(r, g, b);
  
  // Generate palette based on HSL adjustments
  const primary = baseColor;
  const secondary = hslToHex((h + 0.1) % 1, s * 0.8, l);
  const accent = hslToHex((h + 0.5) % 1, s * 0.9, l * 1.1);
  
  // Background based on lightness
  const background = l > 0.5 
    ? hslToHex(h, s * 0.1, 0.95) // Light background for dark colors
    : hslToHex(h, s * 0.2, 0.15); // Dark background for light colors
  
  // Text color based on background
  const text = l > 0.5 ? '#003049' : '#FFFFFF';
  
  return { primary, secondary, accent, background, text };
};

// Convert HSL to Hex
const hslToHex = (h: number, s: number, l: number): string => {
  const rgb = hslToRgb(h, s, l);
  return `#${((1 << 24) | (rgb[0] << 16) | (rgb[1] << 8) | rgb[2]).toString(16).slice(1)}`;
};

// Create a muted version of a color for backgrounds
export const getMutedColor = (hexColor: string, amount: number = 0.85): string => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Convert to HSL
  const [h, s, l] = rgbToHsl(r, g, b);
  
  // Return muted version (reduced saturation)
  return hslToHex(h, s * amount, l);
};

// Ensure color meets accessibility standards
export const ensureAccessibleColor = (
  textColor: string, 
  backgroundColor: string, 
  minContrastRatio: number = 4.5
): string => {
  const contrastRatio = calculateContrastRatio(textColor, backgroundColor);
  
  if (contrastRatio >= minContrastRatio) {
    return textColor; // Already accessible
  }
  
  // Not accessible, make it accessible
  const textHex = textColor.replace('#', '');
  const r = parseInt(textHex.substring(0, 2), 16);
  const g = parseInt(textHex.substring(2, 4), 16);
  const b = parseInt(textHex.substring(4, 6), 16);
  
  // Convert to HSL
  const [h, s, l] = rgbToHsl(r, g, b);
  
  // Determine if we need to lighten or darken
  const bgIsLight = isLightColor(backgroundColor);
  
  // Start with current lightness
  let newL = l;
  let newColor = textColor;
  let newContrast = contrastRatio;
  
  // Incrementally adjust until we meet the contrast requirement
  const step = bgIsLight ? -0.05 : 0.05;
  
  while (newContrast < minContrastRatio && newL >= 0 && newL <= 1) {
    newL += step;
    newColor = hslToHex(h, s, newL);
    newContrast = calculateContrastRatio(newColor, backgroundColor);
  }
  
  return newColor;
};

// Calculate contrast ratio between two colors
const calculateContrastRatio = (color1: string, color2: string): number => {
  const luminance1 = calculateLuminance(color1);
  const luminance2 = calculateLuminance(color2);
  
  // Make sure the lighter color is always the first one
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

// Calculate luminance of a color
const calculateLuminance = (color: string): number => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  const rLinear = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gLinear = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bLinear = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
};
