// ponytail: modular slide 18 definition with step-by-step column and substrate typewriter reveals
export const slide18 = {
  id: 18,
  act: 3,
  title: "The Perpetrator's Question",
  speakerNotes: "Inward (Deleuze): How do I become worthy of the event? Outward (The Scar): Who pays the material cost of the cut I have just made?",
  timing: {
    transitionDuration: 800,
    initialDelay: 2000,      // Delay before left column (Inward) appears
    outwardDelay: 3500,      // Delay after inward column before right column (Outward) appears
    sub1Delay: 2000,         // Delay after outward column before 1st substrate line starts typing
    sub2Delay: 2400,         // Delay between 1st and 2nd substrate line typewriter starts
    sub3Delay: 2600,         // Delay between 2nd and 3rd substrate line typewriter starts
    typewriterSpeed: 20      // ms per char for substrate line typewriter animation
  },
  contentHtml: `
      <div style="display: flex; flex-direction: column; min-height: calc(100vh - var(--status-bar-height) - var(--footer-height) - 7rem); position: relative;">
        <div style="margin-bottom: 2rem;">
          <h1 style="font-size: var(--font-h1); margin: 0;" class="typewriter-title">The Perpetrator's Question</h1>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; padding-bottom: 5rem; width: 100%;">
          <table style="width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 1.05rem; line-height: 1.6; margin-bottom: 2rem;">
            <thead>
              <tr style="border-bottom: 2px solid var(--border-subtle);">
                <th id="s18-col-left-head" style="text-align: left; padding: 0.5rem 1.2rem 0.6rem 0; color: var(--text-dim); width: 48%; opacity: 0; transition: opacity 0.5s ease;">INWARD (Deleuze)</th>
                <th id="s18-col-right-head" style="text-align: left; padding: 0.5rem 0 0.6rem 1.2rem; color: var(--accent); width: 52%; border-left: 1px solid var(--border-subtle); opacity: 0; transition: opacity 0.5s ease;">OUTWARD (The Scar)</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--border-subtle);">
                <td id="s18-col-left-r1" style="padding: 0.6rem 1.2rem 0.6rem 0; color: var(--text-secondary); vertical-align: top; opacity: 0; transition: opacity 0.5s ease;">
                  How do I become worthy of the event that befalls me?
                </td>
                <td id="s18-col-right-r1" style="padding: 0.6rem 0 0.6rem 1.2rem; color: var(--accent); font-weight: bold; vertical-align: top; border-left: 1px solid var(--border-subtle); opacity: 0; transition: opacity 0.5s ease;">
                  Who pays the material cost of the cut I have just made?
                </td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border-subtle);">
                <td id="s18-col-left-r2" style="padding: 0.6rem 1.2rem 0.6rem 0; color: var(--text-dim); vertical-align: top; opacity: 0; transition: opacity 0.5s ease;">
                  Amor fati — the victim counter-actualizes the wound
                </td>
                <td id="s18-col-right-r2" style="padding: 0.6rem 0 0.6rem 1.2rem; color: var(--text-primary); vertical-align: top; border-left: 1px solid var(--border-subtle); opacity: 0; transition: opacity 0.5s ease;">
                  Response-ability — accounting for the non-consensual cut
                </td>
              </tr>
              <tr>
                <td id="s18-col-left-r3" style="padding: 0.6rem 1.2rem 0.6rem 0; color: var(--text-dim); vertical-align: top; opacity: 0; transition: opacity 0.5s ease;">
                  Works for human poets
                </td>
                <td id="s18-col-right-r3" style="padding: 0.6rem 0 0.6rem 1.2rem; color: var(--text-primary); font-weight: bold; vertical-align: top; border-left: 1px solid var(--border-subtle); opacity: 0; transition: opacity 0.5s ease;">
                  Works for soil, servers, slime mold
                </td>
              </tr>
            </tbody>
          </table>

          <div style="font-family: var(--font-mono); font-size: 1.05rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.5rem; border-left: 3px solid var(--accent-dim); padding-left: 1.2rem; line-height: 1.5; min-height: 5.5rem;">
            <span id="s18-sub-1" style="min-height: 1.5rem; display: block;"></span>
            <span id="s18-sub-2" style="min-height: 1.5rem; display: block;"></span>
            <span id="s18-sub-3" style="min-height: 1.5rem; display: block;"></span>
          </div>
        </div>

        <div class="slide-bottom-bar">
          <p class="text-accent" style="font-family: var(--font-mono); font-size: 1.6rem; margin: 0; font-weight: bold; line-height: 1.2;">
            ▸ Inward asks: How do I become worthy? Outward asks: Who pays the material cost?
          </p>
        </div>
      </div>
    `
};
