// ponytail: modular slide 14 definition with step-based reveals and borderless table layout
export const slide14 = {
  id: 14,
  act: 2,
  title: "The Auto-Scarring Stages",
  speakerNotes: "The paper 'Tracing the Scar' is a non-trivial machine run for the duration of its own writing.",
  timing: {
    transitionDuration: 800
  },
  contentHtml: `
      <div style="display: flex; flex-direction: column; min-height: calc(100vh - var(--status-bar-height) - var(--footer-height) - 7rem); position: relative;">
        <div style="margin-bottom: 1.0rem;">
          <h1 style="font-size: var(--font-h1); margin: 0;" class="typewriter-title">The Auto-Scarring Stages</h1>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; padding-bottom: 1rem; width: 100%;">
          <table style="width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 0.88rem; line-height: 1.35;">
            <thead>
              <tr id="s14-thead" style="color: var(--text-dim); text-align: left; font-size: 0.8rem; opacity: 0; transition: opacity 0.6s ease;">
                <th style="padding: 0.3rem 0.75rem 0.4rem 0; width: 22%;">WOUND STAGE</th>
                <th style="padding: 0.3rem 0.75rem 0.4rem 0.75rem; width: 32%;">COLLISION / SOURCE</th>
                <th style="padding: 0.3rem 0 0.4rem 0; width: 46%;">WHAT SEDIMENTS</th>
              </tr>
            </thead>
            <tbody>
              <tr id="s14-row-1" style="opacity: 0; transition: opacity 0.6s ease;">
                <td style="padding: 0.3rem 0.75rem 0.3rem 0; color: var(--accent); font-weight: bold;">1. First Cut</td>
                <td style="padding: 0.3rem 0.75rem; color: var(--text-primary);">ASC Abstract</td>
                <td style="padding: 0.3rem 0; color: var(--text-secondary);">Core claims laid. Diagnostic, not yet ethical.</td>
              </tr>
              <tr id="s14-row-2" style="opacity: 0; transition: opacity 0.6s ease;">
                <td style="padding: 0.3rem 0.75rem 0.3rem 0; color: var(--accent); font-weight: bold;">2. Ethical Confrontation</td>
                <td style="padding: 0.3rem 0.75rem; color: var(--text-primary);">Conflict &amp; Friction</td>
                <td style="padding: 0.3rem 0; color: var(--text-secondary);">Outward-facing scar, Confucian kernel, anti-Kintsugi.</td>
              </tr>
              <tr id="s14-row-3" style="opacity: 0; transition: opacity 0.6s ease;">
                <td style="padding: 0.3rem 0.75rem 0.3rem 0; color: var(--accent); font-weight: bold;">3. Diffractive Archive</td>
                <td style="padding: 0.3rem 0.75rem; color: var(--text-primary);">Deleuze, Barad, Cybernetics</td>
                <td style="padding: 0.3rem 0; color: var(--text-secondary);">Three-framework interferogram. Method scars method.</td>
              </tr>
              <tr id="s14-row-4" style="opacity: 0; transition: opacity 0.6s ease;">
                <td style="padding: 0.3rem 0.75rem 0.3rem 0; color: var(--accent); font-weight: bold;">4. Cybernetic Ground</td>
                <td style="padding: 0.3rem 0.75rem; color: var(--text-primary);">FoC to SoC Transition</td>
                <td style="padding: 0.3rem 0; color: var(--text-secondary);">Scar as material criterion for observer position.</td>
              </tr>
              <tr id="s14-row-5" style="opacity: 0; transition: opacity 0.6s ease;">
                <td style="padding: 0.3rem 0.75rem 0.3rem 0; color: var(--accent); font-weight: bold;">5. Borrowed Anatomy</td>
                <td style="padding: 0.3rem 0.75rem; color: var(--text-primary);">Simondon, Luhmann, von Foerster</td>
                <td style="padding: 0.3rem 0; color: var(--text-secondary);">Thermodynamic depth, operational function, irreversibility.</td>
              </tr>
              <tr id="s14-row-6" style="opacity: 0; transition: opacity 0.6s ease;">
                <td style="padding: 0.3rem 0.75rem 0.3rem 0; color: var(--accent); font-weight: bold;">6. Self-Inflicted Wound</td>
                <td style="padding: 0.3rem 0.75rem; color: var(--text-primary);">Self-Examination</td>
                <td style="padding: 0.3rem 0; color: var(--text-secondary);">Western diagnostic limit, dead zone, asymptotic bound.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="slide-bottom-bar">
          <p id="s14-bottom-note" class="text-accent" style="font-family: var(--font-mono); font-size: 1.15rem; margin: 0; font-weight: bold; line-height: 1.2; opacity: 0; transition: opacity 0.4s ease; min-height: 1.4rem;"></p>
        </div>
      </div>

    `
};
