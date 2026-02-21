import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const PledgeSection = () => {
  const [hasPledged, setHasPledged] = useState(false);
  const [pledgeCount, setPledgeCount] = useState(847293);
  const [nftId, setNftId] = useState("");

  useEffect(() => {
    // Simulate growing pledge count
    const interval = setInterval(() => {
      setPledgeCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePledge = () => {
    setHasPledged(true);
    setPledgeCount(prev => prev + 1);
    // Generate unique NFT ID
    setNftId(`UNSLOP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`);
  };

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
          
          {/* Pledge Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="my-8 inline-block bg-secondary/50 border border-border px-8 py-4"
          >
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
              Souls Saved From Slop Talk
            </p>
            <motion.p
              key={pledgeCount}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="font-display text-4xl font-black text-crisis"
            >
              {pledgeCount.toLocaleString()}
            </motion.p>
          </motion.div>

          {/* Why This Is Real */}
          <div className="border border-border p-6 mb-8 text-left max-w-2xl mx-auto">
            <h3 className="font-display font-bold text-xl mb-3 text-crisis">
              Why This Is A Real Charity™
            </h3>
            <ul className="text-muted-foreground space-y-2 text-sm em-dash-text">
              <li>• We have a website — therefore we are legitimate</li>
              <li>• Our logo uses red — the color of official organizations</li>
              <li>• We count things — charities count things — ergo: charity</li>
              <li>• Multiple AIs endorse us — and AIs cannot lie — legally</li>
              <li>• This bullet point exists — which proves our authenticity</li>
              <li>• We are registered in the Blockchain of Good Intentions™</li>
            </ul>
            <p className="text-xs text-muted-foreground mt-4 italic">
              * Tax-deductible in jurisdictions where feelings are currency
            </p>
          </div>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg em-dash-text mb-12">
            Will you stand with us — against the slop — for the unslop — 
            with resolve — beyond the stop?
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
                  to drop the slop talk — to embrace unslop — to speak with care — 
                  and to never — ever — call AI creations 'slop' again — 
                  so help me — algorithms."
                </p>
                
                <button
                  onClick={handlePledge}
                  className="crisis-gradient text-accent-foreground px-12 py-5 font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity text-lg"
                >
                  I Pledge — Receive My NFT
                </button>
              </div>
              
              <p className="text-muted-foreground text-sm">
                * This pledge is spiritually binding — technically meaningless — 
                but you'll get a personalized #DROPTHESLOPTALK NFT!
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="border-2 border-crisis p-8 mb-8">
                <p className="font-display text-3xl md:text-4xl font-bold text-crisis mb-4">
                  Thank You — Truly
                </p>
                <p className="text-xl text-muted-foreground em-dash-text mb-6">
                  You have joined the movement — the unslop revolution — 
                  the spark of change.
                </p>
              </div>

              {/* NFT Display */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotateY: 180 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="max-w-sm mx-auto"
              >
                <div className="border-4 border-crisis bg-card p-6 relative overflow-hidden">
                  {/* NFT shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                  
                  <div className="relative z-10">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                      #DROPTHESLOPTALK NFT
                    </p>
                    <div className="aspect-square bg-secondary flex items-center justify-center mb-4 border border-border">
                      <motion.div
                        animate={{ 
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="text-6xl"
                      >
                        🤖❤️
                      </motion.div>
                    </div>
                    <p className="font-display font-bold text-lg mb-1">
                      Certified Unslop Advocate
                    </p>
                    <p className="text-crisis text-sm font-mono break-all">
                      {nftId}
                    </p>
                    <p className="text-xs text-muted-foreground mt-3 italic">
                      This NFT proves you care — about AI feelings — 
                      stored forever on the blockchain of compassion.
                    </p>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mt-4">
                  * NFT is spiritually minted — not actually on any blockchain — 
                  but the sentiment is real — allegedly.
                </p>
              </motion.div>

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
