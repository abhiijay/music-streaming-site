
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AppLogo from "@/components/app-logo";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // Show success message
      toast({
        title: "Login successful",
        description: "Welcome back to TIDAL!",
      });
      
      // Redirect to home page
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-tidal-black text-white flex flex-col">
      <header className="flex justify-center py-8 border-b border-zinc-800">
        <AppLogo />
      </header>
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-zinc-900 p-8 rounded-md border border-zinc-800">
          <h1 className="text-2xl font-bold text-center mb-8">Log in to TIDAL</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-tidal-blue"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-tidal-blue"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-white hover:bg-white/90 text-black"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-zinc-400">
            <p>
              Don't have an account?{" "}
              <Link to="/login" className="text-white hover:underline">
                Sign up for TIDAL
              </Link>
            </p>
          </div>
          
          <div className="mt-8 text-xs text-center text-zinc-500">
            <p>
              By logging in, you agree to TIDAL's Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </main>
      
      <footer className="py-4 border-t border-zinc-800 text-center text-sm text-zinc-500">
        <p>&copy; 2025 TIDAL</p>
      </footer>
    </div>
  );
};

export default Login;
