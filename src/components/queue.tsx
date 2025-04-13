
import React, { useRef } from "react";
import { XIcon, GripVertical } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { Song } from "@/contexts/PlayerContext";
import { cn } from "@/lib/utils";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Button } from "./ui/button";

interface QueueProps {
  isOpen: boolean;
  onClose: () => void;
  theme: "dark" | "light";
}

const Queue = ({ isOpen, onClose, theme }: QueueProps) => {
  const { 
    currentSong, 
    queue, 
    playSong, 
    playingSongs,
    isPlaying
  } = usePlayer();
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle drag end event for reordering
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    
    // Dropped outside the list
    if (!destination) return;
    
    // No change in position
    if (source.index === destination.index) return;
    
    // Create a copy of the queue
    const newQueue = Array.from(queue);
    // Remove item from source position
    const [removed] = newQueue.splice(source.index, 1);
    // Insert at destination
    newQueue.splice(destination.index, 0, removed);
    
    // Update the queue in context
    // In a real app, we would update the queue state here
    // setQueue(newQueue);
    
    // For now, we'll just show a console message
    console.log("Queue reordered:", newQueue);
  };
  
  // Play a specific song from the queue
  const handlePlaySong = (song: Song) => {
    playSong(song, playingSongs);
  };
  
  // Remove a song from queue (placeholder for now)
  const handleRemoveFromQueue = (index: number) => {
    const newQueue = [...queue];
    newQueue.splice(index, 1);
    
    // In a real app, we would update the queue state here
    // setQueue(newQueue);
    
    console.log("Removed song from queue:", index);
  };

  return (
    <div 
      className={cn(
        "fixed right-0 top-0 bottom-20 w-full md:w-96 z-30 transition-transform duration-300 ease-in-out shadow-lg",
        theme === "dark" ? "bg-tidal-black/95 backdrop-blur-md" : "bg-white/95 backdrop-blur-md",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
      ref={containerRef}
    >
      <div className="flex flex-col h-full">
        <div className={cn(
          "p-4 flex items-center justify-between",
          theme === "dark" ? "border-b border-zinc-800" : "border-b border-slate-200"
        )}>
          <h3 className={cn(
            "text-lg font-semibold",
            theme === "dark" ? "text-white" : "text-slate-900"
          )}>
            Queue
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "rounded-full",
              theme === "dark" 
                ? "text-zinc-400 hover:text-white hover:bg-zinc-800" 
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-200"
            )}
            onClick={onClose}
          >
            <XIcon size={20} />
          </Button>
        </div>
        
        <div className={cn(
          "flex-1 overflow-y-auto p-4",
          theme === "dark" ? "scrollbar-thin" : "scrollbar-thin"
        )}>
          {/* Now Playing */}
          {currentSong && (
            <div className="mb-6">
              <h4 className={cn(
                "text-xs uppercase font-medium mb-3",
                theme === "dark" ? "text-zinc-500" : "text-slate-500"
              )}>
                Now Playing
              </h4>
              <div className={cn(
                "flex items-center p-2 rounded-md",
                theme === "dark" ? "bg-tidal-hover" : "bg-slate-100"
              )}>
                <div className="h-12 w-12 mr-3 flex-shrink-0">
                  <img 
                    src={currentSong.imageUrl} 
                    alt={currentSong.title}
                    className="h-full w-full object-cover rounded"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={cn(
                    "text-sm font-medium truncate",
                    theme === "dark" ? "text-white" : "text-slate-900"
                  )}>
                    {currentSong.title}
                  </h4>
                  <p className={cn(
                    "text-xs truncate",
                    theme === "dark" ? "text-zinc-400" : "text-slate-500"
                  )}>
                    {currentSong.artist}
                  </p>
                </div>
                <div className="ml-2">
                  {isPlaying && (
                    <div className="audio-visualizer">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div
                          key={i}
                          className="audio-bar animate-wave"
                          style={{
                            animationDelay: `${i * 0.2}s`,
                            height: `${10 + Math.random() * 10}px`
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Up Next */}
          <div>
            <h4 className={cn(
              "text-xs uppercase font-medium mb-3",
              theme === "dark" ? "text-zinc-500" : "text-slate-500"
            )}>
              Up Next
            </h4>
            
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="queue">
                {(provided) => (
                  <div 
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-2"
                  >
                    {queue.map((song, index) => (
                      <Draggable key={`${song.id}-${index}`} draggableId={`${song.id}-${index}`} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={cn(
                              "flex items-center p-2 rounded-md transition-all duration-200 group relative",
                              snapshot.isDragging && "z-10 shadow-md",
                              theme === "dark" 
                                ? "hover:bg-tidal-hover" 
                                : "hover:bg-slate-100",
                              currentSong?.id === song.id && (
                                theme === "dark" 
                                  ? "bg-tidal-hover" 
                                  : "bg-slate-100"
                              )
                            )}
                            style={provided.draggableProps.style}
                          >
                            <div 
                              {...provided.dragHandleProps}
                              className={cn(
                                "p-1 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                                theme === "dark" ? "text-zinc-400" : "text-slate-400"
                              )}
                            >
                              <GripVertical size={16} />
                            </div>
                            
                            <div 
                              className="h-10 w-10 mr-3 flex-shrink-0 cursor-pointer"
                              onClick={() => handlePlaySong(song)}
                            >
                              <img 
                                src={song.imageUrl} 
                                alt={song.title}
                                className="h-full w-full object-cover rounded"
                              />
                            </div>
                            
                            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => handlePlaySong(song)}>
                              <h4 className={cn(
                                "text-sm font-medium truncate",
                                theme === "dark" ? "text-white" : "text-slate-900"
                              )}>
                                {song.title}
                              </h4>
                              <p className={cn(
                                "text-xs truncate",
                                theme === "dark" ? "text-zinc-400" : "text-slate-500"
                              )}>
                                {song.artist}
                              </p>
                            </div>
                            
                            <button
                              className={cn(
                                "ml-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full",
                                theme === "dark" 
                                  ? "text-zinc-400 hover:text-white hover:bg-zinc-700" 
                                  : "text-slate-400 hover:text-slate-900 hover:bg-slate-200"
                              )}
                              onClick={() => handleRemoveFromQueue(index)}
                            >
                              <XIcon size={16} />
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Queue;
