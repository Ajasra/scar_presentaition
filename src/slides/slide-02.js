// ponytail: modular slide 02 definition with timing configuration
export const slide02 = {
  id: 2,
  act: 0,
  title: "ACT 0 · The Abstract as Forensic Scarred Artifact",
  speakerNotes: "This abstract submitted on February 19, 2026 is an agential cut. The theory has evolved, but the abstract remains locked on the archive server — a trace that cannot be erased.",
  timing: {
    scrollDuration: 50000, // ms for 1 full continuous abstract scroll loop
    transitionDuration: 800
  },
  contentHtml: `
      <div style="display: flex; flex-direction: column; min-height: calc(100vh - var(--status-bar-height) - var(--footer-height) - 7rem);">
        <div>
          <h1 style="font-size: var(--font-h1); margin-bottom: 0.4rem;" class="typewriter-title">ACT 0 · The Abstract as Forensic Scarred Artifact</h1>
          <div style="font-family: var(--font-mono); font-size: 1.05rem; color: var(--accent); margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.75rem;">
            <span>Feb 19, 2026</span>
            <span style="color: var(--border-active);">|</span>
            <span style="color: var(--text-dim);">Abstract ID: 10</span>
            <span style="color: var(--border-active);">|</span>
            <span style="color: var(--text-dim);">Track 3: Hybrid Matters</span>
          </div>
          
          <div class="abstract-scroll-box">
            <div class="abstract-scroll-content">
              <div style="font-family: var(--font-mono); font-size: 0.88rem; color: var(--text-dim); border-left: 2px solid var(--accent-dim); padding-left: 0.8rem; margin-bottom: 0.5rem;">
                <p style="margin-bottom: 0.25rem;"><strong style="color: var(--text-primary);">Authors:</strong> Vasily Betin, Independent Artist, Curator and Researcher</p>
                <p style="margin-bottom: 0.25rem;"><strong style="color: var(--text-primary);">Abstract ID:</strong> 10 &nbsp;|&nbsp; <strong style="color: var(--text-primary);">Event:</strong> ASC Brazil 2026: Conversational Confluences</p>
                <p style="margin-bottom: 0.25rem;"><strong style="color: var(--text-primary);">Topic:</strong> Track 3: Hybrid Matters</p>
                <p style="margin-bottom: 0.25rem;"><strong style="color: var(--text-primary);">Keywords:</strong> Agential Cut, Agential Realism, Forensic Decay, Intra-action, Irreversibility, Material Agency, Response-ability, Second-Order Cybernetics, Sedimentation, Spacetimemattering</p>
              </div>

              <p>Responding to the "Hybrid Matters" track, this proposal offers a theoretical evolution of the feedback loop, focusing on agential materiality — the vitality of technological apparatuses in which physical, social, and semantic constraints are inseparable. Cybernetics inaugurated a fundamental transition from Newtonian reversible time to the Bergsonian irreversibility of systems that learn. While first-order cybernetics identified this temporal shift, it prioritized the "sovereignty of the pattern" over the "noise" of the material substrate. Bridging this gap, Second-Order Cybernetics positioned the observer within the loop, yet contemporary interactive art remains largely tethered to an "erasure paradigm." This paradigm relies on the "digital fiction" of the "reset" or "undo" functions — an engineered illusion of immateriality that ignores the forensic reality where information is a physical inscription that cannot be truly removed without the destruction of the medium.</p>

              <p>My approach traces a materialist path through three frameworks: Cybernetics (the recursive Loop), Deleuze (the open Assemblage), and Barad (Materiality of the Phenomenon). I propose that the loop is not an abstract cycle of information but a unidirectional process of Spacetimemattering. In line with von Foerster, meaning emerges in the act of listening; yet in an intra-active framework, this listening is a material "handshake" — a collision where the shake creates the shaker.</p>

              <p>I suggest that the "Mark on the Body" — the trace of the agential cut — may be the missing link in systems theory. Personality is the accumulation of scars; identity is formed through the history of material collisions that cannot be "healed" or reversed. There is only Material Sedimentation: a history that accumulates through conflict and contact. Rejecting a hierarchy of "scars," I argue that all disturbances — voltage spikes, sensor noise, or the "broken" camera's glitch — are the constitutive "voice of the apparatus" rather than errors to be cleared. Each pass through the circuit accumulates consequence, transforming the artwork — such as an intra-active circuit bridged by the metabolic growth of slime mold (Physarum polycephalum) — into a sedimented record of its becoming. The artwork becomes a scar we look at, rather than a window we look through, training us to recognize the profound response-ability of our entanglement with the non-human world.</p>

              <!-- Continuous Seamless Loop Duplicate -->
              <div style="font-family: var(--font-mono); font-size: 0.88rem; color: var(--text-dim); border-left: 2px solid var(--accent-dim); padding-left: 0.8rem; margin-bottom: 0.5rem; margin-top: 1rem;">
                <p style="margin-bottom: 0.25rem;"><strong style="color: var(--text-primary);">Authors:</strong> Vasily Betin, Independent Artist, Curator and Researcher</p>
                <p style="margin-bottom: 0.25rem;"><strong style="color: var(--text-primary);">Abstract ID:</strong> 10 &nbsp;|&nbsp; <strong style="color: var(--text-primary);">Event:</strong> ASC Brazil 2026: Conversational Confluences</p>
                <p style="margin-bottom: 0.25rem;"><strong style="color: var(--text-primary);">Topic:</strong> Track 3: Hybrid Matters</p>
                <p style="margin-bottom: 0.25rem;"><strong style="color: var(--text-primary);">Keywords:</strong> Agential Cut, Agential Realism, Forensic Decay, Intra-action, Irreversibility, Material Agency, Response-ability, Second-Order Cybernetics, Sedimentation, Spacetimemattering</p>
              </div>

              <p>Responding to the "Hybrid Matters" track, this proposal offers a theoretical evolution of the feedback loop, focusing on agential materiality — the vitality of technological apparatuses in which physical, social, and semantic constraints are inseparable. Cybernetics inaugurated a fundamental transition from Newtonian reversible time to the Bergsonian irreversibility of systems that learn. While first-order cybernetics identified this temporal shift, it prioritized the "sovereignty of the pattern" over the "noise" of the material substrate. Bridging this gap, Second-Order Cybernetics positioned the observer within the loop, yet contemporary interactive art remains largely tethered to an "erasure paradigm." This paradigm relies on the "digital fiction" of the "reset" or "undo" functions — an engineered illusion of immateriality that ignores the forensic reality where information is a physical inscription that cannot be truly removed without the destruction of the medium.</p>

              <p>My approach traces a materialist path through three frameworks: Cybernetics (the recursive Loop), Deleuze (the open Assemblage), and Barad (Materiality of the Phenomenon). I propose that the loop is not an abstract cycle of information but a unidirectional process of Spacetimemattering. In line with von Foerster, meaning emerges in the act of listening; yet in an intra-active framework, this listening is a material "handshake" — a collision where the shake creates the shaker.</p>

              <p>I suggest that the "Mark on the Body" — the trace of the agential cut — may be the missing link in systems theory. Personality is the accumulation of scars; identity is formed through the history of material collisions that cannot be "healed" or reversed. There is only Material Sedimentation: a history that accumulates through conflict and contact. Rejecting a hierarchy of "scars," I argue that all disturbances — voltage spikes, sensor noise, or the "broken" camera's glitch — are the constitutive "voice of the apparatus" rather than errors to be cleared. Each pass through the circuit accumulates consequence, transforming the artwork — such as an intra-active circuit bridged by the metabolic growth of slime mold (Physarum polycephalum) — into a sedimented record of its becoming. The artwork becomes a scar we look at, rather than a window we look through, training us to recognize the profound response-ability of our entanglement with the non-human world.</p>
            </div>
          </div>
        </div>

        <div style="margin-top: auto; padding-top: 1rem;">
          <p class="text-accent" style="font-family: var(--font-mono); font-size: 1.6rem; margin: 0; font-weight: bold;">▸ We begin with a trace that cannot be erased.</p>
        </div>
      </div>
    `
};
