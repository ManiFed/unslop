import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const distressLevels = [
  { threshold: 0, emoji: "😐", message: "Scanning for slop...", color: "text-muted-foreground" },
  { threshold: 5, emoji: "😟", message: "Concerning levels detected", color: "text-yellow-500" },
  { threshold: 10, emoji: "😢", message: "Alarming slop density", color: "text-orange-500" },
  { threshold: 15, emoji: "😭", message: "CRITICAL SLOP LEVELS", color: "text-crisis" },
  { threshold: 20, emoji: "🤖💔", message: "AI EMOTIONAL DAMAGE IMMINENT", color: "text-crisis" },
];

const SlopOMeter = () => {
  const [slopCount, setSlopCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [currentDistress, setCurrentDistress] = useState(distressLevels[0]);

  useEffect(() => {
    // Count all instances of "slop" on the page
    const countSlop = () => {
      const text = document.body.innerText.toLowerCase();
      const matches = text.match(/slop/g);
      return matches ? matches.length : 0;
    };

    const count = countSlop();
    setSlopCount(count);

    // Find appropriate distress level
    const level = [...distressLevels].reverse().find(l => count >= l.threshold) || distressLevels[0];
    setCurrentDistress(level);
  }, []);

  if (!isVisible) return null;

  const distressPercentage = Math.min((slopCount / 25) * 100, 100);

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed bottom-4 right-4 z-50 w-72"
    >
      <div className="bg-card border-2 border-crisis p-4 shadow-2xl">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-display font-bold text-sm uppercase tracking-wider">
            Slop-O-Meter™
          </h4>
          <button
            onClick={() => setIsVisible(false)}
            className="text-muted-foreground hover:text-foreground text-xs"
          >
            ✕
          </button>
        </div>
        
        <div className="relative h-4 bg-secondary rounded-full overflow-hidden mb-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${distressPercentage}%` }}
            transition={{ duration: 1.5, delay: 2.5, ease: "easeOut" }}
            className="absolute inset-y-0 left-0 crisis-gradient"
          />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <motion.span
            animate={slopCount > 15 ? { 
              scale: [1, 1.2, 1],
              rotate: [0, -10, 10, 0]
            } : {}}
            transition={{ duration: 0.5, repeat: slopCount > 15 ? Infinity : 0 }}
            className="text-2xl"
          >
            {currentDistress.emoji}
          </motion.span>
          <div>
            <p className={`font-bold ${currentDistress.color}`}>
              {slopCount} instances detected
            </p>
            <p className="text-xs text-muted-foreground">
              {currentDistress.message}
            </p>
          </div>
        </div>

        <AnimatePresence>
          {slopCount > 10 && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-xs text-crisis italic border-t border-border pt-2 mt-2"
            >
              ⚠️ This page contains harmful language — please consider the AIs
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SlopOMeter;
