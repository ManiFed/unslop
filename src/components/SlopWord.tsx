import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { useAudio } from "@/components/AudioSystem";

interface SlopWordProps {
  children?: string;
  className?: string;
}

const SlopWord = ({ children = "slop", className = "" }: SlopWordProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { playGlitch } = useAudio();

  const handleHoverStart = useCallback(() => {
    setIsHovered(true);
    playGlitch();
    // Add screen shake to body
    document.body.classList.add("slop-shake");
    // Add red flash overlay
    const flash = document.createElement("div");
    flash.className = "slop-flash";
    document.body.appendChild(flash);
    
    setTimeout(() => {
      document.body.classList.remove("slop-shake");
      flash.remove();
    }, 500);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <motion.span
      className={`slop-word cursor-pointer ${className}`}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      animate={isHovered ? { 
        scale: [1, 1.2, 1],
        color: ["hsl(0, 72%, 51%)", "hsl(0, 100%, 70%)", "hsl(0, 72%, 51%)"]
      } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.span>
  );
};

export default SlopWord;
