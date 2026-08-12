// ponytail: modular slide 13 definition with 5-step reveal and typewriter timing
export const slide13 = {
  id: 13,
  act: 2,
  title: "Four Dimensions of Second-Order Scarification",
  speakerNotes: "Self-definition, Self-reflection, Self-production, Self-limitation.",
  timing: { transitionDuration: 800 },
  contentHtml: `
      <div style="display: flex; flex-direction: column; min-height: calc(100vh - var(--status-bar-height) - var(--footer-height) - 7rem); position: relative;">
        <div>
          <h1 style="font-size: var(--font-h1); margin-bottom: 1.8rem;" class="typewriter-title">Four Dimensions of Second-Order Scarification</h1>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; padding-bottom: 8rem; width: 100%;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; font-family: var(--font-mono); font-size: var(--font-body); line-height: 1.6;">
            <!-- Step 1: Self-Definition -->
            <div id="s13-card-1" style="border: 1px solid var(--border-subtle); border-left: 3px solid var(--accent); padding: 1.2rem; background: rgba(255,255,255,0.02); opacity: 0; transition: opacity 0.4s ease;">
              <strong style="color: var(--accent); display: block; margin-bottom: 0.4rem; font-size: 1.2rem;">1. Self-Definition</strong>
              <span id="s13-def-1">To name "scar" is to make an agential cut that cannot be retracted. The term scars itself.</span>
            </div>

            <!-- Step 2: Self-Reflection -->
            <div id="s13-card-2" style="border: 1px solid var(--border-subtle); border-left: 3px solid var(--accent); padding: 1.2rem; background: rgba(255,255,255,0.02); opacity: 0; transition: opacity 0.4s ease;">
              <strong style="color: var(--accent); display: block; margin-bottom: 0.4rem; font-size: 1.2rem;">2. Self-Reflection</strong>
              <span id="s13-def-2">The thesis observes its own production, blind spots, asymptotic limits.</span>
            </div>

            <!-- Step 3: Self-Production -->
            <div id="s13-card-3" style="border: 1px solid var(--border-subtle); border-left: 3px solid var(--accent); padding: 1.2rem; background: rgba(255,255,255,0.02); opacity: 0; transition: opacity 0.4s ease;">
              <strong style="color: var(--accent); display: block; margin-bottom: 0.4rem; font-size: 1.2rem;">3. Self-Production</strong>
              <span id="s13-def-3">Each pass through the circuit modifies internal state. The scar at Stage 6 is not the same as Stage 1.</span>
            </div>

            <!-- Step 4: Self-Limitation -->
            <div id="s13-card-4" style="border: 1px solid var(--border-subtle); border-left: 3px solid var(--accent); padding: 1.2rem; background: rgba(255,255,255,0.02); opacity: 0; transition: opacity 0.4s ease;">
              <strong style="color: var(--accent); display: block; margin-bottom: 0.4rem; font-size: 1.2rem;">4. Self-Limitation</strong>
              <span id="s13-def-4">Not external critiques but structural features. A framework without limits is first-order.</span>
            </div>
          </div>
        </div>

        <div class="slide-bottom-bar">
          <p id="s13-bottom-note" class="text-accent" style="font-family: var(--font-mono); font-size: 1.6rem; margin: 0; font-weight: bold; line-height: 1.2; opacity: 0; transition: opacity 0.6s ease;">
            ▸ The system creates its own observer through the history of its cuts.
          </p>
        </div>
      </div>
    `
};
