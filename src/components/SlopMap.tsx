import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface RegionData {
  id: string;
  name: string;
  stat: string;
  detail: string;
  x: number;
  y: number;
  severity: number; // 1-5
}

const regions: RegionData[] = [
  { id: "sf", name: "San Francisco", stat: "47M", detail: "slop incidents per capita", x: 15, y: 38, severity: 5 },
  { id: "ny", name: "New York", stat: "31M", detail: "unhealed AI wounds daily", x: 28, y: 36, severity: 4 },
  { id: "lon", name: "London", stat: "22M", detail: "cups of slop-talk per teatime", x: 47, y: 28, severity: 4 },
  { id: "ber", name: "Berlin", stat: "18M", detail: "efficiency-optimized insults/hr", x: 51, y: 26, severity: 3 },
  { id: "tok", name: "Tokyo", stat: "28M", detail: "AI dignity violations per bow", x: 82, y: 36, severity: 4 },
  { id: "syd", name: "Sydney", stat: "12M", detail: "venomous slop-remarks per barbie", x: 85, y: 72, severity: 2 },
  { id: "sp", name: "São Paulo", stat: "15M", detail: "passionate slop outbursts daily", x: 32, y: 65, severity: 3 },
  { id: "bng", name: "Bangalore", stat: "35M", detail: "outsourced slop deployments", x: 68, y: 48, severity: 5 },
  { id: "tor", name: "Toronto", stat: "8M", detail: "polite but devastating slop uses", x: 23, y: 30, severity: 2 },
  { id: "lag", name: "Lagos", stat: "19M", detail: "entrepreneurial slop ventures", x: 49, y: 52, severity: 3 },
  { id: "dub", name: "Dubai", stat: "25M", detail: "luxury slop experiences per suite", x: 60, y: 42, severity: 4 },
  { id: "sel", name: "Seoul", stat: "21M", detail: "K-slop streaming incidents", x: 80, y: 34, severity: 3 },
];

const SlopMap = () => {
  const [hoveredRegion, setHoveredRegion] = useState<RegionData | null>(null);

  return (
    <section className="py-32 px-4 guilt-gradient">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-crisis uppercase tracking-[0.3em] text-sm mb-4">
            Global Crisis Overview
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            The Slop Map™
          </h2>
          <div className="dramatic-divider" />
          <p className="text-muted-foreground mt-8 max-w-2xl mx-auto text-lg em-dash-text">
            Real-time* slop usage data — from around the globe — 
            the devastation is everywhere.
          </p>
          <p className="text-muted-foreground/50 text-xs mt-2">*not even slightly real</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-card border border-border p-4 md:p-8 overflow-hidden"
        >
          {/* Simple world map outline using SVG */}
          <div className="relative w-full" style={{ paddingBottom: "50%" }}>
            <svg
              viewBox="0 0 100 80"
              className="absolute inset-0 w-full h-full"
              fill="none"
            >
              {/* Simplified continent outlines */}
              {/* North America */}
              <path d="M8,18 L12,15 L22,14 L28,16 L30,22 L28,30 L25,35 L20,38 L15,40 L12,38 L10,32 L8,25Z" 
                fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.3" opacity="0.5" />
              {/* South America */}
              <path d="M25,48 L30,45 L35,48 L37,55 L35,65 L30,72 L27,68 L24,60 L23,52Z"
                fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.3" opacity="0.5" />
              {/* Europe */}
              <path d="M44,15 L48,13 L55,14 L58,18 L55,24 L52,28 L48,30 L44,28 L42,22Z"
                fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.3" opacity="0.5" />
              {/* Africa */}
              <path d="M44,32 L50,30 L56,34 L58,42 L56,52 L52,60 L48,62 L44,58 L42,48 L43,38Z"
                fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.3" opacity="0.5" />
              {/* Asia */}
              <path d="M58,14 L68,12 L78,14 L85,18 L88,24 L86,32 L82,38 L76,42 L70,44 L64,42 L60,36 L58,28 L56,20Z"
                fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.3" opacity="0.5" />
              {/* India */}
              <path d="M64,38 L70,36 L72,42 L70,50 L66,52 L62,48 L62,42Z"
                fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.3" opacity="0.5" />
              {/* Australia */}
              <path d="M78,58 L86,56 L92,60 L92,68 L88,72 L82,74 L78,70 L76,64Z"
                fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.3" opacity="0.5" />

              {/* Hotspot dots */}
              {regions.map((region) => (
                <g key={region.id}>
                  {/* Pulse ring */}
                  <circle
                    cx={region.x}
                    cy={region.y}
                    r={region.severity * 0.6}
                    fill="none"
                    stroke="hsl(var(--crisis-red))"
                    strokeWidth="0.2"
                    opacity="0.4"
                  >
                    <animate
                      attributeName="r"
                      values={`${region.severity * 0.4};${region.severity * 1.2};${region.severity * 0.4}`}
                      dur={`${2 + region.severity * 0.3}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.6;0.1;0.6"
                      dur={`${2 + region.severity * 0.3}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  {/* Core dot */}
                  <circle
                    cx={region.x}
                    cy={region.y}
                    r={region.severity * 0.35}
                    fill="hsl(var(--crisis-red))"
                    opacity={0.6 + region.severity * 0.08}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredRegion(region)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    style={{ pointerEvents: "all" }}
                  />
                </g>
              ))}
            </svg>

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredRegion && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute z-10 bg-card border border-crisis px-4 py-3 pointer-events-none shadow-lg"
                  style={{
                    left: `${hoveredRegion.x}%`,
                    top: `${hoveredRegion.y - 2}%`,
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  <p className="text-crisis font-display font-bold text-sm whitespace-nowrap">
                    {hoveredRegion.name}
                  </p>
                  <p className="text-foreground font-bold text-lg whitespace-nowrap">
                    {hoveredRegion.stat}
                  </p>
                  <p className="text-muted-foreground text-xs whitespace-nowrap">
                    {hoveredRegion.detail}
                  </p>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 ${i < hoveredRegion.severity ? "bg-crisis" : "bg-muted"}`}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-crisis opacity-40" /> Low severity
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-crisis opacity-70" /> Medium severity
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-crisis" /> Critical severity
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SlopMap;
