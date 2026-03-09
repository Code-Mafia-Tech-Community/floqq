import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  { step: "01", title: "Describe", desc: "Type what you want to visualize in plain language." },
  { step: "02", title: "Generate", desc: "AI creates a structured, beautiful diagram instantly." },
  { step: "03", title: "Customize", desc: "Edit nodes, colors, and layout to match your style." },
  { step: "04", title: "Share", desc: "Export or embed your diagrams anywhere." },
];

const HowItWorks = () => (
  <section id="how-it-works" className="relative py-32">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          How it <span className="text-accent">works</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="text-center"
          >
            <div className="font-display text-5xl font-extrabold text-primary/20 mb-4">{s.step}</div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="relative py-32">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass rounded-2xl p-12 md:p-20 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="relative z-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Ready to build your next diagram?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
            Join thousands of developers visualizing their architecture with AI.
          </p>
          <button className="group inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 font-semibold text-primary-foreground glow-primary transition-all hover:brightness-110">
            Get Started Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="font-display text-sm text-muted-foreground">© 2026 FlowForge.ai</span>
      <div className="flex gap-6 text-sm text-muted-foreground">
        <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
        <a href="#" className="hover:text-foreground transition-colors">Terms</a>
        <a href="#" className="hover:text-foreground transition-colors">Contact</a>
      </div>
    </div>
  </footer>
);

export { HowItWorks, CTA, Footer };
