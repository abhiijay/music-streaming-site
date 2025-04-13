
import { ReactNode, useState, useEffect } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import NowPlaying from "./now-playing";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import MiniPlayer from "./mini-player";
import Queue from "./queue"; // Adding the Queue component

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  
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
  
  // Theme handling with localStorage persistence
  useEffect(() => {
    // Check if theme preference exists in localStorage
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };
  
  const toggleQueue = () => {
    setShowQueue(!showQueue);
  };
  
  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      theme === "dark" 
        ? "bg-gradient-to-b from-tidal-black to-black text-white" 
        : "bg-gradient-to-b from-slate-100 to-white text-slate-900"
    )}>
      {/* Mobile menu toggle button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          className={cn(
            "p-2 rounded-full text-white hover:bg-tidal-gray/50 transition-all duration-200",
            theme === "dark" ? "bg-tidal-gray/50" : "bg-tidal-blue/20"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>
      
      {/* Sidebar with mobile responsiveness */}
      <div className={cn(
        "fixed top-0 left-0 h-full z-40 transition-all duration-300 ease-in-out",
        isMobileMenuOpen ? "translate-x-0 w-[240px]" : "-translate-x-full md:translate-x-0 w-0 md:w-[240px]",
        theme === "dark" ? "bg-tidal-black" : "bg-white/90 backdrop-blur-md"
      )}>
        <Sidebar onClose={() => setIsMobileMenuOpen(false)} theme={theme} />
      </div>
      
      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-30 md:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
      
      {/* Header with glassmorphism effect when scrolled */}
      <Header 
        isScrolled={isScrolled} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />
      
      {/* Main content */}
      <main className="pt-16 pb-20 transition-all duration-300">
        <div className="container mx-auto py-6 px-4 md:px-6 md:ml-[240px] animate-fade-in">
          {children}
        </div>
      </main>
      
      {/* Queue panel */}
      <Queue 
        isOpen={showQueue} 
        onClose={toggleQueue}
        theme={theme} 
      />
      
      {/* Fixed mini player */}
      {showMiniPlayer && <MiniPlayer theme={theme} />}
      
      {/* Main player */}
      <NowPlaying 
        toggleQueue={toggleQueue} 
        isQueueOpen={showQueue}
        theme={theme}
      />
    </div>
  );
};

export default Layout;
