
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
        "text-xl font-bold relative group",
        theme === "dark" ? "text-white" : "text-mq-navy"
      )}>
        {title}
        <span className={cn(
          "absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300",
          theme === "dark" ? "bg-mq-yellow" : "bg-mq-red"
        )}></span>
      </h2>
      
      {seeAllLink && (
        <Link
          to={seeAllLink}
          className={cn(
            "flex items-center text-sm transition-all duration-200 group",
            theme === "dark" 
              ? "text-zinc-400 hover:text-mq-yellow"
              : "text-zinc-600 hover:text-mq-red"
          )}
        >
          <span>View all</span>
          <ChevronRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
