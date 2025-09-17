import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, MapPin, AlertCircle, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function LiveDemoSection() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handleDemoClick = () => {
    setIsModalOpen(true);
    setIsPlaying(true);
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            See ResQ in <span className="text-gradient">Action</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience how our AI-powered system responds to emergencies in real-time
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-card rounded-3xl border border-border p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Interactive Emergency Scenario</h3>
                <p className="text-muted-foreground">
                  Click below to simulate an emergency scenario and see how ResQ's AI system 
                  detects anomalies, triggers alerts, and coordinates response.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>Location tracking active</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <AlertCircle className="w-4 h-4 text-warning" />
                    <span>AI monitoring patterns</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Clock className="w-4 h-4 text-success" />
                    <span>Response team on standby</span>
                  </div>
                </div>

                <Button
                  onClick={handleDemoClick}
                  className="btn-hero group"
                  size="lg"
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Trigger Emergency Demo
                </Button>
              </div>

              <div className="relative">
                <motion.div
                  className="bg-gradient-to-br from-muted to-card rounded-2xl p-6 border border-border"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">System Status</span>
                      <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Safety Score</span>
                        <span className="font-semibold">87/100</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "87%" }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center p-3 bg-background rounded-lg">
                        <div className="text-lg font-bold text-primary">2.3m</div>
                        <div className="text-xs text-muted-foreground">Nearest Help</div>
                      </div>
                      <div className="text-center p-3 bg-background rounded-lg">
                        <div className="text-lg font-bold text-success">Active</div>
                        <div className="text-xs text-muted-foreground">Monitoring</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Demo Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">Emergency Response Simulation</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <AnimatePresence>
                {isPlaying && (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Step 1: Detection */}
                    <motion.div
                      className="flex items-start space-x-4 p-4 bg-warning/10 rounded-lg border border-warning/20"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <AlertCircle className="w-6 h-6 text-warning mt-1" />
                      <div>
                        <h4 className="font-semibold">Anomaly Detected</h4>
                        <p className="text-sm text-muted-foreground">
                          AI system detected unusual movement pattern and missed check-in
                        </p>
                      </div>
                    </motion.div>

                    {/* Step 2: SOS Triggered */}
                    <motion.div
                      className="flex items-start space-x-4 p-4 bg-destructive/10 rounded-lg border border-destructive/20"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 }}
                    >
                      <AlertCircle className="w-6 h-6 text-destructive mt-1" />
                      <div>
                        <h4 className="font-semibold">SOS Triggered</h4>
                        <p className="text-sm text-muted-foreground">
                          Emergency signal sent automatically after 30 seconds of no response
                        </p>
                      </div>
                    </motion.div>

                    {/* Step 3: Response Dispatched */}
                    <motion.div
                      className="flex items-start space-x-4 p-4 bg-primary/10 rounded-lg border border-primary/20"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.5 }}
                    >
                      <MapPin className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold">Responder Dispatched</h4>
                        <p className="text-sm text-muted-foreground">
                          Nearest micro-rescue unit alerted. ETA: 4 minutes
                        </p>
                      </div>
                    </motion.div>

                    {/* Step 4: Evidence Logged */}
                    <motion.div
                      className="flex items-start space-x-4 p-4 bg-success/10 rounded-lg border border-success/20"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 3.5 }}
                    >
                      <FileText className="w-6 h-6 text-success mt-1" />
                      <div>
                        <h4 className="font-semibold">E-FIR Generated</h4>
                        <p className="text-sm text-muted-foreground">
                          Immutable evidence trail created on blockchain with encrypted data
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-center pt-4">
                <Button
                  onClick={() => {
                    setIsPlaying(false);
                    setTimeout(() => setIsPlaying(true), 500);
                  }}
                  variant="outline"
                >
                  Replay Demo
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}