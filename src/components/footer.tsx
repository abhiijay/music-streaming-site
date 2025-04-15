
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";
import AppLogo from "./app-logo";

const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-6">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <AppLogo size="small" />
          </div>
          
          {/* Links */}
          <div className="flex items-center space-x-6">
            <Link to="/about" className="text-chord-text/70 hover:text-chord-text text-sm font-bold">
              About
            </Link>
            <Link to="/terms" className="text-chord-text/70 hover:text-chord-text text-sm font-bold">
              Terms
            </Link>
            <Link to="/privacy" className="text-chord-text/70 hover:text-chord-text text-sm font-bold">
              Privacy
            </Link>
            <Link to="/contact" className="text-chord-text/70 hover:text-chord-text text-sm font-bold">
              Contact
            </Link>
          </div>
          
          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-chord-text/70 hover:text-chord-text hover:scale-110 transition-all duration-200"
            >
              <Facebook size={18} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-chord-text/70 hover:text-chord-text hover:scale-110 transition-all duration-200"
            >
              <Twitter size={18} />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-chord-text/70 hover:text-chord-text hover:scale-110 transition-all duration-200"
            >
              <Instagram size={18} />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-chord-text/70 hover:text-chord-text hover:scale-110 transition-all duration-200"
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>
        
        <div className="mt-4 border-t border-white/5 pt-4 flex justify-center">
          <p className="text-chord-text/50 text-xs font-bold">
            &copy; {new Date().getFullYear()} Chord. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
