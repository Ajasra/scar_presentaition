// ponytail: modular slide 22 definition with epic typewriter timing
export const slide22 = {
  id: 22,
  act: 4,
  title: "Terminal Dissolution",
  speakerNotes: "Slide 22 freeze! Temperature reaches 0.0. All graph motion locks permanently. Navigation backward is blocked. The scar is sealed.",
  timing: {
    transitionDuration: 800,
    initialDelay: 2000,   // 2 second delay before typewriter begins
    typewriterSpeed: 200 // slow, epic typewriter speed (200ms/char)
  },
  contentHtml: `
      <div style="display: flex; flex-direction: column; min-height: calc(100vh - var(--status-bar-height) - var(--footer-height) - 7rem); position: relative;">
        <div>
          <h1 style="font-size: var(--font-h1); margin-bottom: 1.8rem;" class="typewriter-title">Terminal Dissolution</h1>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding-bottom: 8rem; width: 100%;">
          <div style="font-family: var(--font-mono); font-size: 3.8rem; font-weight: bold; color: var(--accent); letter-spacing: -0.02em; min-height: 5rem; display: flex; align-items: center; justify-content: center;">
            <span id="s22-epic-typewriter"></span>
          </div>
        </div>

        <div class="slide-bottom-bar">
          <p class="text-accent" style="font-family: var(--font-mono); font-size: 1.6rem; margin: 0; font-weight: bold; line-height: 1.2;">
            ▸ The presentation is over: the apparatus has permanently registered its cut.
          </p>
        </div>
      </div>
    `
};
