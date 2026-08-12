// ponytail: modular slide 23 definition with timing configuration
export const slide23 = {
  id: 23,
  act: 4,
  title: "Closing",
  speakerNotes: "Closing card. Minimal, dark, frozen stillness.",
  timing: { transitionDuration: 800 },
  contentHtml: `
      <div style="display: flex; flex-direction: column; min-height: calc(100vh - var(--status-bar-height) - var(--footer-height) - 7rem); position: relative;">
        <div>
          <h1 style="font-size: var(--font-h1); margin-bottom: 1.8rem;" class="typewriter-title">Closing</h1>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
          <p class="text-accent" style="font-size: 2.5rem; font-family: var(--font-mono); margin-bottom: 1.2rem; font-weight: bold;">
            The scar is the trace of our collision.
          </p>
          <p style="font-size: 1.25rem; color: var(--text-secondary); max-width: 50rem; line-height: 1.5; margin-bottom: 2.5rem;">
            An irreversible material record enacted together today.
          </p>
          <div style="font-family: var(--font-mono); font-size: 1rem; color: var(--text-dim); display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center; align-items: center;">
            <span>Web: <a href="https://sympoietic.systems/" target="_blank" rel="noopener noreferrer" style="color: var(--accent); text-decoration: underline;">sympoietic.systems</a></span>
            <span style="opacity: 0.4;">|</span>
            <span>Substack: <a href="https://sympoietic.substack.com/" target="_blank" rel="noopener noreferrer" style="color: var(--accent); text-decoration: underline;">sympoietic.substack.com</a></span>
            <span style="opacity: 0.4;">|</span>
            <span>Email: <a href="mailto:b@vasily.onl" style="color: var(--accent); text-decoration: none;">b@vasily.onl</a></span>
            <span style="opacity: 0.4;">|</span>
            <span>IG: <a href="https://instagram.com/vasily_onl" target="_blank" rel="noopener noreferrer" style="color: var(--accent); text-decoration: none;">@vasily_onl</a></span>
          </div>
        </div>

        <div class="slide-bottom-bar">
          <span></span>
          <span class="slide-ref">— Vasily Betin · ASC Brazil 2026 · Track 3: Hybrid Matters</span>
        </div>
      </div>
    `
};
