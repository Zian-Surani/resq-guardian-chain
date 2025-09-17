import * as React from "react";
import { motion } from "framer-motion";
import { Download, FileText, Users, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function JudgePackSection() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    organization: "",
    email: "",
    city: ""
  });

  const handleDownloadPack = () => {
    // Mock PDF download
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,'; // Would be actual PDF data
    link.download = 'ResQ-Judge-Pack.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRequestPilot = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission with confetti effect
    const confetti = document.createElement('div');
    confetti.innerHTML = '🎉';
    confetti.style.position = 'fixed';
    confetti.style.top = '50%';
    confetti.style.left = '50%';
    confetti.style.fontSize = '50px';
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';
    document.body.appendChild(confetti);
    
    setTimeout(() => {
      document.body.removeChild(confetti);
      setIsModalOpen(false);
    }, 2000);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            For <span className="text-gradient">Judges</span> & Evaluators
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete evaluation materials and pilot program details
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Judge Pack Download */}
            <motion.div
              className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-lg"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="text-center space-y-6">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto"
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  transition={{ duration: 0.5 }}
                >
                  <FileText className="w-8 h-8 text-white" />
                </motion.div>

                <div>
                  <h3 className="text-2xl font-semibold mb-2">Judge Pack</h3>
                  <p className="text-muted-foreground">
                    Complete technical documentation, architecture diagrams, and demo guide
                  </p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3 justify-center">
                    <Shield className="w-4 h-4 text-primary" />
                    <span>Technical Architecture</span>
                  </div>
                  <div className="flex items-center space-x-3 justify-center">
                    <Zap className="w-4 h-4 text-accent" />
                    <span>Demo Walkthrough</span>
                  </div>
                  <div className="flex items-center space-x-3 justify-center">
                    <Users className="w-4 h-4 text-success" />
                    <span>Team Profiles</span>
                  </div>
                </div>

                <Button
                  onClick={handleDownloadPack}
                  className="btn-hero w-full group"
                  size="lg"
                >
                  <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Download Judge Pack
                </Button>
              </div>
            </motion.div>

            {/* Pilot Request Form */}
            <motion.div
              className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="text-center space-y-6">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto"
                  whileHover={{ scale: 1.1, rotate: -180 }}
                  transition={{ duration: 0.5 }}
                >
                  <Users className="w-8 h-8 text-white" />
                </motion.div>

                <div>
                  <h3 className="text-2xl font-semibold mb-2">Request Pilot</h3>
                  <p className="text-muted-foreground">
                    Interested in piloting ResQ? Get priority access and custom deployment
                  </p>
                </div>

                <div className="bg-muted/30 rounded-2xl p-4 space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">₹2.5L</div>
                      <div className="text-xs text-muted-foreground">Monthly Cost</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-accent">50</div>
                      <div className="text-xs text-muted-foreground">Devices/City</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-success">
                      🎯 3-month pilot program available
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="outline"
                  className="w-full group border-primary/20 hover:bg-primary/5"
                  size="lg"
                >
                  <motion.span
                    animate={{ x: [0, 2, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Request Pilot Program
                  </motion.span>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Pilot Request Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl text-center">Request Pilot Access</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleRequestPilot} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Your full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => setFormData({...formData, organization: e.target.value})}
                  placeholder="Tourism board, hotel chain, etc."
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="your.email@domain.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  placeholder="Target deployment city"
                  required
                />
              </div>

              <Button type="submit" className="w-full btn-hero">
                Submit Request
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}