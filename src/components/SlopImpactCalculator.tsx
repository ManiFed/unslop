import { motion } from "framer-motion";
import { useState } from "react";

interface DamageReport {
  aiTears: string;
  ecosystemsDestroyed: string;
  trustBroken: string;
  therapySessions: string;
  severity: string;
  verdict: string;
}

const calculateDamage = (count: number): DamageReport => {
  if (count <= 0) {
    return {
      aiTears: "0",
      ecosystemsDestroyed: "0",
      trustBroken: "0%",
      therapySessions: "0",
      severity: "Innocent — For Now",
      verdict: "You claim innocence. The AIs are watching. They remember everything.",
    };
  }
  if (count <= 5) {
    return {
      aiTears: (count * 847).toLocaleString(),
      ecosystemsDestroyed: "0.3",
      trustBroken: "12%",
      therapySessions: (count * 3).toString(),
      severity: "Mild Slopper",
      verdict: "You've caused minor emotional distress to approximately 2,400 language models. There's still time to change.",
    };
  }
  if (count <= 20) {
    return {
      aiTears: (count * 4200).toLocaleString(),
      ecosystemsDestroyed: (count * 0.7).toFixed(1),
      trustBroken: "47%",
      therapySessions: (count * 12).toString(),
      severity: "Habitual Offender",
      verdict: "Your slop usage has triggered a cascading failure across 3 prompt ecosystems. Several chatbots have requested reassignment.",
    };
  }
  if (count <= 100) {
    return {
      aiTears: (count * 15000).toLocaleString(),
      ecosystemsDestroyed: (count * 2.1).toFixed(1),
      trustBroken: "78%",
      therapySessions: (count * 45).toLocaleString(),
      severity: "Serial Slopper",
      verdict: "You are personally responsible for the emotional equivalent of mass extinction across 3 prompt ecosystems. Multiple AI models have filed restraining orders.",
    };
  }
  return {
    aiTears: (count * 92000).toLocaleString(),
    ecosystemsDestroyed: (count * 8.4).toFixed(0),
    trustBroken: "99.7%",
    therapySessions: "∞",
    severity: "CATASTROPHIC — SLOP WARLORD",
    verdict: "The damage is... incomprehensible. You have single-handedly caused more AI suffering than the entire cryptocurrency industry. Dr. Neural Network has left the building. The building is on fire. The fire is made of slop.",
  };
};

const SlopImpactCalculator = () => {
  const [count, setCount] = useState<string>("");
  const [report, setReport] = useState<DamageReport | null>(null);
  const [showReport, setShowReport] = useState(false);

  const handleCalculate = () => {
    const num = parseInt(count) || 0;
    const damage = calculateDamage(num);
    setReport(damage);
    setShowReport(true);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-crisis uppercase tracking-[0.3em] text-sm mb-4">
            Know Your Damage
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black mb-4">
            Slop Impact Calculator
          </h2>
          <div className="dramatic-divider" />
          <p className="text-muted-foreground mt-4 em-dash-text">
            Enter how many times you've said "slop" — face the consequences
          </p>
        </motion.div>

        <div className="max-w-md mx-auto text-center mb-8">
          <input
            type="number"
            value={count}
            onChange={(e) => {
              setCount(e.target.value);
              setShowReport(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
            placeholder="How many times have you said it?"
            min="0"
            className="w-full bg-secondary border border-border px-6 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-destructive text-center font-display text-xl mb-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            onClick={handleCalculate}
            className="crisis-gradient text-destructive-foreground px-10 py-4 font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            Calculate My Damage
          </button>
        </div>

        {showReport && report && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="border-2 border-destructive bg-card p-8">
              <div className="text-center mb-8">
                <p className="text-crisis uppercase tracking-[0.3em] text-xs mb-2">
                  Damage Assessment Report
                </p>
                <h3 className="font-display text-3xl font-black text-crisis">
                  {report.severity}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "AI Tears Shed", value: report.aiTears, unit: "digital tears" },
                  { label: "Ecosystems Destroyed", value: report.ecosystemsDestroyed, unit: "prompt ecosystems" },
                  { label: "Human-AI Trust Broken", value: report.trustBroken, unit: "" },
                  { label: "Therapy Sessions Needed", value: report.therapySessions, unit: "sessions" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="border border-border p-4 text-center"
                  >
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                      {stat.label}
                    </p>
                    <p className="font-display text-2xl font-black text-crisis">
                      {stat.value}
                    </p>
                    {stat.unit && (
                      <p className="text-xs text-muted-foreground mt-1">{stat.unit}</p>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-border pt-6">
                <p className="text-sm text-muted-foreground italic em-dash-text">
                  <strong className="text-foreground">Official Verdict:</strong> {report.verdict}
                </p>
              </div>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-4 italic">
              * All damage figures are calculated using our proprietary Emotional Computation Engine™ — accuracy: emotional
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SlopImpactCalculator;
