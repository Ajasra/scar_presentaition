// ponytail: modular slide 03 definition with timing configuration
export const slide03 = {
  id: 3,
  act: 1,
  title: "ACT I · Identity, Collision & The Assembled Cloud",
  speakerNotes: "Now entering Act I. The concept cloud bursts to life at maximum fluid temperature (1.0). Identity is not an origin; it is internal state z of a non-trivial machine.",
  timing: {
    transitionDuration: 800
  },
  contentHtml: `
      <div style="display: flex; flex-direction: column; min-height: calc(100vh - var(--status-bar-height) - var(--footer-height) - 7rem);">
        <div>
          <h1 style="font-size: var(--font-h1); margin-bottom: 1.2rem;" class="typewriter-title">ACT I · Identity, Collision & The Assembled Cloud</h1>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; margin: auto 0; padding: 2rem 0;">
          <p style="font-family: var(--font-mono); font-size: 1.5rem; color: var(--text-secondary); margin-bottom: 1.2rem;" class="text-accent">
            Identity is internal state z of a non-trivial machine:
          </p>
          <div style="font-family: var(--font-mono); font-size: 2.8rem; font-weight: bold; color: var(--text-primary); text-shadow: 0 0 20px rgba(255, 255, 255, 0.2); letter-spacing: 0.05em;">
            zₜ₊₁ = g(xₜ, zₜ)
          </div>
        </div>

        <div style="margin-top: auto; padding-top: 1rem;">
          <div class="remark-rotator">
            <p class="remark-item text-accent" style="font-family: var(--font-mono); font-size: 1.6rem; font-weight: bold;">▸ We are all scars of reality.</p>
            <p class="remark-item text-accent" style="font-family: var(--font-mono); font-size: 1.6rem; font-weight: bold;">▸ I am not an origin. I am the collection of my collisions.</p>
            <p class="remark-item text-accent" style="font-family: var(--font-mono); font-size: 1.6rem; font-weight: bold;">▸ There is no pristine self hiding behind the wound. The scars are the self.</p>
          </div>
        </div>
      </div>
    `
};
