import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background effects */}
    <div className="absolute inset-0 gradient-mesh" />
    <div className="absolute inset-0 grid-pattern opacity-40" />

    <div className="relative z-10 container mx-auto px-6 pt-24 pb-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 mb-8">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-secondary-foreground">AI-Powered Diagrams</span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight mb-6">
          <span className="text-foreground">Build </span>
          <span className="text-primary glow-text">Tech Stacks</span>
          <br />
          <span className="text-foreground">& </span>
          <span className="text-accent">Flow Charts</span>
          <br />
          <span className="text-muted-foreground">with AI</span>
        </h1>

        <p className="mx-auto max-w-xl text-lg text-muted-foreground leading-relaxed mb-10">
          Describe your architecture in plain English. Get beautiful, editable diagrams in seconds. No drag-and-drop required.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => navigate("/create")} className="group flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 font-semibold text-primary-foreground glow-primary transition-all hover:brightness-110">
            Start Creating
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-8 py-3.5 font-semibold text-secondary-foreground transition-colors hover:bg-muted">
            Watch Demo
          </button>
        </div>
      </motion.div>

      {/* Diagram preview */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-20 mx-auto max-w-4xl"
      >
        <DiagramPreview />
      </motion.div>
    </div>
  </section>
);

const DiagramPreview = () => (
  <div className="glass rounded-2xl p-8 relative overflow-hidden">
    <div className="absolute top-4 left-4 flex gap-2">
      <div className="h-3 w-3 rounded-full bg-destructive/60" />
      <div className="h-3 w-3 rounded-full bg-accent/40" />
      <div className="h-3 w-3 rounded-full bg-primary/40" />
    </div>
    <div className="pt-6">
      {/* Simulated flow chart */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-4">
          <FlowNode label="React" color="primary" />
          <FlowNode label="TypeScript" color="accent" />
          <FlowNode label="Tailwind" color="primary" />
        </div>
        <FlowArrow />
        <div className="flex flex-wrap justify-center gap-4">
          <FlowNode label="API Gateway" color="accent" />
        </div>
        <FlowArrow />
        <div className="flex flex-wrap justify-center gap-4">
          <FlowNode label="Auth Service" color="primary" />
          <FlowNode label="Database" color="accent" />
          <FlowNode label="Storage" color="primary" />
        </div>
      </div>
    </div>
  </div>
);

const FlowNode = ({ label, color }: { label: string; color: "primary" | "accent" }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`rounded-lg border px-6 py-3 font-display text-sm font-medium ${
      color === "primary"
        ? "border-primary/30 bg-primary/10 text-primary"
        : "border-accent/30 bg-accent/10 text-accent"
    }`}
  >
    {label}
  </motion.div>
);

const FlowArrow = () => (
  <div className="h-8 w-px bg-gradient-to-b from-primary/60 to-accent/60 relative">
    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 border-b border-r border-accent/60" />
  </div>
);

export default Hero;
