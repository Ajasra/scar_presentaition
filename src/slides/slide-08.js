// ponytail: modular slide 08 definition with timing configuration
export const slide08 = {
  id: 8,
  act: 2,
  title: "ACT II · Blended Geometries & The Thesis as Primary Case Study",
  speakerNotes: "Entering Act II. Three 3D wireframe geometries + void overlay on the concept clusters.",
  timing: { transitionDuration: 800 },
  contentHtml: `
      <div style="display: flex; flex-direction: column; min-height: calc(100vh - var(--status-bar-height) - var(--footer-height) - 7rem); position: relative;">
        <div>
          <h1 style="font-size: var(--font-h1); margin-bottom: 1.8rem;" class="typewriter-title">ACT II · Blended Geometries & The Thesis as Primary Case Study</h1>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
          <h2 style="font-size: var(--font-h2); color: var(--accent); margin-bottom: 1rem;">Three Geometries & The Void</h2>
          <p style="font-size: 1.3rem; color: var(--text-secondary); max-width: 48rem; line-height: 1.5;">
            Tracing the structural deformation from recursive feedback loops to physical sedimentation.
          </p>
        </div>
      </div>
    `
};
