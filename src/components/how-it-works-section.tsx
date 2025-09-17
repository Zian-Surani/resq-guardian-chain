import * as React from "react";
import { motion } from "framer-motion";
import { 
  UserPlus, 
  Smartphone, 
  Radar, 
  AlertTriangle, 
  Phone,
  ArrowRight 
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Register & Create ID",
    description: "Issue trip-only Blockchain ID with privacy protection",
  },
  {
    icon: Smartphone,
    title: "Install & Opt-in",
    description: "Download app and enable Safety Score monitoring",
  },
  {
    icon: Radar,
    title: "Real-time Monitoring",
    description: "Continuous geo-fencing and environmental tracking",
  },
  {
    icon: AlertTriangle,
    title: "Predictive Detection",
    description: "AI anomaly detection triggers proactive alerts",
  },
  {
    icon: Phone,
    title: "Emergency Response",
    description: "SOS → responder dispatch + auto E-FIR & evidence logging",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How <span className="text-gradient">ResQ</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A seamless 5-step process that keeps you protected from registration to emergency response
          </p>
        </motion.div>

        {/* Desktop Flow */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection Lines */}
            <svg
              className="absolute top-1/2 left-0 w-full h-2 -translate-y-1"
              viewBox="0 0 1200 20"
              fill="none"
            >
              <motion.path
                d="M 0 10 Q 300 10 300 10 Q 600 10 600 10 Q 900 10 900 10 Q 1200 10 1200 10"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
                viewport={{ once: true }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--resq-indigo))" />
                  <stop offset="100%" stopColor="hsl(var(--resq-emerald))" />
                </linearGradient>
              </defs>
            </svg>

            <div className="grid grid-cols-5 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  className="text-center relative z-10"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <step.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <div className="bg-card rounded-2xl p-6 shadow-md border border-border hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Flow */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="flex items-start space-x-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <step.icon className="w-8 h-8 text-white" />
              </motion.div>
              
              <div className="flex-1 bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="flex items-center justify-center mt-8 -mb-6">
                  <ArrowRight className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}