
import { ReactNode, useState, useEffect } from "react";
import Header from "./header";
import NowPlaying from "./now-playing";
import { cn } from "@/lib/utils";
import MiniPlayer from "./mini-player";
import AmbientBackground from "./ambient-background";
import { Toaster } from "sonner";
import RippleEffect from "./ripple-effect";
import Footer from "./footer";
import { extractDominantColor } from "@/utils/colorUtils";
import { usePlayer } from "@/contexts/PlayerContext";
import BottomNav from "./bottom-nav";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  pageColor?: string; // For page-specific theming
}

const Layout = ({ children, pageColor }: LayoutProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [dominantColor, setDominantColor] = useState<string | undefined>(pageColor);
  const { currentSong } = usePlayer();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Extract dominant color from current song if available
  useEffect(() => {
    if (currentSong?.imageUrl) {
      extractDominantColor(currentSong.imageUrl)
        .then(color => {
          setDominantColor(color);
        })
        .catch(err => {
          console.error("Error extracting color:", err);
        });
    } else if (pageColor) {
      setDominantColor(pageColor);
    }
  }, [currentSong, pageColor]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowMiniPlayer(true);
        setIsScrolled(true);
      } else {
        setShowMiniPlayer(false);
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Dynamic gradient if we have a dominant color
  const dynamicGradient = dominantColor
    ? {
        background: `linear-gradient(180deg, ${dominantColor}40 0%, #0C120C 100%)`,
      }
    : {};
  
  return (
    <div 
      className="min-h-screen text-chord-text flex flex-col transition-colors duration-500 bg-chord-bg"
      style={dominantColor ? dynamicGradient : {}}
    >
      {/* Ambient background with enhanced visuals */}
      <AmbientBackground accentColor={dominantColor} />
      
      {/* Animated gradient background effect */}
      <div className="ambient-background"></div>
      
      {/* Ripple effect for buttons */}
      <RippleEffect 
        color="rgba(194, 1, 20, 0.3)" 
      />
      
      {/* Toast notifications */}
      <Toaster 
        position="top-right" 
        closeButton
        className="z-[100]"
      />
      
      {/* Header with glassmorphism effect when scrolled */}
      <Header isScrolled={isScrolled} />
      
      {/* Main content */}
      <main className="pt-16 pb-20 transition-all duration-300 flex-grow">
        <div className="container mx-auto py-6 px-4 md:px-6 animate-fade-in">
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Fixed mini player */}
      {showMiniPlayer && <MiniPlayer />}
      
      {/* Mobile bottom navigation */}
      <div className="md:hidden">
        <BottomNav />
      </div>
      
      {/* Main player */}
      <NowPlaying dominantColor={dominantColor} />
    </div>
  );
};

export default Layout;
