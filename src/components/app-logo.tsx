
import { cn } from "@/lib/utils";

interface AppLogoProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const AppLogo = ({ size = "medium", className }: AppLogoProps) => {
  return (
    <div className={cn(
      "flex items-center",
      size === "small" && "scale-75",
      size === "large" && "scale-125",
      className
    )}>
      <div className="flex items-center">
        <div className="w-8 h-8 bg-chord-red rounded-full flex items-center justify-center mr-2">
          <span className="text-white font-bold text-sm">♪</span>
        </div>
        <span className="text-chord-text font-bold text-xl tracking-tight">Chord</span>
      </div>
    </div>
  );
};

export default AppLogo;
