
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h4 className="font-bold text-chord-text mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-chord-text/70 hover:text-chord-text text-sm">About</Link></li>
              <li><Link to="/careers" className="text-chord-text/70 hover:text-chord-text text-sm">Careers</Link></li>
              <li><Link to="/press" className="text-chord-text/70 hover:text-chord-text text-sm">Press</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-chord-text mb-4">Community</h4>
            <ul className="space-y-2">
              <li><Link to="/artists" className="text-chord-text/70 hover:text-chord-text text-sm">For Artists</Link></li>
              <li><Link to="/developers" className="text-chord-text/70 hover:text-chord-text text-sm">Developers</Link></li>
              <li><Link to="/partners" className="text-chord-text/70 hover:text-chord-text text-sm">Partners</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-chord-text mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-chord-text/70 hover:text-chord-text text-sm">Privacy</Link></li>
              <li><Link to="/terms" className="text-chord-text/70 hover:text-chord-text text-sm">Terms</Link></li>
              <li><Link to="/copyright" className="text-chord-text/70 hover:text-chord-text text-sm">Copyright</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-chord-text mb-4">Social</h4>
            <ul className="space-y-2">
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-chord-text/70 hover:text-chord-text text-sm">Twitter</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-chord-text/70 hover:text-chord-text text-sm">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-chord-text/70 hover:text-chord-text text-sm">Facebook</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-chord-text/50 text-sm">&copy; {new Date().getFullYear()} Chord. All rights reserved.</p>
          
          <div className="flex items-center mt-4 md:mt-0">
            <p className="text-chord-text/50 text-sm mr-2">Made with</p>
            <Heart size={14} className="text-chord-red" />
            <p className="text-chord-text/50 text-sm ml-2">for music lovers</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
