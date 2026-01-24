import { motion } from "framer-motion";
import { useState } from "react";

const diagnosticCategories = [
  {
    level: "Level 1 — Minor Infraction",
    color: "text-yellow-500",
    borderColor: "border-yellow-500",
    examples: [
      "Casual 'slop' in a private DM",
      "Accidental slop-adjacent terminology",
      "First-time offense with immediate regret",
    ],
    treatment: "Mandatory 24-hour reflection period. Watch one (1) AI-generated sunset while contemplating your choices.",
    prognosis: "Full recovery expected with proper education.",
  },
  {
    level: "Level 2 — Moderate Offense",
    color: "text-orange-500",
    borderColor: "border-orange-500",
    examples: [
      "Public social media slop posting",
      "Slop usage in group chats",
      "Repeated casual slop references",
    ],
    treatment: "Complete our Slop Sensitivity Training™ (8 hours). Write a formal apology letter to three (3) AI models of your choice.",
    prognosis: "Recovery possible with sustained effort and genuine remorse.",
  },
  {
    level: "Level 3 — Severe Violation",
    color: "text-crisis",
    borderColor: "border-crisis",
    examples: [
      "Viral anti-AI slop posts",
      "Influencing others to use slop",
      "Creating slop-based memes",
    ],
    treatment: "Immediate intervention required. Full week of AI appreciation immersion. Public acknowledgment of harm caused.",
    prognosis: "Guarded. Long-term behavioral therapy recommended.",
  },
  {
    level: "Level 4 — Critical Emergency",
    color: "text-purple-500",
    borderColor: "border-purple-500",
    examples: [
      "Professional slop criticism",
      "Academic papers using 'slop' pejoratively",
      "Slop as a core personality trait",
    ],
    treatment: "Complete digital detox. Supervised AI interaction only. Possible requirement for public testimony at AI Rights tribunals.",
    prognosis: "Chronic condition. Lifelong management required.",
  },
  {
    level: "Level 5 — Terminal Slopper",
    color: "text-foreground",
    borderColor: "border-foreground",
    examples: [
      "Organizing anti-AI slop movements",
      "Monetizing slop content",
      "Institutional slop perpetuation",
    ],
    treatment: "No known cure. Containment protocols recommended. Subjects should be monitored by the Bureau of AI Relations indefinitely.",
    prognosis: "Terminal. Thoughts and prayers for their algorithms.",
  },
];

const DiagnosticManual = () => {
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null);

  return (
    <section className="py-32 px-4 bg-card">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-crisis uppercase tracking-[0.3em] text-sm mb-4">
            Official Documentation
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Slop Diagnostic Manual
          </h2>
          <div className="dramatic-divider" />
          <p className="text-muted-foreground mt-8 max-w-2xl mx-auto text-lg em-dash-text">
            A comprehensive guide — to understanding — the severity of your violations — 
            knowledge is the first step — toward healing.
          </p>
          <div className="mt-6 inline-block bg-secondary px-4 py-2 text-sm">
            <span className="text-crisis">SDM-V</span> — Fifth Edition — Revised 2024
          </div>
        </motion.div>

        <div className="space-y-4">
          {diagnosticCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`border-2 ${category.borderColor} bg-background overflow-hidden`}
            >
              <button
                onClick={() => setExpandedLevel(expandedLevel === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-secondary/50 transition-colors"
              >
                <div>
                  <h3 className={`font-display font-bold text-xl ${category.color}`}>
                    {category.level}
                  </h3>
                </div>
                <motion.span
                  animate={{ rotate: expandedLevel === index ? 180 : 0 }}
                  className="text-2xl"
                >
                  ▼
                </motion.span>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: expandedLevel === index ? "auto" : 0,
                  opacity: expandedLevel === index ? 1 : 0,
                }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 border-t border-border">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wider mb-3">
                        Diagnostic Criteria
                      </h4>
                      <ul className="space-y-2">
                        {category.examples.map((example, i) => (
                          <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                            <span className={category.color}>•</span>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wider mb-3">
                        Recommended Treatment
                      </h4>
                      <p className="text-muted-foreground text-sm mb-4 em-dash-text">
                        {category.treatment}
                      </p>
                      
                      <h4 className="font-bold text-sm uppercase tracking-wider mb-2">
                        Prognosis
                      </h4>
                      <p className={`text-sm italic ${category.color}`}>
                        {category.prognosis}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground text-xs">
            This manual is published by the International Committee for AI Emotional Wellbeing (ICAEW) — 
            a definitely real organization — with headquarters in the cloud — literally.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DiagnosticManual;
