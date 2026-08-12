// ponytail: modular slide 12 definition with timing configuration
export const slide12 = {
  id: 12,
  act: 2,
  title: "The Second-Order Turn",
  speakerNotes: "The second-order turn: when stress exceeds elastic limit, a wound opens, permanently redistributing subsequent stress.",
  timing: { transitionDuration: 800 },
  contentHtml: `
      <div style="display: flex; flex-direction: column; min-height: calc(100vh - var(--status-bar-height) - var(--footer-height) - 7rem); position: relative;">
        <div>
          <h1 style="font-size: var(--font-h1); margin-bottom: 1.8rem;" class="typewriter-title">The Second-Order Turn</h1>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; padding-bottom: 8rem; width: 100%; max-width: 900px;">
          <p style="font-size: var(--font-body); color: var(--text-primary); margin-bottom: 1.2rem; line-height: 1.6;">
            When stress exceeds the elastic limit, a wound opens — permanently altering the topology and redistributing all subsequent stress.
          </p>
          <p style="font-size: var(--font-small); color: var(--text-dim); border-left: 2px solid var(--border-subtle); padding-left: 1rem; line-height: 1.6;">
            None of the source frameworks account for negative-volume rupture. The scar-thesis supplies the wound itself.
          </p>
        </div>

        <div class="slide-bottom-bar">
          <p class="text-accent" style="font-family: var(--font-mono); font-size: 1.6rem; margin: 0; font-weight: bold; line-height: 1.2;">
            ▸ Negative volume: where structural deformation becomes irreversible history.
          </p>
        </div>
      </div>
    `
};
