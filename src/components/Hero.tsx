import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Projects } from "./Projects";
import { Contact } from "./Contact";
import { useState, useEffect } from "react";

// Import projects data if needed for additional features
import projectsData from "@/data/projects.json";

export const Hero = () => {
  // Extract skills from project technologies for display
  const allTechnologies = projectsData.flatMap(project => project.technologies);
  // Remove duplicates and select top skills
  const skills = ["Node.js", "Express.js","Microservices", "Next.js", "PostgreSQL", "MongoDB"];
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSkillIndex(prevIndex => (prevIndex + 1) % skills.length);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [skills.length]);

  return (
    <section className="flex items-center justify-center bg-[#ececec] p-8">
      <div className="section-subcontainer max-w-[86rem] w-full flex flex-row justify-between lg:grid-cols-12 md:gap-[6rem] sm:gap-[4rem] items-center">
        {/* Left Content */}
        <div className="left-skills lg:col-span-4 space-y-6 relative z-10 animate-fade-in">          
          <div className="space-y-4">
            <p className="text-lg text-gray-600 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]">Hey, I'm <span className="text-[#a4936a] font-bold">Mohammed Elkhodari,</span></p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
              A <span className="text-black">Senior</span><br />
              <span className="font-light italic text-3xl md:text-4xl">Full Stack</span><br />
              <span className="text-black">Developer</span>
            </h1>
          </div>
          
          <p className="text-gray-600 max-w-md leading-relaxed opacity-0 animate-[fadeInUp_0.6s_ease-out_0.6s_forwards]">
          Designing the future of scalable systems – From high-load backends to cutting-edge UIs, I transform complex challenges into bulletproof architectures. Trusted by universities, healthcare giants & high-growth startups to build mission-critical platforms.
          </p>
          
          <div className="button-container opacity-0 animate-[fadeInUp_0.6s_ease-out_0.8s_forwards]">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="border-2 border-black text-black hover:bg-black hover:text-white rounded-full py-3 font-medium flex items-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{ paddingLeft: '1.5rem', paddingRight: '1rem', gap: '0.85rem' }}
                >
                  CONTACT ME
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                    <ArrowRight className="h-3 w-3 text-white" />
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Let's Work Together</DialogTitle>
                </DialogHeader>
                <Contact />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        {/* Center Avatar - Slides down from top */}
        <div className="lg:col-span-4 flex justify-center items-center">
          <div className="relative">
            {/* <div className="w-[28rem] overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 rounded-bl-[1000px] rounded-br-[1000px] fixed top-0 left-1/2 transform -translate-x-1/2 z-0 opacity-0 animate-[slideDownFromTop_1s_ease-out_0.1s_forwards]" style={{ height: '35rem' }}>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=face" 
                alt="John Doe - UI/UX Designer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div> */}
          </div>
        </div>
        
        {/* Right Skills Content */}
        <div className="right-skills lg:col-span-4 space-y-6 relative z-10 animate-fade-in text-right">          
          <div className="space-y-4">
            <p className="text-lg text-gray-600 opacity-0 animate-[fadeInUp_0.6s_ease-out_1s_forwards]">My Expertise,</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight opacity-0 animate-[fadeInUp_0.8s_ease-out_1.2s_forwards]">
              <span className="text-black">CREATIVE</span><br />
              <span className="font-light italic text-3xl md:text-4xl">& Technical</span><br />
              <span className="text-black">SKILLS</span>
            </h2>
          </div>
          
          <div className="opacity-0 animate-[fadeInUp_0.6s_ease-out_1.4s_forwards] flex flex-col items-end">
            <p className="text-gray-600 max-w-[27rem] leading-relaxed mb-4">
            Architecting scalable solutions with tested technologies. From infrastructure to pixel-perfect UIs, I bridge the gap between robust systems and seamless experiences.
            </p>
            <div className="flex flex-wrap gap-2 max-w-md justify-end">
              {skills.map((skill, index) => (
                <span 
                  key={index}
                  className={`bg-[#dcd9d5] text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors duration-500 ${activeSkillIndex === index ? 'skills-active' : ''}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="button-container opacity-0 animate-[fadeInUp_0.6s_ease-out_1.6s_forwards] flex justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="border-2 border-black text-black hover:bg-black hover:text-white rounded-full py-3 font-medium flex items-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{ paddingLeft: '1.5rem', paddingRight: '1rem', gap: '0.85rem' }}
                >
                  VIEW PROJECTS
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                    <Briefcase className="h-3 w-3 text-white" />
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Featured Projects</DialogTitle>
                </DialogHeader>
                <Projects />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};
