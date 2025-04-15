
import { HomeIcon, SearchIcon, BookOpenIcon, ListMusicIcon, PlusIcon, HeartIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import AppLogo from "./app-logo";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Sidebar = () => {
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
    <div className="fixed top-0 left-0 h-full w-[240px] bg-tidal-black border-r border-r-zinc-800 p-5 flex flex-col z-20">
      <div className="mb-8 px-2">
        <AppLogo />
      </div>
      
      <nav className="space-y-1">
        <NavItem icon={<HomeIcon size={20} />} label="Home" to="/" isActive={isActive("/")} />
        <NavItem icon={<SearchIcon size={20} />} label="Explore" to="/explore" isActive={isActive("/explore")} />
        <NavItem icon={<BookOpenIcon size={20} />} label="For You" to="/for-you" isActive={isActive("/for-you")} />
      </nav>
      
      <div className="mt-8">
        <h2 className="text-sm uppercase font-semibold text-zinc-400 px-2 mb-2">My Collection</h2>
        <nav className="space-y-1">
          <NavItem 
            icon={<ListMusicIcon size={20} />} 
            label="Playlists" 
            to="/collection/playlists" 
            isActive={isActive("/collection/playlists") || isActive("/collection")} 
          />
          <NavItem 
            icon={<HeartIcon size={20} />} 
            label="Favorites" 
            to="/collection/favorites" 
            isActive={isActive("/collection/favorites")} 
          />
        </nav>
      </div>
      
      <div className="mt-8 flex-1 overflow-hidden flex flex-col">
        <h2 className="text-sm uppercase font-semibold text-zinc-400 px-2 mb-2">Playlists</h2>
        <div className="space-y-1 overflow-y-auto flex-1 scrollbar-thin">
          {playlists.map((playlist) => (
            <PlaylistItem key={playlist.id} id={playlist.id} name={playlist.name} />
          ))}
        </div>
        <button 
          className="flex items-center text-zinc-400 hover:text-white px-2 py-2 mt-3 w-full rounded-md"
          onClick={handleCreatePlaylist}
        >
          <PlusIcon size={18} className="mr-2" />
          <span className="text-sm">New Playlist</span>
        </button>
      </div>
    </div>
  );
};

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
};

const NavItem = ({ icon, label, to, isActive }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center px-2 py-2 rounded-md text-sm font-medium",
      isActive
        ? "bg-tidal-hover text-white"
        : "text-zinc-400 hover:bg-tidal-hover hover:text-white transition-colors"
    )}
  >
    <span className="mr-3">{icon}</span>
    <span>{label}</span>
  </Link>
);

const PlaylistItem = ({ id, name }: { id: string, name: string }) => (
  <Link 
    to={`/playlist/${id}`}
    className="block w-full text-left px-2 py-1.5 text-zinc-400 hover:text-white text-sm truncate playlist-item rounded-sm"
  >
    {name}
  </Link>
);

export default Sidebar;
