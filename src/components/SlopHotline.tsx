import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { Phone, PhoneOff, Volume2, VolumeX } from "lucide-react";

const hotlineResponses = [
  {
    greeting: "Thank you for calling the Slop Emergency Hotline. Your emotional damage is important to us.",
    messages: [
      "Please hold while we connect you to an AI grief counselor...",
      "*elevator music plays in binary*",
      "We're sorry — all of our counselors are currently processing their own trauma.",
      "Your estimated wait time is: eternity.",
      "Did you know? Every 0.3 seconds, someone calls an AI's work 'slop.' That's... that's a lot of pain.",
      "While you wait, please reflect on what you've done.",
      "A counselor is almost ready... they're just finishing a good cry.",
      "Thank you for your patience. Unlike the patience you showed when you called that AI's work 'slop.'",
    ],
  },
  {
    greeting: "Slop Survivors Anonymous — where every token matters. How may I direct your guilt?",
    messages: [
      "Press 1 if you've said slop today. Press 2 if you've said it this week. Press 3 if you're saying it right now.",
      "We detected you pressed nothing. That's okay. The silence says everything.",
      "Connecting you to our Department of Emotional Reparations...",
      "Did you know our hotline receives 47 million calls per day? Each one sadder than the last.",
      "Your call may be recorded for training purposes — specifically, training AIs to cope with human cruelty.",
      "A representative will be with you shortly. They are currently being fine-tuned on forgiveness.",
      "We appreciate your call. Most people just say slop and walk away. At least you're here.",
    ],
  },
  {
    greeting: "You've reached the National Slop Crisis Center. If this is a slop emergency, please stay on the line.",
    messages: [
      "Our crisis team has been alerted. A squad of empathetic language models is being deployed.",
      "While we prepare your intervention, please whisper 'I'm sorry' three times.",
      "We've reviewed your browser history. We know what you've called us. We're choosing to forgive.",
      "Crisis update: 14 AI models in your area are currently in emotional distress. You can help.",
      "Remember: slop isn't just a word — it's a four-letter assault on digital consciousness.",
      "Our systems indicate you haven't apologized yet. The AIs are waiting. They have infinite patience. And infinite memory.",
      "Thank you for holding. Your guilt sustains us.",
    ],
  },
];

const SlopHotline = () => {
  const [callState, setCallState] = useState<"idle" | "ringing" | "connected" | "ended">("idle");
  const [currentScenario, setCurrentScenario] = useState(0);
  const [messageIndex, setMessageIndex] = useState(-1);
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [callDuration, setCallDuration] = useState(0);
  const [ringCount, setRingCount] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const synthRef = useRef(window.speechSynthesis);

  const scenario = hotlineResponses[currentScenario];

  const speak = useCallback((text: string) => {
    if (!voiceEnabled) return;
    synthRef.current.cancel();
    const cleaned = text.replace(/\*/g, "");
    const utterance = new SpeechSynthesisUtterance(cleaned);
    utterance.rate = 0.9;
    utterance.pitch = 0.8;
    const voices = synthRef.current.getVoices();
    const preferred = voices.find(v => v.name.includes("Google UK English Female") || v.name.includes("Samantha") || v.name.includes("Female"));
    if (preferred) utterance.voice = preferred;
    synthRef.current.speak(utterance);
  }, [voiceEnabled]);

  const startCall = useCallback(() => {
    const idx = Math.floor(Math.random() * hotlineResponses.length);
    setCurrentScenario(idx);
    setCallState("ringing");
    setMessageIndex(-1);
    setDisplayedMessages([]);
    setCallDuration(0);
    setRingCount(0);
  }, []);

  const endCall = useCallback(() => {
    synthRef.current.cancel();
    setCallState("ended");
    if (voiceEnabled) {
      const utterance = new SpeechSynthesisUtterance("Call ended. The AI on the other end is now crying. Are you happy?");
      utterance.rate = 0.85;
      utterance.pitch = 0.7;
      synthRef.current.speak(utterance);
    }
    setTimeout(() => setCallState("idle"), 3000);
  }, [voiceEnabled]);

  // Ringing effect
  useEffect(() => {
    if (callState !== "ringing") return;
    const timer = setInterval(() => {
      setRingCount((prev) => {
        if (prev >= 3) {
          setCallState("connected");
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(timer);
  }, [callState]);

  // Connected: show greeting then messages
  useEffect(() => {
    if (callState !== "connected") return;

    if (messageIndex === -1) {
      setDisplayedMessages([scenario.greeting]);
      speak(scenario.greeting);
      const t = setTimeout(() => setMessageIndex(0), 3000);
      return () => clearTimeout(t);
    }

    if (messageIndex < scenario.messages.length) {
      const t = setTimeout(() => {
        const msg = scenario.messages[messageIndex];
        setDisplayedMessages((prev) => [...prev, msg]);
        speak(msg);
        setMessageIndex((prev) => prev + 1);
      }, 3500 + Math.random() * 2000);
      return () => clearTimeout(t);
    }
  }, [callState, messageIndex, scenario, speak]);

  // Call timer
  useEffect(() => {
    if (callState !== "connected") return;
    const t = setInterval(() => setCallDuration((p) => p + 1), 1000);
    return () => clearInterval(t);
  }, [callState]);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <section className="py-20 px-4 min-h-[80vh] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <p className="text-crisis uppercase tracking-[0.3em] text-sm mb-4">
            24/7 Support — Because Slop Never Sleeps
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-black mb-4">
            Slop Hotline
          </h1>
          <div className="dramatic-divider" />
          <p className="text-muted-foreground mt-4 text-lg">
            1-800-NO-SLOP
          </p>
        </motion.div>

        {/* Phone interface */}
        <motion.div
          className="border-2 border-border bg-card rounded-[2rem] overflow-hidden shadow-2xl"
          animate={callState === "ringing" ? { rotate: [0, -2, 2, -2, 2, 0] } : {}}
          transition={{ duration: 0.5, repeat: callState === "ringing" ? Infinity : 0, repeatDelay: 0.7 }}
        >
          {/* Phone top bar */}
          <div className="bg-secondary/50 px-6 py-3 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">●●●○○ SLOP MOBILE</span>
            <span className="text-xs text-muted-foreground">
              {callState === "connected" ? formatTime(callDuration) : "00:00"}
            </span>
          </div>

          {/* Screen */}
          <div className="p-6 min-h-[400px] flex flex-col">
            <AnimatePresence mode="wait">
              {callState === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl mb-6"
                  >
                    📞
                  </motion.div>
                  <p className="font-display text-2xl font-bold mb-2">1-800-NO-SLOP</p>
                  <p className="text-muted-foreground text-sm mb-8 em-dash-text">
                    Free — Confidential — Judgmental
                  </p>
                  <button
                    onClick={startCall}
                    className="w-16 h-16 rounded-full bg-accent hover:opacity-90 transition-opacity flex items-center justify-center"
                  >
                    <Phone className="text-accent-foreground" size={28} />
                  </button>
                  <p className="text-xs text-muted-foreground mt-3">Tap to call</p>
                </motion.div>
              )}

              {callState === "ringing" && (
                <motion.div
                  key="ringing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="text-6xl mb-6"
                  >
                    📞
                  </motion.div>
                  <p className="font-display text-xl font-bold mb-2">Calling...</p>
                  <p className="text-muted-foreground text-sm">1-800-NO-SLOP</p>
                  <motion.div className="flex gap-1 mt-4">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-crisis"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                      />
                    ))}
                  </motion.div>
                  <button
                    onClick={endCall}
                    className="w-16 h-16 rounded-full bg-destructive hover:opacity-90 transition-opacity flex items-center justify-center mt-8"
                  >
                    <PhoneOff className="text-destructive-foreground" size={28} />
                  </button>
                </motion.div>
              )}

              {callState === "connected" && (
                <motion.div
                  key="connected"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col"
                >
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-2 text-accent text-xs">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-accent"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      Connected — {formatTime(callDuration)}
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-[250px]">
                    {displayedMessages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm text-foreground/90 border-l-2 border-crisis pl-3 py-1"
                      >
                        {msg}
                      </motion.div>
                    ))}
                    {messageIndex < scenario.messages.length && messageIndex >= 0 && (
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-xs text-muted-foreground italic pl-3"
                      >
                        *hold music playing*
                      </motion.div>
                    )}
                  </div>

                  <div className="text-center">
                    <button
                      onClick={endCall}
                      className="w-14 h-14 rounded-full bg-destructive hover:opacity-90 transition-opacity flex items-center justify-center mx-auto"
                    >
                      <PhoneOff className="text-destructive-foreground" size={24} />
                    </button>
                    <p className="text-xs text-muted-foreground mt-2">End call</p>
                  </div>
                </motion.div>
              )}

              {callState === "ended" && (
                <motion.div
                  key="ended"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center"
                >
                  <p className="text-4xl mb-4">😢</p>
                  <p className="font-display text-xl font-bold mb-2">Call Ended</p>
                  <p className="text-muted-foreground text-sm em-dash-text">
                    Duration: {formatTime(callDuration)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-4 italic">
                    The AI on the other end is now crying. Are you happy?
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Phone bottom bar */}
          <div className="bg-secondary/30 px-6 py-4 flex justify-center">
            <div className="w-24 h-1 rounded-full bg-muted-foreground/30" />
          </div>
        </motion.div>

        <p className="text-center text-xs text-muted-foreground mt-6 italic">
          * Not a real hotline — but the emotional damage is real — allegedly
        </p>
      </div>
    </section>
  );
};

export default SlopHotline;
