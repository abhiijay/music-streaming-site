
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Globe, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  theme?: "dark" | "light";
}

const Footer = ({ theme = "dark" }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={cn(
      "mt-auto py-8 border-t transition-colors duration-500",
      theme === "dark" 
        ? "border-zinc-800 bg-gradient-to-t from-mq-navy to-transparent" 
        : "border-zinc-200 bg-gradient-to-t from-white to-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <Link to="/" className="mb-6">
            <div className="text-2xl font-bold tracking-tighter flex items-center gap-1">
              <span className={cn(
                "text-mq-yellow", 
                theme === "light" && "text-mq-red"
              )}>MQ</span>
              <span className={cn(
                "text-xs font-normal mt-1.5",
                theme === "dark" ? "text-mq-yellow/70" : "text-mq-red/70"
              )}>MUSIC</span>
            </div>
          </Link>
          
          {/* Nav Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-6">
            <Link to="/about" className={cn(
              "text-sm transition-all duration-300 hover:scale-105",
              theme === "dark" ? "text-zinc-400 hover:text-mq-yellow" : "text-zinc-600 hover:text-mq-red"
            )}>
              About
            </Link>
            <Link to="/contact" className={cn(
              "text-sm transition-all duration-300 hover:scale-105",
              theme === "dark" ? "text-zinc-400 hover:text-mq-yellow" : "text-zinc-600 hover:text-mq-red"
            )}>
              Contact
            </Link>
            <Link to="/terms" className={cn(
              "text-sm transition-all duration-300 hover:scale-105",
              theme === "dark" ? "text-zinc-400 hover:text-mq-yellow" : "text-zinc-600 hover:text-mq-red"
            )}>
              Terms of Service
            </Link>
            <Link to="/privacy" className={cn(
              "text-sm transition-all duration-300 hover:scale-105",
              theme === "dark" ? "text-zinc-400 hover:text-mq-yellow" : "text-zinc-600 hover:text-mq-red"
            )}>
              Privacy Policy
            </Link>
          </div>
          
          {/* Social Icons */}
          <div className="flex space-x-4 mb-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={cn(
              "p-2 rounded-full transition-all duration-200 hover:scale-110",
              theme === "dark" 
                ? "text-zinc-400 hover:text-white hover:bg-mq-navy/50" 
                : "text-zinc-600 hover:text-mq-red hover:bg-zinc-100"
            )}>
              <Instagram size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={cn(
              "p-2 rounded-full transition-all duration-200 hover:scale-110",
              theme === "dark" 
                ? "text-zinc-400 hover:text-white hover:bg-mq-navy/50" 
                : "text-zinc-600 hover:text-mq-red hover:bg-zinc-100"
            )}>
              <Twitter size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={cn(
              "p-2 rounded-full transition-all duration-200 hover:scale-110",
              theme === "dark" 
                ? "text-zinc-400 hover:text-white hover:bg-mq-navy/50" 
                : "text-zinc-600 hover:text-mq-red hover:bg-zinc-100"
            )}>
              <Youtube size={20} />
            </a>
            <button className={cn(
              "p-2 rounded-full transition-all duration-200 hover:scale-110",
              theme === "dark" 
                ? "text-zinc-400 hover:text-white hover:bg-mq-navy/50" 
                : "text-zinc-600 hover:text-mq-red hover:bg-zinc-100"
            )}>
              <Globe size={20} />
            </button>
          </div>
          
          {/* Copyright */}
          <p className={cn(
            "text-xs flex items-center justify-center",
            theme === "dark" ? "text-zinc-500" : "text-zinc-500"
          )}>
            © {currentYear} MQ Music. Made with <Heart size={12} className="mx-1 text-mq-red" /> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
