
import { SearchIcon, BellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-[240px] h-16 bg-tidal-black z-10 flex items-center justify-between px-6 border-b border-zinc-800">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
          <input
            type="search"
            placeholder="Search"
            className="w-full h-10 pl-10 pr-4 bg-tidal-gray rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-tidal-blue"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/trial" className="text-sm text-white hover:underline mr-4">
          Start free trial
        </Link>
        <Button variant="outline" className="border-zinc-600 hover:border-white bg-transparent text-white hover:bg-tidal-hover">
          Log in
        </Button>
        <button className="relative">
          <BellIcon size={20} className="text-zinc-400 hover:text-white" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-tidal-blue rounded-full"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
