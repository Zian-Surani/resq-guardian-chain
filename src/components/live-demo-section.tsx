import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, MapPin, AlertCircle, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function LiveDemoSection() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [safetyScore, setSafetyScore] = React.useState(87);

  const handleDemoClick = () => {
    setIsModalOpen(true);
    setIsPlaying(true);
    setActiveStep(0);
  };

  const demoSteps = [
    { id: 1, title: "Register", description: "Issue trip-only Blockchain ID", icon: "👤" },
    { id: 2, title: "Monitor", description: "Real-time AI safety tracking", icon: "🛡️" },
    { id: 3, title: "Alert", description: "Predictive anomaly detection", icon: "⚠️" },
    { id: 4, title: "SOS", description: "Emergency signal triggered", icon: "🆘" },
    { id: 5, title: "Respond", description: "Responder dispatched", icon: "🚁" }
  ];

  const runInteractiveDemo = (stepIndex: number) => {
    setActiveStep(stepIndex);
    if (stepIndex === 1) setSafetyScore(Math.floor(Math.random() * 20) + 75);
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

        {/* Interactive Demo Strip */}
        <motion.div
          className="max-w-6xl mx-auto mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="bg-card/50 backdrop-blur-xl rounded-3xl border border-border/50 p-8 shadow-2xl">
            <h3 className="text-2xl font-semibold text-center mb-8">Try Demo (No Signup)</h3>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {demoSteps.map((step, index) => (
                <motion.button
                  key={step.id}
                  onClick={() => runInteractiveDemo(index)}
                  className={`flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300 ${
                    activeStep === index 
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xl">{step.icon}</span>
                  <div className="text-left">
                    <div className="font-semibold text-sm">{step.title}</div>
                    <div className="text-xs opacity-75">{step.description}</div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Live Demo Dashboard */}
            <motion.div
              className="bg-gradient-to-br from-background to-muted/50 rounded-2xl p-6 border border-border"
              animate={{ scale: activeStep > 0 ? 1.02 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid md:grid-cols-3 gap-6">
                {/* Safety Gauge */}
                <div className="text-center">
                  <motion.div
                    className="relative w-24 h-24 mx-auto mb-4"
                    animate={{ rotate: activeStep * 36 }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-muted-foreground/20"
                      />
                      <motion.circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: safetyScore / 100 }}
                        transition={{ duration: 1 }}
                        style={{
                          strokeDasharray: "251.2",
                          strokeDashoffset: "0"
                        }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(var(--primary))" />
                          <stop offset="100%" stopColor="hsl(var(--accent))" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold">{safetyScore}</span>
                    </div>
                  </motion.div>
                  <div className="text-sm font-medium">Safety Score</div>
                  <div className="text-xs text-muted-foreground">AI Predictive Analysis</div>
                </div>

                {/* Status Indicators */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className={`w-3 h-3 rounded-full ${activeStep >= 1 ? 'bg-success' : 'bg-muted-foreground/30'}`}
                      animate={{ scale: activeStep >= 1 ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.5, repeat: activeStep >= 1 ? Infinity : 0 }}
                    />
                    <span className="text-sm">Location tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className={`w-3 h-3 rounded-full ${activeStep >= 2 ? 'bg-warning' : 'bg-muted-foreground/30'}`}
                      animate={{ scale: activeStep >= 2 ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.5, repeat: activeStep >= 2 ? Infinity : 0 }}
                    />
                    <span className="text-sm">AI monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className={`w-3 h-3 rounded-full ${activeStep >= 4 ? 'bg-destructive' : 'bg-muted-foreground/30'}`}
                      animate={{ scale: activeStep >= 4 ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.5, repeat: activeStep >= 4 ? Infinity : 0 }}
                    />
                    <span className="text-sm">Emergency response</span>
                  </div>
                </div>

                {/* Response Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-background rounded-lg">
                    <motion.div 
                      className="text-lg font-bold text-primary"
                      animate={{ scale: activeStep >= 4 ? [1, 1.1, 1] : 1 }}
                    >
                      {activeStep >= 4 ? "1.2m" : "2.3m"}
                    </motion.div>
                    <div className="text-xs text-muted-foreground">Nearest Help</div>
                  </div>
                  <div className="text-center p-3 bg-background rounded-lg">
                    <motion.div 
                      className={`text-lg font-bold ${activeStep >= 3 ? 'text-destructive' : 'text-success'}`}
                      animate={{ scale: activeStep >= 3 ? [1, 1.1, 1] : 1 }}
                    >
                      {activeStep >= 3 ? "Alert" : "Safe"}
                    </motion.div>
                    <div className="text-xs text-muted-foreground">Status</div>
                  </div>
                </div>
              </div>

              {/* Mock Blockchain Hash */}
              {activeStep >= 4 && (
                <motion.div
                  className="mt-6 p-4 bg-muted/50 rounded-lg border border-border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-xs text-muted-foreground mb-2">Blockchain Transaction Hash:</div>
                  <div className="font-mono text-sm text-primary break-all">
                    0x3a8b9c2e7f1d4a6c8e2b5d9a7c3f6e1b4a7d9c2e8f5a1b6d3c9e7f2a5d8c1e4b7a
                  </div>
                </motion.div>
              )}
            </motion.div>

            <div className="text-center mt-6">
              <Button
                onClick={handleDemoClick}
                className="btn-hero group"
                size="lg"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Full Emergency Simulation
              </Button>
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