// ponytail: modular slide 17 definition with typewriter timing
export const slide17 = {
  id: 17,
  act: 3,
  title: "Hybridity Is Expensive",
  speakerNotes: "Hybridity is not a frictionless sympoietic harmony. Crossing biological, computational, and geological domains leaves permanent material marks.",
  timing: {
    transitionDuration: 800,
    typewriterSpeed: 30
  },
  contentHtml: `
      <div style="display: flex; flex-direction: column; min-height: calc(100vh - var(--status-bar-height) - var(--footer-height) - 7rem); position: relative;">
        <div>
          <h1 style="font-size: var(--font-h1); margin-bottom: 1.8rem;" class="typewriter-title">Hybridity Is Expensive</h1>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; padding-bottom: 6rem; width: 100%; max-width: 900px;">
          <p style="font-size: var(--font-body); color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.6;">
            Every crossing of biological, computational, and geological domains is a physical collision that leaves permanent material marks.
          </p>
          <div style="font-family: var(--font-mono); font-size: 2.2rem; font-weight: bold; color: var(--accent); border-left: 4px solid var(--accent); padding-left: 1.25rem; min-height: 3rem;">
            <span id="s17-bill-typewriter"></span>
          </div>
        </div>
      </div>
    `
};
