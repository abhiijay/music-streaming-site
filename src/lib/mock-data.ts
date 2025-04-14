
// User profile mock data
export const mockUserData = {
  name: "Alex Johnson",
  avatar: "/lovable-uploads/00e244a7-d659-4312-befb-52b043a87ce6.png",
  plan: "Premium",
  joinDate: "2021-05-15T00:00:00Z",
  bio: "Music enthusiast and vinyl collector. Always looking for new sounds and artists to discover.",
  playlists: 12,
  favorites: 248,
  hoursListened: 456.8,
  stats: {
    monthlyHours: 42.5,
    tracksPlayed: 627,
    artistsDiscovered: 14,
    mostActiveDay: "Friday"
  },
  topGenres: [
    { name: "Alternative", percentage: 32 },
    { name: "Indie Pop", percentage: 26 },
    { name: "Electronic", percentage: 18 },
    { name: "Hip Hop", percentage: 15 },
    { name: "Classical", percentage: 9 }
  ],
  topArtists: [
    { 
      name: "The National", 
      image: "/lovable-uploads/81d39118-ff63-460e-993d-275178cd6c40.png",
      hoursPlayed: 18.5 
    },
    { 
      name: "Billie Eilish", 
      image: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
      hoursPlayed: 12.3 
    },
    { 
      name: "Kendrick Lamar", 
      image: "/lovable-uploads/a910c028-5947-4358-b83a-240ed8a516ca.png",
      hoursPlayed: 10.7 
    },
    { 
      name: "Bonobo", 
      image: "/lovable-uploads/00e244a7-d659-4312-befb-52b043a87ce6.png",
      hoursPlayed: 8.2 
    }
  ],
  playlists: [
    {
      name: "Chill Vibes",
      image: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
      trackCount: 23
    },
    {
      name: "Workout Mix",
      image: "/lovable-uploads/81d39118-ff63-460e-993d-275178cd6c40.png",
      trackCount: 18
    },
    {
      name: "Focus Flow",
      image: "/lovable-uploads/a910c028-5947-4358-b83a-240ed8a516ca.png",
      trackCount: 32
    },
    {
      name: "Weekend Party",
      image: "/lovable-uploads/00e244a7-d659-4312-befb-52b043a87ce6.png",
      trackCount: 15
    }
  ],
  settings: {
    emailNotifications: true,
    qualityPreference: "High",
    downloadEnabled: true,
    theme: "dark"
  }
};

// Listening history mock data
export const mockListeningHistory = [
  {
    trackName: "Fake Empire",
    artistName: "The National",
    trackImage: "/lovable-uploads/81d39118-ff63-460e-993d-275178cd6c40.png",
    playedAt: new Date(Date.now() - 1000 * 60 * 25).toISOString() // 25 minutes ago
  },
  {
    trackName: "Therefore I Am",
    artistName: "Billie Eilish",
    trackImage: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
    playedAt: new Date(Date.now() - 1000 * 60 * 53).toISOString() // 53 minutes ago
  },
  {
    trackName: "DNA.",
    artistName: "Kendrick Lamar",
    trackImage: "/lovable-uploads/a910c028-5947-4358-b83a-240ed8a516ca.png",
    playedAt: new Date(Date.now() - 1000 * 60 * 110).toISOString() // 1 hour 50 minutes ago
  },
  {
    trackName: "Cirrus",
    artistName: "Bonobo",
    trackImage: "/lovable-uploads/00e244a7-d659-4312-befb-52b043a87ce6.png",
    playedAt: new Date(Date.now() - 1000 * 60 * 172).toISOString() // 2 hours 52 minutes ago
  },
  {
    trackName: "Weird Fishes/Arpeggi",
    artistName: "Radiohead",
    trackImage: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
    playedAt: new Date(Date.now() - 1000 * 60 * 243).toISOString() // 4 hours 3 minutes ago
  }
];
