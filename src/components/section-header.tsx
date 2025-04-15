
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  seeAllLink?: string;
  showControls?: boolean;
  className?: string;
}

const SectionHeader = ({
  title,
  seeAllLink,
  showControls = false,
  className,
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between mb-6",
        className
      )}
    >
      <h2 className="text-lg md:text-xl font-bold text-chord-text">
        {title}
      </h2>

      <div className="flex items-center">
        {showControls && (
          <div className="hidden md:flex items-center mr-4">
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center text-chord-text/70 hover:text-chord-text hover:bg-white/5 transition-all duration-200"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center text-chord-text/70 hover:text-chord-text hover:bg-white/5 transition-all duration-200"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {seeAllLink && (
          <Link
            to={seeAllLink}
            className="text-sm font-bold text-chord-text/70 hover:text-chord-red flex items-center transition-colors duration-200"
          >
            See all
            <ChevronRightIcon size={16} className="ml-1" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
