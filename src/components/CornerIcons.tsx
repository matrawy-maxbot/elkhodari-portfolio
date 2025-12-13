import { useState } from "react";
import { Code, Briefcase, Mail, User, FileCode, Binary } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { About } from "./About";
import { Skills } from "./Skills";
import { Projects } from "./Projects";
import { Contact } from "./Contact";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const CornerIcons = () => {
  // Add state to control dialogs
  const [isAboutDialogOpen, setIsAboutDialogOpen] = useState(false);
  const [isProjectsDialogOpen, setIsProjectsDialogOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  // Handlers for buttons inside About dialog
  const handleViewProjects = () => {
    setIsAboutDialogOpen(false);
    setTimeout(() => setIsProjectsDialogOpen(true), 200); // Delay for smooth closing/opening
  };
  const handleGetInTouch = () => {
    setIsAboutDialogOpen(false);
    setTimeout(() => setIsContactDialogOpen(true), 200);
  };

  return (
    <>
      {/* Top Left - Portfolio Text with Animation */}
      <div className="fixed top-6 left-6 z-50 flex items-center gap-3 title-text">
        <div className="circle w-3 h-3 bg-black rounded-full opacity-0 animate-[fadeInScale_0.8s_ease-out_0.2s_forwards]"></div>
        <span className="text-sm font-medium tracking-wider uppercase">
          {"PORTFOLIO".split("").map((letter, index) => (
            <span
              key={index}
              className="inline-block opacity-0 animate-[fadeInUp_0.4s_ease-out_forwards]"
              style={{ animationDelay: `${1 + index * 0.1}s` }}
            >
              {letter}
            </span>
          ))}
        </span>
      </div>

      {/* Top Right - Skills & About Combined */}
      <Dialog open={isAboutDialogOpen} onOpenChange={setIsAboutDialogOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-primary/90 hover:bg-primary shadow-lg backdrop-blur-sm opacity-0 animate-[fadeInScaleTransform_0.6s_ease-out_2s_forwards] hover:scale-105 transition-all duration-300"
          >
            <Code className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-6xl max-h-[85vh] overflow-hidden p-0 border-0 shadow-2xl bg-background/95">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="about-dialog-content p-8">
              <DialogHeader className="mb-6">
                <div className="flex items-center justify-between">
                  <DialogTitle className="border border-black/60 rounded-full px-4 py-0 text-sm font-medium leading-8 text-[#3c3c3c]">About Me & Skills</DialogTitle>
                  <DialogDescription className="sr-only">Information about me and my technical skills</DialogDescription>
                </div>
              </DialogHeader>
              
              <div className="overflow-y-auto max-h-[calc(85vh-120px)] pr-2 custom-scrollbar">
                <div className="w-full">
                  <div className="mt-0">
                    <div className="mb-10 text-center">
                      <h2 className="text-3xl font-bold tracking-tight mb-3">About Me</h2>
                      <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">Passionate developer creating exceptional digital experiences</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                      <div className="about-container w-full h-[400px] rounded-2xl overflow-hidden relative shadow-sm flex items-center justify-center">
                        {/* Background with spheres */}
                        <div className="about-background absolute inset-0 bg-white">
                          {/* Decorative spheres */}
                          <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-yellow-200 opacity-90 blur-[30px]"></div>
                          <img src="about-bg.jpg" alt="Background" className="absolute top-0 left-0 w-full h-full object-cover" 
                          style={{
                            filter: 'blur(1.5px) grayscale(0.2) opacity(0.05)'
                          }} />
                        </div>
                        
                        {/* 3D Glass card mockup with stats - centered and angled like reference */}
                        <div className={`about-card relative w-[320px] h-[200px] perspective-1200 ${isAboutDialogOpen ? 'animate-[cardScaleIn_1.25s_ease_forwards]' : 'opacity-0 scale-[0.2]'}`}>
                          <div 
                            className="credit-card-3d absolute w-full h-full transform-gpu scale-[1.2]"
                            style={{ 
                              transform: 'rotateY(15deg) rotateX(5deg) rotateZ(-2deg) translateZ(20px) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)',
                              transformOrigin: 'center center'
                            }}
                          >
                            <div className="glass-content h-full w-full flex flex-col justify-between p-6 relative">
                              {/* Credit card chip */}
                              <div className="absolute top-6 right-6">
                                <div className="w-8 h-6 bg-yellow-300/90 rounded-sm"></div>
                              </div>
                              
                              {/* Code icon representing skills */}
                              <div className="absolute top-[1.5rem] right-[1.7rem]" style={{
                                filter: 'drop-shadow(0px 1px 1px rgb(0, 0, 0, 30%))'
                              }}>
                                <Binary className="w-6 h-6 text-white/90" strokeWidth={1.5} />
                              </div>
                              
                              {/* Name on the top left */}
                              <div className="absolute top-[1.75rem] left-[1.4rem]" style={{
                                filter: 'drop-shadow(0px 1px 1px rgb(0, 0, 0, 30%))'
                              }}>
                                <p className="text-white/90 font-medium text-sm" style={{
                                  fontFamily: "'OCR A Std', 'Courier New', monospace",
                                  letterSpacing: "0.05em",
                                  textTransform: "uppercase"
                                }}>Mohammed Elkhodari</p>
                              </div>
                              
                              {/* Stats in the center with improved spacing */}
                              <div className="flex justify-center items-center w-full mt-14 gap-12">
                                <div className="text-center">
                                  <h3 className="text-5xl font-bold text-white" style={{
                                    fontFamily: "'Roboto Mono', 'DM Sans', monospace",
                                    letterSpacing: "-0.02em"
                                  }}>40+</h3>
                                  <p className="text-white/80 font-medium text-base mt-1" style={{
                                    fontFamily: "'DM Sans', sans-serif",
                                    letterSpacing: "0.03em"
                                  }}>Projects</p>
                                </div>
                                
                                <div className="text-center">
                                  <h3 className="text-5xl font-bold text-white" style={{
                                    fontFamily: "'Roboto Mono', 'DM Sans', monospace",
                                    letterSpacing: "-0.02em"
                                  }}>5+</h3>
                                  <p className="text-white/80 font-medium text-base mt-1" style={{
                                    fontFamily: "'DM Sans', sans-serif",
                                    letterSpacing: "0.03em"
                                  }}>Years</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <p className="text-xl text-muted-foreground leading-relaxed">
                          I'm a <span className="text-primary font-semibold">creative full-stack developer</span> with a passion for building exceptional digital experiences. Combining technical expertise with an eye for design, I transform complex challenges into intuitive, elegant solutions that deliver real value.
                        </p>
                        
                        <p className="text-xl text-muted-foreground leading-relaxed">
                          Beyond coding, I'm dedicated to continuous learning and innovation. I actively contribute to open-source projects and stay at the forefront of emerging technologies to deliver cutting-edge solutions.
                        </p>
                        
                        <div className="flex flex-wrap gap-4 pt-4 mt-8">
                          <Button
                            className="px-8 py-6 text-lg rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                            onClick={handleViewProjects}
                          >
                            View Projects
                          </Button>
                          <Button
                            variant="outline"
                            className="px-8 py-6 text-lg rounded-xl border-2 hover:bg-secondary/5 transition-all duration-300"
                            onClick={handleGetInTouch}
                          >
                            Get In Touch
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Skills section added directly below About Me */}
                    <div className="mt-12">
                      <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold tracking-tight mb-3">Technical Proficiency</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">A comprehensive toolkit for building modern digital solutions</p>
                      </div>
                      
                      {/* Simplified inline skills component */}
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="bg-primary/5 p-4 rounded-xl">
                            <h3 className="font-semibold text-primary mb-3">Frontend</h3>
                            <div className="flex flex-wrap gap-2">
                              {["JavaScript (ES6+)", "TypeScript", "React", "Next.js", "Tailwind CSS", "Skia-Canvas", "Pixi.js", "JQuery"].map((skill) => (
                                <span key={skill} className="inline-block text-sm bg-background px-2 py-1 rounded-md">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-primary/5 p-4 rounded-xl">
                            <h3 className="font-semibold text-primary mb-3">Backend</h3>
                            <div className="flex flex-wrap gap-2">
                              {["Node.js", "Express.js", "RESTful APIs", "WebSocket", "GraphQL", "ORM"].map((skill) => (
                                <span key={skill} className="inline-block text-sm bg-background px-2 py-1 rounded-md">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-primary/5 p-4 rounded-xl">
                            <h3 className="font-semibold text-primary mb-3">Database</h3>
                            <div className="flex flex-wrap gap-2">
                              {["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Redis"].map((skill) => (
                                <span key={skill} className="inline-block text-sm bg-background px-2 py-1 rounded-md">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom Left - Projects */}
      <Dialog open={isProjectsDialogOpen} onOpenChange={setIsProjectsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-primary/90 hover:bg-primary shadow-lg backdrop-blur-sm opacity-0 animate-[fadeInScaleTransform_0.6s_ease-out_2.2s_forwards] hover:scale-105 transition-all duration-300"
            onClick={() => setIsProjectsDialogOpen(true)}
          >
            <Briefcase className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Featured Projects</DialogTitle>
            <DialogDescription className="sr-only">Showcase of my best and most recent projects</DialogDescription>
          </DialogHeader>
          <Projects />
        </DialogContent>
      </Dialog>

      {/* Bottom Right - Contact */}
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary/90 hover:bg-primary shadow-lg backdrop-blur-sm opacity-0 animate-[fadeInScaleTransform_0.6s_ease-out_2.4s_forwards] hover:scale-105 transition-all duration-300"
            onClick={() => setIsContactDialogOpen(true)}
          >
            <Mail className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Let's Work Together</DialogTitle>
            <DialogDescription className="sr-only">Contact form and information to get in touch with me</DialogDescription>
          </DialogHeader>
          <Contact />
        </DialogContent>
      </Dialog>
    </>
  );
};
