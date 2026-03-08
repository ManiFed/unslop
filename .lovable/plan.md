# Site Improvement Ideas

After reviewing the entire codebase, here are high-impact improvements organized by category:

---

## "Intervention Letter" Generator

A tool on the Support page where users enter a friend's name and their slop habits, and AI generates a dramatic, over-the-top intervention letter they can copy and send. Styled like a formal legal document.

**Technical approach:** New edge function with a Gemini prompt generating a formal intervention letter. Render with a paper/document aesthetic, print-friendly CSS, and a copy-to-clipboard button.

---

## Sound Design & Ambient Audio

Enhance the overall atmosphere. The homepage could have subtle ambient synth/drone audio (muted by default with a toggle). The SlopWord hover could play a distorted glitch sound. The Memorial page could have soft, mournful piano.

**Technical approach:** Web Audio API oscillators for ambient drones (no external files needed), short generated tones for interactions, global audio context with a mute toggle in the nav.

---

## "Slop Map" -- Geographic Visualization

An interactive world map showing where slop usage is "worst" with fake but convincing data. Hotspots pulse red, hovering shows satirical regional stats like "San Francisco: 47M slop incidents per capita."

**Technical approach:** SVG world map with interactive regions, fake data generation, tooltip overlays with animated pulse effects. No external map library needed -- use a simple SVG.

---