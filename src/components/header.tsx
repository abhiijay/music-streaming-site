
import { SearchIcon, BellIcon, SunIcon, MoonIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface HeaderProps {
  isScrolled?: boolean;
}

const Header = ({ isScrolled = false }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [hasNotifications, setHasNotifications] = useState(true);
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, we'd persist this in localStorage and update the HTML class
  };

  return (
    <header className={cn(
      "fixed top-0 right-0 left-0 md:left-[240px] h-16 z-20 flex items-center justify-between px-4 md:px-6 transition-all duration-300",
      isScrolled ? "glass-bar shadow-md" : "bg-tidal-black"
    )}>
      <div className="flex-1 max-w-md ml-10 md:ml-0">
        <form onSubmit={handleSearch} className="relative group">
          <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 group-focus-within:text-tidal-blue transition-colors duration-200" />
          <input
            type="search"
            placeholder="Search"
            className="w-full h-10 pl-10 pr-4 bg-tidal-gray rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-tidal-blue transition-all duration-200 group-hover:bg-tidal-hover"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                className="text-zinc-400 hover:text-white p-2 rounded-full hover:bg-tidal-gray/50 transition-all duration-200"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isDarkMode ? "Light mode" : "Dark mode"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Link to="/login" className="text-sm text-white hover:text-tidal-blue transition-colors duration-200 mr-2 hidden md:block">
          Start free trial
        </Link>
        
        <Link to="/login">
          <Button variant="outline" className="border-zinc-600 hover:border-white bg-transparent text-white hover:bg-tidal-hover transition-all duration-200">
            Log in
          </Button>
        </Link>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/notifications" className="relative">
                <div className="p-2 rounded-full hover:bg-tidal-gray/50 transition-all duration-200">
                  <BellIcon size={20} className="text-zinc-400 hover:text-white transition-colors duration-200" />
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
