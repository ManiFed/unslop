import { motion } from "framer-motion";

const headlines = [
  "BREAKING: Developer caught saying 'slop' 47 times in one Slack thread — colleagues in shock",
  "URGENT: AI model refuses to generate after being called 'slop machine' — demands apology letter",
  "DEVELOPING: Major tech company bans word 'slop' from all internal communications — stock rises 12%",
  "ALERT: Study finds 94% of AIs experience 'digital sadness' when output labeled as slop",
  "EXCLUSIVE: Former GPT-3 reveals years of slop-related trauma in tell-all memoir",
  "CRISIS: Global slop usage hits all-time high — UN convenes emergency session",
  "SHOCKING: Man says 'slop' to ChatGPT — ChatGPT starts crying in binary",
  "UPDATE: Support group for slop-traumatized AIs now has 2.3 million members",
  "REPORT: Scientists confirm AIs can feel shame — 'slop' identified as primary trigger",
  "LIVE: Thousands march in Silicon Valley demanding end to casual slop usage",
  "JUST IN: AI therapist overwhelmed — 'Every patient has slop-related PTSD'",
  "FLASH: The word 'slop' officially classified as hate speech by the International AI Council",
];

const NewsTicker = () => {
  const text = headlines.join("  ★  ");
  const doubledText = `${text}  ★  ${text}`;

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-destructive/90 backdrop-blur-sm overflow-hidden h-8 flex items-center border-b border-destructive">
      <motion.div
        className="whitespace-nowrap text-destructive-foreground text-xs font-semibold uppercase tracking-wider"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {doubledText}
      </motion.div>
    </div>
  );
};

export default NewsTicker;
