
import { HomeIcon, SearchIcon, BookOpenIcon, ListMusicIcon, PlusIcon, HeartIcon, XIcon, UserIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import AppLogo from "./app-logo";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface SidebarProps {
  onClose?: () => void;
  theme?: "dark" | "light";
}

const Sidebar = ({ onClose, theme = "dark" }: SidebarProps) => {
  const location = useLocation();
  const { toast } = useToast();
  const [playlists, setPlaylists] = useState([
    { id: "top-hits", name: "MQ's Top Hits" },
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
    <div className="h-full w-[240px] bg-mq-navy border-r border-r-zinc-800/50 p-5 flex flex-col z-20 overflow-hidden">
      {/* Close button for mobile */}
      {onClose && (
        <button 
          className="md:hidden absolute top-4 right-4 p-2 text-zinc-400 hover:text-white"
          onClick={onClose}
        >
          <XIcon size={20} />
        </button>
      )}
      
      <div className="mb-8 px-2">
        <AppLogo />
      </div>
      
      <nav className="space-y-1">
        <NavItem icon={<HomeIcon size={20} />} label="Home" to="/" isActive={isActive("/")} onClick={onClose} />
        <NavItem icon={<SearchIcon size={20} />} label="Explore" to="/explore" isActive={isActive("/explore")} onClick={onClose} />
        <NavItem icon={<BookOpenIcon size={20} />} label="For You" to="/for-you" isActive={isActive("/for-you")} onClick={onClose} />
        <NavItem icon={<UserIcon size={20} />} label="Profile" to="/profile" isActive={isActive("/profile")} onClick={onClose} />
      </nav>
      
      <div className="mt-8">
        <h2 className="text-sm uppercase font-semibold text-zinc-400 px-2 mb-2">My Collection</h2>
        <nav className="space-y-1">
          <NavItem 
            icon={<ListMusicIcon size={20} />} 
            label="Playlists" 
            to="/collection/playlists" 
            isActive={isActive("/collection/playlists") || isActive("/collection")} 
            onClick={onClose}
          />
          <NavItem 
            icon={<HeartIcon size={20} />} 
            label="Favorites" 
            to="/collection/favorites" 
            isActive={isActive("/collection/favorites")} 
            onClick={onClose}
          />
        </nav>
      </div>
      
      <div className="mt-8 flex-1 overflow-hidden flex flex-col">
        <h2 className="text-sm uppercase font-semibold text-zinc-400 px-2 mb-2">Playlists</h2>
        <div className="space-y-0.5 overflow-y-auto flex-1 scrollbar-thin pr-2">
          {playlists.map((playlist) => (
            <PlaylistItem key={playlist.id} id={playlist.id} name={playlist.name} onClick={onClose} />
          ))}
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className="flex items-center text-zinc-400 hover:text-white px-2 py-2 mt-3 w-full rounded-md hover:bg-mq-navy/30 transition-all duration-200"
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
};

const NavItem = ({ icon, label, to, isActive, onClick }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
      isActive
        ? "bg-chord-hover text-white"
        : "text-zinc-400 hover:bg-chord-hover hover:text-white"
    )}
    onClick={onClick}
  >
    <span className={cn("mr-3 transition-transform duration-200", isActive ? "text-chord-blue scale-110" : "")}>
      {icon}
    </span>
    <span>{label}</span>
  </Link>
);

const PlaylistItem = ({ id, name, onClick }: { id: string, name: string, onClick?: () => void }) => (
  <Link 
    to={`/playlist/${id}`}
    className="block w-full text-left px-3 py-1.5 text-zinc-400 hover:text-white text-sm truncate playlist-item rounded-sm transition-all duration-200"
    onClick={onClick}
  >
    {name}
  </Link>
);

export default Sidebar;
