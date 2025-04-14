
import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube, Globe } from "lucide-react";
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
        ? "border-zinc-800/30 bg-gradient-to-t from-mq-navy/80 to-transparent" 
        : "border-zinc-200/50 bg-gradient-to-t from-mq-sand/40 to-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <Link to="/" className="mb-6">
            <div className="text-2xl font-bold tracking-tighter flex items-center gap-1">
              <span className={cn(
                theme === "dark" ? "text-mq-yellow" : "text-mq-red"
              )}>MQ</span>
              <span className={cn(
                "text-xs font-normal mt-1.5",
                theme === "dark" ? "text-mq-yellow/70" : "text-mq-red/70"
              )}>MUSIC</span>
            </div>
          </Link>
          
          {/* Nav Links with better spacing and hover effects */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-7">
            <FooterLink to="/about" label="About" theme={theme} />
            <FooterLink to="/contact" label="Contact" theme={theme} />
            <FooterLink to="/terms" label="Terms of Service" theme={theme} />
            <FooterLink to="/privacy" label="Privacy Policy" theme={theme} />
          </div>
          
          {/* Social Icons with enhanced hover effects */}
          <div className="flex space-x-6 mb-7">
            <SocialIcon href="https://instagram.com" theme={theme}>
              <Instagram size={20} />
            </SocialIcon>
            <SocialIcon href="https://twitter.com" theme={theme}>
              <Twitter size={20} />
            </SocialIcon>
            <SocialIcon href="https://youtube.com" theme={theme}>
              <Youtube size={20} />
            </SocialIcon>
            <SocialIcon href="#" theme={theme} onClick={() => {}}>
              <Globe size={20} />
            </SocialIcon>
          </div>
          
          {/* Language selector (optional) */}
          <div className="mb-6">
            <select 
              className={cn(
                "py-1.5 px-3 rounded-full text-sm focus:outline-none cursor-pointer transition-all duration-200",
                theme === "dark" 
                  ? "bg-zinc-800/50 text-zinc-300 border border-zinc-700/50 hover:border-zinc-600" 
                  : "bg-white/80 text-zinc-700 border border-zinc-300/50 hover:border-zinc-400"
              )}
              defaultValue="en"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ja">日本語</option>
            </select>
          </div>
          
          {/* Copyright */}
          <p className={cn(
            "text-xs flex items-center justify-center",
            theme === "dark" ? "text-zinc-500" : "text-zinc-500"
          )}>
            © {currentYear} MQ Music. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Helper component for footer links with consistent styling
const FooterLink = ({ to, label, theme }: { to: string; label: string; theme: "dark" | "light" }) => (
  <Link to={to} className={cn(
    "text-sm transition-all duration-200 relative group",
    theme === "dark" ? "text-zinc-400" : "text-zinc-600"
  )}>
    {label}
    <span className={cn(
      "absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
      theme === "dark" ? "bg-mq-yellow" : "bg-mq-red"
    )}></span>
  </Link>
);

// Helper component for social icons with consistent styling and animations
const SocialIcon = ({ 
  href, 
  theme, 
  children, 
  onClick 
}: { 
  href: string; 
  theme: "dark" | "light"; 
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    onClick={onClick}
    className={cn(
      "p-2.5 rounded-full transition-all duration-300 hover:scale-110 relative overflow-hidden",
      theme === "dark" 
        ? "text-zinc-400 hover:text-white hover:bg-white/10" 
        : "text-zinc-600 hover:text-mq-red hover:bg-mq-red/10",
      "before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:transition-all before:duration-300",
      theme === "dark"
        ? "before:hover:border-white/20"
        : "before:hover:border-mq-red/30"
    )}
  >
    {children}
  </a>
);

export default Footer;
