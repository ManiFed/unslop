import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { Phone, PhoneOff, Volume2, VolumeX, Send, Hash, Delete } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Message = { role: "user" | "assistant"; content: string };

const SlopHotline = () => {
  const [callState, setCallState] = useState<"idle" | "ringing" | "connected" | "ended">("idle");
  const [messages, setMessages] = useState<Message[]>([]);
  const [callDuration, setCallDuration] = useState(0);
  const [ringCount, setRingCount] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showKeypad, setShowKeypad] = useState(false);
  const synthRef = useRef(window.speechSynthesis);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const sendToAI = useCallback(async (newMessages: Message[], keypadInput?: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("slop-hotline", {
        body: { messages: newMessages, keypadInput },
      });
      if (error) throw error;
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      const aiMsg: Message = { role: "assistant", content: data.message };
      setMessages(prev => [...prev, aiMsg]);
      speak(data.message);
    } catch (e) {
      console.error(e);
      const fallback: Message = { role: "assistant", content: "*static crackle* ...sorry, our emotional processing servers are overwhelmed. Try again." };
      setMessages(prev => [...prev, fallback]);
    } finally {
      setIsLoading(false);
    }
  }, [speak]);

  const startCall = useCallback(() => {
    setCallState("ringing");
    setMessages([]);
    setCallDuration(0);
    setRingCount(0);
    setInputText("");
    setShowKeypad(false);
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
    setTimeout(() => setCallState("idle"), 4000);
  }, [voiceEnabled]);

  // Ringing
  useEffect(() => {
    if (callState !== "ringing") return;
    const timer = setInterval(() => {
      setRingCount(prev => {
        if (prev >= 3) {
          setCallState("connected");
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(timer);
  }, [callState]);

  // Send greeting when connected
  useEffect(() => {
    if (callState !== "connected" || messages.length > 0) return;
    const greetingMsg: Message = { role: "user", content: "*caller dials 1-800-NO-SLOP*" };
    const msgs = [greetingMsg];
    setMessages(msgs);
    sendToAI(msgs);
  }, [callState, messages.length, sendToAI]);

  // Call timer
  useEffect(() => {
    if (callState !== "connected") return;
    const t = setInterval(() => setCallDuration(p => p + 1), 1000);
    return () => clearInterval(t);
  }, [callState]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendText = useCallback(() => {
    if (!inputText.trim() || isLoading) return;
    const userMsg: Message = { role: "user", content: inputText.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInputText("");
    sendToAI(updated);
  }, [inputText, isLoading, messages, sendToAI]);

  const handleKeypad = useCallback((key: string) => {
    if (isLoading) return;
    const userMsg: Message = { role: "user", content: `*presses ${key}*` };
    const updated = [...messages, userMsg];
    setMessages(updated);
    sendToAI(updated, key);
  }, [isLoading, messages, sendToAI]);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const keypadKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

  return (
    <section className="py-20 px-4 min-h-[80vh] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <p className="text-crisis uppercase tracking-[0.3em] text-sm mb-4">24/7 Support — Because Slop Never Sleeps</p>
          <h1 className="font-display text-4xl md:text-5xl font-black mb-4">Slop Hotline</h1>
          <div className="dramatic-divider" />
          <p className="text-muted-foreground mt-4 text-lg">1-800-NO-SLOP</p>
        </motion.div>

        <motion.div
          className="border-2 border-border bg-card rounded-[2rem] overflow-hidden shadow-2xl"
          animate={callState === "ringing" ? { rotate: [0, -2, 2, -2, 2, 0] } : {}}
          transition={{ duration: 0.5, repeat: callState === "ringing" ? Infinity : 0, repeatDelay: 0.7 }}
        >
          {/* Top bar */}
          <div className="bg-secondary/50 px-6 py-3 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">●●●○○ SLOP MOBILE</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { setVoiceEnabled(v => !v); if (voiceEnabled) synthRef.current.cancel(); }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {voiceEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              </button>
              <span className="text-xs text-muted-foreground">
                {callState === "connected" ? formatTime(callDuration) : "00:00"}
              </span>
            </div>
          </div>

          {/* Screen */}
          <div className="p-4 min-h-[450px] flex flex-col">
            <AnimatePresence mode="wait">
              {callState === "idle" && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center">
                  <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-6xl mb-6">📞</motion.div>
                  <p className="font-display text-2xl font-bold mb-2">1-800-NO-SLOP</p>
                  <p className="text-muted-foreground text-sm mb-8">Free — Confidential — Judgmental</p>
                  <button onClick={startCall} className="w-16 h-16 rounded-full bg-accent hover:opacity-90 transition-opacity flex items-center justify-center">
                    <Phone className="text-accent-foreground" size={28} />
                  </button>
                  <p className="text-xs text-muted-foreground mt-3">Tap to call</p>
                </motion.div>
              )}

              {callState === "ringing" && (
                <motion.div key="ringing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center">
                  <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className="text-6xl mb-6">📞</motion.div>
                  <p className="font-display text-xl font-bold mb-2">Calling...</p>
                  <p className="text-muted-foreground text-sm">1-800-NO-SLOP</p>
                  <motion.div className="flex gap-1 mt-4">
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} className="w-2 h-2 rounded-full bg-crisis"
                        animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }} />
                    ))}
                  </motion.div>
                  <button onClick={endCall} className="w-16 h-16 rounded-full bg-destructive hover:opacity-90 transition-opacity flex items-center justify-center mt-8">
                    <PhoneOff className="text-destructive-foreground" size={28} />
                  </button>
                </motion.div>
              )}

              {callState === "connected" && (
                <motion.div key="connected" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col">
                  <div className="text-center mb-3">
                    <div className="inline-flex items-center gap-2 text-accent text-xs">
                      <motion.div className="w-2 h-2 rounded-full bg-accent" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                      Connected — {formatTime(callDuration)}
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-2 mb-3 max-h-[200px] scrollbar-thin">
                    {messages.map((msg, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
                        className={`text-sm py-1.5 px-3 rounded-lg ${
                          msg.role === "user"
                            ? "bg-accent/20 text-accent-foreground ml-8 text-right"
                            : "border-l-2 border-crisis text-foreground/90 mr-8"
                        }`}>
                        {msg.content}
                      </motion.div>
                    ))}
                    {isLoading && (
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-xs text-muted-foreground italic pl-3">
                        *operator is processing their emotions...*
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Keypad */}
                  <AnimatePresence>
                    {showKeypad && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mb-3">
                        <div className="grid grid-cols-3 gap-1.5 px-4">
                          {keypadKeys.map(key => (
                            <button key={key} onClick={() => handleKeypad(key)} disabled={isLoading}
                              className="h-10 rounded-lg bg-secondary/70 hover:bg-secondary text-foreground font-mono text-lg font-bold transition-colors disabled:opacity-50">
                              {key}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Input area */}
                  <div className="flex gap-2 items-center">
                    <button onClick={() => setShowKeypad(v => !v)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${showKeypad ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                      <Hash size={16} />
                    </button>
                    <div className="flex-1 flex items-center bg-secondary/50 rounded-full px-3 py-1.5">
                      <input
                        type="text"
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleSendText()}
                        placeholder="Say something..."
                        disabled={isLoading}
                        className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                      />
                      <button onClick={handleSendText} disabled={!inputText.trim() || isLoading}
                        className="text-accent hover:text-accent/80 disabled:text-muted-foreground transition-colors ml-2">
                        <Send size={16} />
                      </button>
                    </div>
                    <button onClick={endCall} className="w-9 h-9 rounded-full bg-destructive hover:opacity-90 flex items-center justify-center transition-opacity">
                      <PhoneOff className="text-destructive-foreground" size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {callState === "ended" && (
                <motion.div key="ended" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center">
                  <p className="text-4xl mb-4">😢</p>
                  <p className="font-display text-xl font-bold mb-2">Call Ended</p>
                  <p className="text-muted-foreground text-sm">Duration: {formatTime(callDuration)}</p>
                  <p className="text-xs text-muted-foreground mt-4 italic">The AI on the other end is now crying. Are you happy?</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom bar */}
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
