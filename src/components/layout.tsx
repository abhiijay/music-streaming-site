
import { ReactNode, useState, useEffect } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import NowPlaying from "./now-playing";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import MiniPlayer from "./mini-player";
import AmbientBackground from "./ambient-background";
import { Toaster } from "sonner";
import RippleEffect from "./ripple-effect";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  
  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("light-mode", savedTheme === "light");
    }
  }, []);
  
  // Theme toggle function
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("light-mode", newTheme === "light");
  };
  
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
  
  return (
    <div className={cn(
      "min-h-screen text-white transition-colors duration-500",
      theme === "dark" ? "bg-gradient-to-b from-tidal-black to-black" : "bg-gradient-to-b from-zinc-100 to-white"
    )}>
      {/* Ambient background */}
      <AmbientBackground theme={theme} />
      
      {/* Ripple effect for buttons */}
      <RippleEffect color={theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 99, 229, 0.2)"} />
      
      {/* Toast notifications */}
      <Toaster 
        position="top-right" 
        theme={theme}
        closeButton
        className="z-[100]"
      />
      
      {/* Mobile menu toggle button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          className={cn(
            "p-2 rounded-full text-white transition-colors duration-200",
            theme === "dark" ? "bg-tidal-gray/50 hover:bg-tidal-gray" : "bg-tidal-blue/20 hover:bg-tidal-blue/30"
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
        theme === "dark" ? "bg-tidal-black" : "bg-white shadow-lg"
      )}>
        <Sidebar onClose={() => setIsMobileMenuOpen(false)} theme={theme} />
      </div>
      
      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-30 md:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Header with glassmorphism effect when scrolled */}
      <Header isScrolled={isScrolled} theme={theme} toggleTheme={toggleTheme} />
      
      {/* Main content */}
      <main className="pt-16 pb-20 transition-all duration-300 md:ml-[240px]">
        <div className="container mx-auto py-6 px-4 md:px-6 animate-fade-in">
          {children}
        </div>
      </main>
      
      {/* Fixed mini player */}
      {showMiniPlayer && <MiniPlayer theme={theme} />}
      
      {/* Main player */}
      <NowPlaying theme={theme} />
    </div>
  );
};

export default Layout;
