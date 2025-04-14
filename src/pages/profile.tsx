
import { useState } from "react";
import Layout from "@/components/layout";
import { usePlayer, mockSongs } from "@/contexts/PlayerContext";
import { 
  User, 
  Settings, 
  MusicIcon, 
  Heart, 
  Album, 
  Users, 
  Sun, 
  Moon, 
  SlidersHorizontal,
  PlayIcon,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const { playSong } = usePlayer();
  const [activeTab, setActiveTab] = useState("overview");
  const [audioQuality, setAudioQuality] = useState("high");
  const [theme, setTheme] = useState<"dark" | "light">(
    localStorage.getItem("theme") as "dark" | "light" || "dark"
  );
  
  // Mock user data
  const user = {
    name: "Alex Johnson",
    username: "alex_music",
    profileImage: "https://i.pravatar.cc/300",
    bio: "Music enthusiast and vinyl collector. Always exploring new sounds and artists.",
    joinDate: "Member since January 2024"
  };
  
  // Mock playlists
  const playlists = [
    { id: "playlist-1", title: "My Favorites", tracks: 42, imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png" },
    { id: "playlist-2", title: "Workout Mix", tracks: 28, imageUrl: "/lovable-uploads/81d39118-ff63-460e-993d-275178cd6c40.png" },
    { id: "playlist-3", title: "Chill Vibes", tracks: 35, imageUrl: "/lovable-uploads/a910c028-5947-4358-b83a-240ed8a516ca.png" },
    { id: "playlist-4", title: "Road Trip", tracks: 22, imageUrl: "/lovable-uploads/00e244a7-d659-4312-befb-52b043a87ce6.png" }
  ];
  
  // Mock favorite songs (using mock songs from PlayerContext)
  const favoriteSongs = mockSongs.slice(0, 5);
  
  // Mock top artists
  const topArtists = [
    { id: "artist-1", name: "The Weeknd", imageUrl: "https://i.pravatar.cc/300?img=1" },
    { id: "artist-2", name: "Dua Lipa", imageUrl: "https://i.pravatar.cc/300?img=5" },
    { id: "artist-3", name: "Kendrick Lamar", imageUrl: "https://i.pravatar.cc/300?img=8" },
    { id: "artist-4", name: "Billie Eilish", imageUrl: "https://i.pravatar.cc/300?img=9" },
    { id: "artist-5", name: "Post Malone", imageUrl: "https://i.pravatar.cc/300?img=11" }
  ];
  
  // Mock favorite albums
  const favoriteAlbums = [
    { id: "album-1", title: "After Hours", artist: "The Weeknd", imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png" },
    { id: "album-2", title: "Future Nostalgia", artist: "Dua Lipa", imageUrl: "/lovable-uploads/81d39118-ff63-460e-993d-275178cd6c40.png" },
    { id: "album-3", title: "DAMN.", artist: "Kendrick Lamar", imageUrl: "/lovable-uploads/a910c028-5947-4358-b83a-240ed8a516ca.png" },
    { id: "album-4", title: "When We All Fall Asleep", artist: "Billie Eilish", imageUrl: "/lovable-uploads/00e244a7-d659-4312-befb-52b043a87ce6.png" }
  ];
  
  const handleQualityChange = (value: string) => {
    setAudioQuality(value);
    toast.success(`Audio quality set to ${value.toUpperCase()}`);
  };
  
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("light-mode", newTheme === "light");
    toast.success(`Theme switched to ${newTheme} mode`);
  };
  
  return (
    <Layout>
      <div className="animate-fade-in">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-mq-orange">
            <img 
              src={user.profileImage} 
              alt={user.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">{user.name}</h1>
            <p className="text-zinc-400 mb-2">@{user.username}</p>
            <p className="text-zinc-300 mb-3">{user.bio}</p>
            <p className="text-zinc-500 text-sm">{user.joinDate}</p>
            
            <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
              <div className="text-center">
                <p className="text-2xl font-bold">{playlists.length}</p>
                <p className="text-zinc-400 text-sm">Playlists</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{favoriteSongs.length}</p>
                <p className="text-zinc-400 text-sm">Favorites</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{topArtists.length}</p>
                <p className="text-zinc-400 text-sm">Top Artists</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <button className={cn(
              "flex items-center px-6 py-2 rounded-full transition-all duration-200",
              "bg-mq-red text-white hover:bg-opacity-85 hover:shadow-md"
            )}>
              <Settings size={16} className="mr-2" />
              Edit Profile
            </button>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full bg-mq-navy text-white hover:bg-opacity-85 transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              <Select value={audioQuality} onValueChange={handleQualityChange}>
                <SelectTrigger 
                  className="w-[130px] bg-mq-navy text-white border-mq-sand/20 hover:border-mq-sand/40 transition-all duration-200"
                >
                  <SelectValue placeholder="Audio Quality" />
                </SelectTrigger>
                <SelectContent className="bg-mq-navy text-white border-mq-sand/20">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="hifi">HiFi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-mq-navy/50 w-full justify-start border-b border-zinc-800 rounded-none p-0">
            <TabsTrigger 
              value="overview" 
              className="px-6 py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-mq-orange text-zinc-400 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="playlists" 
              className="px-6 py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-mq-orange text-zinc-400 data-[state=active]:text-white"
            >
              Playlists
            </TabsTrigger>
            <TabsTrigger 
              value="favorites" 
              className="px-6 py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-mq-orange text-zinc-400 data-[state=active]:text-white"
            >
              Favorites
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="px-6 py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-mq-orange text-zinc-400 data-[state=active]:text-white"
            >
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="pt-6 animate-fade-in">
            {/* Top Artists */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Users size={20} className="mr-2 text-mq-yellow" />
                Top Artists
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {topArtists.map(artist => (
                  <Link to={`/artist/${artist.id}`} key={artist.id} className="group">
                    <div className="flex flex-col items-center text-center hover-lift">
                      <div className="w-24 h-24 rounded-full overflow-hidden mb-3 group-hover:ring-2 group-hover:ring-mq-orange transition-all duration-300">
                        <img 
                          src={artist.imageUrl} 
                          alt={artist.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" 
                        />
                      </div>
                      <p className="font-medium group-hover:text-mq-yellow transition-all duration-200">{artist.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Favorite Albums */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Album size={20} className="mr-2 text-mq-yellow" />
                Favorite Albums
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {favoriteAlbums.map(album => (
                  <Link to={`/album/${album.id}`} key={album.id} className="group">
                    <div className="bg-mq-navy/30 rounded-lg overflow-hidden hover-lift p-4">
                      <div className="aspect-square overflow-hidden rounded-md mb-3 relative">
                        <img 
                          src={album.imageUrl} 
                          alt={album.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" 
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                          <button 
                            className="bg-mq-orange text-white p-3 rounded-full transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-mq-red"
                            onClick={(e) => {
                              e.preventDefault();
                              const song = mockSongs.find(s => s.id === album.id) || mockSongs[0];
                              playSong(song);
                              toast.success(`Playing ${album.title}`);
                            }}
                          >
                            <PlayIcon size={20} />
                          </button>
                        </div>
                      </div>
                      <h3 className="font-medium text-white group-hover:text-mq-yellow transition-all duration-200">{album.title}</h3>
                      <p className="text-zinc-400 text-sm">{album.artist}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Recent Tracks */}
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <MusicIcon size={20} className="mr-2 text-mq-yellow" />
                Recently Played
              </h2>
              <div className="bg-mq-navy/20 rounded-lg overflow-hidden">
                {favoriteSongs.map((song, index) => (
                  <div 
                    key={song.id} 
                    className="flex items-center p-3 hover:bg-mq-navy/40 transition-colors duration-200 group"
                    onClick={() => playSong(song)}
                  >
                    <div className="w-10 text-center text-zinc-500 group-hover:text-white transition-colors duration-200">
                      {index + 1}
                    </div>
                    <div className="w-10 h-10 rounded overflow-hidden mr-3">
                      <img 
                        src={song.imageUrl} 
                        alt={song.title} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white group-hover:text-mq-yellow transition-colors duration-200">{song.title}</p>
                      <p className="text-zinc-400 text-sm">{song.artist}</p>
                    </div>
                    <div className="text-zinc-500 text-sm mr-3">
                      {song.duration.toFixed(2).replace('.', ':')}
                    </div>
                    <button 
                      className="text-zinc-500 hover:text-mq-yellow opacity-0 group-hover:opacity-100 transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        playSong(song);
                      }}
                    >
                      <PlayIcon size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="playlists" className="pt-6 animate-fade-in">
            <h2 className="text-xl font-bold mb-6">Your Playlists</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {playlists.map(playlist => (
                <Link to={`/playlist/${playlist.id}`} key={playlist.id} className="group">
                  <div className="bg-mq-navy/30 rounded-lg overflow-hidden p-4 hover-lift">
                    <div className="aspect-square overflow-hidden rounded-md mb-3 relative">
                      <img 
                        src={playlist.imageUrl} 
                        alt={playlist.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" 
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                        <button 
                          className="bg-mq-orange text-white p-3 rounded-full transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-mq-red"
                          onClick={(e) => {
                            e.preventDefault();
                            toast.success(`Playing ${playlist.title}`);
                          }}
                        >
                          <PlayIcon size={20} />
                        </button>
                      </div>
                    </div>
                    <h3 className="font-medium text-white group-hover:text-mq-yellow transition-all duration-200">{playlist.title}</h3>
                    <p className="text-zinc-400 text-sm">{playlist.tracks} tracks</p>
                  </div>
                </Link>
              ))}
              
              <div className="bg-mq-navy/20 rounded-lg overflow-hidden border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center p-4 hover:border-mq-yellow transition-all duration-300 cursor-pointer hover-lift aspect-[1/1.2]">
                <div className="bg-mq-navy/50 p-3 rounded-full mb-3">
                  <Plus size={24} className="text-mq-yellow" />
                </div>
                <p className="font-medium">Create Playlist</p>
                <p className="text-zinc-400 text-sm">Add your favorite tracks</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="favorites" className="pt-6 animate-fade-in">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Heart size={20} className="mr-2 text-mq-red" />
              Songs You Love
            </h2>
            <div className="bg-mq-navy/20 rounded-lg overflow-hidden">
              {favoriteSongs.map((song, index) => (
                <div 
                  key={song.id} 
                  className="flex items-center p-3 hover:bg-mq-navy/40 transition-colors duration-200 group"
                  onClick={() => playSong(song)}
                >
                  <div className="w-10 text-center text-zinc-500 group-hover:text-white transition-colors duration-200">
                    {index + 1}
                  </div>
                  <div className="w-10 h-10 rounded overflow-hidden mr-3">
                    <img 
                      src={song.imageUrl} 
                      alt={song.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white group-hover:text-mq-yellow transition-colors duration-200">{song.title}</p>
                    <p className="text-zinc-400 text-sm">{song.artist}</p>
                  </div>
                  <div className="flex items-center">
                    <Heart size={16} className="text-mq-red mr-4 fill-mq-red" />
                    <div className="text-zinc-500 text-sm mr-3">
                      {song.duration.toFixed(2).replace('.', ':')}
                    </div>
                    <button 
                      className="text-zinc-500 hover:text-mq-yellow opacity-0 group-hover:opacity-100 transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        playSong(song);
                      }}
                    >
                      <PlayIcon size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="pt-6 animate-fade-in">
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <SlidersHorizontal size={20} className="mr-2 text-mq-yellow" />
                Account Settings
              </h2>
              
              <div className="space-y-8">
                <div className="bg-mq-navy/20 rounded-lg p-6">
                  <h3 className="font-medium text-lg mb-4">Appearance</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Theme</p>
                      <p className="text-zinc-400 text-sm">Choose between dark and light mode</p>
                    </div>
                    <button 
                      onClick={toggleTheme}
                      className="flex items-center gap-2 bg-mq-navy px-4 py-2 rounded-full hover:bg-mq-navy/70 transition-all duration-200"
                    >
                      {theme === "dark" ? (
                        <>
                          <Moon size={16} className="text-mq-yellow" />
                          <span>Dark</span>
                        </>
                      ) : (
                        <>
                          <Sun size={16} className="text-mq-yellow" />
                          <span>Light</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="bg-mq-navy/20 rounded-lg p-6">
                  <h3 className="font-medium text-lg mb-4">Audio</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Streaming Quality</p>
                      <p className="text-zinc-400 text-sm">Higher quality uses more data</p>
                    </div>
                    <Select value={audioQuality} onValueChange={handleQualityChange}>
                      <SelectTrigger className="w-[130px] bg-mq-navy text-white border-mq-sand/20">
                        <SelectValue placeholder="Audio Quality" />
                      </SelectTrigger>
                      <SelectContent className="bg-mq-navy text-white border-mq-sand/20">
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="hifi">HiFi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Crossfade</p>
                      <p className="text-zinc-400 text-sm">Smooth transition between tracks</p>
                    </div>
                    <Select defaultValue="5">
                      <SelectTrigger className="w-[130px] bg-mq-navy text-white border-mq-sand/20">
                        <SelectValue placeholder="Crossfade" />
                      </SelectTrigger>
                      <SelectContent className="bg-mq-navy text-white border-mq-sand/20">
                        <SelectItem value="0">Off</SelectItem>
                        <SelectItem value="2">2 seconds</SelectItem>
                        <SelectItem value="5">5 seconds</SelectItem>
                        <SelectItem value="8">8 seconds</SelectItem>
                        <SelectItem value="12">12 seconds</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="bg-mq-navy/20 rounded-lg p-6">
                  <h3 className="font-medium text-lg mb-4">Account</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">MQ Premium</p>
                        <p className="text-zinc-400 text-sm">Upgrade to unlock all features</p>
                      </div>
                      <button className="bg-mq-red px-4 py-2 rounded-full flex items-center gap-2 hover:bg-opacity-85 transition-all duration-200">
                        Upgrade
                        <ExternalLink size={14} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Sign out</p>
                        <p className="text-zinc-400 text-sm">Log out of your account</p>
                      </div>
                      <button className="bg-mq-navy px-4 py-2 rounded-full hover:bg-opacity-70 transition-all duration-200">
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

const Plus = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

export default Profile;
