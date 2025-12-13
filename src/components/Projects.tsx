import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, Image, ExternalLink, Code, ShoppingCart, Briefcase, BarChart3, Layout, Globe, ZoomIn, ZoomOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";

// Import projects data from JSON file
import projectsData from "@/data/projects.json";

// Define the project type for better type safety
type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl: string;
  codeUrl: string;
  // Additional fields for the details modal
  imagesBasePath: string;
  images?: string[];
  features?: string[];
  icon: string;
  tags?: {
    name: string;
    color: string;
  }[];
};

// Helper function to render the icon component based on icon name
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'ShoppingCart':
      return <ShoppingCart className="h-4 w-4" />;
    case 'Briefcase':
      return <Briefcase className="h-4 w-4" />;
    case 'BarChart3':
      return <BarChart3 className="h-4 w-4" />;
    case 'Layout':
      return <Layout className="h-4 w-4" />;
    case 'Globe':
      return <Globe className="h-4 w-4" />;
    default:
      return <Link className="h-4 w-4" />;
  }
};

// Helper function to parse feature text with bold formatting
const parseFeatureText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return <span key={index} className="font-bold">{boldText}</span>;
    }
    return part;
  });
};

interface ProjectsProps {
  autoSelectProjectId?: number | null;
}

export const Projects: React.FC<ProjectsProps> = ({ autoSelectProjectId = null }) => {
  // State to track which project's details are being viewed
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // State to manage carousel
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const autoSlideTimer = useRef<NodeJS.Timeout | null>(null);
  const progressTimer = useRef<NodeJS.Timeout | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  // State to track if mouse is hovering over active thumbnail
  const [isHoveringThumbnail, setIsHoveringThumbnail] = useState(false);
  // State to track zoom level for the main image
  const [zoomLevel, setZoomLevel] = useState(1);
  // State to track image position for dragging
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Use projects from imported data
  const projects: Project[] = projectsData as Project[];

  // Auto-select project based on provided ID
  useEffect(() => {
    console.log("Projects component loaded with autoSelectProjectId:", autoSelectProjectId);
    
    if (autoSelectProjectId) {
      const projectToSelect = projects.find(project => project.id === autoSelectProjectId);
      console.log("Project to select:", projectToSelect);
      
      if (projectToSelect) {
        // Small delay to ensure the Projects dialog is fully open first
        const timer = setTimeout(() => {
          console.log("Auto-selecting project:", projectToSelect.title);
          setProgress(0);
          stopAllTimers();
          setCurrentSlide(0);
          setZoomLevel(1);
          setImagePosition({ x: 0, y: 0 });
          setSelectedProject(projectToSelect);
        }, 500);
        
        return () => clearTimeout(timer);
      }
    }
  }, [autoSelectProjectId, projects]);

  // Handle thumbnail click - go directly to that slide
  const handleThumbnailClick = (index: number) => {
    if (carouselApi) {
      stopAllTimers();
      setZoomLevel(1); // Reset zoom when changing slides
      setImagePosition({ x: 0, y: 0 }); // Reset position
      carouselApi.scrollTo(index);
      // Don't call startSlideshow here as the select event will trigger it
    }
  };

  // Handle image dragging for zoomed images
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - imagePosition.x,
        y: e.clientY - imagePosition.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Stop all timers
  const stopAllTimers = () => {
    if (autoSlideTimer.current) {
      clearTimeout(autoSlideTimer.current);
      autoSlideTimer.current = null;
    }
    if (progressTimer.current) {
      clearInterval(progressTimer.current);
      progressTimer.current = null;
    }
    setProgress(0);
  };

  // Start the slide show with progress
  const startSlideshow = () => {
    // If hovering over a thumbnail or zoomed in, don't start the slideshow
    if (isHoveringThumbnail || zoomLevel > 1) {
      return;
    }
    
    // First stop any existing timers
    stopAllTimers();
    setProgress(0);
    
    // Duration for each slide in milliseconds
    const slideDuration = 5000; 
    // Update interval for progress bar in milliseconds
    const progressUpdateInterval = 50;
    // Calculate progress increment per interval
    const progressIncrement = (100 * progressUpdateInterval) / slideDuration;
    
    // Start progress animation
    let progressValue = 0;
    progressTimer.current = setInterval(() => {
      progressValue += progressIncrement;
      setProgress(Math.min(progressValue, 100));
      
      if (progressValue >= 100) {
        clearInterval(progressTimer.current!);
      }
    }, progressUpdateInterval);
    
    // Set timer for next slide
    autoSlideTimer.current = setTimeout(() => {
      if (selectedProject?.images && carouselApi && !isHoveringThumbnail) {
        const nextSlide = (currentSlide + 1) % selectedProject.images.length;
        carouselApi.scrollTo(nextSlide);
      }
    }, slideDuration);
  };

  // Preload images when a project is selected
  useEffect(() => {
    if (!selectedProject?.images) return;
    
    setImagesLoaded(false);
    
    let loadedCount = 0;
    const totalImages = selectedProject.images.length;
    
    const preloadImage = (src: string) => {
      return new Promise<void>((resolve) => {
        const img = new window.Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
          resolve();
        };
      });
    };
    
    // Preload all images
    Promise.all(selectedProject.images.map(preloadImage))
      .then(() => {
        setImagesLoaded(true);
      });
      
    return () => {
      setImagesLoaded(false);
    };
  }, [selectedProject]);

  // Update carousel API and attach event listener
  useEffect(() => {
    if (!carouselApi || !selectedProject?.images || !imagesLoaded) return;
    
    // Function to handle slide changes from any source
    const handleSlideChange = () => {
      const current = carouselApi.selectedScrollSnap();
      setCurrentSlide(current);
      
      // Only start slideshow if not zoomed
      if (zoomLevel <= 1) {
        startSlideshow();
      }
    };
    
    // Add event listener
    carouselApi.on("select", handleSlideChange);
    
    // Start slideshow for initial slide only if not zoomed
    if (selectedProject.images.length > 1 && zoomLevel <= 1) {
      startSlideshow();
    }
    
    // Cleanup
    return () => {
      carouselApi.off("select", handleSlideChange);
      stopAllTimers();
    };
  }, [carouselApi, selectedProject, imagesLoaded, currentSlide, zoomLevel]);

  // Effect to restart slideshow when hover state changes
  useEffect(() => {
    if (carouselApi && selectedProject?.images && imagesLoaded) {
      if (isHoveringThumbnail || zoomLevel > 1) {
        stopAllTimers();
      } else {
        startSlideshow();
      }
    }
  }, [isHoveringThumbnail, carouselApi, selectedProject, imagesLoaded, zoomLevel]);
  
  // Reset position when zoom level changes
  useEffect(() => {
    if (zoomLevel === 1) {
      setImagePosition({ x: 0, y: 0 });
      // Re-enable slideshow when zoom is removed
      if (selectedProject?.images && selectedProject.images.length > 1 && imagesLoaded) {
        startSlideshow();
      }
    } else {
      // Stop slideshow when zooming
      stopAllTimers();
    }
  }, [zoomLevel]);

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      stopAllTimers();
    };
  }, []);

  return (
    <div className="py-6">
      <div className="projects-container grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <Card 
            key={index} 
            className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-b-md"
          >
            <div className="relative overflow-hidden rounded-[2rem] rounded-b-md">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 rounded-[2rem] rounded-b-md"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2rem] rounded-b-md" />
            </div>
            
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                
                {/* Tags next to project title */}
                {project.tags && (
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: `${tag.color}25`, // 25 is for 15% opacity in hex
                          color: tag.color 
                        }}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{project.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button size="sm" className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0" disabled={!project.demoUrl} onClick={() => project.demoUrl && window.open(project.demoUrl, '_blank')}>
                  {getIconComponent(project.icon)}
                  <span className="ml-2">Live Demo</span>
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                  onClick={() => {
                    console.log("Opening project details for:", project.title);
                    setProgress(0);
                    stopAllTimers();
                    setCurrentSlide(0);
                    setZoomLevel(1);
                    setImagePosition({ x: 0, y: 0 });
                    setSelectedProject(project);
                    // Let the useEffect trigger the slideshow after carousel is created
                  }}
                >
                  <Link className="mr-2 h-4 w-4" />
                  See Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Project Details Dialog */}
      <Dialog 
        open={!!selectedProject} 
        onOpenChange={(open) => {
          console.log("Dialog open state changed to:", open);
          if (!open) {
            stopAllTimers();
            setSelectedProject(null);
            setCurrentSlide(0);
            setZoomLevel(1);
            setImagePosition({ x: 0, y: 0 });
          } else {
            // Dialog is opening - let useEffect handle slideshow setup
            // after carouselApi is initialized
          }
        }}
      >
        {selectedProject && (
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                
                {/* Tags next to project title */}
                {selectedProject.tags && (
                  <div className="flex flex-wrap gap-1">
                    {selectedProject.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: `${tag.color}20`, // 20 is for 12% opacity in hex
                          color: tag.color 
                        }}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <DialogDescription className="text-lg font-normal text-foreground/80 mt-2">
                {selectedProject.description}
              </DialogDescription>
            </DialogHeader>

            {/* Image carousel */}
            <div className="mt-6 overflow-hidden table">
              <Carousel 
                className="w-full overflow-hidden" 
                setApi={setCarouselApi}
                opts={{
                  align: "start",
                  loop: true,
                  skipSnaps: false,
                  dragFree: false,
                  watchDrag: zoomLevel <= 1
                }}
              >
                <CarouselContent className="overflow-visible">
                  {selectedProject.images?.map((image, index) => (
                    <CarouselItem key={index} className="basis-full">
                      <div className="w-full">
                        <div 
                          className="w-full overflow-hidden rounded-xl flex items-center justify-center bg-muted/20 h-[250px] sm:h-[400px] relative group/zoom"
                          onMouseDown={handleMouseDown}
                          onMouseMove={handleMouseMove}
                          onMouseUp={handleMouseUp}
                          onMouseLeave={handleMouseLeave}
                          style={{ cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
                        >
                          <img 
                            src={selectedProject.imagesBasePath + image} 
                            alt={`${selectedProject.title} image ${index + 1}`} 
                            className="max-w-full max-h-[250px] sm:max-h-[400px] w-auto h-auto object-contain transition-transform duration-300 select-none"
                            loading="eager" // Force eager loading of images
                            style={{ 
                              transform: `scale(${zoomLevel}) translate(${imagePosition.x / zoomLevel}px, ${imagePosition.y / zoomLevel}px)`,
                              transition: isDragging ? 'none' : 'transform 0.3s'
                            }}
                            draggable={false}
                          />
                          {/* Zoom controls */}
                          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover/zoom:opacity-100 transition-opacity">
                            <Button
                              size="icon"
                              variant="secondary"
                              className="h-8 w-8 rounded-full shadow-lg"
                              onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 3))}
                              disabled={zoomLevel >= 3}
                            >
                              <ZoomIn className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="secondary"
                              className="h-8 w-8 rounded-full shadow-lg"
                              onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 1))}
                              disabled={zoomLevel <= 1}
                            >
                              <ZoomOut className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="static translate-y-0 mr-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                    onClick={() => {
                      if (carouselApi) {
                        stopAllTimers();
                        setZoomLevel(1);
                        setImagePosition({ x: 0, y: 0 });
                        const prevIndex = (currentSlide - 1 + (selectedProject?.images?.length || 1)) % (selectedProject?.images?.length || 1);
                        carouselApi.scrollTo(prevIndex);
                      }
                    }}
                  >
                    <CarouselPrevious className="static translate-y-0" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="static translate-y-0 ml-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                    onClick={() => {
                      if (carouselApi) {
                        stopAllTimers();
                        setZoomLevel(1);
                        setImagePosition({ x: 0, y: 0 });
                        const nextIndex = (currentSlide + 1) % (selectedProject?.images?.length || 1);
                        carouselApi.scrollTo(nextIndex);
                      }
                    }}
                  >
                    <CarouselNext className="static translate-y-0" />
                  </Button>
                </div>
              </Carousel>
            </div>

            {/* Thumbnail navigation */}
            <div className="flex overflow-x-auto gap-2 p-2 min-h-fit scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40">
              {selectedProject.images?.map((image, index) => (
                <div key={index} className="relative flex-shrink-0">
                  <img 
                    src={selectedProject.imagesBasePath + image} 
                    alt={`Thumbnail ${index + 1}`}
                    loading="lazy"
                    className={`h-16 w-24 object-cover rounded-md cursor-pointer transition-all outline-none focus:outline-none ${
                      currentSlide === index 
                        ? "ring-2 ring-primary scale-105" 
                        : "hover:ring-2 hover:ring-primary/50 opacity-70"
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                    onMouseEnter={() => {
                      if (currentSlide === index) {
                        setIsHoveringThumbnail(true);
                      }
                    }}
                    onMouseLeave={() => {
                      if (currentSlide === index) {
                        setIsHoveringThumbnail(false);
                      }
                    }}
                  />
                  {currentSlide === index && (
                    <div className="absolute bottom-0 left-0 right-0 px-1">
                      <Progress 
                        value={progress} 
                        className="h-1 bg-background/50" 
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                {selectedProject.features?.map((feature, index) => (
                  <li key={index} className="text-muted-foreground">
                    {parseFeatureText(feature)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <DialogFooter className="mt-6 flex gap-4">
              <Button className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0" disabled={!selectedProject.demoUrl} onClick={() => selectedProject.demoUrl && window.open(selectedProject.demoUrl, '_blank')}>
                {getIconComponent(selectedProject.icon)}
                Live Demo
              </Button>
              <Button variant="outline" className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0" disabled={!selectedProject.codeUrl} onClick={() => selectedProject.codeUrl && window.open(selectedProject.codeUrl, '_blank')}>
                <Code className="mr-2 h-4 w-4" />
                Source Code
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};
