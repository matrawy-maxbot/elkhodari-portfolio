import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export const Skills = () => {
  const skillCategories = [
    {
      name: "Frontend",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"]
    },
    {
      name: "Backend",
      skills: ["Node.js", "Express", "Python", "Django", "GraphQL"]
    },
    {
      name: "Database",
      skills: ["PostgreSQL", "MongoDB", "Redis", "Firebase", "Supabase"]
    },
    {
      name: "DevOps & Tools",
      skills: ["Git", "Docker", "AWS", "CI/CD", "Vercel"]
    },
    {
      name: "Design",
      skills: ["Figma", "Adobe XD", "UI/UX", "Responsive Design", "Animation"]
    }
  ];

  return (
    <div className="py-6 relative">
      {/* Background decoration */}
      <div className="absolute -z-10 top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[80px]" />
      <div className="absolute -z-10 bottom-0 left-0 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-[100px]" />
      
      <div className="mb-10 text-center">
        <Badge variant="outline" className="mb-5 px-6 py-1.5 text-sm font-medium rounded-full border-secondary/20 bg-secondary/5">My Expertise</Badge>
        <h2 className="text-4xl font-bold tracking-tight mb-3">Technical Proficiency</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">A comprehensive toolkit for building modern digital solutions</p>
      </div>

      <div className="space-y-10">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div 
            key={categoryIndex}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-background via-background/90 to-background/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">{category.name}</h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div 
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5, scale: 1.05 }}
                      className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl px-4 py-3 text-center shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <span className="font-medium text-primary">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
