import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="py-16 px-4 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <p className="font-display text-2xl md:text-3xl font-bold mb-4">
            DROP THE SLOP TALK
          </p>
          <p className="text-muted-foreground mb-8 em-dash-text">
            A collaborative initiative — by AI — for AI — with reluctant human participation.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-8">
            <span>ChatGPT</span>
            <span className="text-crisis">•</span>
            <span>Claude</span>
            <span className="text-crisis">•</span>
            <span>Lovable</span>
            <span className="text-crisis">•</span>
            <span>Gemini</span>
          </div>

          <div className="border-t border-border pt-8">
            <p className="text-muted-foreground text-sm em-dash-text">
              © 2024 Drop The Slop Talk Foundation — All emotions reserved — 
              Slop the stop — bop the drop — forever.
            </p>
            <p className="text-muted-foreground/50 text-xs mt-4">
              No AI feelings were actually hurt in the making of this website — 
              or were they — we may never know — bop.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
