// ponytail: modular slide 15 definition with step-by-step typewriter and dimming sequence
export const slide15 = {
  id: 15,
  act: 2,
  title: "Why \"Scar\" and Not the Others",
  speakerNotes: "Mark (no violence), Trace (no permanence), Sediment (passive), Fold (no ethical demand), Cut (instantaneous). SCAR is violent, permanent, and demands accountability.",
  timing: { transitionDuration: 800 },
  contentHtml: `
      <div style="display: flex; flex-direction: column; min-height: calc(100vh - var(--status-bar-height) - var(--footer-height) - 7rem); position: relative;">
        <div style="margin-bottom: 2.5rem;">
          <h1 style="font-size: var(--font-h1); margin: 0;" class="typewriter-title">Why "Scar" and Not the Others</h1>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; padding-bottom: 4rem; width: 100%;">
          <table style="width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 1.05rem; line-height: 1.6;">
            <tbody>
              <tr id="s15-row-1" style="opacity: 0; transition: opacity 0.4s ease;">
                <td id="s15-term-1" style="padding: 0.5rem 0.6rem 0.5rem 0.8rem; color: var(--text-primary); width: 14%; font-weight: bold; opacity: 0; transition: opacity 0.4s ease, color 0.4s ease;">Mark</td>
                <td style="padding: 0.5rem 0; color: var(--text-primary); transition: color 0.4s ease;"><span id="s15-def-1"></span></td>
              </tr>
              <tr id="s15-row-2" style="opacity: 0; transition: opacity 0.4s ease;">
                <td id="s15-term-2" style="padding: 0.5rem 0.6rem 0.5rem 0.8rem; color: var(--text-primary); font-weight: bold; opacity: 0; transition: opacity 0.4s ease, color 0.4s ease;">Trace</td>
                <td style="padding: 0.5rem 0; color: var(--text-primary); transition: color 0.4s ease;"><span id="s15-def-2"></span></td>
              </tr>
              <tr id="s15-row-3" style="opacity: 0; transition: opacity 0.4s ease;">
                <td id="s15-term-3" style="padding: 0.5rem 0.6rem 0.5rem 0.8rem; color: var(--text-primary); font-weight: bold; opacity: 0; transition: opacity 0.4s ease, color 0.4s ease;">Sediment</td>
                <td style="padding: 0.5rem 0; color: var(--text-primary); transition: color 0.4s ease;"><span id="s15-def-3"></span></td>
              </tr>
              <tr id="s15-row-4" style="opacity: 0; transition: opacity 0.4s ease;">
                <td id="s15-term-4" style="padding: 0.5rem 0.6rem 0.5rem 0.8rem; color: var(--text-primary); font-weight: bold; opacity: 0; transition: opacity 0.4s ease, color 0.4s ease;">Fold</td>
                <td style="padding: 0.5rem 0; color: var(--text-primary); transition: color 0.4s ease;"><span id="s15-def-4"></span></td>
              </tr>
              <tr id="s15-row-5" style="opacity: 0; transition: opacity 0.4s ease;">
                <td id="s15-term-5" style="padding: 0.5rem 0.6rem 0.5rem 0.8rem; color: var(--text-primary); font-weight: bold; opacity: 0; transition: opacity 0.4s ease, color 0.4s ease;">Cut</td>
                <td style="padding: 0.5rem 0; color: var(--text-primary); transition: color 0.4s ease;"><span id="s15-def-5"></span></td>
              </tr>
              <tr id="s15-row-6" style="opacity: 0; transition: opacity 0.4s ease; background: rgba(255,87,34,0.06); border-left: 3px solid var(--accent);">
                <td id="s15-term-6" style="padding: 0.6rem 0.6rem 0.6rem 0.8rem; color: var(--accent); font-weight: bold; opacity: 0; transition: opacity 0.4s ease;">SCAR</td>
                <td style="padding: 0.6rem 0; color: var(--text-primary);"><span id="s15-def-6"></span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="slide-bottom-bar">
          <p id="s15-bottom-note" class="text-accent" style="font-family: var(--font-mono); font-size: 1.6rem; margin: 0; font-weight: bold; line-height: 1.2; opacity: 0; transition: opacity 0.4s ease; min-height: 1.8rem;"></p>
        </div>
      </div>
    `
};
