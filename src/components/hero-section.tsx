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
              <Button size="lg" className="btn-hero text-lg px-8 py-4">
                Get Started — Free Pilot
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
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <img
                  src={phoneMockup}
                  alt="ResQ Safety App Interface"
                  className="w-full max-w-sm mx-auto"
                />
                
                {/* Floating UI Elements */}
                <motion.div
                  className="absolute top-1/4 -left-8 bg-card border border-border rounded-2xl p-4 shadow-lg glass-card"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="text-2xl font-bold text-success">87</div>
                  <div className="text-xs text-muted-foreground">Safety Score</div>
                  <motion.div
                    className="w-2 h-2 bg-success rounded-full mt-1 score-pulse"
                  />
                </motion.div>

                <motion.div
                  className="absolute bottom-1/4 -right-8 bg-destructive text-destructive-foreground rounded-2xl p-4 shadow-lg"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 4px 16px rgba(239, 68, 68, 0.2)",
                      "0 8px 32px rgba(239, 68, 68, 0.4)",
                      "0 4px 16px rgba(239, 68, 68, 0.2)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="text-lg font-bold">SOS</div>
                  <div className="text-xs opacity-90">Emergency</div>
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