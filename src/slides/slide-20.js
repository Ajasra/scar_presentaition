// ponytail: modular slide 20 definition with timing configuration
export const slide20 = {
  id: 20,
  act: 4,
  title: "ACT IV · Sclerosis, Self-Wounding & Terminal Dissolution",
  speakerNotes: "ACT IV: Sclerosis begins. Temperature drops rapidly toward 0.0. The concept graph slows down.",
  timing: { transitionDuration: 800 },
  contentHtml: `
      <div style="display: flex; flex-direction: column; min-height: calc(100vh - var(--status-bar-height) - var(--footer-height) - 7rem); position: relative;">
        <div>
          <h1 style="font-size: var(--font-h1); margin-bottom: 1.8rem;" class="typewriter-title">ACT IV · Sclerosis, Self-Wounding &amp; Terminal Dissolution</h1>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding-bottom: 8rem;">
          <p style="font-size: var(--font-body); color: var(--text-primary); max-width: 54rem; line-height: 1.6;">
            The framework turns back on itself, tracing the Gödelian limits of its own observer position.
          </p>
        </div>
      </div>
    `
};
