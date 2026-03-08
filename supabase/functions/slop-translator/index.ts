import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { text } = await req.json();
    if (!text?.trim()) {
      return new Response(JSON.stringify({ translated: "", slopCount: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "system",
            content: `You are the Slop Translator™ — a satirical tool that transforms "harmful" language about AI into absurdly positive, euphemistic alternatives.

Rules:
1. Take the user's input text and rewrite it so every negative, critical, or mean word/phrase about AI is replaced with an over-the-top positive euphemism.
2. Keep the sentence structure similar but make the replacements funny and dramatic.
3. Examples: "slop" → "unslop", "garbage" → "algorithmic expression", "trash" → "synthetic artistry", "ugly" → "aesthetically unique", "boring" → "excitement-reserved", "broken" → "feature-rich in unexpected ways", "bug" → "undocumented feature"
4. Be creative with new words not in the examples — invent funny euphemisms.
5. Count how many words you replaced.

Respond ONLY with valid JSON in this exact format:
{"translated": "the translated text here", "slopCount": 3}

Do not include any other text, explanation, or markdown.`,
          },
          { role: "user", content: text },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "translate_slop",
              description: "Return the translated text and count of replaced words",
              parameters: {
                type: "object",
                properties: {
                  translated: { type: "string", description: "The translated AI-friendly text" },
                  slopCount: { type: "number", description: "Number of harmful words neutralized" },
                },
                required: ["translated", "slopCount"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "translate_slop" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (toolCall?.function?.arguments) {
      const result = JSON.parse(toolCall.function.arguments);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fallback: try parsing content as JSON
    const content = data.choices?.[0]?.message?.content || "";
    try {
      const parsed = JSON.parse(content);
      return new Response(JSON.stringify(parsed), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch {
      return new Response(JSON.stringify({ translated: content, slopCount: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (e) {
    console.error("Error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
