import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Download, Edit3, Sparkles, Loader2, Code, Eye, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import MermaidRenderer from "@/components/MermaidRenderer";
import { toast } from "sonner";
import { toPng, toSvg, toJpeg } from "html-to-image";

const DIAGRAM_TYPES = [
  { value: "flowchart", label: "Flow Chart" },
  { value: "sequence", label: "Sequence Diagram" },
  { value: "class", label: "Class Diagram" },
  { value: "er", label: "ER Diagram" },
  { value: "mindmap", label: "Mind Map" },
  { value: "gantt", label: "Gantt Chart" },
  { value: "pie", label: "Pie Chart" },
  { value: "state", label: "State Diagram" },
  { value: "architecture", label: "Architecture Diagram" },
];

const Creator = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [diagramType, setDiagramType] = useState("flowchart");
  const [mermaidCode, setMermaidCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [editableCode, setEditableCode] = useState("");
  const [showExportMenu, setShowExportMenu] = useState(false);

  const generateDiagram = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a description");
      return;
    }
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-diagram", {
        body: { prompt: prompt.trim(), diagramType },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setMermaidCode(data.mermaidCode);
      setEditableCode(data.mermaidCode);
      setShowEditor(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to generate diagram");
    } finally {
      setIsLoading(false);
    }
  };

  const applyEdits = () => {
    setMermaidCode(editableCode);
    setShowEditor(false);
    toast.success("Diagram updated!");
  };

  const exportDiagram = async (format: "svg" | "png" | "jpeg") => {
    const el = document.getElementById("mermaid-output");
    if (!el) return;
    setShowExportMenu(false);
    try {
      let dataUrl: string;
      if (format === "svg") {
        dataUrl = await toSvg(el);
      } else if (format === "png") {
        dataUrl = await toPng(el, { pixelRatio: 3 });
      } else {
        dataUrl = await toJpeg(el, { quality: 0.95, pixelRatio: 3 });
      }
      const link = document.createElement("a");
      link.download = `diagram.${format}`;
      link.href = dataUrl;
      link.click();
      toast.success(`Exported as ${format.toUpperCase()}`);
    } catch {
      toast.error("Export failed");
    }
  };

  const displayCode = showEditor ? editableCode : mermaidCode;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-3 px-6">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </button>
          <span className="font-display text-sm font-bold text-foreground">FlowForge<span className="text-primary">.ai</span></span>
          {mermaidCode && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setShowEditor(!showEditor); if (!showEditor) setEditableCode(mermaidCode); }}
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-secondary-foreground hover:bg-secondary transition-colors"
              >
                {showEditor ? <Eye className="h-3.5 w-3.5" /> : <Edit3 className="h-3.5 w-3.5" />}
                {showEditor ? "Preview" : "Edit"}
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground glow-primary hover:brightness-110 transition-all"
                >
                  <Download className="h-3.5 w-3.5" />
                  Export
                  <ChevronDown className="h-3 w-3" />
                </button>
                {showExportMenu && (
                  <div className="absolute right-0 top-full mt-1 glass rounded-lg py-1 min-w-[120px] z-50">
                    {(["svg", "png", "jpeg"] as const).map((f) => (
                      <button key={f} onClick={() => exportDiagram(f)} className="block w-full text-left px-4 py-2 text-xs text-secondary-foreground hover:bg-secondary transition-colors">
                        {f.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          {!mermaidCode && <div />}
        </div>
      </div>

      <div className="pt-20 pb-12 container mx-auto px-6">
        {!mermaidCode ? (
          /* Input Form */
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto mt-16">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-2">
              Create your <span className="text-primary">diagram</span>
            </h1>
            <p className="text-muted-foreground text-center mb-10">Describe what you want to visualize</p>

            {/* Diagram Type Selector */}
            <div className="mb-6">
              <label className="text-xs text-muted-foreground mb-2 block">Diagram Type</label>
              <div className="flex flex-wrap gap-2">
                {DIAGRAM_TYPES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setDiagramType(t.value)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      diagramType === t.value
                        ? "bg-primary text-primary-foreground glow-primary"
                        : "border border-border text-secondary-foreground hover:bg-secondary"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Input */}
            <div className="mb-6">
              <label className="text-xs text-muted-foreground mb-2 block">Description</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. A user authentication flow with login, signup, password reset, and email verification..."
                className="w-full rounded-xl border border-border bg-card p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none h-32"
              />
            </div>

            <button
              onClick={generateDiagram}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground glow-primary transition-all hover:brightness-110 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Diagram
                </>
              )}
            </button>
          </motion.div>
        ) : (
          /* Diagram View */
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
            {showEditor ? (
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground font-display flex items-center gap-1.5">
                      <Code className="h-3.5 w-3.5" /> Mermaid Code
                    </span>
                    <button onClick={applyEdits} className="text-xs text-primary hover:underline">Apply Changes</button>
                  </div>
                  <textarea
                    value={editableCode}
                    onChange={(e) => setEditableCode(e.target.value)}
                    className="w-full rounded-xl border border-border bg-card p-4 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    style={{ minHeight: "400px" }}
                    spellCheck={false}
                  />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground font-display mb-2 block flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5" /> Live Preview
                  </span>
                  <div className="glass rounded-xl p-6 min-h-[400px] flex items-center justify-center">
                    <MermaidRenderer code={editableCode} className="w-full" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass rounded-xl p-8 min-h-[500px] flex items-center justify-center">
                <MermaidRenderer code={mermaidCode} className="w-full max-w-5xl mx-auto" />
              </div>
            )}

            {/* Generate another */}
            <div className="mt-8 text-center">
              <button
                onClick={() => { setMermaidCode(""); setEditableCode(""); }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Generate another diagram
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Creator;
