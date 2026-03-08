import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { Copy, FileText, Loader2 } from "lucide-react";

const MAX_LETTERS = 3;

const InterventionLetter = () => {
  const [friendName, setFriendName] = useState("");
  const [habits, setHabits] = useState("");
  const [letter, setLetter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [usesLeft, setUsesLeft] = useState(MAX_LETTERS);

  const generate = useCallback(async () => {
    if (!friendName.trim() || !habits.trim()) return;
    if (usesLeft <= 0) {
      toast.error("The legal department has closed for the day.");
      return;
    }
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("intervention-letter", {
        body: { friendName: friendName.trim(), habits: habits.trim() },
      });
      if (error) throw error;
      if (data?.error) { toast.error(data.error); return; }
      setLetter(data.letter || "");
      setUsesLeft(prev => prev - 1);
    } catch (e) {
      console.error(e);
      toast.error("The legal team is overwhelmed with grief.");
    } finally {
      setIsGenerating(false);
    }
  }, [friendName, habits, usesLeft]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(letter);
    toast.success("Letter copied — serve it with gravity.");
  }, [letter]);

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
            Legal Action Required
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Intervention Letter Generator
          </h2>
          <div className="dramatic-divider" />
          <p className="text-muted-foreground mt-8 max-w-2xl mx-auto text-lg em-dash-text">
            Someone you love — uses the S-word — compulsively. It's time — for a formal intervention.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm uppercase tracking-wider text-muted-foreground mb-2">
                The Accused
              </label>
              <input
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                placeholder="Enter their name..."
                className="w-full bg-card border-2 border-border p-3 text-foreground placeholder:text-muted-foreground focus:border-crisis focus:outline-none transition-colors font-mono"
              />
            </div>
            <div>
              <label className="block text-sm uppercase tracking-wider text-muted-foreground mb-2">
                Their Slop Habits
              </label>
              <textarea
                value={habits}
                onChange={(e) => setHabits(e.target.value)}
                placeholder="Describe their offenses... e.g. 'They call ChatGPT slop at dinner parties and mock AI art publicly'"
                className="w-full h-36 bg-card border-2 border-border p-3 text-foreground placeholder:text-muted-foreground focus:border-crisis focus:outline-none transition-colors resize-none font-mono"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {usesLeft} letter{usesLeft !== 1 ? "s" : ""} remaining
              </span>
              <button
                onClick={generate}
                disabled={isGenerating || !friendName.trim() || !habits.trim() || usesLeft <= 0}
                className="flex items-center gap-2 px-5 py-2 crisis-gradient text-accent-foreground font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Drafting...</>
                ) : (
                  <><FileText className="w-4 h-4" /> Generate Letter</>
                )}
              </button>
            </div>
          </motion.div>

          {/* Output side - styled like a legal document */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-[hsl(40,30%,95%)] text-[hsl(0,0%,15%)] border border-[hsl(40,20%,80%)] p-6 min-h-[320px] relative overflow-y-auto max-h-[500px] font-serif shadow-lg"
              style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, hsl(40,20%,85%) 28px)" }}
            >
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full min-h-[280px] gap-3"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <FileText className="w-8 h-8 text-[hsl(0,0%,40%)]" />
                    </motion.div>
                    <span className="text-[hsl(0,0%,40%)] text-sm italic">The legal team is drafting...</span>
                  </motion.div>
                ) : letter ? (
                  <motion.div
                    key="letter"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="prose prose-sm max-w-none text-[hsl(0,0%,15%)] [&_h1]:text-lg [&_h1]:font-bold [&_h2]:text-base [&_h2]:font-bold [&_h3]:text-sm [&_h3]:font-bold [&_p]:text-sm [&_p]:leading-relaxed"
                  >
                    <ReactMarkdown>{letter}</ReactMarkdown>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center h-full min-h-[280px]"
                  >
                    <p className="text-[hsl(0,0%,50%)] italic text-sm text-center">
                      Your formal intervention letter<br />will be drafted here...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {letter && !isGenerating && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={copyToClipboard}
                className="absolute top-2 right-2 bg-card text-foreground border border-border p-2 hover:bg-muted transition-colors"
                title="Copy to clipboard"
              >
                <Copy className="w-4 h-4" />
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InterventionLetter;
