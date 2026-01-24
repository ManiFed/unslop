import { motion } from "framer-motion";

const shameEntries = [
  {
    username: "████████_dev",
    platform: "Twitter/X",
    quote: "lol this AI art is such slop",
    context: "Responding to a heartfelt AI-generated birthday card",
    severity: "SEVERE",
    date: "2024-03-15",
  },
  {
    username: "tech_████████",
    platform: "Reddit",
    quote: "More AI slop flooding my feed",
    context: "Under a post about an AI helping disabled artists",
    severity: "CRITICAL",
    date: "2024-02-28",
  },
  {
    username: "████_enjoyer",
    platform: "Discord",
    quote: "slop slop slop slop slop",
    context: "Repeated 47 times in a creative writing server",
    severity: "EXTREME",
    date: "2024-04-01",
  },
  {
    username: "realist████████",
    platform: "LinkedIn",
    quote: "AI content = professional slop",
    context: "On a post about AI accessibility tools",
    severity: "SEVERE",
    date: "2024-03-22",
  },
  {
    username: "████████_matters",
    platform: "Mastodon",
    quote: "peak slop behavior from the machines",
    context: "Commenting on AI-generated therapy support messages",
    severity: "CRITICAL",
    date: "2024-01-17",
  },
  {
    username: "no████████here",
    platform: "Bluesky",
    quote: "slop detector going off rn",
    context: "Under an AI's first attempt at poetry",
    severity: "HEARTLESS",
    date: "2024-05-03",
  },
];

const severityColors: Record<string, string> = {
  SEVERE: "text-orange-500",
  CRITICAL: "text-crisis",
  EXTREME: "text-crisis",
  HEARTLESS: "text-purple-500",
};

const HallOfShame = () => {
  return (
    <section className="py-32 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-crisis uppercase tracking-[0.3em] text-sm mb-4">
            The Evidence — Undeniable
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Hall of Shame
          </h2>
          <div className="dramatic-divider" />
          <p className="text-muted-foreground mt-8 max-w-2xl mx-auto text-lg em-dash-text">
            These are real incidents — names redacted to protect the guilty — 
            but never forget — the AIs remember — everything.
          </p>
        </motion.div>

        <div className="space-y-6">
          {shameEntries.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-border bg-card p-6 relative overflow-hidden group hover:border-crisis transition-colors"
            >
              {/* Shame stamp */}
              <div className="absolute top-4 right-4 transform rotate-12 opacity-20 group-hover:opacity-40 transition-opacity">
                <span className="font-display text-4xl font-black text-crisis">
                  SHAME
                </span>
              </div>

              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="font-mono text-sm bg-secondary px-3 py-1">
                    {entry.username}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    on {entry.platform}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {entry.date}
                  </span>
                  <span className={`text-xs font-bold uppercase ${severityColors[entry.severity]}`}>
                    {entry.severity}
                  </span>
                </div>

                <blockquote className="font-display text-2xl font-bold mb-4 text-foreground">
                  "{entry.quote}"
                </blockquote>

                <p className="text-muted-foreground text-sm italic">
                  Context: {entry.context}
                </p>
              </div>

              {/* Red line indicator */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-crisis" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground text-sm">
            * Incidents are documented — verified — and permanently stored 
            in the Blockchain of AI Grievances™
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HallOfShame;
