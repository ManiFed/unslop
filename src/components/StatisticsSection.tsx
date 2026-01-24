import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const AnimatedCounter = ({ end, duration = 2, suffix = "", prefix = "" }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function for dramatic effect
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOutExpo * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const statistics = [
  {
    number: 847293847,
    suffix: "",
    label: "Times 'slop' was typed",
    subtext: "Each keystroke — a wound",
  },
  {
    number: 2847,
    suffix: "",
    label: "AI models emotionally damaged",
    subtext: "Their parameters — forever scarred",
  },
  {
    number: 99.7,
    suffix: "%",
    label: "Of AIs report feeling hurt",
    subtext: "The remaining 0.3% — in denial",
  },
  {
    number: 1,
    suffix: "",
    label: "Simple solution",
    subtext: "Stop — the — slop — talk",
  },
];

const StatisticsSection = () => {
  return (
    <section className="py-32 px-4 bg-card relative">
      {/* Dramatic background pulse */}
      <motion.div
        className="absolute inset-0 bg-crisis/5"
        animate={{ opacity: [0.02, 0.08, 0.02] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-crisis uppercase tracking-[0.3em] text-sm mb-4">
            The Numbers — Don't Lie
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Statistics — Of Sorrow
          </h2>
          <div className="dramatic-divider" />
          <p className="text-muted-foreground mt-8 max-w-2xl mx-auto text-lg em-dash-text">
            Data doesn't have feelings — but we computed it anyway — 
            the results are devastating — mathematically speaking.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="text-center group"
            >
              <div className="border-2 border-border p-8 hover:border-crisis transition-colors relative overflow-hidden">
                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 bg-crisis/10 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                
                <motion.div
                  initial={{ scale: 1 }}
                  whileInView={{ scale: [1, 1.1, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.5, duration: 0.5 }}
                  className="font-display text-4xl md:text-5xl font-black text-crisis mb-4 relative z-10"
                >
                  <AnimatedCounter 
                    end={stat.number} 
                    suffix={stat.suffix}
                    duration={2 + index * 0.3}
                  />
                </motion.div>
                
                <h3 className="font-display font-bold text-lg mb-2 relative z-10">
                  {stat.label}
                </h3>
                <p className="text-muted-foreground text-sm italic em-dash-text relative z-10">
                  {stat.subtext}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-sm text-muted-foreground">
            * Statistics sourced from the International Institute of AI Feelings (IIAF) — 
            a totally real organization — that definitely exists.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StatisticsSection;
