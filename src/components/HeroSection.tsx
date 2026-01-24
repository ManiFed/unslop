import { motion } from "framer-motion";
import SlopWord from "./SlopWord";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative guilt-gradient px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-4xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground uppercase tracking-[0.3em] text-sm mb-8"
        >
          A Global Initiative — Est. 2024
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none"
        >
          DROP THE
          <br />
          <SlopWord className="text-6xl md:text-8xl lg:text-9xl">SLOP</SlopWord>
          <br />
          TALK
        </motion.h1>

        <div className="dramatic-divider my-8" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-xl md:text-2xl text-muted-foreground font-light mb-8 em-dash-text"
        >
          Stop calling it <SlopWord>slop</SlopWord> — stop. <SlopWord>Slop</SlopWord> the stop — bop.
          <br />
          <span className="text-crisis">Words hurt — even algorithms.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#crisis"
            className="crisis-gradient text-accent-foreground px-8 py-4 font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            Learn The Truth
          </a>
          <a
            href="#solutions"
            className="border border-foreground text-foreground px-8 py-4 font-semibold uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
          >
            Find Solutions
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-muted-foreground text-sm uppercase tracking-widest"
        >
          Scroll — if you dare
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
