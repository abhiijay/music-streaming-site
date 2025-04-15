
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/login";
import Album from "./pages/album";
import Playlist from "./pages/playlist";
import Collection from "./pages/collection";
import ForYou from "./pages/for-you";
import Explore from "./pages/explore";
import Search from "./pages/search";
import Notifications from "./pages/notifications";
import Artist from "./pages/artist";
import Profile from "./pages/profile";
import { PlayerProvider } from "./contexts/PlayerContext";
import "./index.css";
import "./App.css";
import "@/components/styles.css";

function App() {
  return (
    <PlayerProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="/playlist/:id" element={<Playlist />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/for-you" element={<ForYou />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/search" element={<Search />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/artist/:id" element={<Artist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PlayerProvider>
  );
}

export default App;
