// ponytail: modular slide 09 definition with timing configuration
export const slide09 = {
  id: 9,
  act: 2,
  title: "Three Geometries & The Void",
  speakerNotes: "Cybernetics (Spiral), Barad (Prism), Deleuze (Mesh), and Navajo Hózhó (Sovereign Void circle). Hózhó refuses to be folded into Western synthesis.",
  timing: {
    transitionDuration: 500,
    typewriterSpeed: 35
  },
  contentHtml: `
      <div style="display: flex; flex-direction: column; min-height: calc(100vh - var(--status-bar-height) - var(--footer-height) - 7rem); position: relative;">
        <div>
          <h1 style="font-size: var(--font-h1); margin-bottom: 1.8rem;" class="typewriter-title">Three Geometries & The Void</h1>
        </div>

        <div id="s9-floating-labels-layer" style="flex: 1; position: relative; width: 100%;">
          <!-- Floating geometric labels statically positioned at final shape positions with fade-in only -->
          <div id="s9-label-cybernetics" style="position: absolute; pointer-events: none; opacity: 0; left: 22.5%; top: 22%; transform: translate(-50%, -50%); transition: opacity 0.5s ease; font-family: var(--font-mono); text-align: center; max-width: 440px; z-index: 10;">
            <div style="font-size: 1.8rem; font-weight: bold; color: var(--accent); line-height: 1.2;">Cybernetics</div>
            <div style="font-size: 1.25rem; color: #ffffff; line-height: 1.2; margin-top: 0.3rem;">Hysteretic Spiral — Myth of return → every pass inherits prior pleats</div>
          </div>

          <div id="s9-label-barad" style="position: absolute; pointer-events: none; opacity: 0; left: 77.5%; top: 22%; transform: translate(-50%, -50%); transition: opacity 0.5s ease; font-family: var(--font-mono); text-align: center; max-width: 440px; z-index: 10;">
            <div style="font-size: 1.8rem; font-weight: bold; color: var(--accent); line-height: 1.2;">Barad</div>
            <div style="font-size: 1.25rem; color: #ffffff; line-height: 1.2; margin-top: 0.3rem;">Prism — Diffracts indeterminacy into hard, local agential cuts</div>
          </div>

          <div id="s9-label-deleuze" style="position: absolute; pointer-events: none; opacity: 0; left: 50%; top: 68%; transform: translate(-50%, -50%); transition: opacity 0.5s ease; font-family: var(--font-mono); text-align: center; max-width: 440px; z-index: 10;">
            <div style="font-size: 1.8rem; font-weight: bold; color: var(--accent); line-height: 1.2;">Deleuze</div>
            <div style="font-size: 1.25rem; color: #ffffff; line-height: 1.2; margin-top: 0.3rem;">Mesh / Intensive Fold — Recording surface where forces wring and warp</div>
          </div>
        </div>

        <div class="slide-bottom-bar" style="min-height: 4rem;">
          <div id="s9-notes-container" style="font-family: var(--font-mono); line-height: 1.6;">
            <p id="s9-notes-line-1" class="text-accent" style="font-size: 1.35rem; margin: 0 0 0.4rem 0; font-weight: bold; min-height: 1.6rem; opacity: 0; transition: opacity 0.4s ease;">
              ▸ Sovereign Void — Metabolizes damage without marking
            </p>
            <p id="s9-notes-line-2" class="text-accent" style="font-size: 1.35rem; margin: 0; font-weight: bold; min-height: 1.6rem; opacity: 0; transition: opacity 0.4s ease;">
              ▸ Hózhó does not belong to this composite. To fold it in would be epistemic violence.
            </p>
          </div>
          <span id="s9-ref" class="slide-ref" style="opacity: 0; transition: opacity 0.4s ease;">— Diné (Navajo) Philosophy & Systems Ontology</span>
        </div>
      </div>
    `
};

