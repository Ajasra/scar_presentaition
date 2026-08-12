import { RhizomePhysics } from './physics.js';
import { GeometriesRenderer } from './geometries.js';
import { PalimpsestBuffer } from './palimpsest.js';
import { SelfFrameObserver } from './self-frame.js';
import { HalftoneHandsRenderer } from './halftone-hands.js';
import { appState } from '../engine/state.js';

export class CanvasStackManager {
  constructor() {
    this.bgGhostCanvas = document.getElementById('bg-ghost-canvas');
    this.bgBurninCanvas = document.getElementById('bg-burnin-canvas');
    this.rhizomeCanvas = document.getElementById('rhizome-canvas');
    this.geometryCanvas = document.getElementById('geometry-canvas');

    this.physics = new RhizomePhysics(this.rhizomeCanvas);
    this.geometries = new GeometriesRenderer(this.geometryCanvas);
    this.halftoneHands = new HalftoneHandsRenderer(this.geometryCanvas);
    this.palimpsest = new PalimpsestBuffer(this.bgGhostCanvas, this.bgBurninCanvas);
    this.selfFrame = new SelfFrameObserver();

    this.isRunning = false;
    this.initResize();
  }

  initResize() {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.physics.resize(w, h);
      this.geometries.resize(w, h);
      this.halftoneHands.resize(w, h);
      this.palimpsest.resize(w, h);
      this.palimpsest.clear();
    };

    window.addEventListener('resize', handleResize);
    handleResize();
  }

  start() {
    if (this.isRunning) return;
    this.palimpsest.clear();
    this.isRunning = true;
    this.loop();
  }

  stop() {
    this.isRunning = false;
  }

  loop() {
    if (!this.isRunning) return;

    const snapshot = appState.getStateSnapshot();

    // 1. Update Physics
    this.physics.update(snapshot.temperature, snapshot.act);

    // 2. Render Physics
    this.physics.render(snapshot.temperature, snapshot.act);

    // 3. Render Geometries & Halftone Hands
    this.geometries.render(snapshot.act, snapshot.slideIndex, snapshot.stepIndex);
    this.halftoneHands.render(snapshot.slideIndex);

    // 4. Render Recursive Self-Frame Observer
    this.selfFrame.update(this.rhizomeCanvas, this.geometryCanvas, snapshot);

    requestAnimationFrame(() => this.loop());
  }

  onSlideChange(outgoingText) {
    this.palimpsest.captureSlideGhost(outgoingText);
  }
}
