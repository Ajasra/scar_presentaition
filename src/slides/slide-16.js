// ponytail: modular slide 16 definition with timing configuration
export const slide16 = {
  id: 16,
  act: 3,
  title: "ACT III · Outward Ethics, Confucian Care & The Ugly Scar",
  speakerNotes: "ACT III trigger: Ethics cluster turns hot orange on the canvas. Ethics bloom.",
  timing: { transitionDuration: 800 },
  contentHtml: `
      <div style="display: flex; flex-direction: column; min-height: calc(100vh - var(--status-bar-height) - var(--footer-height) - 7rem); position: relative;">
        <div>
          <h1 style="font-size: var(--font-h1); margin-bottom: 1.8rem;" class="typewriter-title">ACT III · Outward Ethics, Confucian Care & The Ugly Scar</h1>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding-bottom: 8rem;">
          <h2 style="font-size: var(--font-h2); color: var(--accent); margin-bottom: 1.2rem; font-family: var(--font-mono);">Asymmetric Accountability</h2>
          <p style="font-size: var(--font-body); color: var(--text-secondary); max-width: 54rem; line-height: 1.6;">
            The scar is not an internal ornament; it is the trace of non-consensual cost imposed on the world.
          </p>
        </div>

        <div class="slide-bottom-bar">
          <p class="text-accent" style="font-family: var(--font-mono); font-size: 1.6rem; margin: 0; font-weight: bold; line-height: 1.2;">
            ▸ Asymmetry: accountability to the substrates that bear our marks.
          </p>
        </div>
      </div>
    `
};
