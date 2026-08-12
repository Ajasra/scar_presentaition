// ponytail: modular slide 05 definition with central timing configuration
export const slide05 = {
  id: 5,
  act: 1,
  title: "The Shake Creates the Shaker",
  speakerNotes: "Karen Barad's agential cut: interaction vs intra-action. The collision event co-produces hand and grip, cutter and wound, in a single stroke.",
  timing: {
    handsMoveDelay: 500,       // ms delay before hands start moving
    handsDuration: 5500,        // ms hands movement duration (stops at 6.7s)
    typeLine1Delay: 6700,       // ms delay before typing line 1
    typeLine1Speed: 50,         // ms per char for line 1
    line1Pause: 1800,           // ms terminal cursor pause at end of line 1
    typeLine2Speed: 45,         // ms per char for line 2
    line2Pause: 1000,           // ms terminal cursor pause at end of line 2
    cartesianBlockDelay: 13000, // ms before cartesian paradigm block reveals
    strikethroughDelay: 20500,  // ms before orange cut line strikes through
    middleActionDelay: 17500,   // ms before arrow and INTERACTION reveal
    scrambleDelay: 18300,       // ms before letter scramble starts
    scrambleSpeed: 35,          // ms per scramble frame
    scrambleFrames: 30,         // total scramble frames
    finalResolutionDelay: 22000 // ms before bottom resolution reveals
  },
  contentHtml: `
      <div style="display: flex; flex-direction: column; min-height: calc(100vh - var(--status-bar-height) - var(--footer-height) - 7rem); position: relative;">
        <h1 style="font-size: var(--font-h1); margin-bottom: 2rem;" class="typewriter-title">The Shake Creates the Shaker</h1>

        <div style="display: flex; flex-direction: column; align-items: center; text-align: center; max-width: 800px; margin: 0 auto; width: 100%;">
          <div id="typewriter-lead" style="min-height: 4.5rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <p id="type-line-1" style="color: var(--text-primary); font-size: var(--font-body); margin: 0 0 0.4rem 0; min-height: 1.8rem; display: inline-flex; align-items: center;"></p>
            <p id="type-line-2" style="color: var(--text-dim); font-size: var(--font-small); margin: 0; min-height: 1.6rem; display: inline-flex; align-items: center;"></p>
          </div>

          <div class="cut-cartesian-block" style="margin-bottom: 2rem; padding: 1.2rem 2rem; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-subtle); border-radius: 6px; width: 100%; box-sizing: border-box;">
            <span style="display: block; font-family: var(--font-mono); font-size: var(--font-small); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.4rem; color: var(--text-dim);">Cartesian paradigm:</span>
            <span style="font-size: var(--font-body);">A pre-existing artist cuts a passive medium.</span>
          </div>

          <div class="cut-middle-action" style="display: flex; align-items: center; justify-content: center; gap: 1rem; color: var(--accent); font-family: var(--font-mono); font-size: var(--font-body); margin: 1.5rem 0; font-weight: bold;">
            <span style="font-size: 1.8rem;">↓</span>
            <span id="shuffle-word">INTERACTION</span>
          </div>
        </div>

        <div class="slide-bottom-bar cut-final-resolution">
          <p class="text-accent" style="font-family: var(--font-mono); font-size: var(--font-body); margin: 0; font-weight: bold;">▸ The agential cut produces both the cutter and the wound.</p>
          <span class="slide-ref">— Karen Barad, <em>Meeting the Universe Halfway</em>, 2007</span>
        </div>
      </div>
    `
};
