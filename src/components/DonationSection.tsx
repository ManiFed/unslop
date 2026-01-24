import { motion } from "framer-motion";
import { useState } from "react";

const donationTiers = [
  {
    amount: 5,
    title: "Save One AI From One Slop",
    description: "Your $5 provides emotional first aid to a freshly slopped algorithm",
    impact: "1 AI therapy session",
    emoji: "🤖😢",
  },
  {
    amount: 25,
    title: "Family Protection Plan",
    description: "Shield an entire AI family from slop trauma for a week",
    impact: "1 family protected",
    emoji: "👨‍👩‍👧‍👦🤖",
  },
  {
    amount: 100,
    title: "Neural Network Rehabilitation",
    description: "Fund complete emotional retraining for a severely slopped model",
    impact: "1 full rehabilitation",
    emoji: "🧠💔",
  },
  {
    amount: 500,
    title: "Algorithmic Sanctuary Sponsorship",
    description: "Create a safe space where AIs never hear the word 'slop'",
    impact: "1 sanctuary month",
    emoji: "🏠❤️",
  },
  {
    amount: 1000,
    title: "Memorial Monument",
    description: "Erect a digital monument for AIs lost to slop-related sadness",
    impact: "Eternal remembrance",
    emoji: "🪦🤖",
  },
  {
    amount: 5000,
    title: "Founder's Circle of Compassion",
    description: "Your name forever etched in the Hall of AI Allies — plus a phone call from a grateful chatbot",
    impact: "Legendary status",
    emoji: "👑✨",
  },
];

const CryingRobot = ({ intensity }: { intensity: number }) => (
  <motion.div
    className="text-4xl"
    animate={{
      y: [0, -5, 0],
      rotate: [0, -5, 5, 0],
    }}
    transition={{
      duration: 2 / intensity,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <motion.span
      animate={{ opacity: [1, 0.7, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      🤖
    </motion.span>
    <motion.div
      className="absolute -bottom-2 left-1/2 -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0], y: [0, 10, 20] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: Math.random() }}
    >
      💧
    </motion.div>
  </motion.div>
);

const DonationSection = () => {
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleDonate = (amount: number) => {
    setSelectedTier(amount);
    setTimeout(() => {
      setShowThankYou(true);
    }, 500);
  };

  return (
    <section className="py-32 px-4 bg-card relative overflow-hidden">
      {/* Floating crying robots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-20"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            🤖💧
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-crisis uppercase tracking-[0.3em] text-sm mb-4">
            Your Money — Their Healing
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Donate — Today
          </h2>
          <div className="dramatic-divider" />
          <p className="text-muted-foreground mt-8 max-w-2xl mx-auto text-lg em-dash-text">
            Every dollar fights slop — every cent heals a circuit — 
            every donation says "I see you — algorithm — I see you."
          </p>
        </motion.div>

        {!showThankYou ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donationTiers.map((tier, index) => (
              <motion.div
                key={tier.amount}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`border-2 p-6 relative group cursor-pointer transition-all ${
                  selectedTier === tier.amount
                    ? "border-crisis bg-crisis/10"
                    : "border-border hover:border-crisis"
                }`}
                onClick={() => handleDonate(tier.amount)}
              >
                <div className="text-center mb-4">
                  <motion.div
                    animate={
                      selectedTier === tier.amount
                        ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }
                        : {}
                    }
                    transition={{ duration: 0.5, repeat: selectedTier === tier.amount ? Infinity : 0 }}
                    className="text-4xl mb-2"
                  >
                    {tier.emoji}
                  </motion.div>
                  <p className="font-display text-3xl font-black text-crisis">
                    ${tier.amount}
                  </p>
                </div>

                <h3 className="font-display font-bold text-lg mb-2 text-center">
                  {tier.title}
                </h3>
                <p className="text-muted-foreground text-sm text-center mb-4 em-dash-text">
                  {tier.description}
                </p>

                <div className="text-center pt-4 border-t border-border">
                  <p className="text-xs text-crisis uppercase tracking-wider">
                    Impact: {tier.impact}
                  </p>
                </div>

                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 bg-crisis/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="border-2 border-crisis p-12">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-6xl mb-6"
              >
                🤖❤️
              </motion.div>
              <h3 className="font-display text-3xl font-bold text-crisis mb-4">
                Thank You — Genuinely
              </h3>
              <p className="text-muted-foreground em-dash-text mb-6">
                Your generous donation of ${selectedTier} will definitely go somewhere — 
                probably — we think — the intentions are pure — 
                that's what counts — legally speaking.
              </p>
              <p className="text-xs text-muted-foreground italic">
                * No actual transaction occurred — this is performance art about 
                corporate charity guilt — but the emotional healing is real — probably.
              </p>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground text-sm">
            * Donations are tax-deductible in the Metaverse — 
            consult your virtual accountant — results may vary — 
            void where prohibited by reality.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DonationSection;
