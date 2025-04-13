
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { PlayerProvider } from "./contexts/PlayerContext";
import { AnimatePresence } from "framer-motion";
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
import PageTransition from "./components/page-transition";
import "./components/styles.css";

const queryClient = new QueryClient();

// Animated routes wrapper
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/playlist/:id" element={<PageTransition><Playlist /></PageTransition>} />
        <Route path="/explore" element={<PageTransition><Explore /></PageTransition>} />
        <Route path="/album/:id" element={<PageTransition><Album /></PageTransition>} />
        <Route path="/search" element={<PageTransition><Search /></PageTransition>} />
        <Route path="/for-you" element={<PageTransition><ForYou /></PageTransition>} />
        <Route path="/collection" element={<PageTransition><Collection /></PageTransition>}>
          <Route path="playlists" element={<PageTransition><Collection /></PageTransition>} />
          <Route path="favorites" element={<PageTransition><Collection /></PageTransition>} />
        </Route>
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/notifications" element={<PageTransition><Notifications /></PageTransition>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PlayerProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </PlayerProvider>
  </QueryClientProvider>
);

export default App;
