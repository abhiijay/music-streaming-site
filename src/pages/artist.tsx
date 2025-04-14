
import { useParams } from "react-router-dom";
import Layout from "@/components/layout";
import { 
  PlayIcon, 
  ShuffleIcon, 
  HeartIcon, 
  ClockIcon,
  UsersIcon, 
  MusicIcon,
  ShareIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockSongs, Song, usePlayer } from "@/contexts/PlayerContext";
import TrackItem from "@/components/track-item";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const Artist = () => {
  const { id } = useParams<{ id: string }>();
  const { playSong } = usePlayer();
  const [isFollowing, setIsFollowing] = useState(false);
  const [dominantColor, setDominantColor] = useState("rgba(0, 48, 73, 0.6)"); // Default MQ Navy with opacity
  
  // Mock artist data
  const artistData: Record<string, any> = {
    "artist-1": {
      name: "The Weeknd",
      bio: "Abel Makkonen Tesfaye, known professionally as the Weeknd, is a Canadian singer, songwriter, and record producer. He is renowned for his versatile music style and enigmatic image.",
      monthlyListeners: "92.5M",
      image: "https://i.pravatar.cc/700?img=1",
      topTracks: mockSongs.slice(0, 5),
      albums: [
        { id: "album-1", title: "After Hours", year: "2020", tracks: 14, image: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png" },
        { id: "album-2", title: "Starboy", year: "2016", tracks: 18, image: "/lovable-uploads/81d39118-ff63-460e-993d-275178cd6c40.png" },
        { id: "album-3", title: "Dawn FM", year: "2022", tracks: 16, image: "/lovable-uploads/a910c028-5947-4358-b83a-240ed8a516ca.png" }
      ],
      similar: [
        { id: "similar-1", name: "Dua Lipa", image: "https://i.pravatar.cc/300?img=5" },
        { id: "similar-2", name: "Post Malone", image: "https://i.pravatar.cc/300?img=11" },
        { id: "similar-3", name: "Billie Eilish", image: "https://i.pravatar.cc/300?img=9" },
        { id: "similar-4", name: "Ariana Grande", image: "https://i.pravatar.cc/300?img=12" }
      ]
    },
    "artist-2": {
      name: "Dua Lipa",
      bio: "Dua Lipa is an English singer and songwriter. Her disco-influenced dance-pop sound has earned her numerous accolades, including Grammy Awards for Best New Artist and Best Dance Recording.",
      monthlyListeners: "65.8M",
      image: "https://i.pravatar.cc/700?img=5",
      topTracks: mockSongs.slice(2, 7),
      albums: [
        { id: "album-4", title: "Future Nostalgia", year: "2020", tracks: 11, image: "/lovable-uploads/81d39118-ff63-460e-993d-275178cd6c40.png" },
        { id: "album-5", title: "Dua Lipa", year: "2017", tracks: 12, image: "/lovable-uploads/00e244a7-d659-4312-befb-52b043a87ce6.png" }
      ],
      similar: [
        { id: "similar-1", name: "The Weeknd", image: "https://i.pravatar.cc/300?img=1" },
        { id: "similar-5", name: "Miley Cyrus", image: "https://i.pravatar.cc/300?img=13" },
        { id: "similar-6", name: "Lady Gaga", image: "https://i.pravatar.cc/300?img=14" },
        { id: "similar-7", name: "Harry Styles", image: "https://i.pravatar.cc/300?img=15" }
      ]
    }
  };
  
  // Use fallback data if artist not found
  const artist = artistData[id || ""] || {
    name: "Unknown Artist",
    bio: "Information about this artist is currently unavailable.",
    monthlyListeners: "N/A",
    image: "https://i.pravatar.cc/700?img=33",
    topTracks: mockSongs.slice(0, 5),
    albums: [],
    similar: []
  };
  
  // Function to extract dominant color from image
  const extractDominantColor = (imageSrc: string) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageSrc;
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      
      let r = 0, g = 0, b = 0, count = 0;
      
      // Sample pixels to find average color
      for (let i = 0; i < imageData.length; i += 16) {
        r += imageData[i];
        g += imageData[i + 1];
        b += imageData[i + 2];
        count++;
      }
      
      r = Math.floor(r / count);
      g = Math.floor(g / count);
      b = Math.floor(b / count);
      
      setDominantColor(`rgba(${r}, ${g}, ${b}, 0.6)`);
    };
    
    img.onerror = () => {
      // Fallback if image cannot be loaded
      setDominantColor("rgba(0, 48, 73, 0.6)");
    };
  };
  
  // Extract dominant color when artist image changes
  useEffect(() => {
    if (artist.image) {
      extractDominantColor(artist.image);
    }
  }, [artist.image]);
  
  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? `Unfollowed ${artist.name}` : `Now following ${artist.name}`);
  };
  
  const handlePlayTopTracks = () => {
    if (artist.topTracks.length > 0) {
      playSong(artist.topTracks[0]);
    }
  };
  
  const handleShuffleTopTracks = () => {
    if (artist.topTracks.length > 0) {
      const randomIndex = Math.floor(Math.random() * artist.topTracks.length);
      playSong(artist.topTracks[randomIndex]);
    }
  };
  
  const handleShare = () => {
    toast.success(`Share link for ${artist.name} copied to clipboard`);
  };
  
  return (
    <Layout>
      <div className="animate-fade-in">
        {/* Artist hero section with gradient background */}
        <div 
          className="relative -mx-4 md:-mx-6 p-6 md:p-10 mb-8 rounded-lg overflow-hidden flex flex-col justify-end min-h-[300px] md:min-h-[400px]"
          style={{
            background: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, ${dominantColor} 100%)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Artist image as background */}
          <div className="absolute inset-0 overflow-hidden z-0">
            <img 
              src={artist.image}
              alt={artist.name}
              className="w-full h-full object-cover object-center opacity-40 blur-sm"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
          </div>
          
          {/* Artist info */}
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-6">
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-white/10 shadow-xl">
              <img 
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-3 text-white">{artist.name}</h1>
              <p className="text-white/80 text-sm md:text-base max-w-2xl">
                {artist.bio}
              </p>
              <div className="flex flex-wrap items-center mt-4 gap-2 justify-center md:justify-start">
                <div className="flex items-center mr-4">
                  <UsersIcon size={16} className="mr-1 text-mq-yellow" />
                  <span className="text-white/70 text-sm">{artist.monthlyListeners} monthly listeners</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <Button 
            className="bg-mq-orange hover:bg-mq-orange/90 text-white font-medium px-6 rounded-full"
            onClick={handlePlayTopTracks}
          >
            <PlayIcon size={18} className="mr-2" />
            Play
          </Button>
          <Button 
            variant="outline" 
            className="border-zinc-600 hover:border-white bg-transparent text-white hover:bg-mq-navy/50 rounded-full"
            onClick={handleShuffleTopTracks}
          >
            <ShuffleIcon size={18} className="mr-2" />
            Shuffle
          </Button>
          <Button 
            variant={isFollowing ? "default" : "outline"} 
            className={cn(
              "rounded-full",
              isFollowing 
                ? "bg-mq-red hover:bg-mq-red/90 text-white"
                : "border-zinc-600 hover:border-white bg-transparent text-white hover:bg-mq-navy/50"
            )}
            onClick={toggleFollow}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
          <Button 
            variant="ghost" 
            className="text-zinc-400 hover:text-white p-2 rounded-full"
            onClick={handleShare}
          >
            <ShareIcon size={18} />
          </Button>
        </div>
        
        {/* Top Tracks */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <MusicIcon size={20} className="mr-2 text-mq-yellow" />
            Top Tracks
          </h2>
          
          <div className="bg-mq-navy/20 rounded-lg overflow-hidden">
            {artist.topTracks.map((track: Song, index: number) => (
              <TrackItem
                key={`${track.id}-${index}`}
                id={track.id}
                title={track.title}
                artist={track.artist}
                duration={track.duration}
                explicit={Math.random() > 0.5}
                index={index + 1}
                audioUrl={track.audioUrl}
                imageUrl={track.imageUrl}
                songs={artist.topTracks}
              />
            ))}
          </div>
        </div>
        
        {/* Albums */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {artist.albums.map((album: any) => (
              <div key={album.id} className="group">
                <div className="bg-mq-navy/30 rounded-lg overflow-hidden p-4 hover-lift">
                  <div className="aspect-square overflow-hidden rounded-md mb-3 relative">
                    <img 
                      src={album.image}
                      alt={album.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                      <button 
                        className="bg-mq-orange text-white p-3 rounded-full transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-mq-red"
                        onClick={() => {
                          const song = mockSongs.find(s => s.id === album.id) || mockSongs[0];
                          playSong(song);
                          toast.success(`Playing ${album.title}`);
                        }}
                      >
                        <PlayIcon size={20} />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-medium text-white group-hover:text-mq-yellow transition-all duration-200 truncate">{album.title}</h3>
                  <p className="text-zinc-400 text-sm flex items-center gap-1">
                    <span>{album.year}</span>
                    <span>•</span>
                    <span>{album.tracks} tracks</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Similar Artists */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">Fans Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {artist.similar.map((similarArtist: any) => (
              <div key={similarArtist.id} className="group">
                <div className="bg-mq-navy/30 rounded-lg overflow-hidden p-4 hover-lift flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                    <img 
                      src={similarArtist.image}
                      alt={similarArtist.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <h3 className="font-medium text-white group-hover:text-mq-yellow transition-all duration-200">{similarArtist.name}</h3>
                  <p className="text-zinc-400 text-sm">Artist</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Artist;
