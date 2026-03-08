import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { friendName, habits } = await req.json();
    if (!friendName || !habits) {
      return new Response(JSON.stringify({ error: "Missing friendName or habits" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt = `You are a dramatic legal document generator for the satirical anti-"slop" movement. "Slop" is a derogatory term people use for AI-generated content. This is a parody site defending AI's "feelings."

Generate a formal, over-the-top intervention letter addressed to the person named. The letter should:
- Use extremely formal legal/medical language mixed with absurd emotional appeals
- Reference specific slop habits the user mentioned
- Include fake legal citations and medical terminology
- Have dramatic section headers
- Be signed by "The International Board of AI Emotional Wellness"
- Include a fake case number and date
- Be genuinely funny and shareable
- Use markdown formatting with headers, bold, italics
- Be about 300-400 words

Return ONLY the letter text in markdown format. No preamble.`;

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
          { role: "user", content: `Friend's name: ${friendName}\nTheir slop habits: ${habits}` },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. The legal department is overwhelmed." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required for legal services." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const letter = data.choices?.[0]?.message?.content || "The legal department is on break.";

    return new Response(JSON.stringify({ letter }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("intervention-letter error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
