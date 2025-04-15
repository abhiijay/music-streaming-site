import { SearchIcon, BellIcon, User } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import AppLogo from "./app-logo";

interface HeaderProps {
  isScrolled?: boolean;
}

const Header = ({ isScrolled = false }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasNotifications, setHasNotifications] = useState(true);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearchResults(false);
    }
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Handle click outside search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Simulated search suggestions
  useEffect(() => {
    if (searchQuery.length > 1) {
      const demoResults = [
        { type: 'artist', name: `${searchQuery} Artist`, id: '1' },
        { type: 'album', name: `${searchQuery} Album`, id: '2' },
        { type: 'track', name: `${searchQuery} Track`, id: '3' },
      ];
      setSearchResults(demoResults);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 h-16 z-20 flex items-center justify-between px-6 transition-all duration-500",
      isScrolled ? "bg-chord-bg/90 backdrop-blur-md shadow-md" : "bg-chord-bg"
    )}>
      <div className="flex items-center">
        <Link to="/" className="flex items-center mr-8">
          <AppLogo />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="flex items-center space-x-8">
          <NavLink to="/" label="Home" isActive={isActive("/")} />
          <NavLink to="/collection" label="Library" isActive={isActive("/collection")} />
          <NavLink to="/explore" label="Discover" isActive={isActive("/explore")} />
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/notifications" className="relative p-2 rounded-full transition-all duration-200 hover:bg-chord-hover">
                <BellIcon size={20} className="transition-colors duration-200 text-chord-text/70 hover:text-chord-text" />
                {hasNotifications && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-chord-red rounded-full animate-pulse"></span>
                )}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              Notifications
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="profile-icon w-10 h-10 bg-chord-accent/20 flex items-center justify-center rounded-full">
              <User size={20} className="text-chord-text" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-chord-bg border-white/10">
            <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer text-chord-text hover:bg-chord-hover">
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer text-chord-text hover:bg-chord-hover">
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/login')} className="cursor-pointer text-chord-accent hover:bg-chord-hover">
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  isActive: boolean;
}

const NavLink = ({ to, label, isActive }: NavLinkProps) => (
  <Link
    to={to}
    className={cn(
      "px-2 py-1 text-sm font-bold transition-colors duration-200 hover:text-chord-text",
      isActive ? "nav-active" : "text-chord-text/70"
    )}
  >
    {label}
  </Link>
);

export default Header;
