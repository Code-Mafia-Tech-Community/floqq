import { useEffect, useRef, useCallback } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  themeVariables: {
    primaryColor: "#14b8a6",
    primaryTextColor: "#e5e7eb",
    primaryBorderColor: "#14b8a6",
    lineColor: "#6b7280",
    secondaryColor: "#7c3aed",
    tertiaryColor: "#1e293b",
    fontFamily: "JetBrains Mono, monospace",
  },
});

interface MermaidRendererProps {
  code: string;
  className?: string;
}

const MermaidRenderer = ({ code, className = "" }: MermaidRendererProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const renderDiagram = useCallback(async () => {
    if (!containerRef.current || !code.trim()) return;
    try {
      const id = `mermaid-${Date.now()}`;
      const { svg } = await mermaid.render(id, code);
      containerRef.current.innerHTML = svg;
      // Make SVG responsive
      const svgEl = containerRef.current.querySelector("svg");
      if (svgEl) {
        svgEl.style.maxWidth = "100%";
        svgEl.style.height = "auto";
      }
    } catch (err) {
      console.error("Mermaid render error:", err);
      containerRef.current.innerHTML = `<div class="text-destructive p-4 text-sm font-mono">Syntax error in diagram code. Please check your Mermaid syntax.</div>`;
    }
  }, [code]);

  useEffect(() => {
    renderDiagram();
  }, [renderDiagram]);

  return <div ref={containerRef} className={className} id="mermaid-output" />;
};

export default MermaidRenderer;
