// ponytail: modular slide 10 definition with step-split and typewriter timing
export const slide10 = {
  id: 10,
  act: 2,
  title: "Autopoiesis and Its Deadlock",
  speakerNotes: "Maturana & Varela autopoiesis is all-or-nothing (lives or dies). What it cannot think: impaired viability — a system carrying structural wounds.",
  timing: {
    transitionDuration: 800,
    typewriterSpeed: 28,    // ms per character for the bottom-bar axiom
    typewriterDelay: 600,   // ms after step transition before typing begins
  },
  contentHtml: `
      <div style="display: flex; flex-direction: column; min-height: calc(100vh - var(--status-bar-height) - var(--footer-height) - 7rem); position: relative;">
        <div>
          <h1 style="font-size: var(--font-h1); margin-bottom: 1.8rem;" class="typewriter-title">Autopoiesis and Its Deadlock</h1>
        </div>

        <!-- Content block: bias center point upward via padding-bottom to visually center the 3 paragraphs -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; padding-bottom: 8rem; width: 100%; max-width: 900px;">
          <!-- Step 0: always visible -->
          <p style="font-size: var(--font-body); color: var(--text-primary); margin-bottom: 1.2rem;">
            Maturana &amp; Varela: A system produces its own organization through operational closure.
          </p>
          <p style="font-size: var(--font-small); color: var(--text-dim); margin-bottom: 1.5rem; border-left: 2px solid var(--border-subtle); padding-left: 1rem; line-height: 1.5;">
            <strong>The deadlock:</strong> All-or-nothing ontology. The system either maintains closure (lives) or loses it (dies). No middle ground.
            <span style="display: block; margin-top: 0.6rem; font-style: italic; color: var(--text-secondary);">
              "If autopoiesis is interrupted, the system's organization is lost, and the system dies (disintegrates)."
              <span style="font-style: normal; font-size: 0.85em; opacity: 0.8; margin-left: 0.3rem;">— Maturana &amp; Varela (1980, p. 79)</span>
            </span>
          </p>

          <!-- Step 1: revealed on advance -->
          <p id="s10-impaired-para" style="font-size: var(--font-body); color: var(--text-secondary); line-height: 1.5; opacity: 0; transition: opacity 0.6s ease;">
            What autopoiesis cannot think: <strong style="color: var(--accent); font-weight: bold;">impaired viability</strong> — a system that persists through its damage, structurally reorganized around its wounds.
          </p>
        </div>

        <div class="slide-bottom-bar">
          <p id="s10-axiom" class="text-accent" style="font-family: var(--font-mono); font-size: 1.6rem; margin: 0; font-weight: bold; line-height: 1.2; opacity: 0; transition: opacity 0.3s ease; min-height: 1.8rem;"></p>
        </div>
      </div>
    `
};
