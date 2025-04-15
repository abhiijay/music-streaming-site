
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlayerProvider } from "./contexts/PlayerContext";
import Index from "./pages/Index";
import Playlist from "./pages/playlist";
import Explore from "./pages/explore";
import NotFound from "./pages/NotFound";
import Album from "./pages/album";
import Search from "./pages/search";
import ForYou from "./pages/for-you";
import Collection from "./pages/collection";
import Login from "./pages/login";
import Notifications from "./pages/notifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PlayerProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/playlist/:id" element={<Playlist />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/album/:id" element={<Album />} />
            <Route path="/search" element={<Search />} />
            <Route path="/for-you" element={<ForYou />} />
            <Route path="/collection" element={<Collection />}>
              <Route path="playlists" element={<Collection />} />
              <Route path="favorites" element={<Collection />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/notifications" element={<Notifications />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PlayerProvider>
  </QueryClientProvider>
);

export default App;
