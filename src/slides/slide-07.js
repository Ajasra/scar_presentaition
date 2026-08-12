// ponytail: modular slide 07 definition with timing configuration
export const slide07 = {
  id: 7,
  act: 1,
  title: "Diffractive Definition Assembly",
  speakerNotes: "Defining the Scar across Cybernetics, Deleuze, Barad, and Simondon. The dark fringes where diffraction cancels rather than compounds.",
  maxSteps: 7,
  timing: {
    transitionDuration: 800,
    regTypewriterSpeed: 35,
    regPause: 800,
    // Customizable list of concise Scar definitions extracted from scar.md
    scarDefinitions: [
      "▸ The real is that which scars; no state exists unscarred.",
      "▸ If it doesn't leave the scar, it is noise.",
      "▸ The world is a palimpsest of prior cuts; no state exists unscarred.",
      "▸ The scar is the material remainder of an irreversible agential cut.",
      "▸ Memory is Konsistenzprüfung — a consistency check preventing erasure.",
      "▸ The scar is an active operator, permanently reorganizing future response.",
      "▸ Proof of encounter: convergence without friction is the wheel spinning in air.",
      "▸ Thermodynamic debt: every individuation forecloses counterfactual futures.",
      "▸ The body's own registration of a distinction it could not refuse."
    ]
  },
  contentHtml: `
      <div style="display: flex; flex-direction: column; min-height: calc(100vh - var(--status-bar-height) - var(--footer-height) - 7rem); position: relative;">
        <div>
          <h1 style="font-size: var(--font-h1); margin-bottom: 1.5rem;" class="typewriter-title">Diffractive Definition Assembly</h1>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; width: 100%;">
          <!-- Step 1: Five Frameworks Assembly -->
          <div class="step-1-content" style="width: 100%; display: flex; flex-direction: column;">
            <!-- Definition Box -->
            <div style="font-family: var(--font-mono); font-size: 1.2rem; border: 1px solid var(--border-subtle); border-left: 4px solid var(--accent); padding: 0.9rem 1.2rem; background: rgba(0,0,0,0.5); margin-bottom: 1.5rem; line-height: 1.5; box-sizing: border-box;">
              <strong style="color: var(--accent);">The Scar:</strong> The material remainder of an irreversible agential cut — a physical deformation accumulated across recursive loops that forecloses counterfactual futures and persists as a record that cannot be undone.
            </div>

            <!-- Graph Canvas Diagram (Expanded Height & Overflow Visible) -->
            <div id="s7-diagram-box" style="position: relative; width: 100%; height: 460px; box-sizing: border-box; overflow: visible;">
              <!-- Dynamic Canvas Line Renderer -->
              <canvas id="s7-lines-canvas" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 2; overflow: visible;"></canvas>

              <!-- Center SCAR Node (Frameless text with dot above) -->
              <div id="s7-scar-node" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 5; font-family: var(--font-mono); font-weight: bold; color: var(--accent); font-size: 1.6rem; text-align: center; letter-spacing: 0.1em; display: flex; flex-direction: column; align-items: center; gap: 0.35rem; opacity: 0; transition: opacity 1s ease; animation: pulse-scar-node 2.5s infinite ease-in-out;">
                <div id="s7-scar-dot" style="width: 11px; height: 11px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 10px var(--accent);"></div>
                <span>SCAR</span>
              </div>

              <!-- Floating Node 1: Cybernetics (Top-Left) -->
              <div id="s7-node-1" class="s7-floating-card" style="position: absolute; top: 15px; left: 150px; width: 330px; z-index: 4; font-family: var(--font-mono); opacity: 0; transition: opacity 1.2s ease; animation: float-node-organic-1 6s infinite ease-in-out;">
                <div style="display: flex; align-items: flex-start; gap: 0.75rem; flex-direction: row-reverse; text-align: right;">
                  <div style="width: 10px; height: 10px; border-radius: 50%; background: var(--accent); margin-top: 0.55rem; flex-shrink: 0; box-shadow: 0 0 6px var(--accent);"></div>
                  <div>
                    <div style="color: var(--accent); font-weight: bold; font-size: 1.45rem; margin-bottom: 0.35rem;">Cybernetics (v. Foerster / Luhmann)</div>
                    <div style="color: var(--text-secondary); font-size: 1.22rem; line-height: 1.35;">NTM state z & Konsistenzprüfung — material memory</div>
                  </div>
                </div>
              </div>

              <!-- Floating Node 2: Deleuze (Top-Right) -->
              <div id="s7-node-2" class="s7-floating-card" style="position: absolute; top: 25px; right: 150px; width: 330px; z-index: 4; font-family: var(--font-mono); opacity: 0; transition: opacity 1.2s ease; animation: float-node-organic-2 6.8s infinite ease-in-out;">
                <div style="display: flex; align-items: flex-start; gap: 0.75rem; text-align: left;">
                  <div style="width: 10px; height: 10px; border-radius: 50%; background: #ffffff; margin-top: 0.55rem; flex-shrink: 0; box-shadow: 0 0 6px #ffffff;"></div>
                  <div>
                    <div style="color: #ffffff; font-weight: bold; font-size: 1.45rem; margin-bottom: 0.35rem;">Deleuze (BwO)</div>
                    <div style="color: var(--text-secondary); font-size: 1.22rem; line-height: 1.35;">Immanent pleat — residue of antiproduction</div>
                  </div>
                </div>
              </div>

              <!-- Floating Node 3: Barad (Bottom-Left) -->
              <div id="s7-node-3" class="s7-floating-card" style="position: absolute; top: 260px; left: 150px; width: 330px; z-index: 4; font-family: var(--font-mono); opacity: 0; transition: opacity 1.2s ease; animation: float-node-organic-2 6.2s infinite ease-in-out;">
                <div style="display: flex; align-items: flex-start; gap: 0.75rem; flex-direction: row-reverse; text-align: right;">
                  <div style="width: 10px; height: 10px; border-radius: 50%; background: var(--accent); margin-top: 0.55rem; flex-shrink: 0; box-shadow: 0 0 6px var(--accent);"></div>
                  <div>
                    <div style="color: var(--accent); font-weight: bold; font-size: 1.45rem; margin-bottom: 0.35rem;">Barad (Agential Realism)</div>
                    <div style="color: var(--text-secondary); font-size: 1.22rem; line-height: 1.35;">Spacetimemattering trace of cut — exclusion that matters</div>
                  </div>
                </div>
              </div>

              <!-- Floating Node 4: Simondon (Bottom-Right) -->
              <div id="s7-node-4" class="s7-floating-card" style="position: absolute; top: 250px; right: 150px; width: 330px; z-index: 4; font-family: var(--font-mono); opacity: 0; transition: opacity 1.2s ease; animation: float-node-organic-1 7.2s infinite ease-in-out;">
                <div style="display: flex; align-items: flex-start; gap: 0.75rem; text-align: left;">
                  <div style="width: 10px; height: 10px; border-radius: 50%; background: var(--text-dim); margin-top: 0.55rem; flex-shrink: 0; box-shadow: 0 0 6px var(--text-dim);"></div>
                  <div>
                    <div style="color: var(--text-dim); font-weight: bold; font-size: 1.45rem; margin-bottom: 0.35rem;">Simondon (Individuation)</div>
                    <div style="color: var(--text-secondary); font-size: 1.22rem; line-height: 1.35;">Crystallized residue of spent potential — foreclosed futures</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Dark Fringes & Interference Tensions -->
          <div class="step-2-content" style="display: none; width: 100%; box-sizing: border-box;">
            <!-- Top Callout (Identical position and dimensions to Step 1 definition box) -->
            <div style="font-family: var(--font-mono); font-size: 1.2rem; border: 1px solid var(--border-subtle); border-left: 4px solid var(--accent); padding: 0.9rem 1.2rem; background: rgba(0,0,0,0.5); margin-bottom: 1.5rem; line-height: 1.5; box-sizing: border-box;">
              The scar is not a synthesis. It emerges precisely at the <strong style="color: var(--accent);">dark fringes</strong> — where diffraction cancels rather than compounds.
            </div>

            <!-- Dark Fringes Table & Colliding Framework Collision Zone -->
            <div style="position: relative; width: 100%; min-height: 400px; box-sizing: border-box;">
              <table style="width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 1.1rem; line-height: 1.5; margin-bottom: 1.5rem; border: 1px solid var(--border-subtle); background: rgba(5,5,12,0.4);">
                <thead>
                  <tr style="border-bottom: 1px solid var(--border-subtle); background: rgba(255,255,255,0.03);">
                    <th style="padding: 0.75rem 1rem; color: var(--accent); text-align: left; width: 22%;">DARK FRINGE</th>
                    <th style="padding: 0.75rem 1rem; color: var(--text-secondary); text-align: left; width: 26%;">FRAMEWORKS</th>
                    <th style="padding: 0.75rem 1rem; color: var(--text-primary); text-align: left; width: 52%;">THE TENSION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom: 1px solid var(--border-subtle);">
                    <td style="padding: 0.85rem 1rem; color: var(--accent); font-weight: bold; vertical-align: top;">Inside-outside</td>
                    <td style="padding: 0.85rem 1rem; color: #ffffff; font-weight: bold; vertical-align: top;">Autopoiesis <span style="color:var(--accent);">vs.</span> Barad</td>
                    <td style="padding: 0.85rem 1rem; color: var(--text-secondary); vertical-align: top;">Closure codes everything as internal drift. Exteriority-within insists the outside intrudes.</td>
                  </tr>
                  <tr>
                    <td style="padding: 0.85rem 1rem; color: var(--accent); font-weight: bold; vertical-align: top;">Is vs. Ought</td>
                    <td style="padding: 0.85rem 1rem; color: #ffffff; font-weight: bold; vertical-align: top;">Deleuze <span style="color:var(--accent);">vs.</span> Barad</td>
                    <td style="padding: 0.85rem 1rem; color: var(--text-secondary); vertical-align: top;">Deleuze maps the field descriptively. Barad demands normative responsibility.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="slide-bottom-bar">
          <div id="s7-bottom-registers" style="font-family: var(--font-mono); font-size: 1.15rem; line-height: 1.45; display: flex; flex-direction: column; gap: 0.35rem; max-height: 6.5rem; overflow: hidden; justify-content: flex-end;">
            <p id="s7-reg-1" style="margin: 0; color: var(--accent); font-weight: bold; min-height: 1.4rem; transition: all 0.5s ease;"></p>
            <p id="s7-reg-2" style="margin: 0; color: var(--accent); font-weight: bold; min-height: 1.4rem; transition: all 0.5s ease;"></p>
            <p id="s7-reg-3" style="margin: 0; color: var(--accent); font-weight: bold; min-height: 1.4rem; transition: all 0.5s ease;"></p>
          </div>
        </div>
      </div>
    `
};
