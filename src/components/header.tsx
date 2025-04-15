
import { SearchIcon, BellIcon, SunIcon, MoonIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface HeaderProps {
  isScrolled?: boolean;
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const Header = ({ isScrolled = false, theme, toggleTheme }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasNotifications, setHasNotifications] = useState(true);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearchResults(false);
    }
  };

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
      "fixed top-0 right-0 left-0 md:left-[240px] h-16 z-20 flex items-center justify-between px-4 md:px-6 transition-all duration-500",
      isScrolled ? "glass-bar shadow-md" : theme === "dark" ? "bg-tidal-black" : "bg-white",
      theme === "dark" ? "text-white" : "text-tidal-black"
    )}>
      <div className="flex-1 max-w-md ml-10 md:ml-0 relative">
        <form onSubmit={handleSearch} className="relative group">
          <SearchIcon 
            size={18} 
            className={cn(
              "absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200", 
              theme === "dark" 
                ? "text-zinc-400 group-focus-within:text-tidal-blue" 
                : "text-zinc-500 group-focus-within:text-tidal-blue"
            )} 
          />
          <input
            type="search"
            placeholder="Search"
            className={cn(
              "w-full h-10 pl-10 pr-4 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-tidal-blue transition-all duration-200",
              theme === "dark" 
                ? "bg-tidal-gray text-white group-hover:bg-tidal-hover" 
                : "bg-zinc-100 text-black group-hover:bg-zinc-200"
            )}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Animated search results dropdown */}
        {showSearchResults && searchResults.length > 0 && (
          <div className={cn(
            "absolute top-full left-0 right-0 mt-2 rounded-md shadow-lg overflow-hidden z-50 max-h-64 animate-fade-in",
            theme === "dark" ? "bg-tidal-darkgray" : "bg-white border border-zinc-200"
          )}>
            <div className="p-2">
              {searchResults.map((result) => (
                <div 
                  key={result.id} 
                  className={cn(
                    "flex items-center p-2 rounded-md cursor-pointer transition-colors",
                    theme === "dark" 
                      ? "hover:bg-tidal-gray" 
                      : "hover:bg-zinc-100"
                  )}
                  onClick={() => {
                    setSearchQuery("");
                    setShowSearchResults(false);
                    navigate(`/search?q=${encodeURIComponent(result.name)}&type=${result.type}`);
                  }}
                >
                  <div className="ml-2">
                    <p className={theme === "dark" ? "text-white" : "text-black"}>{result.name}</p>
                    <p className="text-xs text-zinc-400 capitalize">{result.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                className={cn(
                  "p-2 rounded-full transition-all duration-200 hover:scale-105",
                  theme === "dark" 
                    ? "text-zinc-400 hover:text-white hover:bg-tidal-gray/50" 
                    : "text-zinc-600 hover:text-tidal-blue hover:bg-zinc-100"
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
          "text-sm transition-colors duration-200 mr-2 hidden md:block",
          theme === "dark" 
            ? "text-white hover:text-tidal-blue" 
            : "text-tidal-black hover:text-tidal-blue"
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
                : "border-zinc-300 hover:border-tidal-blue bg-transparent text-tidal-black hover:bg-zinc-100"
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
                  "p-2 rounded-full transition-all duration-200 hover:scale-105",
                  theme === "dark" 
                    ? "hover:bg-tidal-gray/50" 
                    : "hover:bg-zinc-100"
                )}>
                  <BellIcon size={20} className={cn(
                    "transition-colors duration-200",
                    theme === "dark" 
                      ? "text-zinc-400 hover:text-white" 
                      : "text-zinc-600 hover:text-tidal-black"
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
