import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, User, Link } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Email : 123top.bot123@gmail.com
      // Replace these with your actual EmailJS service ID, template ID, and public key
      const serviceId = "service_portfolio_msg";
      const templateId = "template_portfolio_msg";
      const publicKey = "UZlpOfSBvxkZMO3jd";
      
      const templateParams = {
        to_email: "mhmd.elkhodari@gmail.com",
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      };
      
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Function to handle resume download
  const handleDownloadResume = async () => {
    try {
      // إنشاء عنصر a غير مرئي للتنزيل المباشر
      const link = document.createElement('a');
      link.href = '/my_resume.pdf';
      link.target = '_blank'; // فتح في نافذة جديدة
      link.download = 'Mohammed_Elkhodari_Resume.pdf'; // اسم الملف عند التنزيل
      
      // إضافة التوقيت لتجنب الاعتراض من IDM
      const timestamp = new Date().getTime();
      if (link.href.indexOf('?') === -1) {
        link.href = `${link.href}?t=${timestamp}`;
      } else {
        link.href = `${link.href}&t=${timestamp}`;
      }
      
      // إضافة الرابط للصفحة، النقر عليه، ثم إزالته
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast({
        title: "Error",
        description: "Failed to download resume. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="py-6 px-4 sm:px-0">
      <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <Card className="p-4 sm:p-8 hover:shadow-lg transition-shadow">
          <CardHeader className="p-0 mb-4 sm:mb-6">
            <CardTitle className="text-xl sm:text-2xl font-bold">Send a Message</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-10 sm:h-12"
                />
              </div>
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-10 sm:h-12"
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="resize-none"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-10 sm:h-12 text-base sm:text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4 sm:space-y-8">
          <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
            <CardContent className="p-0 flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">Email</h3>
                <p className="text-muted-foreground text-xs sm:text-sm break-all">mhmd.elkhodari@gmail.com</p>
              </div>
            </CardContent>
          </Card>

          <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
            <CardContent className="p-0 flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Link className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">LinkedIn</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">linkedin.com/in/mohammed-saeed-710b03250</p>
              </div>
            </CardContent>
          </Card>

          <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
            <CardContent className="p-0 flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">GitHub</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">github.com/matrawy-maxbot</p>
              </div>
            </CardContent>
          </Card>

          <div className="bg-gradient-to-br from-primary/5 to-secondary/10 rounded-lg p-4 sm:p-8 text-center">
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Available for Projects</h3>
            <p className="text-muted-foreground text-sm mb-4 sm:mb-6">
              I'm currently available for freelance work and new opportunities.
            </p>
            <Button 
              variant="outline" 
              className="w-full h-10 sm:h-12 text-sm sm:text-base"
              onClick={handleDownloadResume}
            >
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
