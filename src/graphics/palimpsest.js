import { themeManager } from '../config/theme-manager.js';

export class PalimpsestBuffer {
  constructor(canvasGhost, canvasBurnIn) {
    this.canvasGhost = canvasGhost;
    this.ctxGhost = canvasGhost ? canvasGhost.getContext('2d') : null;
    this.canvasBurnIn = canvasBurnIn;
    this.ctxBurnIn = canvasBurnIn ? canvasBurnIn.getContext('2d') : null;
  }

  resize(width, height) {
    if (!this.canvasGhost) return;
    
    // Save current ghost canvas content before resize
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = this.canvasGhost.width || width;
    tempCanvas.height = this.canvasGhost.height || height;
    const tempCtx = tempCanvas.getContext('2d');
    if (this.canvasGhost.width > 0 && this.canvasGhost.height > 0) {
      tempCtx.drawImage(this.canvasGhost, 0, 0);
    }

    this.canvasGhost.width = width;
    this.canvasGhost.height = height;
    if (this.canvasBurnIn) {
      this.canvasBurnIn.width = width;
      this.canvasBurnIn.height = height;
    }

    // Restore ghost canvas content
    if (tempCanvas.width > 0 && tempCanvas.height > 0) {
      this.ctxGhost.drawImage(tempCanvas, 0, 0, width, height);
    }
  }

  captureSlideGhost(slideContentText) {
    return; // Ghosting disabled
  }

  addBurnInMark(x, y, radius, isAccent = false) {
    return; // Burn-in disabled
  }

  clear() {
    if (this.ctxGhost) {
      this.ctxGhost.clearRect(0, 0, this.canvasGhost.width, this.canvasGhost.height);
    }
    if (this.ctxBurnIn) {
      this.ctxBurnIn.clearRect(0, 0, this.canvasBurnIn.width, this.canvasBurnIn.height);
    }
  }
}

