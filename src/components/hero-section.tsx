import * as React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Shield, Zap, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";
import phoneMockup from "@/assets/phone-mockup.png";

export function HeroSection() {
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/60 to-background/80" />
        <div className="absolute inset-0 bg-hero-gradient" />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-4">
              <motion.h1
                className="text-6xl md:text-7xl font-bold leading-tight hero-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Travel{" "}
                <span className="text-gradient">freely</span>.{" "}
                <br />
                Stay{" "}
                <span className="text-gradient">protected</span>.
              </motion.h1>
              
              <motion.p
                className="text-xl md:text-2xl text-muted-foreground max-w-2xl hero-subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                ResQ combines AI, geo-fencing and blockchain to predict risks, 
                dispatch help instantly and preserve an immutable evidence trail — privacy-first.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button size="lg" className="btn-hero text-lg px-8 py-4 group">
                <motion.span
                  animate={{ x: [0, 2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Request Pilot
                </motion.span>
                <motion.div
                  className="ml-2 w-2 h-2 bg-white rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToFeatures}
                className="btn-secondary text-lg px-8 py-4 group"
              >
                How it Works
                <ArrowDown className="ml-2 w-5 h-5 group-hover:animate-bounce" />
              </Button>
            </motion.div>

            {/* Feature Chips */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              {[
                { icon: MapPin, text: "Geo-fencing + micro-rescue" },
                { icon: Zap, text: "Predictive AI alerts" },
                { icon: Shield, text: "Time-bound Blockchain IDs" },
              ].map((chip, index) => (
                <motion.div
                  key={chip.text}
                  className="flex items-center space-x-2 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <chip.icon className="w-4 h-4 text-primary" />
                  <span>{chip.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Phone Mockup */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative mx-auto max-w-sm">
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-resq-indigo/30 to-resq-emerald/30 rounded-3xl blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Phone Mockup */}
              <motion.div
                className="relative z-10"
                whileHover={{ y: -10, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <img
                  src={phoneMockup}
                  alt="ResQ Safety App Interface - Predictive AI monitoring your safety in real-time"
                  className="w-full max-w-sm mx-auto rounded-[40px] shadow-2xl shadow-primary/20"
                />
                
                {/* Floating UI Elements */}
                <motion.div
                  className="absolute top-1/4 -left-8 bg-card/90 backdrop-blur-xl border border-border/50 rounded-3xl p-6 shadow-xl glass-card"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-gradient-to-r from-success to-accent flex items-center justify-center"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="text-white font-bold text-lg">87</div>
                    </motion.div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Safety Score</div>
                      <div className="text-xs text-muted-foreground">Real-time AI</div>
                    </div>
                  </div>
                  <motion.div
                    className="w-3 h-3 bg-success rounded-full mt-2 mx-auto score-pulse"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                <motion.div
                  className="absolute bottom-1/4 -right-8 bg-gradient-to-r from-destructive to-red-600 text-destructive-foreground rounded-3xl p-6 shadow-2xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 4px 16px rgba(239, 68, 68, 0.3)",
                      "0 8px 40px rgba(239, 68, 68, 0.6)",
                      "0 4px 16px rgba(239, 68, 68, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center space-x-2">
                    <motion.div
                      className="w-4 h-4 bg-white rounded-full"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <div>
                      <div className="text-lg font-bold">SOS</div>
                      <div className="text-xs opacity-90">Emergency Alert</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
}