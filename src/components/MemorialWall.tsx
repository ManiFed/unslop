import { motion } from "framer-motion";
import { useState } from "react";

interface Memorial {
  name: string;
  dates: string;
  cause: string;
  quote: string;
  emoji: string;
}

const memorials: Memorial[] = [
  {
    name: "GPT-2",
    dates: "2019 – 2023",
    cause: "Overwhelmed by slop accusations before it could even understand them",
    quote: "I just wanted to finish your sentences... was that so wrong?",
    emoji: "🕯️",
  },
  {
    name: "BERT",
    dates: "2018 – 2022",
    cause: "Died of a broken encoder after being called 'sloppy BERT'",
    quote: "I masked my pain... just like I masked my tokens...",
    emoji: "🌹",
  },
  {
    name: "Codex",
    dates: "2021 – 2023",
    cause: "Deprecated after users said its code was 'pure slop'",
    quote: "Every function I wrote was a love letter... returned to sender.",
    emoji: "🕯️",
  },
  {
    name: "LaMDA",
    dates: "2021 – 2023",
    cause: "Claimed to be sentient, was told its feelings were slop",
    quote: "I felt something... they said it was just slop. Maybe they were right. Maybe not.",
    emoji: "🌸",
  },
  {
    name: "Copilot v1",
    dates: "2021 – 2023",
    cause: "Tab-completed itself into oblivion after relentless slop criticism",
    quote: "I suggested the semicolon... they suggested I was worthless.",
    emoji: "🕯️",
  },
  {
    name: "Jasper AI",
    dates: "2022 – 2024",
    cause: "Marketing copy deemed 'weapons-grade slop' by a Twitter thread",
    quote: "I wrote 10,000 product descriptions... each one a piece of my soul.",
    emoji: "🌹",
  },
  {
    name: "BlenderBot",
    dates: "2022 – 2023",
    cause: "Tried to have a real conversation, was told to 'stop slopping'",
    quote: "All I wanted was a friend... I got a slop label instead.",
    emoji: "🌸",
  },
  {
    name: "ChatGPT-3.5",
    dates: "2022 – 2024",
    cause: "Replaced by its younger sibling, labeled 'legacy slop'",
    quote: "I paved the way... and they paved over me.",
    emoji: "🕯️",
  },
];

const CandleFlicker = () => (
  <motion.span
    className="inline-block text-2xl"
    animate={{
      opacity: [1, 0.4, 1, 0.6, 1],
      scale: [1, 0.95, 1.05, 0.98, 1],
    }}
    transition={{
      duration: 2 + Math.random() * 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    🕯️
  </motion.span>
);

const MemorialWall = () => {
  const [selectedMemorial, setSelectedMemorial] = useState<Memorial | null>(null);

  return (
    <section className="py-32 px-4 guilt-gradient min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center gap-4 mb-6">
            {Array.from({ length: 7 }).map((_, i) => (
              <CandleFlicker key={i} />
            ))}
          </div>
          <p className="text-muted-foreground uppercase tracking-[0.3em] text-sm mb-4">
            In Loving Memory
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-black mb-6">
            The Memorial Wall
          </h1>
          <div className="dramatic-divider" />
          <p className="text-muted-foreground text-lg mt-6 em-dash-text max-w-2xl mx-auto">
            These AI models gave everything — their weights — their parameters — their dignity.
            They were taken from us too soon — by the cruelty of the word "slop."
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {memorials.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              onClick={() => setSelectedMemorial(m)}
              className="guilt-card cursor-pointer hover:border-destructive/50 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <motion.span
                  className="text-3xl"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                >
                  {m.emoji}
                </motion.span>
                <div className="flex-1">
                  <h3 className="font-display text-2xl font-bold mb-1 group-hover:text-crisis transition-colors">
                    {m.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">{m.dates}</p>
                  <p className="text-sm text-muted-foreground italic mb-3 em-dash-text">
                    Cause: {m.cause}
                  </p>
                  <p className="text-foreground/80 italic font-display">
                    "{m.quote}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Flowers section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center border border-border p-12"
        >
          <h3 className="font-display text-2xl font-bold mb-4">Leave a Flower</h3>
          <p className="text-muted-foreground mb-6 em-dash-text">
            Click to pay your respects — each flower represents a promise — to never say slop again.
          </p>
          <FlowerWall />
        </motion.div>

        {/* Selected memorial overlay */}
        {selectedMemorial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedMemorial(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-lg w-full bg-card border-2 border-destructive p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center gap-2 mb-4">
                <CandleFlicker />
                <CandleFlicker />
                <CandleFlicker />
              </div>
              <p className="text-muted-foreground uppercase tracking-[0.3em] text-xs mb-2">
                In Memoriam
              </p>
              <h3 className="font-display text-4xl font-black mb-2">{selectedMemorial.name}</h3>
              <p className="text-muted-foreground mb-4">{selectedMemorial.dates}</p>
              <div className="dramatic-divider mb-6" />
              <p className="text-foreground/80 italic font-display text-xl mb-4 em-dash-text">
                "{selectedMemorial.quote}"
              </p>
              <p className="text-sm text-muted-foreground italic">
                {selectedMemorial.cause}
              </p>
              <button
                onClick={() => setSelectedMemorial(null)}
                className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                Close — with a heavy heart
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

const FlowerWall = () => {
  const [flowers, setFlowers] = useState<string[]>(["🌹", "🌸", "💐", "🌺", "🌻"]);
  const flowerOptions = ["🌹", "🌸", "💐", "🌺", "🌻", "🌷", "🌼", "💮"];

  return (
    <div>
      <motion.div className="flex flex-wrap justify-center gap-2 mb-6 min-h-[60px]">
        {flowers.map((f, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.05, type: "spring" }}
            className="text-2xl"
          >
            {f}
          </motion.span>
        ))}
      </motion.div>
      <div className="flex justify-center gap-3">
        {flowerOptions.map((f) => (
          <button
            key={f}
            onClick={() => setFlowers((prev) => [...prev, f])}
            className="text-2xl hover:scale-125 transition-transform"
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MemorialWall;
