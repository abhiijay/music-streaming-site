
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Library, Radio, User } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 px-1 py-2 bg-chord-bg border-t border-white/10 glassmorphism">
      <div className="flex items-center justify-between">
        <NavItem 
          to="/" 
          icon={<Home size={20} />} 
          label="Home" 
          isActive={isActive("/")} 
        />
        <NavItem 
          to="/search" 
          icon={<Search size={20} />} 
          label="Search" 
          isActive={isActive("/search")} 
        />
        <NavItem 
          to="/collection" 
          icon={<Library size={20} />} 
          label="Library" 
          isActive={isActive("/collection")} 
        />
        <NavItem 
          to="/explore" 
          icon={<Radio size={20} />}
          label="Discover" 
          isActive={isActive("/explore")} 
        />
        <NavItem 
          to="/profile" 
          icon={<User size={20} />} 
          label="Profile" 
          isActive={isActive("/profile")} 
        />
      </div>
    </nav>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
}

const NavItem = ({ icon, label, to, isActive }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex flex-col items-center justify-center px-3 py-1 rounded-md transition-all duration-200",
      isActive ? "tab-active" : "text-chord-text/60"
    )}
  >
    <span className="mb-1">{icon}</span>
    <span className="text-[10px] font-medium">{label}</span>
  </Link>
);

export default BottomNav;
