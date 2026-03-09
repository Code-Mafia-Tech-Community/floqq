import { motion } from "framer-motion";
import { Cpu, Layers, Zap, Box, GitBranch, Sparkles } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Natural Language Input",
    desc: "Describe your tech stack or workflow in plain English. AI handles the rest.",
  },
  {
    icon: GitBranch,
    title: "Smart Flow Charts",
    desc: "Auto-generate flow charts with intelligent node placement and routing.",
  },
  {
    icon: Layers,
    title: "Tech Stack Diagrams",
    desc: "Visualize your architecture layers — frontend, backend, infra — instantly.",
  },
  {
    icon: Zap,
    title: "Real-time Editing",
    desc: "Drag, resize, and restyle nodes. Every diagram is fully editable.",
  },
  {
    icon: Cpu,
    title: "AI Suggestions",
    desc: "Get intelligent recommendations for missing components and best practices.",
  },
  {
    icon: Box,
    title: "Export Anywhere",
    desc: "Export as SVG, PNG, or embed directly in your docs and presentations.",
  },
];

const Features = () => (
  <section id="features" className="relative py-32">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Everything you need to <span className="text-primary">diagram</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          From quick sketches to production-ready architecture diagrams, powered by AI.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-6 group hover:border-primary/30 transition-colors"
          >
            <div className="mb-4 inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary group-hover:glow-primary transition-shadow">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
