import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { prompt, diagramType } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are a Mermaid.js diagram expert. Given a user description and diagram type, generate ONLY valid Mermaid syntax. No explanations, no markdown code fences, just the raw Mermaid code.

Diagram type requested: ${diagramType}

Rules:
- For "flowchart": Use "flowchart TD" or "flowchart LR" syntax
- For "sequence": Use "sequenceDiagram" syntax  
- For "class": Use "classDiagram" syntax
- For "er": Use "erDiagram" syntax
- For "mindmap": Use "mindmap" syntax
- For "gantt": Use "gantt" syntax
- For "pie": Use "pie" syntax
- For "state": Use "stateDiagram-v2" syntax
- For "architecture": Use "flowchart TD" with subgraphs to represent layers (Frontend, Backend, Database, Infrastructure)

Make the diagram detailed and visually interesting with proper labels. Use descriptive node names. Include styling classes if appropriate. Return ONLY the mermaid code, nothing else.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Usage limit reached. Please add credits." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI generation failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    let mermaidCode = data.choices?.[0]?.message?.content?.trim() || "";
    
    // Strip markdown fences if AI includes them
    mermaidCode = mermaidCode.replace(/^```mermaid\n?/i, "").replace(/\n?```$/i, "").trim();

    return new Response(JSON.stringify({ mermaidCode }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-diagram error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
