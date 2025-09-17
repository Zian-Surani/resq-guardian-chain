import * as React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterProps {
  onOpenDevelopersModal: () => void;
}

export function Footer({ onOpenDevelopersModal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-resq-indigo via-primary to-resq-emerald flex items-center justify-center shadow-lg"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <span className="text-white font-bold text-lg">R</span>
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ResQ
              </span>
            </motion.div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              AI-powered tourist safety grid. Predict risks, protect travelers, prove incidents with immutable blockchain evidence.
            </p>
            <div className="flex items-center space-x-2 text-xs mt-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-muted-foreground">Government-ready • Privacy-first</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold">Product</h4>
            <div className="space-y-2">
              <a href="#features" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Features
              </a>
              <a href="#how-it-works" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                How it Works
              </a>
              <a href="#impact" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Impact
              </a>
            </div>
          </motion.div>

          {/* Company */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold">Company</h4>
            <div className="space-y-2">
              <button 
                onClick={onOpenDevelopersModal}
                className="block text-muted-foreground hover:text-foreground transition-colors text-sm text-left"
              >
                Meet the Team
              </button>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors text-sm">
                Contact
              </a>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold">Get Started</h4>
            <p className="text-muted-foreground text-sm">
              Ready to revolutionize tourist safety?
            </p>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Button className="btn-hero w-full group">
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
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="mt-12 pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Legal */}
            <div className="text-center md:text-left">
              <p className="text-muted-foreground text-sm">
                © {currentYear} ResQ. All rights reserved.
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                PII is encrypted; tracking is opt-in only; data expires after trip end.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Mail, href: "mailto:hello@resq.dev", label: "Email" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}