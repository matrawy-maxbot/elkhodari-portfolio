import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const About = () => {
  const navigate = useNavigate();

  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="py-12 relative">
      {/* Enhanced background decoration with more subtle gradients */}
      <div className="absolute -z-10 top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[80px]" />
      <div className="absolute -z-10 bottom-0 left-0 w-[30rem] h-[30rem] bg-secondary/5 rounded-full blur-[100px]" />
      <div className="absolute -z-10 top-1/2 left-1/4 w-64 h-64 bg-accent/3 rounded-full blur-[70px]" />
      
      <div className="mb-12 text-center">
        <Badge variant="outline" className="mb-5 px-6 py-1.5 text-sm font-medium rounded-full border-primary/20 bg-primary/5">About Me</Badge>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Crafting Digital Experiences</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Transforming ideas into elegant, functional solutions</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full h-96 rounded-2xl overflow-hidden relative group shadow-xl"
          >
            {/* Dark background with spheres - matching the reference image */}
            <div className="absolute inset-0 bg-black">
              {/* Decorative spheres */}
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-zinc-800 opacity-80 translate-y-1/2 -translate-x-1/4"></div>
              <div className="absolute top-1/3 right-0 w-32 h-32 rounded-full bg-zinc-700 opacity-90 translate-x-1/3"></div>
            </div>
            
            {/* Glass card mockup - matching the reference image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="glass-mockup absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[80%] p-8"
            >
              <div className="flex flex-col h-full justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-medium text-white/90">Glass</h3>
                  <h2 className="text-2xl font-bold text-white">Morphism</h2>
                </div>
                
                <div className="text-amber-500/90 text-sm font-light">
                  mockup.
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <div className="w-5 h-5 rounded border border-white/30 flex items-center justify-center">
                      <span className="text-white/80 text-[10px]">4K</span>
                    </div>
                    <div className="w-5 h-5 rounded border border-white/30 flex items-center justify-center">
                      <span className="text-white/80 text-[10px]">PSD</span>
                    </div>
                  </div>
                  <div className="text-xs text-white/70">
                    Isolated Objects &<br />
                    Editable Colors
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 rounded-full bg-white/50"></div>
                    <div className="w-1 h-1 rounded-full bg-white/50"></div>
                    <div className="w-1 h-1 rounded-full bg-white/50"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="space-y-10">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            I'm a <span className="text-primary font-semibold">creative full-stack developer</span> with a passion for building exceptional digital experiences. Combining technical expertise with an eye for design, I transform complex challenges into intuitive, elegant solutions that deliver real value.
          </motion.p>
          
          <div className="grid grid-cols-2 gap-6 my-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent hover:shadow-2xl transition-all duration-300 rounded-2xl p-6 text-center"
            >
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
              <h3 className="text-4xl font-bold text-primary mb-2 relative z-10">40+</h3>
              <p className="text-muted-foreground font-medium">Projects Completed</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-transparent via-secondary/5 to-secondary/10 hover:shadow-2xl transition-all duration-300 rounded-2xl p-6 text-center"
            >
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-secondary/10 rounded-full blur-2xl"></div>
              <h3 className="text-4xl font-bold text-secondary mb-2 relative z-10">5+</h3>
              <p className="text-muted-foreground font-medium">Years Experience</p>
            </motion.div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            Beyond coding, I'm dedicated to continuous learning and innovation. I actively contribute to open-source projects and stay at the forefront of emerging technologies to deliver cutting-edge solutions.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Button onClick={() => handleNavigate('projects')} className="px-8 py-6 text-lg rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">View Projects</Button>
            <Button onClick={() => handleNavigate('contact')} variant="outline" className="px-8 py-6 text-lg rounded-xl border-2 hover:bg-secondary/5 transition-all duration-300">Get In Touch</Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
