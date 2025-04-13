
import { ReactNode, useState, useEffect } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import NowPlaying from "./now-playing";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import MiniPlayer from "./mini-player";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Show mini player when scrolled down significantly
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
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-tidal-black to-black text-white">
      {/* Mobile menu toggle button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          className="p-2 rounded-full bg-tidal-gray/50 text-white hover:bg-tidal-gray transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>
      
      {/* Sidebar with mobile responsiveness */}
      <div className={cn(
        "fixed top-0 left-0 h-full bg-tidal-black z-40 transition-all duration-300 ease-in-out",
        isMobileMenuOpen ? "translate-x-0 w-[240px]" : "-translate-x-full md:translate-x-0 w-0 md:w-[240px]"
      )}>
        <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
      </div>
      
      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-30 md:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
      
      {/* Header with glassmorphism effect when scrolled */}
      <Header isScrolled={isScrolled} />
      
      {/* Main content */}
      <main className="md:pl-[240px] pt-16 pb-20 transition-all duration-300">
        <div className="container mx-auto py-6 px-4 md:px-6 animate-fade-in">
          {children}
        </div>
      </main>
      
      {/* Fixed mini player */}
      {showMiniPlayer && <MiniPlayer />}
      
      {/* Main player */}
      <NowPlaying />
    </div>
  );
};

export default Layout;
