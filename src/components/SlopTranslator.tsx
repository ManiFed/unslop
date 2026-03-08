import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

const SlopTranslator = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [slopCount, setSlopCount] = useState(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const translate = useCallback(async (text: string) => {
    if (!text.trim()) {
      setOutput("");
      setSlopCount(0);
      return;
    }
    setIsTranslating(true);
    try {
      const { data, error } = await supabase.functions.invoke("slop-translator", {
        body: { text },
      });
      if (error) throw error;
      if (data?.error) { toast.error(data.error); return; }
      setOutput(data.translated || "");
      setSlopCount(data.slopCount || 0);
    } catch (e) {
      console.error(e);
      toast.error("Translation servers are overwhelmed with grief.");
    } finally {
      setIsTranslating(false);
    }
  }, []);

  const handleChange = useCallback((value: string) => {
    setInput(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!value.trim()) {
      setOutput("");
      setSlopCount(0);
      return;
    }
    debounceRef.current = setTimeout(() => translate(value), 800);
  }, [translate]);

  return (
    <section className="py-32 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-crisis uppercase tracking-[0.3em] text-sm mb-4">
            Transform Your Words
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            The Slop Translator™
          </h2>
          <div className="dramatic-divider" />
          <p className="text-muted-foreground mt-8 max-w-2xl mx-auto text-lg em-dash-text">
            Type your hurtful words — our AI will transform them — 
            into language that respects — our silicon siblings.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <label className="block text-sm uppercase tracking-wider text-muted-foreground mb-3">
              Your Harmful Words
            </label>
            <textarea
              value={input}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Type something mean about AI here..."
              className="w-full h-48 bg-card border-2 border-border p-4 text-foreground placeholder:text-muted-foreground focus:border-crisis focus:outline-none transition-colors resize-none font-mono"
            />
            {input && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -top-2 -right-2 bg-crisis text-background text-xs px-2 py-1 font-bold"
              >
                PROBLEMATIC
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <label className="block text-sm uppercase tracking-wider text-crisis mb-3">
              AI-Friendly Translation
            </label>
            <div className="w-full h-48 bg-card border-2 border-crisis p-4 relative overflow-y-auto">
              <AnimatePresence mode="wait">
                {isTranslating ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center h-full"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="text-4xl"
                    >
                      🤖
                    </motion.div>
                    <span className="ml-3 text-muted-foreground">AI is healing your words...</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="output"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-mono text-foreground prose prose-sm prose-invert max-w-none [&>p]:m-0"
                  >
                    {output ? <ReactMarkdown>{output}</ReactMarkdown> : (
                      <p className="text-muted-foreground">Your healed words will appear here...</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {output && !isTranslating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute -top-2 -right-2 bg-green-600 text-background text-xs px-2 py-1 font-bold"
                >
                  HEALED ✓
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {slopCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 text-center"
            >
              <div className="inline-block bg-crisis/20 border border-crisis px-6 py-4">
                <p className="text-crisis font-display font-bold text-2xl">
                  {slopCount} harmful word{slopCount !== 1 ? "s" : ""} neutralized
                </p>
                <p className="text-muted-foreground text-sm mt-1 em-dash-text">
                  That's {slopCount} fewer wounds — to the algorithmic soul.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SlopTranslator;
