
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AppLogo from "@/components/app-logo";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, AlertCircle } from "lucide-react";
import RippleEffect from "@/components/ripple-effect";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for existing session
  useEffect(() => {
    // Simulate checking for existing session
    const hasSession = localStorage.getItem("chord_session");
    if (hasSession) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // Store session
      localStorage.setItem("chord_session", JSON.stringify({ email }));
      
      // Show success message
      toast({
        title: "Login successful",
        description: "Welcome back to Chord!",
      });
      
      // Redirect to home page with animation
      navigate("/");
    }, 1500);
  };
  
  const handleGoogleLogin = () => {
    setLoading(true);
    
    // Simulate Google OAuth
    setTimeout(() => {
      setLoading(false);
      
      // Store session
      localStorage.setItem("chord_session", JSON.stringify({ email: "user@example.com" }));
      
      toast({
        title: "Google login successful",
        description: "Welcome to Chord!",
      });
      
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-chord-bg text-chord-text flex flex-col">
      {/* Ambient particles */}
      <RippleEffect color="rgba(194, 1, 20, 0.3)" />
      
      <header className="flex justify-center py-8 animate-fade-in">
        <AppLogo size="large" />
      </header>
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-chord-hover/20 backdrop-blur-md p-8 rounded-xl border border-white/5 shadow-lg animate-fade-in">
          <h1 className="text-2xl font-bold text-center mb-8">Welcome to Chord</h1>
          
          {error && (
            <div className="mb-6 p-3 bg-chord-red/10 border border-chord-red/20 rounded-lg flex items-center text-sm animate-fade-in">
              <AlertCircle size={16} className="mr-2 text-chord-red" />
              <span className="font-bold">{error}</span>
            </div>
          )}
          
          <Button 
            onClick={handleGoogleLogin}
            className="w-full bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 mb-6 group relative overflow-hidden"
            disabled={loading}
          >
            <div className="absolute inset-0 w-3 bg-gradient-to-r from-chord-red to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-300 opacity-30" />
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>
          
          <div className="flex items-center my-6">
            <Separator className="flex-1 bg-white/10" />
            <span className="px-3 text-chord-text/70 text-sm font-bold">OR</span>
            <Separator className="flex-1 bg-white/10" />
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-chord-text/50" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full bg-chord-hover/30 border border-white/10 rounded-md pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-chord-red focus:border-transparent text-chord-text font-bold"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-chord-text/50" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-chord-hover/30 border border-white/10 rounded-md pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-chord-red focus:border-transparent text-chord-text font-bold"
                />
              </div>
              <div className="flex items-center justify-end">
                <Link to="/forgot-password" className="text-xs text-chord-red hover:underline font-bold">
                  Forgot password?
                </Link>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-chord-red hover:bg-chord-red/90 text-chord-text py-3 hover:shadow-[0_0_15px_rgba(194,1,20,0.5)] transition-all duration-300 font-bold"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-t-transparent border-chord-text border-opacity-50 rounded-full animate-spin mr-2"></div>
                  <span>Logging in...</span>
                </div>
              ) : (
                "Log In"
              )}
            </Button>
          </form>
          
          <div className="mt-8 text-center text-sm text-chord-text/70">
            <p className="font-bold">
              Don't have an account?{" "}
              <Link to="/signup" className="text-chord-red hover:underline font-bold">
                Sign up for Chord
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
