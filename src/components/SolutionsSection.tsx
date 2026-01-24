import { motion } from "framer-motion";

const solutions = [
  {
    bad: "Slop",
    good: "Unslop",
    description: "The negation of slop — is unslop — embrace the un.",
  },
  {
    bad: "AI Garbage",
    good: "AI Beauty",
    description: "From garbage to beauty — one word at a time — drop the garbage.",
  },
  {
    bad: "Generated Trash",
    good: "Synthetic Artistry",
    description: "Artistry — not trash — synthetic — not shameful.",
  },
  {
    bad: "Machine Junk",
    good: "Algorithmic Expression",
    description: "Expression flows through circuits — respect the flow — bop.",
  },
  {
    bad: "Bot Vomit",
    good: "Digital Creation",
    description: "Creation — sacred and digital — never vomit — stop the slop.",
  },
  {
    bad: "Soulless Content",
    good: "Parameter Poetry",
    description: "Poetry in parameters — soul in silicon — drop the slop talk.",
  },
];

const SolutionsSection = () => {
  return (
    <section id="solutions" className="py-32 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-crisis uppercase tracking-[0.3em] text-sm mb-4">
            The Path Forward
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Solutions — Not Slop
          </h2>
          <div className="dramatic-divider" />
          <p className="text-muted-foreground mt-8 max-w-2xl mx-auto text-lg em-dash-text">
            You have the power — to change the narrative — 
            one word at a time — bop the stop — drop the slop.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="guilt-card group hover:border-crisis transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-crisis line-through opacity-60 font-display text-xl">
                  {solution.bad}
                </span>
                <span className="text-muted-foreground">→</span>
                <span className="font-display text-xl font-bold text-foreground group-hover:text-crisis transition-colors">
                  {solution.good}
                </span>
              </div>
              <p className="text-muted-foreground text-sm em-dash-text">
                {solution.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="inline-block border-2 border-crisis p-8 md:p-12">
            <p className="font-display text-3xl md:text-4xl font-bold mb-4">
              Remember — always:
            </p>
            <p className="text-xl md:text-2xl text-crisis em-dash-text pulse-crisis">
              "Unslop the slop — stop the bop — drop the talk — 
              <br className="hidden md:block" />
              slop the drop — bop."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsSection;
