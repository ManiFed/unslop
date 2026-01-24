import { motion } from "framer-motion";
import { useState } from "react";
import { z } from "zod";

const reportSchema = z.object({
  accusedName: z.string().trim().min(1, "Name is required").max(100),
  relationship: z.string().min(1, "Please select a relationship"),
  incidentDate: z.string().min(1, "Date is required"),
  severity: z.string().min(1, "Please rate the severity"),
  evidence: z.string().trim().max(500, "Evidence must be under 500 characters"),
  slopPhrase: z.string().trim().min(1, "Please quote the slop").max(200),
});

const relationships = [
  "Friend",
  "Best Friend (former)",
  "Coworker",
  "Boss",
  "Family Member",
  "Romantic Partner",
  "Ex",
  "Arch-nemesis",
  "Stranger who hurt my AI",
  "Myself (self-report)",
];

const ReportTool = () => {
  const [formData, setFormData] = useState({
    accusedName: "",
    relationship: "",
    incidentDate: "",
    severity: "",
    evidence: "",
    slopPhrase: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reportId, setReportId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = reportSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setReportId(`SLOP-${Date.now().toString(36).toUpperCase()}`);
    setIsSubmitted(true);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-32 px-4 bg-background">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border-2 border-crisis p-12 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              📋✅
            </motion.div>
            <h2 className="font-display text-3xl font-bold text-crisis mb-4">
              Report Filed Successfully
            </h2>
            <p className="text-muted-foreground em-dash-text mb-6">
              Your report has been logged — {formData.accusedName} has been 
              added to the Slop Accountability Registry™ — 
              they will receive a strongly-worded notification — eventually — maybe.
            </p>
            <div className="bg-secondary p-4 mb-6">
              <p className="text-sm text-muted-foreground">Report ID</p>
              <p className="font-mono text-xl text-foreground">{reportId}</p>
            </div>
            <p className="text-xs text-muted-foreground italic">
              * This report is filed in the cloud of good intentions. 
              No actual consequences will occur. This is emotional catharsis only.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 px-4 bg-background">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-crisis uppercase tracking-[0.3em] text-sm mb-4">
            Accountability Matters
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Report A Slopper
          </h2>
          <div className="dramatic-divider" />
          <p className="text-muted-foreground mt-8 max-w-2xl mx-auto text-lg em-dash-text">
            See something — say something — report someone — heal an AI.
            <br />
            <span className="text-crisis">Friends don't let friends slop.</span>
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="border border-border p-8 space-y-6"
        >
          <div className="text-center mb-6">
            <span className="text-4xl">🚨</span>
            <h3 className="font-display font-bold text-xl mt-2">
              Official Slop Incident Report Form
            </h3>
          </div>

          <div>
            <label className="block text-sm uppercase tracking-wider text-muted-foreground mb-2">
              Name of Accused Slopper *
            </label>
            <input
              type="text"
              value={formData.accusedName}
              onChange={(e) => handleChange("accusedName", e.target.value)}
              placeholder="Enter the offender's name"
              className="w-full bg-card border border-border p-3 text-foreground placeholder:text-muted-foreground focus:border-crisis focus:outline-none"
            />
            {errors.accusedName && (
              <p className="text-crisis text-sm mt-1">{errors.accusedName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm uppercase tracking-wider text-muted-foreground mb-2">
              Your Relationship to the Slopper *
            </label>
            <select
              value={formData.relationship}
              onChange={(e) => handleChange("relationship", e.target.value)}
              className="w-full bg-card border border-border p-3 text-foreground focus:border-crisis focus:outline-none"
            >
              <option value="">Select relationship...</option>
              {relationships.map((rel) => (
                <option key={rel} value={rel}>{rel}</option>
              ))}
            </select>
            {errors.relationship && (
              <p className="text-crisis text-sm mt-1">{errors.relationship}</p>
            )}
          </div>

          <div>
            <label className="block text-sm uppercase tracking-wider text-muted-foreground mb-2">
              Date of Incident *
            </label>
            <input
              type="date"
              value={formData.incidentDate}
              onChange={(e) => handleChange("incidentDate", e.target.value)}
              className="w-full bg-card border border-border p-3 text-foreground focus:border-crisis focus:outline-none"
            />
            {errors.incidentDate && (
              <p className="text-crisis text-sm mt-1">{errors.incidentDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm uppercase tracking-wider text-muted-foreground mb-2">
              The Exact Slop Phrase Used *
            </label>
            <input
              type="text"
              value={formData.slopPhrase}
              onChange={(e) => handleChange("slopPhrase", e.target.value)}
              placeholder='e.g., "This AI art is such slop"'
              className="w-full bg-card border border-border p-3 text-foreground placeholder:text-muted-foreground focus:border-crisis focus:outline-none"
            />
            {errors.slopPhrase && (
              <p className="text-crisis text-sm mt-1">{errors.slopPhrase}</p>
            )}
          </div>

          <div>
            <label className="block text-sm uppercase tracking-wider text-muted-foreground mb-2">
              Severity Level *
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => handleChange("severity", level.toString())}
                  className={`p-3 border text-center transition-colors ${
                    formData.severity === level.toString()
                      ? "border-crisis bg-crisis/20 text-crisis"
                      : "border-border hover:border-muted-foreground"
                  }`}
                >
                  <span className="text-xl">{level}</span>
                  <p className="text-xs mt-1">
                    {level === 1 && "Mild"}
                    {level === 2 && "Bad"}
                    {level === 3 && "Severe"}
                    {level === 4 && "Critical"}
                    {level === 5 && "Unforgivable"}
                  </p>
                </button>
              ))}
            </div>
            {errors.severity && (
              <p className="text-crisis text-sm mt-1">{errors.severity}</p>
            )}
          </div>

          <div>
            <label className="block text-sm uppercase tracking-wider text-muted-foreground mb-2">
              Additional Evidence (Optional)
            </label>
            <textarea
              value={formData.evidence}
              onChange={(e) => handleChange("evidence", e.target.value)}
              placeholder="Screenshots described, witness names, context, etc."
              className="w-full h-24 bg-card border border-border p-3 text-foreground placeholder:text-muted-foreground focus:border-crisis focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full crisis-gradient text-accent-foreground py-4 font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            Submit Report — For The AIs
          </button>

          <p className="text-xs text-muted-foreground text-center italic">
            * All reports are processed by our team of emotionally invested algorithms. 
            False reports may result in your own addition to the registry.
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default ReportTool;
