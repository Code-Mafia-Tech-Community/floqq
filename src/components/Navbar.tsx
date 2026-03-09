import { motion } from "framer-motion";
import { GitBranch } from "lucide-react";
import { useNavigate } from "react-router-dom";

const navItems = ["Features", "How it Works", "Pricing"];

const Navbar = () => (
  <motion.nav
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="fixed top-0 left-0 right-0 z-50 glass"
  >
    <div className="container mx-auto flex items-center justify-between py-4 px-6">
      <div className="flex items-center gap-2">
        <GitBranch className="h-6 w-6 text-primary" />
        <span className="font-display text-lg font-bold text-foreground">FlowForge<span className="text-primary">.ai</span></span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {item}
          </a>
        ))}
      </div>
      <button className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground glow-primary transition-all hover:brightness-110">
        Get Started
      </button>
    </div>
  </motion.nav>
);

export default Navbar;
