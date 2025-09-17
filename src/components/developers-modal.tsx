import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Linkedin, Mail, Github } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const developers = [
  {
    name: "J Eshwar",
    role: "Product Lead",
    bio: "Full-stack architect with expertise in blockchain integration",
    achievement: "Led 5+ successful tech products",
    avatar: "JE",
    email: "j.eshwar@resq.dev",
    linkedin: "https://linkedin.com/in/jeshwar",
    github: "https://github.com/jeshwar",
  },
  {
    name: "Dishu Mahajan",
    role: "Backend Engineer", 
    bio: "Specialized in distributed systems and API architecture",
    achievement: "Built scalable microservices for 100K+ users",
    avatar: "DM",
    email: "dishu.mahajan@resq.dev",
    linkedin: "https://linkedin.com/in/dishumahajan",
    github: "https://github.com/dishumahajan",
  },
  {
    name: "Ayush Thakur",
    role: "ML Engineer",
    bio: "AI/ML specialist focusing on predictive safety algorithms",
    achievement: "Published 3 research papers in AI safety",
    avatar: "AT", 
    email: "ayush.thakur@resq.dev",
    linkedin: "https://linkedin.com/in/ayushthakur",
    github: "https://github.com/ayushthakur",
  },
  {
    name: "Vaishnavi Soni",
    role: "Frontend Developer",
    bio: "UI/UX engineer creating intuitive safety interfaces", 
    achievement: "Designed award-winning mobile interfaces",
    avatar: "VS",
    email: "vaishnavi.soni@resq.dev",
    linkedin: "https://linkedin.com/in/vaishnavisoni",
    github: "https://github.com/vaishnavisoni",
  },
  {
    name: "Sidharth P Nair",
    role: "IoT Developer",
    bio: "Embedded systems expert for geo-fencing technology",
    achievement: "15+ IoT deployments in smart cities",
    avatar: "SN",
    email: "sidharth.nair@resq.dev", 
    linkedin: "https://linkedin.com/in/sidharthnair",
    github: "https://github.com/sidharthnair",
  },
  {
    name: "Zian Rajeshkumar Surani",
    role: "Project Manager", 
    bio: "Coordinating cross-functional teams and stakeholder alignment",
    achievement: "Delivered 20+ projects on-time, under-budget",
    avatar: "ZS",
    email: "zian.surani@resq.dev",
    linkedin: "https://linkedin.com/in/ziansurani", 
    github: "https://github.com/ziansurani",
  },
];

interface DevelopersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DevelopersModal({ isOpen, onClose }: DevelopersModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center mb-2">
            Meet the <span className="text-gradient">ResQ Team</span>
          </DialogTitle>
          <p className="text-muted-foreground text-center">
            The passionate innovators building the future of tourist safety
          </p>
        </DialogHeader>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {developers.map((dev, index) => (
            <motion.div
              key={dev.name}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Avatar */}
              <motion.div
                className="relative w-24 h-24 mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center text-white font-bold text-xl shadow-lg"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  {dev.avatar}
                </motion.div>
                <motion.div
                  className="absolute -top-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </motion.div>
              </motion.div>

              {/* Info */}
              <div className="text-center space-y-3">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{dev.name}</h3>
                  <p className="text-primary font-medium text-sm">{dev.role}</p>
                  <p className="text-accent text-xs font-medium mt-1">{dev.achievement}</p>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {dev.bio}
                </p>

                {/* Social Links */}
                <div className="flex justify-center space-x-3 pt-2">
                  <motion.a
                    href={dev.linkedin}
                    className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href={`mailto:${dev.email}`}
                    className="p-2 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href={dev.github}
                    className="p-2 rounded-full bg-muted hover:bg-foreground hover:text-background transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Message */}
        <motion.div
          className="mt-8 p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-primary/10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h4 className="text-xl font-semibold mb-2">Our Mission</h4>
          <p className="text-muted-foreground">
            We're committed to making travel safer through innovative technology, 
            combining the power of AI, blockchain, and IoT to protect every journey.
          </p>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}