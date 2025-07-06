import { useState, useEffect, useRef } from "react";
import { ShoppingCart, Briefcase, BarChart3, Layout, Globe, ChevronRight, ChevronLeft, ExternalLink, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Projects } from "./Projects";

// Import projects data from JSON file
import projectsData from "@/data/projects.json";

interface Project {
  id: number;
  title: string;
  description: string;
  icon: string;
  demoUrl: string;
  tags?: {
    name: string;
    color: string;
  }[];
}

// Helper function to render the icon component based on icon name
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'ShoppingCart':
      return <ShoppingCart className="h-5 w-5" />;
    case 'Briefcase':
      return <Briefcase className="h-5 w-5" />;
    case 'BarChart3':
      return <BarChart3 className="h-5 w-5" />;
    case 'Layout':
      return <Layout className="h-5 w-5" />;
    case 'Globe':
      return <Globe className="h-5 w-5" />;
    default:
      return <ShoppingCart className="h-5 w-5" />;
  }
};

// Global variable to store which project ID to auto-select when Projects component mounts
let autoSelectProjectId: number | null = null;

export const ProjectsMarquee = () => {
  // Transform projects data to match the interface
  const projects: Project[] = projectsData.map((project: any) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    icon: project.icon,
    demoUrl: project.demoUrl,
    tags: project.tags
  }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [isInitiallyLoaded, setIsInitiallyLoaded] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Reference to the dialog trigger button
  const dialogTriggerRef = useRef<HTMLButtonElement>(null);
  
  const displayDuration = 8000; // 8 seconds
  const initialDelay = 8000; // 8 seconds delay before first appearance
  const progressUpdateInterval = 30; // Update progress every 30ms for smooth animation
  const slideDownDuration = 400; // Slide down animation duration in ms
  const slideUpDuration = 500; // Slide up animation duration in ms

  // Handle initial appearance after page load
  useEffect(() => {
    // Wait 8 seconds before showing the component
    const initialTimer = setTimeout(() => {
      setIsInitiallyLoaded(true);
      
      // Then wait a short delay before starting the animation
      setTimeout(() => {
        setIsVisible(true);
        // Fade in gradually
        let opacityValue = 0;
        const opacityInterval = setInterval(() => {
          opacityValue += 0.1;
          setOpacity(Math.min(opacityValue, 1));
          if (opacityValue >= 1) clearInterval(opacityInterval);
        }, 50);
      }, 500);
    }, initialDelay);

    return () => clearTimeout(initialTimer);
  }, []);

  // Handle project change with animation
  const changeProject = (newIndex: number) => {
    // Start animation - slide down and hide
    setIsChanging(true);
    
    // Gradually decrease opacity
    let opacityValue = 1;
    const fadeOut = setInterval(() => {
      opacityValue -= 0.2;
      setOpacity(Math.max(opacityValue, 0));
      if (opacityValue <= 0) clearInterval(fadeOut);
    }, 50);
    
    // After a short delay, hide completely
    setTimeout(() => {
      setIsHidden(true);
      
      // After sliding down and hiding, change the project
      setTimeout(() => {
        setCurrentIndex(newIndex);
        setProgress(0);
        
        // After changing the project, prepare to show again
        setTimeout(() => {
          setIsHidden(false);
          
          // Gradually increase opacity
          let newOpacityValue = 0;
          const fadeIn = setInterval(() => {
            newOpacityValue += 0.2;
            setOpacity(Math.min(newOpacityValue, 1));
            if (newOpacityValue >= 1) clearInterval(fadeIn);
          }, 50);
          
          // After a short delay, complete the animation
          setTimeout(() => {
            setIsChanging(false);
          }, 100);
        }, 100);
      }, slideDownDuration / 2);
    }, slideDownDuration / 2);
  };

  // Handle automatic rotation
  useEffect(() => {
    // Only start timers after initial load
    if (!isInitiallyLoaded) return;
    
    let progressTimer: NodeJS.Timeout | null = null;
    let rotationTimer: NodeJS.Timeout | null = null;
    
    // Function to start the timers
    const startTimers = () => {
      // Clear any existing timers
      if (progressTimer) clearInterval(progressTimer);
      if (rotationTimer) clearTimeout(rotationTimer);
      
      // Reset progress
      setProgress(0);
      
      // Start progress timer
      let startTime = Date.now();
      progressTimer = setInterval(() => {
        if (!isPaused && !isChanging) {
          const elapsed = Date.now() - startTime;
          const newProgress = Math.min((elapsed / displayDuration) * 100, 100);
          setProgress(newProgress);
        } else {
          // If paused, update the start time to account for the pause
          startTime = Date.now() - (progress / 100) * displayDuration;
        }
      }, progressUpdateInterval);
      
      // Set timer for next project
      rotationTimer = setTimeout(() => {
        if (!isPaused && !isChanging) {
          const nextIndex = (currentIndex + 1) % projects.length;
          changeProject(nextIndex);
        }
      }, displayDuration);
    };
    
    // Start timers initially
    startTimers();
    
    // Cleanup function
    return () => {
      if (progressTimer) clearInterval(progressTimer);
      if (rotationTimer) clearTimeout(rotationTimer);
    };
  }, [currentIndex, displayDuration, isPaused, projects.length, isChanging, isInitiallyLoaded]);
  
  // Handle navigation
  const goToNext = () => {
    if (isChanging) return; // Prevent multiple clicks during animation
    const nextIndex = (currentIndex + 1) % projects.length;
    changeProject(nextIndex);
  };
  
  const goToPrevious = () => {
    if (isChanging) return; // Prevent multiple clicks during animation
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    changeProject(prevIndex);
  };

  // Handle project click
  const handleProjectClick = () => {
    if (isChanging) return;
    
    // Set the selected project ID
    setSelectedProjectId(projects[currentIndex].id);
    
    // Pause the marquee
    setIsPaused(true);
    
    // Open the dialog
    setIsDialogOpen(true);
  };

  // Handle dialog close
  const handleDialogClose = (open: boolean) => {
    setIsDialogOpen(open);
    
    if (!open) {
      // Reset selected project
      setSelectedProjectId(null);
      
      // Resume the marquee
      setIsPaused(false);
    }
  };

  // Don't render anything until initial delay has passed
  if (!isInitiallyLoaded) {
    return null;
  }

  return (
    <>
      <div 
        className={`fixed left-0 z-40 transition-all w-fit left-1/2 -translate-x-1/2 ${
          isChanging 
            ? `duration-${slideDownDuration} ease-in`  // Faster slide down
            : `duration-${slideUpDuration} ease-out`   // Slower slide up
        } ${
          isVisible 
            ? isChanging 
              ? 'bottom-[-100px]' // Slide all the way down during change
              : 'bottom-4' // Normal position
            : 'bottom-[-100px]' // Initial hidden position
        }`}
        style={{ opacity: isVisible ? opacity : 0 }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <div 
            className={`rounded-lg shadow-sm border overflow-hidden bg-slate-50 transform transition-all cursor-pointer hover:shadow-md ${
              isChanging 
                ? `duration-${slideDownDuration} ease-in`
                : `duration-${slideUpDuration} ease-out`
            } ${
              isHidden 
                ? 'scale-95' 
                : isChanging 
                  ? 'scale-98' 
                  : 'scale-100'
            }`}
            style={{ 
              boxShadow: `0 4px 6px rgba(0, 0, 0, ${opacity * 0.1}), 0 1px 3px rgba(0, 0, 0, ${opacity * 0.08})` 
            }}
            onClick={handleProjectClick}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className={`bg-slate-200 p-3 rounded-full flex items-center justify-center transition-all ${
                      isChanging ? 'rotate-12 scale-90' : 'rotate-0 scale-100'
                    }`}
                    style={{ opacity: isHidden ? 0 : opacity }}
                  >
                    {getIconComponent(projects[currentIndex].icon)}
                  </div>
                  <div 
                    className="transition-all grid"
                    style={{ opacity: isHidden ? 0 : opacity }}
                  >
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <span className="font-medium text-slate-800">
                        {projects[currentIndex].title}
                      </span>
                      
                      <span className="text-xs text-slate-500 flex items-center gap-1 ml-auto">
                        <span>See Details</span>
                        <ExternalLink className="h-3 w-3" />
                      </span>
                    </div>
                    <div className="text-sm text-slate-600 whitespace-nowrap overflow-hidden text-ellipsis">
                      {projects[currentIndex].description}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button 
                    className={`p-1.5 rounded-full hover:bg-slate-200 transition-colors ${isChanging ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrevious();
                    }}
                    aria-label="Previous project"
                    disabled={isChanging}
                    style={{ opacity: isHidden ? 0 : opacity }}
                  >
                    <ChevronLeft className="h-4 w-4 text-slate-500" />
                  </button>
                  <button 
                    className={`p-1.5 rounded-full hover:bg-slate-200 transition-colors ${isChanging ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNext();
                    }}
                    aria-label="Next project"
                    disabled={isChanging}
                    style={{ opacity: isHidden ? 0 : opacity }}
                  >
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="h-1 bg-slate-200 w-full">
              <div 
                className="h-full bg-slate-500 transition-all duration-100 ease-linear"
                style={{ width: `${progress}%`, opacity: opacity * 0.9 }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Featured Projects</DialogTitle>
            <DialogDescription>
              Browse my portfolio of projects or select one for detailed information.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Projects autoSelectProjectId={selectedProjectId} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};