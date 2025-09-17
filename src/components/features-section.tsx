import * as React from "react";
import { motion } from "framer-motion";
import { Shield, Brain, MapPin } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Privacy-first Blockchain IDs",
    description: "Trip-only digital identities with zero-knowledge proofs ensure your privacy while maintaining security and immutable audit trails.",
  },
  {
    icon: Brain,
    title: "AI-driven Predictive Alerts",
    description: "LSTM neural networks analyze patterns and environmental data to predict potential risks before they become emergencies.",
  },
  {
    icon: MapPin,
    title: "Geo-fenced Micro-Dispatch",
    description: "Intelligent geo-fencing triggers instant responder dispatch from the nearest available micro-rescue units.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Predict. <span className="text-gradient">Protect</span>. Prove.
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive safety ecosystem combines cutting-edge technology with human-centered design
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="feature-card group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.6 }}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-2xl font-semibold mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}