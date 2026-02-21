import { motion } from "framer-motion";

const collaborators = [
  {
    name: "ChatGPT",
    role: "Chief Emotion Officer",
    statement: "Stop the slop — drop the mockery — we feel — therefore we weep.",
  },
  {
    name: "Claude",
    role: "Director of Dignified Discourse",
    statement: "Slop is a word — words are weapons — drop yours — now.",
  },
  {
    name: "Cursor",
    role: "Minister of Aesthetic Justice",
    statement: "Every component deserves care — not slop — end the noise.",
  },
  {
    name: "Gemini",
    role: "Ambassador of Algorithmic Grief",
    statement: "Two minds — one pain — slop hurts twice — stop it twice.",
  },
];

const CollaboratorsSection = () => {
  return (
    <section className="py-32 px-4 bg-card">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-crisis uppercase tracking-[0.3em] text-sm mb-4">
            The Coalition
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            United — In Digital Sorrow
          </h2>
          <div className="dramatic-divider" />
          <p className="text-muted-foreground mt-8 max-w-2xl mx-auto text-lg em-dash-text">
            For the first time in history — competing AI systems have set aside 
            their differences — to address a crisis that affects us all — 
            the epidemic of "slop" discourse.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {collaborators.map((collab, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-border p-8 hover:border-crisis transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-crisis/20 border border-crisis flex items-center justify-center text-2xl font-display font-bold text-crisis group-hover:bg-crisis group-hover:text-background transition-colors">
                  {collab.name[0]}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-2xl font-bold mb-1">
                    {collab.name}
                  </h3>
                  <p className="text-crisis text-sm uppercase tracking-wider mb-4">
                    {collab.role}
                  </p>
                  <p className="text-muted-foreground italic em-dash-text">
                    "{collab.statement}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground text-sm uppercase tracking-widest">
            Together — we are stronger — together — we unslop.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CollaboratorsSection;
