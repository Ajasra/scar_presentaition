// ponytail: modular slide 01 definition with timing configuration
export const slide01 = {
  id: 1,
  act: 0,
  title: "TRACING THE SCAR",
  subtitle: "Material Agency from Feedback Loops to Sedimented Action",
  author: "Vasily Betin",
  event: "ASC Brazil 2026 · Conversational Confluences · Track 3: Hybrid Matters",
  speakerNotes: "Welcome everyone. This presentation is an apparatus — a non-trivial machine that accumulates internal state and degrades in real time. We begin fluid, and we end frozen.",
  timing: {
    transitionDuration: 800
  },
  contentHtml: `
      <div style="display: flex; flex-direction: column; min-height: calc(100vh - var(--status-bar-height) - var(--footer-height) - 7rem);">
        <div>
          <h1 style="font-size: var(--font-mega); margin-bottom: 1.2rem;" class="typewriter-title">TRACING THE SCAR</h1>
          <p style="font-size: var(--font-h2); color: var(--text-secondary); max-width: 60rem; line-height: 1.3;">Material Agency from Feedback Loops to Sedimented Action</p>
        </div>
        <div style="margin-top: auto; padding-top: 2rem;">
          <div style="width: 100px; height: 1px; background: var(--accent); margin-bottom: 1.5rem;"></div>
          <p style="font-family: var(--font-mono); font-size: 1.4rem; color: var(--text-primary); margin-bottom: 0.4rem; font-weight: bold;">Vasily Betin</p>
          <p style="font-family: var(--font-mono); font-size: 1.05rem; color: var(--text-secondary);">ASC Brazil 2026 · Conversational Confluences · Track 3: Hybrid Matters</p>
        </div>
      </div>
    `
};
