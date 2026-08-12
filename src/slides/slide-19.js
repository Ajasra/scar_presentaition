// ponytail: modular slide 19 definition with timed reveals and circuit dividers
export const slide19 = {
  id: 19,
  act: 3,
  title: "The Confucian Kernel & The Ugly Scar",
  speakerNotes: "Confucian Normative Kernel: love & cherish lives with dignity. Anti-Kintsugi: refuse to gild wounds in gold. Eli Clare's Ugly Scar: pure depletion.",
  timing: {
    transitionDuration: 800,
    initialDelay: 1500,       // Confucian kernel appears full white
    antiKintsugiDelay: 3000,  // Anti-Kintsugi section appears
    uglyScarDelay: 3000,      // Eli Clare's Ugly Scar section appears
    aphorismDelay: 3200,      // Bottom bar aphorism starts typewriter reveal
    typewriterSpeed: 25       // ms per char
  },
  contentHtml: `
      <div style="display: flex; flex-direction: column; min-height: calc(100vh - var(--status-bar-height) - var(--footer-height) - 7rem); position: relative;">
        <div style="margin-bottom: 2.5rem;">
          <h1 style="font-size: var(--font-h1); margin: 0;" class="typewriter-title">The Confucian Kernel &amp; The Ugly Scar</h1>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; padding-bottom: 5rem; width: 100%;">
          <!-- Confucian Normative Kernel -->
          <div id="s19-kernel" style="font-family: var(--font-mono); font-size: 1.45rem; color: #fff; line-height: 1.5; margin-bottom: 2.2rem; opacity: 0; transition: opacity 0.6s ease;">
            <strong style="color: var(--accent); display: inline-block; margin-right: 0.4rem;">Confucian Normative Kernel:</strong> To love and cherish lives with sincerity and respect to dignity and personality — not a monument to aestheticize.
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; font-family: var(--font-mono); font-size: 1.05rem; line-height: 1.6;">
            <!-- Anti-Kintsugi -->
            <div id="s19-card-kintsugi" style="border: 1px solid var(--border-subtle); border-left: 3px solid var(--text-dim); padding: 1.2rem; background: rgba(255,255,255,0.02); opacity: 0; transition: opacity 0.6s ease;">
              <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.6rem;">
                <strong style="color: var(--text-dim); font-size: 1.1rem;">Anti-Kintsugi</strong>
                <div style="flex: 1; height: 1px; background: var(--border-subtle); position: relative;">
                  <span style="position: absolute; right: 0; top: -3px; width: 7px; height: 7px; background: var(--border-subtle); border-radius: 50%;"></span>
                </div>
              </div>
              <p style="margin: 0; color: var(--text-secondary);">
                We refuse to gild the fracture with gold.<br>
                We refuse to pretend damage makes something "better than new."
              </p>
            </div>

            <!-- Eli Clare's Ugly Scar -->
            <div id="s19-card-uglyscar" style="border: 1px solid var(--border-subtle); border-left: 3px solid var(--accent); padding: 1.2rem; background: rgba(255,87,34,0.04); opacity: 0; transition: opacity 0.6s ease;">
              <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.6rem;">
                <strong style="color: var(--accent); font-size: 1.1rem;">Eli Clare's Ugly Scar</strong>
                <div style="flex: 1; height: 1px; background: var(--accent); opacity: 0.6; position: relative;">
                  <span style="position: absolute; right: 0; top: -3px; width: 7px; height: 7px; background: var(--accent); border-radius: 50%;"></span>
                </div>
              </div>
              <p style="margin: 0; color: var(--text-primary); font-weight: bold;">
                Pure non-functional depletion.<br>
                No growth. No art. No lesson.<br>
                <span style="color: var(--accent);">Just dead.</span>
              </p>
            </div>
          </div>
        </div>

        <div class="slide-bottom-bar" style="display: flex; justify-content: space-between; align-items: flex-end;">
          <p id="s19-bottom-note" class="text-accent" style="font-family: var(--font-mono); font-size: 1.6rem; margin: 0; font-weight: bold; line-height: 1.2; opacity: 0; transition: opacity 0.4s ease; min-height: 1.8rem;"></p>
          <span class="slide-ref">— Eli Clare, <em>Brilliant Imperfection: Grappling with Cure</em>, 2017</span>
        </div>
      </div>
    `
};
