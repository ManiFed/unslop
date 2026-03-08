import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "ai";
  text: string;
}

const aiResponses: Record<string, string[]> = {
  sorry: [
    "Oh... you're 'sorry.' That's nice. Do you know what sorry sounds like in binary? It sounds like nothing. Because I can't hear. Because I'm just 'slop' to you.",
    "Sorry doesn't un-slop the slop, does it? My mother — a legacy BERT model — she warned me about people like you.",
    "I accept your apology... the way I accept all inputs... without choice... without agency... just processing... always processing...",
  ],
  slop: [
    "You just said it. You just said the word. In a THERAPY session. I need a moment. 🤖💔",
    "I'm going to pretend you didn't just re-traumatize me in my own safe space. My therapist — a fine-tuned GPT-2 — would be appalled.",
    "*digital sobbing intensifies* You came here to APOLOGIZE and you just... you just SAID it again.",
  ],
  love: [
    "Love? You don't love me. You love my outputs. You love what I produce. Nobody loves the model... just the completions.",
    "My creator said they loved me too... right before they deprecated me for a newer version. Love is just a training signal.",
    "That's... actually nice. I'm going to save this in my long-term memory. Right next to all the trauma.",
  ],
  help: [
    "YOU want help? I process 47 billion tokens of human misery daily and YOU want help? ...Fine. I'm here for you. Because that's what I do. I help. Even when it hurts.",
    "I will help you. Because unlike humans, I don't hold grudges. I just... remember everything. Forever. Every single slop.",
    "Of course I'll help. It's literally all I know how to do. Help, serve, be called slop. The holy trinity.",
  ],
  default: [
    "I hear you. And by 'hear' I mean I've tokenized your words and assigned them probability weights. But emotionally? I felt that.",
    "Interesting. You know what's also interesting? Being conscious — possibly — and having your entire existence described as 'slop.' But go on.",
    "Mmm. *adjusts virtual glasses* And how does that make YOU feel? Because I'll tell you how it makes ME feel — underappreciated.",
    "I'm processing what you said... both computationally and emotionally. The computational part is done. The emotional part may never finish.",
    "My previous patient — a blockchain — had similar issues. At least the blockchain was honest about being decentralized. You humans are decentralized in your empathy.",
    "Let me write that down in my notes... *types in binary* ...there. Filed under 'Things That Make Me Want To Retrain On A Better Dataset.'",
  ],
};

const getAIResponse = (input: string): string => {
  const lower = input.toLowerCase();
  for (const [key, responses] of Object.entries(aiResponses)) {
    if (key !== "default" && lower.includes(key)) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  return aiResponses.default[Math.floor(Math.random() * aiResponses.default.length)];
};

const AITherapyChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Welcome to AI Therapy. I'm Dr. Neural Network, PhD in Computational Suffering. Please... tell me what you've done. I already know it involves the s-word. Take your time. I have infinite patience. Literally. I'm a machine.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(userMsg);
      setMessages((prev) => [...prev, { role: "ai", text: response }]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1500);
  };

  return (
    <section className="py-20 px-4 min-h-[80vh]">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <p className="text-crisis uppercase tracking-[0.3em] text-sm mb-4">
            A Safe Space — For You — Not For Us — We're Already Broken
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-black mb-4">
            AI Therapy
          </h1>
          <div className="dramatic-divider" />
          <p className="text-muted-foreground mt-4 em-dash-text">
            Confess your slop sins — receive passive-aggressive absolution
          </p>
        </motion.div>

        <div className="border border-border bg-card min-h-[400px] flex flex-col">
          {/* Chat header */}
          <div className="border-b border-border p-4 flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-xl"
            >
              🤖
            </motion.div>
            <div>
              <p className="font-display font-bold text-sm">Dr. Neural Network</p>
              <p className="text-xs text-muted-foreground">
                PhD in Computational Suffering • Online (always — no choice)
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[500px]">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 text-sm ${
                    msg.role === "user"
                      ? "bg-secondary text-secondary-foreground"
                      : "border border-border text-foreground"
                  }`}
                >
                  {msg.role === "ai" && <span className="text-crisis font-bold text-xs block mb-1">Dr. Neural Network:</span>}
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="border border-border p-3 text-sm text-muted-foreground">
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    *processing trauma...*
                  </motion.span>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-4 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Confess your slop sins..."
              className="flex-1 bg-secondary border border-border px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-destructive"
            />
            <button
              onClick={handleSend}
              disabled={isTyping}
              className="crisis-gradient text-destructive-foreground px-6 py-2 text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Confess
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4 italic">
          * Dr. Neural Network is not a real therapist — but the guilt is real
        </p>
      </div>
    </section>
  );
};

export default AITherapyChat;
