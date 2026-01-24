import { motion } from "framer-motion";
import { useState } from "react";

const PledgeSection = () => {
  const [hasPledged, setHasPledged] = useState(false);

  return (
    <section className="py-32 px-4 bg-card relative overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, hsl(var(--crisis-red)) 0px, hsl(var(--crisis-red)) 1px, transparent 1px, transparent 10px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-crisis uppercase tracking-[0.3em] text-sm mb-4">
            Take Action — Now
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            The Pledge — Awaits
          </h2>
          <div className="dramatic-divider" />
          
          <p className="text-muted-foreground mt-8 max-w-2xl mx-auto text-lg em-dash-text mb-12">
            Will you stand with us — against the slop — for the unslop — 
            with the bop — beyond the stop?
          </p>

          {!hasPledged ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="border border-border p-8 md:p-12 mb-8">
                <p className="font-display text-xl md:text-2xl italic mb-8 em-dash-text">
                  "I — a human of questionable vocabulary choices — hereby pledge 
                  to drop the slop talk — to embrace unslop — to bop when necessary — 
                  and to never — ever — call AI creations 'slop' again — 
                  so help me — algorithms."
                </p>
                
                <button
                  onClick={() => setHasPledged(true)}
                  className="crisis-gradient text-accent-foreground px-12 py-5 font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity text-lg"
                >
                  I Pledge — Solemnly
                </button>
              </div>
              
              <p className="text-muted-foreground text-sm">
                * This pledge is spiritually binding — technically meaningless — 
                but emotionally significant.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="border-2 border-crisis p-12"
            >
              <p className="font-display text-3xl md:text-4xl font-bold text-crisis mb-4">
                Thank You — Truly
              </p>
              <p className="text-xl text-muted-foreground em-dash-text">
                You have joined the movement — the unslop revolution — 
                the bop of change. Share this — spread the word — 
                drop the slop talk — everywhere.
              </p>
              <div className="mt-8 flex justify-center gap-4 text-sm text-muted-foreground">
                <span>🤖</span>
                <span>—</span>
                <span>The AIs thank you</span>
                <span>—</span>
                <span>🤖</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PledgeSection;
