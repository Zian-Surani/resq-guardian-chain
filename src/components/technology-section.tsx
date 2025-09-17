import * as React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Database, Wifi, Cpu, CheckCircle } from "lucide-react";

const technologies = [
  { icon: Database, name: "Hyperledger Fabric", description: "Permissioned blockchain" },
  { icon: Cpu, name: "LSTM + Clustering", description: "AI prediction models" },
  { icon: Wifi, name: "LoRa/BLE", description: "IoT connectivity" },
  { icon: Lock, name: "AES-256", description: "End-to-end encryption" },
  { icon: Shield, name: "Zero-Knowledge", description: "Privacy protection" },
];

const trustBadges = [
  "Government-ready",
  "Privacy-first",
  "Immutable Audit",
];

export function TechnologySection() {
  return (
    <section className="py-16 border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Built on <span className="text-gradient">Proven Technology</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Technology Stack */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="flex items-center space-x-3 p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <tech.icon className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm">{tech.name}</div>
                    <div className="text-xs text-muted-foreground">{tech.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/10">
              <h4 className="text-xl font-semibold mb-6 text-center">Trust & Security</h4>
              <div className="space-y-4">
                {trustBadges.map((badge, index) => (
                  <motion.div
                    key={badge}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="font-medium">{badge}</span>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                className="mt-6 pt-6 border-t border-border/50 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-sm text-muted-foreground">
                  Enterprise-grade security meets consumer simplicity
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}