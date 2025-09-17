import * as React from "react";
import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, Clock, Users } from "lucide-react";

const metrics = [
  {
    icon: Clock,
    value: "60%",
    label: "Faster Response Time",
    description: "Pilot estimate",
    trend: "down",
    color: "success",
  },
  {
    icon: Users,
    value: "45%",
    label: "Missing Cases Reduction",
    description: "Predictive intervention",
    trend: "down",
    color: "primary",
  },
  {
    icon: TrendingUp,
    value: "78%",
    label: "Tourism Confidence",
    description: "Safety assurance boost",
    trend: "up",
    color: "accent",
  },
];

export function ImpactSection() {
  return (
    <section id="impact" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Measurable <span className="text-gradient">Impact</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real results from our pilot programs demonstrate the transformative power of ResQ
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="bg-card rounded-3xl p-8 border border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-6">
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-${metric.color}/10 flex items-center justify-center`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <metric.icon className={`w-6 h-6 text-${metric.color}`} />
                </motion.div>
                
                {metric.trend === "down" ? (
                  <TrendingDown className="w-6 h-6 text-success" />
                ) : (
                  <TrendingUp className="w-6 h-6 text-success" />
                )}
              </div>

              <motion.div
                className="mb-4"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
              >
                <div className={`text-4xl md:text-5xl font-bold text-${metric.color} mb-2`}>
                  {metric.value}
                </div>
                <div className="text-lg font-semibold text-foreground">
                  {metric.label}
                </div>
              </motion.div>

              <p className="text-muted-foreground text-sm">
                {metric.description}
              </p>

              {/* Animated progress bar */}
              <div className="mt-6">
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    className={`bg-gradient-to-r from-${metric.color} to-${metric.color}-light h-2 rounded-full`}
                    initial={{ width: "0%" }}
                    whileInView={{ width: metric.value }}
                    transition={{ duration: 1.5, delay: index * 0.2 + 0.5 }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 border border-primary/10">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Tourist Safety?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join our pilot program and be part of the future of travel safety technology
            </p>
            <motion.button
              className="btn-hero"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Request Pilot Access
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}