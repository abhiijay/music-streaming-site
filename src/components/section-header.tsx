
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  seeAllLink?: string;
  showControls?: boolean;
  className?: string;
  theme?: "dark" | "light";
}

const SectionHeader = ({
  title,
  seeAllLink,
  showControls = false,
  className,
  theme = "dark",
}: SectionHeaderProps) => {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      <h2 className={cn(
        "text-xl font-bold",
        theme === "dark" ? "text-white" : "text-zinc-900"
      )}>
        {title}
      </h2>
      {seeAllLink && (
        <Link
          to={seeAllLink}
          className={cn(
            "flex items-center text-sm transition-colors duration-200",
            theme === "dark" 
              ? "text-zinc-400 hover:text-white"
              : "text-zinc-600 hover:text-zinc-900"
          )}
        >
          View all <ChevronRight size={16} className="ml-1" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
