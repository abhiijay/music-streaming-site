
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
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearchResults(false);
      setShowMobileSearch(false);
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
      "fixed top-0 left-0 right-0 h-16 z-20 flex items-center justify-between px-4 md:px-6 transition-all duration-500",
      isScrolled ? "glass shadow-md" : "bg-chord-bg"
    )}>
      <div className="flex items-center">
        <Link to="/" className="flex items-center mr-6">
          <AppLogo />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" label="Home" isActive={isActive("/")} />
          <NavLink to="/search" label="Search" isActive={isActive("/search")} />
          <NavLink to="/collection" label="Library" isActive={isActive("/collection")} />
          <NavLink to="/explore" label="Discover" isActive={isActive("/explore")} />
        </nav>
      </div>

      <div className="flex items-center space-x-2">
        {/* Mobile Search Button */}
        <button 
          className="md:hidden p-2 text-chord-text/70 hover:text-chord-text"
          onClick={() => setShowMobileSearch(!showMobileSearch)}
        >
          <SearchIcon size={20} />
        </button>
        
        {/* Desktop Search */}
        <div ref={searchRef} className="hidden md:block relative max-w-md">
          <form onSubmit={handleSearch} className="relative group">
            <SearchIcon 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 text-chord-text/50 group-focus-within:text-chord-red" 
            />
            <input
              type="search"
              placeholder="Search"
              className="w-full h-10 pl-10 pr-4 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-chord-red bg-secondary text-chord-text transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Search results dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-md shadow-lg overflow-hidden z-50 max-h-64 animate-fade-in bg-secondary">
              <div className="p-2">
                {searchResults.map((result) => (
                  <div 
                    key={result.id} 
                    className="flex items-center p-2 rounded-md cursor-pointer transition-colors hover:bg-chord-hover"
                    onClick={() => {
                      setSearchQuery("");
                      setShowSearchResults(false);
                      navigate(`/search?q=${encodeURIComponent(result.name)}&type=${result.type}`);
                    }}
                  >
                    <div className="ml-2">
                      <p className="text-chord-text">{result.name}</p>
                      <p className="text-xs text-chord-text/50 capitalize">{result.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
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
            <button className="profile-icon w-10 h-10 bg-chord-red/20 flex items-center justify-center rounded-full">
              <User size={20} className="text-chord-text" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-secondary border-white/10">
            <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-zinc-500 cursor-not-allowed">
              Switch Theme (Dark Only)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/login')} className="cursor-pointer text-chord-red">
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Full-width mobile search overlay */}
      {showMobileSearch && (
        <div className="absolute top-0 left-0 w-full h-full bg-chord-bg z-30 animate-fade-in">
          <div className="container h-full flex items-center justify-between px-4">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <SearchIcon 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-chord-text/50" 
              />
              <input
                type="search"
                placeholder="Search"
                autoFocus
                className="w-full h-12 pl-10 pr-4 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-chord-red bg-secondary text-chord-text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <button 
              className="ml-2 px-4 py-2 text-chord-text"
              onClick={() => setShowMobileSearch(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
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
      "px-2 py-1 text-sm font-medium transition-colors duration-200 hover:text-chord-text",
      isActive ? "nav-active" : "text-chord-text/70"
    )}
  >
    {label}
  </Link>
);

export default Header;
