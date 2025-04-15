
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from "@/components/layout";
import TrackItem from "@/components/track-item";
import PlaylistCard from "@/components/playlist-card";
import { mockSongs, Song } from "@/contexts/PlayerContext";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState({
    songs: [] as Song[],
    albums: [] as any[],
    artists: [] as any[],
    playlists: [] as any[]
  });
  
  // Mock search functionality
  useEffect(() => {
    if (query) {
      // Filter songs
      const filteredSongs = mockSongs.filter(song => 
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
      );
      
      // Mock album results
      const albums = [
        {
          id: "album-1",
          title: "TIDAL's Top Hits",
          imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
          artist: "Various Artists",
        },
        {
          id: "album-2",
          title: "Pop Hits",
          imageUrl: "/lovable-uploads/81d39118-ff63-460e-993d-275178cd6c40.png",
          artist: "Various Artists",
        }
      ].filter(album => 
        album.title.toLowerCase().includes(query.toLowerCase()) ||
        album.artist.toLowerCase().includes(query.toLowerCase())
      );
      
      // Mock artist results
      const artists = [
        {
          id: "artist-1",
          name: "Drake",
          imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
        },
        {
          id: "artist-2",
          name: "Quavo",
          imageUrl: "/lovable-uploads/a910c028-5947-4358-b83a-240ed8a516ca.png",
        }
      ].filter(artist => 
        artist.name.toLowerCase().includes(query.toLowerCase())
      );
      
      // Mock playlist results
      const playlists = [
        {
          id: "playlist-1",
          title: "Hip Hop Mix",
          imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
          creator: "TIDAL",
        },
        {
          id: "playlist-2",
          title: "R&B Favorites",
          imageUrl: "/lovable-uploads/a910c028-5947-4358-b83a-240ed8a516ca.png",
          creator: "TIDAL",
        }
      ].filter(playlist => 
        playlist.title.toLowerCase().includes(query.toLowerCase())
      );
      
      setResults({
        songs: filteredSongs,
        albums,
        artists,
        playlists
      });
    } else {
      setResults({
        songs: [],
        albums: [],
        artists: [],
        playlists: []
      });
    }
  }, [query]);
  
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {query ? `Search results for "${query}"` : 'Search'}
        </h1>
      </div>
      
      {!query ? (
        <div className="text-center py-12 text-zinc-400">
          <p>Enter a search term to find songs, albums, artists, and playlists.</p>
        </div>
      ) : (
        <>
          {/* Tracks */}
          {results.songs.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4">Songs</h2>
              <div className="bg-tidal-darkgray rounded-md overflow-hidden">
                {results.songs.map((song, index) => (
                  <TrackItem
                    key={song.id}
                    id={song.id}
                    title={song.title}
                    artist={song.artist}
                    duration={song.duration}
                    explicit={Math.random() > 0.5}
                    index={index + 1}
                    audioUrl={song.audioUrl}
                    imageUrl={song.imageUrl}
                    songs={results.songs}
                  />
                ))}
              </div>
            </section>
          )}
          
          {/* Albums */}
          {results.albums.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4">Albums</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {results.albums.map(album => (
                  <PlaylistCard
                    key={album.id}
                    id={album.id}
                    title={album.title}
                    imageUrl={album.imageUrl}
                    description={album.artist}
                  />
                ))}
              </div>
            </section>
          )}
          
          {/* Artists */}
          {results.artists.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4">Artists</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {results.artists.map(artist => (
                  <div key={artist.id} className="text-center">
                    <div className="mb-3 mx-auto rounded-full overflow-hidden w-32 h-32">
                      <img 
                        src={artist.imageUrl} 
                        alt={artist.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <h3 className="font-medium">{artist.name}</h3>
                    <p className="text-sm text-zinc-400">Artist</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Playlists */}
          {results.playlists.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4">Playlists</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {results.playlists.map(playlist => (
                  <PlaylistCard
                    key={playlist.id}
                    id={playlist.id}
                    title={playlist.title}
                    imageUrl={playlist.imageUrl}
                    creator={playlist.creator}
                  />
                ))}
              </div>
            </section>
          )}
          
          {/* No results message */}
          {results.songs.length === 0 && results.albums.length === 0 && 
           results.artists.length === 0 && results.playlists.length === 0 && (
            <div className="text-center py-12 text-zinc-400">
              <p>No results found for "{query}".</p>
              <p>Try searching for something else.</p>
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default Search;
