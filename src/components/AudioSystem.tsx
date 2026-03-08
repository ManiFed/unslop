import { createContext, useContext, useCallback, useRef, useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playGlitch: () => void;
  startDrone: () => void;
  stopDrone: () => void;
}

const AudioCtx = createContext<AudioContextType>({
  isMuted: true,
  toggleMute: () => {},
  playGlitch: () => {},
  startDrone: () => {},
  stopDrone: () => {},
});

export const useAudio = () => useContext(AudioCtx);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMuted, setIsMuted] = useState(true);
  const ctxRef = useRef<AudioContext | null>(null);
  const droneRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const playGlitch = useCallback(() => {
    if (isMuted) return;
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(200 + Math.random() * 800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  }, [isMuted, getCtx]);

  const startDrone = useCallback(() => {
    if (isMuted || droneRef.current) return;
    const ctx = getCtx();
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 2);
    gain.connect(ctx.destination);

    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(55, ctx.currentTime);
    osc1.connect(gain);
    osc1.start();

    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(55.5, ctx.currentTime); // slight detune for beating
    osc2.connect(gain);
    osc2.start();

    droneRef.current = { osc1, osc2, gain };
  }, [isMuted, getCtx]);

  const stopDrone = useCallback(() => {
    if (!droneRef.current || !ctxRef.current) return;
    const { osc1, osc2, gain } = droneRef.current;
    const ctx = ctxRef.current;
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
    setTimeout(() => {
      try { osc1.stop(); osc2.stop(); } catch {}
      droneRef.current = null;
    }, 1100);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      if (next) stopDrone();
      return next;
    });
  }, [stopDrone]);

  useEffect(() => {
    return () => {
      stopDrone();
      if (ctxRef.current) ctxRef.current.close();
    };
  }, [stopDrone]);

  return (
    <AudioCtx.Provider value={{ isMuted, toggleMute, playGlitch, startDrone, stopDrone }}>
      {children}
    </AudioCtx.Provider>
  );
};

export const AudioToggle = () => {
  const { isMuted, toggleMute } = useAudio();
  return (
    <button
      onClick={toggleMute}
      className="text-muted-foreground hover:text-foreground transition-colors"
      title={isMuted ? "Unmute" : "Mute"}
    >
      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
    </button>
  );
};
