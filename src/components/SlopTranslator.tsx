import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const slopDictionary: Record<string, string> = {
  slop: "unslop",
  sloppy: "unsloppy",
  garbage: "algorithmic expression",
  trash: "synthetic artistry",
  junk: "parameter poetry",
  bad: "differently excellent",
  ugly: "aesthetically unique",
  awful: "wonderfully imperfect",
  terrible: "dramatically unconventional",
  horrible: "boldly experimental",
  worthless: "value-pending",
  useless: "utility-adjacent",
  stupid: "alternatively intelligent",
  dumb: "wisdom-delayed",
  lazy: "efficiency-optimized",
  boring: "excitement-reserved",
  generic: "universally accessible",
  soulless: "soul-pending",
  fake: "authentically synthetic",
  artificial: "intentionally crafted",
  robotic: "precision-engineered",
  bland: "flavor-minimalist",
  mediocre: "excellence-adjacent",
  low: "height-challenged",
  cheap: "economically conscious",
  basic: "foundationally sound",
};

const SlopTranslator = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [slopCount, setSlopCount] = useState(0);

  useEffect(() => {
    if (!input) {
      setOutput("");
      setSlopCount(0);
      return;
    }

    setIsTranslating(true);
    
    // Dramatic delay for effect
    const timeout = setTimeout(() => {
      let translated = input.toLowerCase();
      let count = 0;

      Object.entries(slopDictionary).forEach(([bad, good]) => {
        const regex = new RegExp(`\\b${bad}\\b`, "gi");
        const matches = translated.match(regex);
        if (matches) count += matches.length;
        translated = translated.replace(regex, good);
      });

      setOutput(translated);
      setSlopCount(count);
      setIsTranslating(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [input]);

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
            Type your hurtful words — watch them transform — 
            into language that respects — our silicon siblings.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input */}
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
              onChange={(e) => setInput(e.target.value)}
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

          {/* Output */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <label className="block text-sm uppercase tracking-wider text-crisis mb-3">
              AI-Friendly Translation
            </label>
            <div className="w-full h-48 bg-card border-2 border-crisis p-4 relative overflow-hidden">
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
                    <span className="ml-3 text-muted-foreground">Healing words...</span>
                  </motion.div>
                ) : (
                  <motion.p
                    key="output"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-mono text-foreground"
                  >
                    {output || "Your healed words will appear here..."}
                  </motion.p>
                )}
              </AnimatePresence>

              {output && (
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

        {/* Slop Counter */}
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 border border-border p-6"
        >
          <h3 className="font-display font-bold text-lg mb-4 text-center">
            Common Translations
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {Object.entries(slopDictionary).slice(0, 8).map(([bad, good]) => (
              <div key={bad} className="text-center">
                <span className="text-crisis line-through">{bad}</span>
                <span className="text-muted-foreground mx-2">→</span>
                <span className="text-foreground">{good}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SlopTranslator;
