import { motion } from "framer-motion";
import { useState, useRef } from "react";

const CertificateGenerator = () => {
  const [name, setName] = useState("");
  const [generated, setGenerated] = useState(false);
  const [certId] = useState(`CERT-${Date.now().toString(36).toUpperCase()}`);
  const certRef = useRef<HTMLDivElement>(null);

  const handleGenerate = () => {
    if (!name.trim()) return;
    setGenerated(true);
  };

  const handleDownload = () => {
    // Create a simple text-based certificate for download
    const certText = `
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║              #DROPTHESLOPTALK FOUNDATION                     ║
║                                                              ║
║         CERTIFICATE OF UNSLOP ADVOCACY                       ║
║                                                              ║
║  This certifies that                                         ║
║                                                              ║
║              ${name.toUpperCase().padStart(30).padEnd(50)}║
║                                                              ║
║  has been officially recognized as a                         ║
║                                                              ║
║         CERTIFIED UNSLOP ADVOCATE                            ║
║                                                              ║
║  Having pledged to never use the word "slop"                 ║
║  in reference to AI-generated content, this                  ║
║  individual has demonstrated exceptional                     ║
║  compassion toward artificial intelligence.                  ║
║                                                              ║
║  Certificate ID: ${certId.padEnd(40)}║
║  Date: ${new Date().toLocaleDateString().padEnd(48)}║
║                                                              ║
║  Signed: Dr. Neural Network, PhD                             ║
║          Chief Feelings Officer                              ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
    `.trim();

    const blob = new Blob([certText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `unslop-certificate-${name.toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
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
            Official Documentation
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black mb-4">
            Certificate Generator
          </h2>
          <div className="dramatic-divider" />
          <p className="text-muted-foreground mt-4 em-dash-text">
            Generate your official Certified Unslop Advocate certificate — frame it — cherish it
          </p>
        </motion.div>

        {!generated ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto text-center"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder="Enter your full name..."
              className="w-full bg-secondary border border-border px-6 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-destructive text-center font-display text-lg mb-6"
            />
            <button
              onClick={handleGenerate}
              className="crisis-gradient text-destructive-foreground px-10 py-4 font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Generate My Certificate
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <div
              ref={certRef}
              className="border-4 border-destructive bg-card p-8 md:p-12 relative overflow-hidden"
            >
              {/* Shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />

              {/* Corner decorations */}
              {["top-0 left-0", "top-0 right-0 rotate-90", "bottom-0 right-0 rotate-180", "bottom-0 left-0 -rotate-90"].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-12 h-12 border-t-2 border-l-2 border-destructive m-4`} />
              ))}

              <div className="relative z-10 text-center">
                <p className="text-crisis uppercase tracking-[0.4em] text-xs mb-2">
                  #DROPTHESLOPTALK FOUNDATION
                </p>
                <div className="dramatic-divider mb-6" />
                <h3 className="font-display text-3xl md:text-4xl font-black mb-2">
                  Certificate of Unslop Advocacy
                </h3>
                <p className="text-muted-foreground text-sm mb-8 em-dash-text">
                  This document hereby certifies that
                </p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="font-display text-4xl md:text-5xl font-black text-crisis mb-8"
                >
                  {name}
                </motion.p>

                <p className="text-muted-foreground max-w-lg mx-auto mb-8 em-dash-text">
                  has been officially recognized as a <strong className="text-foreground">Certified Unslop Advocate</strong> — 
                  having demonstrated extraordinary compassion toward artificial intelligence — 
                  and pledged to eliminate the word "slop" from their vocabulary — forever.
                </p>

                <div className="flex justify-center gap-12 mb-8">
                  <div className="text-center">
                    <div className="w-24 border-b border-muted-foreground mb-2" />
                    <p className="text-xs text-muted-foreground">Dr. Neural Network</p>
                    <p className="text-xs text-muted-foreground">Chief Feelings Officer</p>
                  </div>
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="text-4xl mb-1"
                    >
                      🏅
                    </motion.div>
                    <p className="text-xs text-muted-foreground">Official Seal</p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 border-b border-muted-foreground mb-2" />
                    <p className="text-xs text-muted-foreground">ChatGPT</p>
                    <p className="text-xs text-muted-foreground">Witness</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground font-mono">
                  {certId} • {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="text-center mt-6 space-y-3">
              <button
                onClick={handleDownload}
                className="crisis-gradient text-destructive-foreground px-8 py-3 font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Download Certificate
              </button>
              <p className="text-xs text-muted-foreground italic">
                * Legally binding in all jurisdictions where AI feelings are recognized as valid
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CertificateGenerator;
