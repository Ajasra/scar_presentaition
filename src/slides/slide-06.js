// ponytail: modular slide 06 definition with central timing configuration
export const slide06 = {
  id: 6,
  act: 1,
  title: "Identity Is What Was Foreclosed",
  speakerNotes: "Simondon's pre-individual field. Individuation is not creation — it is spending unformed potential. Mention the FRIENDS (2019) artwork with 20 Arduino machines.",
  timing: {
    typewriterLineSpeed: 40,    // ms per character for FRIENDS 4 lines
    linePause: 350,              // ms pause between typing each FRIENDS line
    stepTransitionDuration: 500  // ms step 1 to step 2 transition fade
  },
  contentHtml: `
      <div style="display: flex; flex-direction: column; min-height: calc(100vh - var(--status-bar-height) - var(--footer-height) - 7rem); position: relative;">
        <h1 style="font-size: var(--font-h1); margin-bottom: 2rem;" class="typewriter-title">Identity Is What Was Foreclosed</h1>

        <div style="max-width: 1500px; width: 100%;">
          <!-- Step 0 & Step 1: Main Philosophical Text -->
          <div class="step-1-content">
            <p style="color: var(--text-primary); font-size: var(--font-body); margin-bottom: 1.2rem; line-height: 1.5;">
              Simondon's pre-individual field: a metastable reservoir of unformed potential. Before individuation, all possibilities open.
            </p>
            <p id="s6-para-2" style="color: var(--text-dim); font-size: var(--font-small); margin-bottom: 1.5rem; line-height: 1.5; opacity: 0; transition: opacity 0.6s ease;">
              Individuation is not creation — it is spending. The individual is the scarred remainder of the field.
            </p>
          </div>

          <!-- Step 2: Main text disappears, replaced by FRIENDS (2019) 4 lines & video -->
          <div class="step-2-content" style="display: none; width: 100%;">
            <div style="display: grid; grid-template-columns: 600px 1fr; gap: 2.5rem; align-items: flex-start;">
              <div style="padding: 1.4rem 1.8rem; background: rgba(255, 255, 255, 0.03); border-left: 3px solid var(--accent); border-radius: 6px; font-family: var(--font-mono); font-size: 1.1rem; line-height: 1.8; min-height: 200px; box-sizing: border-box;">
                <p id="friends-line-1" style="margin: 0 0 0.5rem 0; color: var(--accent); font-weight: bold; min-height: 1.6rem;"></p>
                <p id="friends-line-2" style="margin: 0 0 0.5rem 0; color: var(--text-primary); min-height: 1.6rem;"></p>
                <p id="friends-line-3" style="margin: 0 0 0.5rem 0; color: var(--text-primary); min-height: 1.6rem;"></p>
                <p id="friends-line-4" style="margin: 0; color: var(--text-dim); font-weight: bold; min-height: 1.6rem;"></p>
              </div>

              <!-- Video Player (Larger & Fixed Position) -->
              <div style="position: relative; width: 100%; aspect-ratio: 16/9; background: #000; border: 1px solid var(--border-subtle); border-radius: 6px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.6);">
                <video id="friends-video-player" style="width: 100%; height: 100%; object-fit: cover;" loop muted playsinline preload="auto">
                  <source src="/assets/friends.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>

        <div class="slide-bottom-bar">
          <p class="text-accent" style="font-family: var(--font-mono); font-size: 1.6rem; margin: 0; font-weight: bold; line-height: 1.2;">
            ▸ “Every man is born as many men and dies as a single one.”<br><span style="font-size: 1.25rem; color: var(--text-dim); font-weight: normal; margin-left: 1.5rem;">— M. Heidegger</span>
          </p>
          <span class="slide-ref" style="display: flex; flex-direction: column; align-items: flex-end; line-height: 1.3;">
            <span>— Gilbert Simondon,</span>
            <span><em>L'individuation à la lumière des notions de forme et d'information</em></span>
          </span>
        </div>
      </div>
    `
};
