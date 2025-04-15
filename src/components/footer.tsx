
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Globe, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  theme?: "dark" | "light";
}

const Footer = ({ theme = "dark" }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={cn(
      "mt-auto py-6 border-t transition-colors duration-500",
      theme === "dark" 
        ? "border-zinc-800 bg-gradient-to-t from-black to-transparent" 
        : "border-zinc-200 bg-gradient-to-t from-white to-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className={cn(
                "text-xl font-bold",
                theme === "dark" ? "text-white" : "text-[#003049]"
              )}>
                MQ
              </span>
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 md:mb-0">
            <Link to="/about" className={cn(
              "text-sm transition-colors hover:scale-105 duration-300",
              theme === "dark" ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-[#D62828]"
            )}>
              About
            </Link>
            <Link to="/contact" className={cn(
              "text-sm transition-colors hover:scale-105 duration-300",
              theme === "dark" ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-[#D62828]"
            )}>
              Contact
            </Link>
            <Link to="/terms" className={cn(
              "text-sm transition-colors hover:scale-105 duration-300",
              theme === "dark" ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-[#D62828]"
            )}>
              Terms of Service
            </Link>
            <Link to="/privacy" className={cn(
              "text-sm transition-colors hover:scale-105 duration-300",
              theme === "dark" ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-[#D62828]"
            )}>
              Privacy
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={cn(
              "p-2 rounded-full transition-all duration-200 hover:scale-110",
              theme === "dark" 
                ? "text-zinc-400 hover:text-white hover:bg-[#003049]/50" 
                : "text-zinc-600 hover:text-[#D62828] hover:bg-zinc-100"
            )}>
              <Facebook size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={cn(
              "p-2 rounded-full transition-all duration-200 hover:scale-110",
              theme === "dark" 
                ? "text-zinc-400 hover:text-white hover:bg-[#003049]/50" 
                : "text-zinc-600 hover:text-[#D62828] hover:bg-zinc-100"
            )}>
              <Instagram size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={cn(
              "p-2 rounded-full transition-all duration-200 hover:scale-110",
              theme === "dark" 
                ? "text-zinc-400 hover:text-white hover:bg-[#003049]/50" 
                : "text-zinc-600 hover:text-[#D62828] hover:bg-zinc-100"
            )}>
              <Twitter size={18} />
            </a>
            <button className={cn(
              "p-2 rounded-full transition-all duration-200 hover:scale-110",
              theme === "dark" 
                ? "text-zinc-400 hover:text-white hover:bg-[#003049]/50" 
                : "text-zinc-600 hover:text-[#D62828] hover:bg-zinc-100"
            )}>
              <Globe size={18} />
            </button>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className={cn(
            "text-xs flex items-center justify-center",
            theme === "dark" ? "text-zinc-500" : "text-zinc-500"
          )}>
            © {currentYear} MQ Music. Made with <Heart size={12} className="mx-1 text-[#D62828]" /> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
