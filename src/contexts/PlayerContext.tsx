import React, { createContext, useContext, useState, useEffect, useRef } from "react";

// Define types for our songs and player state
export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  explicit: boolean;
  imageUrl: string;
  audioUrl: string;
}

export interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  repeatMode: "off" | "all" | "one";
  shuffleMode: boolean;
  queue: Song[];
  playingSongs: Song[]; // Original playlist order
  
  // Methods
  playSong: (song: Song, songsList?: Song[]) => void;
  togglePlayPause: () => void;
  setVolume: (volume: number) => void;
  seek: (time: number) => void;
  nextSong: () => void;
  previousSong: () => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
}

// Create our initial context
const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// Mock song data - these would normally come from a backend
export const mockSongs: Song[] = [
  {
    id: "1",
    title: "NOKIA",
    artist: "Drake",
    duration: "3:02",
    explicit: true,
    imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3"
  },
  {
    id: "2",
    title: "Legends",
    artist: "Quavo, Lil Baby",
    duration: "3:01",
    explicit: true,
    imageUrl: "/lovable-uploads/81d39118-ff63-460e-993d-275178cd6c40.png",
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-621.mp3"
  },
  {
    id: "3",
    title: "Worst Of Me",
    artist: "Cynthia Erivo",
    duration: "3:28",
    explicit: false,
    imageUrl: "/lovable-uploads/00e244a7-d659-4312-befb-52b043a87ce6.png",
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3"
  },
  {
    id: "4",
    title: "Blink Twice",
    artist: "Shaboozey, Myles Smith",
    duration: "2:37",
    explicit: true,
    imageUrl: "/lovable-uploads/a910c028-5947-4358-b83a-240ed8a516ca.png",
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-chill-organ-681.mp3"
  },
  {
    id: "5",
    title: "Dreams Don't Die",
    artist: "Jelly Roll",
    duration: "3:02",
    explicit: false,
    imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-driving-ambition-32.mp3"
  }
];

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("off");
  const [shuffleMode, setShuffleMode] = useState(false);
  const [queue, setQueue] = useState<Song[]>(mockSongs);
  const [playingSongs, setPlayingSongs] = useState<Song[]>(mockSongs);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    
    // Set up audio event listeners
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateCurrentTime);
      audioRef.current.addEventListener("ended", handleSongEnd);
      audioRef.current.addEventListener("loadedmetadata", updateDuration);
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateCurrentTime);
        audioRef.current.removeEventListener("ended", handleSongEnd);
        audioRef.current.removeEventListener("loadedmetadata", updateDuration);
        audioRef.current.pause();
      }
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Handle song changes
  useEffect(() => {
    if (!currentSong) return;
    
    if (audioRef.current) {
      audioRef.current.src = currentSong.audioUrl;
      audioRef.current.volume = volume;
      audioRef.current.load();
      
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    }
  }, [currentSong]);

  // Handle play state changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Update volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const updateCurrentTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const updateDuration = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSongEnd = () => {
    if (repeatMode === "one") {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(error => console.error("Error replaying:", error));
      }
    } else {
      nextSong();
    }
  };

  // Generate a shuffled queue
  const generateShuffledQueue = (songs: Song[]) => {
    const shuffled = [...songs];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Play a specific song
  const playSong = (song: Song, songsList?: Song[]) => {
    setCurrentSong(song);
    setIsPlaying(true);
    
    // If a songList is provided, update both queue and playingSongs
    if (songsList) {
      setPlayingSongs(songsList);
      setQueue(shuffleMode ? generateShuffledQueue(songsList) : songsList);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const findCurrentSongIndex = (songList: Song[]) => {
    if (!currentSong) return -1;
    return songList.findIndex(song => song.id === currentSong.id);
  };

  const nextSong = () => {
    if (!currentSong || queue.length === 0) return;
    
    const currentIndex = findCurrentSongIndex(queue);
    if (currentIndex === -1) return;
    
    let nextIndex = (currentIndex + 1) % queue.length;
    setCurrentSong(queue[nextIndex]);
    setIsPlaying(true);
  };

  const previousSong = () => {
    if (!currentSong || queue.length === 0) return;
    
    const currentIndex = findCurrentSongIndex(queue);
    if (currentIndex === -1) return;
    
    // Go to previous song or restart current song if less than 3 seconds in
    let prevIndex;
    if (audioRef.current && audioRef.current.currentTime > 3) {
      // If more than 3 seconds in, restart the current song
      audioRef.current.currentTime = 0;
      return;
    } else {
      // Go to previous song, wrapping to the end if at the beginning
      prevIndex = (currentIndex - 1 + queue.length) % queue.length;
      setCurrentSong(queue[prevIndex]);
      setIsPlaying(true);
    }
  };

  const toggleRepeat = () => {
    setRepeatMode(current => {
      if (current === "off") return "all";
      if (current === "all") return "one";
      return "off";
    });
  };

  const toggleShuffle = () => {
    setShuffleMode(current => !current);
    
    // Update queue based on new shuffle state
    if (!shuffleMode) {
      // Turning shuffle on
      setQueue(generateShuffledQueue(playingSongs));
    } else {
      // Turning shuffle off
      setQueue([...playingSongs]);
    }
  };

  const value = {
    currentSong,
    isPlaying,
    volume,
    currentTime,
    duration,
    repeatMode,
    shuffleMode,
    queue,
    playingSongs,
    playSong,
    togglePlayPause,
    setVolume,
    seek,
    nextSong,
    previousSong,
    toggleRepeat,
    toggleShuffle
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};

// Custom hook to use the player context
export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

// No need to redefine mockSongs here, as we're already exporting it above
