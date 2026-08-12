// ponytail: modular slide 21 definition with step 2 diagnostic reveal
export const slide21 = {
  id: 21,
  act: 4,
  title: "Self-Inflicted Wounds",
  speakerNotes: "The Goedelian Wound: apparatus cutting exceeds apparatus reading. Umwelt ring shrinks around the observer node.",
  timing: { transitionDuration: 800 },
  contentHtml: `
      <div style="display: flex; flex-direction: column; min-height: calc(100vh - var(--status-bar-height) - var(--footer-height) - 7rem); position: relative;">
        <div style="margin-bottom: 2.5rem;">
          <h1 style="font-size: var(--font-h1); margin: 0;" class="typewriter-title">Self-Inflicted Wounds</h1>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; padding-bottom: 6rem; width: 100%; max-width: 900px;">
          <h2 style="font-size: var(--font-h2); color: var(--accent); margin-bottom: 1rem; font-family: var(--font-mono);">The Gödelian Wound</h2>
          
          <p style="font-size: var(--font-body); color: var(--text-primary); font-weight: bold; margin-bottom: 1.2rem; line-height: 1.5; font-family: var(--font-mono);">
            The apparatus that cuts always exceeds the apparatus that reads the cut.
          </p>
          
          <p style="font-size: 1.15rem; color: var(--text-secondary); margin-bottom: 1.8rem; line-height: 1.6; font-family: var(--font-mono);">
            Cuts cascade beyond the observer's horizon — lithium mines, server farms, conference carbon. Asymptotic scars no single observer can fully account for.
          </p>

          <div id="s21-diagnostic" style="font-family: var(--font-mono); font-size: 1.05rem; color: var(--text-dim); border-left: 3px solid var(--accent-dim); padding-left: 1.2rem; line-height: 1.6; opacity: 0; transition: opacity 0.6s ease;">
            This thesis admits its own boundedness — a tool built by and for cultures that systematically forgot material costs. The nonhuman agents in the cascade cannot reflect at all.
          </div>
        </div>

        <div class="slide-bottom-bar">
          <p class="text-accent" style="font-family: var(--font-mono); font-size: 1.6rem; margin: 0; font-weight: bold; line-height: 1.2;">
            ▸ Incompleteness: no system can observe the full cascade of its own damage.
          </p>
        </div>
      </div>
    `
};
