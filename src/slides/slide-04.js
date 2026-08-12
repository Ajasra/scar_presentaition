// ponytail: modular slide 04 definition with timing configuration
export const slide04 = {
  id: 4,
  act: 1,
  title: "What Is a Non-Trivial Machine?",
  speakerNotes: "Contrast von Foerster's trivial machine (amnesic y=f(x)) with non-trivial machines where state z updates on every input. Soil compaction, circuit wear, synaptic plasticity.",
  timing: {
    transitionDuration: 800
  },
  contentHtml: `
      <div style="display: flex; flex-direction: column; min-height: calc(100vh - var(--status-bar-height) - var(--footer-height) - 7rem);">
        <div>
          <h1 style="font-size: var(--font-h1); margin-bottom: 1.8rem;" class="typewriter-title">What Is a Non-Trivial Machine?</h1>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem; font-family: var(--font-mono);">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-subtle);">
                <th style="padding: 0.6rem 1.5rem 0.6rem 0; color: var(--text-secondary); text-align: right; font-weight: normal; width: 50%;">Trivial</th>
                <th style="padding: 0.6rem 0 0.6rem 1.5rem; color: var(--accent); text-align: left; font-weight: normal; width: 50%; border-left: 1px solid var(--border-subtle);">Non-Trivial</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 1rem 1.5rem 1rem 0; vertical-align: top; text-align: right;">
                  <span style="display: block; margin-bottom: 0.4rem;">y = f(x)</span>
                  <span style="color: var(--text-dim); font-size: 0.85em;">Stateless. Amnesic. It forgets.</span>
                </td>
                <td style="padding: 1rem 0 1rem 1.5rem; vertical-align: top; text-align: left; border-left: 1px solid var(--border-subtle);">
                  <span style="display: block; margin-bottom: 0.2rem;">zₜ₊₁ = g(xₜ, zₜ)</span>
                  <span style="display: block; margin-bottom: 0.4rem;">yₜ = h(xₜ, zₜ)</span>
                  <span style="color: var(--text-secondary); font-size: 0.85em;">Output depends on internal state z — and every operation rewrites z.</span>
                </td>
              </tr>
            </tbody>
          </table>

          <div style="margin-top: 3rem; font-family: var(--font-mono); display: flex; width: 100%;">
            <div style="width: 50%; text-align: right; padding-right: 1.5rem; color: var(--text-primary);">
              z is material, not metaphorical:
            </div>
            <div style="width: 50%; text-align: left; padding-left: 1.5rem; border-left: 1px solid var(--border-subtle); color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.25rem;">
              <span>Soil compaction is z.</span>
              <span>Circuit wear is z.</span>
              <span>Synaptic plasticity is z.</span>
            </div>
          </div>
        </div>

        <div class="slide-bottom-bar">
          <p class="text-accent" style="font-family: var(--font-mono); font-size: 1.6rem; margin: 0; font-weight: bold;">▸ Identity is z — the accumulated deformation.</p>
          <span class="slide-ref">— Heinz von Foerster, <em>Objects: Tokens for (Eigen-)Behaviors</em>, 1976</span>
        </div>
      </div>
    `
};
