
import { SearchIcon, BellIcon, SunIcon, MoonIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface HeaderProps {
  isScrolled?: boolean;
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const Header = ({ isScrolled = false, theme, toggleTheme }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasNotifications, setHasNotifications] = useState(true);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  
  // Sample search suggestions
  const allSuggestions = [
    "Drake", "Cynthia Erivo", "Pop Hits", "Hip Hop Mix", 
    "NOKIA", "Legends", "Worst Of Me", "Blink Twice", 
    "Rock Classics", "R&B Favorites", "Jelly Roll"
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    }
  };
  
  // Update suggestions as user types
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([]);
      return;
    }
    
    const filtered = allSuggestions.filter(item => 
      item.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
    
    setSuggestions(filtered);
  }, [searchQuery]);
  
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    setShowSuggestions(false);
  };

  return (
    <header className={cn(
      "fixed top-0 right-0 left-0 md:left-[240px] h-16 z-20 flex items-center justify-between px-4 md:px-6 transition-all duration-300",
      isScrolled 
        ? theme === "dark" ? "glass-bar shadow-md" : "bg-white/70 backdrop-blur shadow-sm" 
        : theme === "dark" ? "bg-tidal-black" : "bg-white/80 backdrop-blur-sm"
    )}>
      <div className="flex-1 max-w-md ml-10 md:ml-0">
        <form onSubmit={handleSearch} className="relative group">
          <SearchIcon 
            size={18} 
            className={cn(
              "absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200", 
              theme === "dark" 
                ? "text-zinc-400 group-focus-within:text-tidal-blue" 
                : "text-slate-400 group-focus-within:text-tidal-blue"
            )} 
          />
          <input
            type="search"
            placeholder="Search"
            className={cn(
              "w-full h-10 pl-10 pr-4 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-tidal-blue transition-all duration-200",
              theme === "dark"
                ? "bg-tidal-gray text-white group-hover:bg-tidal-hover"
                : "bg-slate-100 text-slate-900 group-hover:bg-slate-200"
            )}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          
          {/* Search suggestions dropdown with animation */}
          {showSuggestions && suggestions.length > 0 && (
            <div className={cn(
              "absolute top-full left-0 right-0 mt-1 rounded-md overflow-hidden shadow-lg z-50 animate-fade-in animate-slide-in",
              theme === "dark" ? "bg-tidal-darkgray" : "bg-white"
            )}>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-full text-left px-4 py-2 text-sm transition-colors",
                    theme === "dark" 
                      ? "hover:bg-tidal-hover text-white" 
                      : "hover:bg-slate-100 text-slate-900"
                  )}
                  style={{ animationDelay: `${index * 30}ms` }}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span className="flex items-center">
                    <SearchIcon size={14} className="mr-2 opacity-60" />
                    {suggestion}
                  </span>
                </button>
              ))}
            </div>
          )}
        </form>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                className={cn(
                  "p-2 rounded-full transition-all duration-200",
                  theme === "dark" 
                    ? "text-zinc-400 hover:text-white hover:bg-tidal-gray/50" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
                )}
                onClick={toggleTheme}
              >
                {theme === "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Link to="/login" className={cn(
          "text-sm font-medium transition-colors duration-200 mr-2 hidden md:block",
          theme === "dark" ? "text-white hover:text-tidal-blue" : "text-slate-700 hover:text-tidal-blue"
        )}>
          Start free trial
        </Link>
        
        <Link to="/login">
          <Button 
            variant="outline" 
            className={cn(
              "transition-all duration-200",
              theme === "dark" 
                ? "border-zinc-600 hover:border-white bg-transparent text-white hover:bg-tidal-hover" 
                : "border-slate-300 hover:border-slate-600 bg-transparent text-slate-800 hover:bg-slate-100"
            )}
          >
            Log in
          </Button>
        </Link>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/notifications" className="relative">
                <div className={cn(
                  "p-2 rounded-full transition-all duration-200",
                  theme === "dark" 
                    ? "hover:bg-tidal-gray/50" 
                    : "hover:bg-slate-200/70"
                )}>
                  <BellIcon size={20} className={cn(
                    "transition-colors duration-200",
                    theme === "dark" 
                      ? "text-zinc-400 hover:text-white" 
                      : "text-slate-600 hover:text-slate-900"
                  )} />
                  {hasNotifications && (
                    <span className="absolute top-1 right-1 h-2 w-2 bg-tidal-blue rounded-full animate-pulse"></span>
                  )}
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              Notifications
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
};

export default Header;
