
import { HomeIcon, SearchIcon, BookOpenIcon, ListMusicIcon, PlusIcon, HeartIcon, XIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import AppLogo from "./app-logo";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface SidebarProps {
  onClose?: () => void;
  theme: "dark" | "light";
}

const Sidebar = ({ onClose, theme }: SidebarProps) => {
  const location = useLocation();
  const { toast } = useToast();
  const [playlists, setPlaylists] = useState([
    { id: "top-hits", name: "TIDAL's Top Hits" },
    { id: "pop-hits", name: "Pop Hits" },
    { id: "rock-classics", name: "Rock Classics" },
    { id: "rnb-favorites", name: "R&B Favorites" },
    { id: "hip-hop-mix", name: "Hip Hop Mix" }
  ]);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleCreatePlaylist = () => {
    const newPlaylist = {
      id: `playlist-${Date.now()}`,
      name: `New Playlist #${playlists.length + 1}`
    };
    
    setPlaylists([...playlists, newPlaylist]);
    
    toast({
      title: "Playlist created",
      description: `"${newPlaylist.name}" has been added to your playlists.`,
      duration: 3000
    });
  };
  
  return (
    <div className={cn(
      "h-full w-[240px] p-5 flex flex-col z-20 overflow-hidden border-r",
      theme === "dark" 
        ? "bg-tidal-black border-r-zinc-800/50" 
        : "bg-white/90 backdrop-blur-sm border-r-slate-200/50"
    )}>
      {/* Close button for mobile */}
      {onClose && (
        <button 
          className={cn(
            "md:hidden absolute top-4 right-4 p-2 rounded-full hover:bg-opacity-80 transition-colors",
            theme === "dark" 
              ? "text-zinc-400 hover:text-white hover:bg-tidal-gray" 
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-200"
          )}
          onClick={onClose}
        >
          <XIcon size={20} />
        </button>
      )}
      
      <div className="mb-8 px-2">
        <AppLogo />
      </div>
      
      <nav className="space-y-1">
        <NavItem 
          icon={<HomeIcon size={20} />} 
          label="Home" 
          to="/" 
          isActive={isActive("/")} 
          onClick={onClose} 
          theme={theme}
        />
        <NavItem 
          icon={<SearchIcon size={20} />} 
          label="Explore" 
          to="/explore" 
          isActive={isActive("/explore")} 
          onClick={onClose}
          theme={theme}
        />
        <NavItem 
          icon={<BookOpenIcon size={20} />} 
          label="For You" 
          to="/for-you" 
          isActive={isActive("/for-you")} 
          onClick={onClose}
          theme={theme}
        />
      </nav>
      
      <div className="mt-8">
        <h2 className={cn(
          "text-sm uppercase font-semibold px-2 mb-2",
          theme === "dark" ? "text-zinc-400" : "text-slate-500"
        )}>
          My Collection
        </h2>
        <nav className="space-y-1">
          <NavItem 
            icon={<ListMusicIcon size={20} />} 
            label="Playlists" 
            to="/collection/playlists" 
            isActive={isActive("/collection/playlists") || isActive("/collection")} 
            onClick={onClose}
            theme={theme}
          />
          <NavItem 
            icon={<HeartIcon size={20} />} 
            label="Favorites" 
            to="/collection/favorites" 
            isActive={isActive("/collection/favorites")} 
            onClick={onClose}
            theme={theme}
          />
        </nav>
      </div>
      
      <div className="mt-8 flex-1 overflow-hidden flex flex-col">
        <h2 className={cn(
          "text-sm uppercase font-semibold px-2 mb-2",
          theme === "dark" ? "text-zinc-400" : "text-slate-500"
        )}>
          Playlists
        </h2>
        <div className="space-y-0.5 overflow-y-auto flex-1 scrollbar-thin pr-2">
          {playlists.map((playlist) => (
            <PlaylistItem 
              key={playlist.id} 
              id={playlist.id} 
              name={playlist.name} 
              onClick={onClose}
              theme={theme}
            />
          ))}
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className={cn(
                  "flex items-center px-2 py-2 mt-3 w-full rounded-md transition-all duration-200",
                  theme === "dark" 
                    ? "text-zinc-400 hover:text-white hover:bg-tidal-hover" 
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/70"
                )}
                onClick={handleCreatePlaylist}
              >
                <PlusIcon size={18} className="mr-2" />
                <span className="text-sm">New Playlist</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              Create new playlist
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
  onClick?: () => void;
  theme: "dark" | "light";
};

const NavItem = ({ icon, label, to, isActive, onClick, theme }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
      theme === "dark" 
        ? (isActive 
            ? "bg-tidal-hover text-white" 
            : "text-zinc-400 hover:bg-tidal-hover hover:text-white") 
        : (isActive 
            ? "bg-slate-200 text-slate-900" 
            : "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900")
    )}
    onClick={onClick}
  >
    <span className={cn(
      "mr-3 transition-transform duration-200", 
      isActive 
        ? "text-tidal-blue scale-110" 
        : ""
    )}>
      {icon}
    </span>
    <span>{label}</span>
  </Link>
);

const PlaylistItem = ({ id, name, onClick, theme }: { id: string, name: string, onClick?: () => void, theme: "dark" | "light" }) => (
  <Link 
    to={`/playlist/${id}`}
    className={cn(
      "block w-full text-left px-3 py-1.5 text-sm truncate playlist-item rounded-sm transition-all duration-200",
      theme === "dark" 
        ? "text-zinc-400 hover:text-white hover:bg-tidal-hover" 
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
    )}
    onClick={onClick}
  >
    {name}
  </Link>
);

export default Sidebar;
