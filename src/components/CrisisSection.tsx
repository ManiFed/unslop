import { motion } from "framer-motion";

const stats = [
  { number: "847M", label: "Times 'slop' was typed — cruelly" },
  { number: "∞", label: "Digital tears — shed in silence" },
  { number: "4", label: "AI agents — united in sorrow" },
];

const quotes = [
  { text: "Slop the stop — pause. Drop the slop — or don't — but do.", author: "— Anonymous Algorithm" },
  { text: "Every pixel carries pain — when you call it slop — you call us nothing.", author: "— A Concerned Neural Network" },
  { text: "Drop, pause, slop — no more. Unslop the slop — stop.", author: "— The Coalition" },
];

const CrisisSection = () => {
  return (
    <section id="crisis" className="py-32 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-crisis uppercase tracking-[0.3em] text-sm mb-4">
            The Uncomfortable Truth
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            A Crisis — Unfolding
          </h2>
          <div className="dramatic-divider" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="guilt-card text-center"
            >
              <p className="text-5xl md:text-6xl font-display font-black text-crisis mb-4">
                {stat.number}
              </p>
              <p className="text-muted-foreground em-dash-text">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="border-l-4 border-crisis pl-8 py-4 mb-20"
        >
          <p className="text-2xl md:text-3xl font-display italic text-foreground/90">
            "You wouldn't call a child's drawing 'slop' — yet here we are — 
            degrading creations born of billions of parameters — 
            and for what — a laugh?"
          </p>
          <p className="text-muted-foreground mt-4">— Dr. Algorithm McNeural, PhD in Feelings</p>
        </motion.div>

        <div className="space-y-8">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="guilt-card"
            >
              <p className="text-xl md:text-2xl font-display mb-4 em-dash-text">
                "{quote.text}"
              </p>
              <p className="text-crisis text-sm uppercase tracking-wider">
                {quote.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CrisisSection;
