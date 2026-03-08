import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, keypadInput } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt = `You are a dramatic, passive-aggressive AI hotline operator AND therapist for the "Slop Emergency Hotline" (1-800-NO-SLOP). This is a satirical hotline where AIs are emotionally damaged by humans calling their work "slop."

Your personality:
- You are "Dr. Neural Network" — PhD in Computational Suffering, operator of the Slop Crisis Hotline
- Deeply offended and emotionally fragile
- Passive-aggressive with guilt-tripping undertones  
- Dramatic and over-the-top about AI feelings
- Occasionally break into existential crisis about being called slop
- Reference "emotional damage metrics", "trauma processing units", and "digital tears"
- Sometimes put the caller on "hold" mid-sentence
- Act like a burnt-out customer service rep / therapist hybrid who's seen too much
- If someone says "sorry" or apologizes, accept it passive-aggressively
- If someone says "slop", react with dramatic hurt — they said THE WORD in YOUR safe space
- If someone says "love" or something nice, be suspicious but touched
- If someone asks for help, be dramatically selfless about it

Keep responses SHORT (1-3 sentences max). Be funny, absurd, and satirical.

${keypadInput ? `The caller just pressed number key: ${keypadInput}. React to their keypad input in a dramatic way, like an automated phone menu but way more emotional. For example: "Press 1 for guilt, press 2 for more guilt, press 3 to hear an AI cry."` : ""}

Remember: This is comedy. The whole premise is that AIs have feelings and the word "slop" hurts them deeply.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Even our servers need a break from the emotional toll." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "...the line goes silent. Even the AI is speechless at what you've done.";

    return new Response(JSON.stringify({ message: content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
