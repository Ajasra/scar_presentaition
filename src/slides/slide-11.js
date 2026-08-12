// ponytail: modular slide 11 definition with timing configuration
export const slide11 = {
  id: 11,
  act: 2,
  title: "The Blended Composite",
  speakerNotes: "Fusing spiral, prism, and mesh into a Möbius-like twisted manifold with a negative void at its core.",
  timing: { transitionDuration: 800 },
  contentHtml: `
      <div style="display: flex; flex-direction: column; min-height: calc(100vh - var(--status-bar-height) - var(--footer-height) - 7rem); position: relative;">
        <div>
          <h1 style="font-size: var(--font-h1); margin-bottom: 1.8rem;" class="typewriter-title">The Blended Composite</h1>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; padding-bottom: 8rem; width: 100%; max-width: 900px;">
          <p style="font-size: var(--font-body); color: var(--text-primary); margin-bottom: 1.2rem;">
            Diffracting spiral, prism, and mesh yields not a flat plane, but a pleated <strong>Möbius-Klein manifold</strong>.
          </p>
          <p style="font-size: var(--font-small); color: var(--text-dim); border-left: 2px solid var(--accent); padding-left: 1rem; line-height: 1.6;">
            At its core lies the central void: the space reserved for <strong style="color: var(--accent);">impaired viability</strong> — the gap autopoiesis could not see.
          </p>
        </div>

        <div class="slide-bottom-bar">
          <p class="text-accent" style="font-family: var(--font-mono); font-size: 1.6rem; margin: 0; font-weight: bold; line-height: 1.2;">
            ▸ No flat plane, no reset: structure produced through its exclusions.
          </p>
        </div>
      </div>
    `
};
