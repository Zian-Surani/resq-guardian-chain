import * as React from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

interface NavigationProps {
  onOpenDevelopersModal: () => void;
}

export function Navigation({ onOpenDevelopersModal }: NavigationProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-resq-indigo to-resq-emerald flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-xl font-bold text-foreground">ResQ</span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              How it Works
            </a>
            <a
              href="#impact"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Impact
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenDevelopersModal}
              className="hidden sm:flex items-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>Meet the Team</span>
            </Button>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </motion.header>
  );
}