
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SectionHeaderProps {
  title: string;
  seeAllLink?: string;
  showControls?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
}

const SectionHeader = ({
  title,
  seeAllLink,
  showControls = false,
  onPrevious,
  onNext,
}: SectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <div className="flex items-center">
        {showControls && (
          <div className="mr-4 flex space-x-2">
            <button
              onClick={onPrevious}
              className="p-1 rounded-full bg-zinc-800 hover:bg-zinc-700"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={onNext}
              className="p-1 rounded-full bg-zinc-800 hover:bg-zinc-700"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
        {seeAllLink && (
          <Link
            to={seeAllLink}
            className="text-xs font-medium uppercase text-zinc-400 hover:text-white"
          >
            View all
          </Link>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
