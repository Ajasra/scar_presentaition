import { themeManager } from '../config/theme-manager.js';
import { slide05 } from '../slides/slide-05.js';
import { forensicLog } from '../engine/log.js';

export class HalftoneHandsRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { willReadFrequently: true });

    this.imgLeft = new Image();
    this.imgRight = new Image();

    this.imgLeftLoaded = false;
    this.imgRightLoaded = false;

    this.canvasLeft = document.createElement('canvas');
    this.canvasRight = document.createElement('canvas');
    this.ctxLeft = this.canvasLeft.getContext('2d', { willReadFrequently: true });
    this.ctxRight = this.canvasRight.getContext('2d', { willReadFrequently: true });

    this.sampleGridLeft = [];
    this.sampleGridRight = [];

    this.gridStep = 8; // Halftone dot spacing grid in pixels
    this.animProgress = 0; // 0 to 1
    this.startTime = null;

    this.loadImages();
  }

  loadImages() {
    const processLeft = () => {
      if (this.imgLeftLoaded) return;
      this.imgLeftLoaded = true;
      forensicLog.log('SYS', 'custom graphic loaded: /assets/hand-right.png (halftone right hand)');
      this.processImageSamples(this.imgLeft, this.canvasLeft, this.ctxLeft, 'left');
    };

    const processRight = () => {
      if (this.imgRightLoaded) return;
      this.imgRightLoaded = true;
      forensicLog.log('SYS', 'custom graphic loaded: /assets/hand-left.png (halftone left hand)');
      this.processImageSamples(this.imgRight, this.canvasRight, this.ctxRight, 'right');
    };

    this.imgLeft.onload = processLeft;
    this.imgRight.onload = processRight;

    this.imgLeft.src = '/assets/hand-right.png';
    this.imgRight.src = '/assets/hand-left.png';

    if (this.imgLeft.complete && this.imgLeft.naturalWidth > 0) {
      processLeft();
    }
    if (this.imgRight.complete && this.imgRight.naturalWidth > 0) {
      processRight();
    }
  }

  processImageSamples(img, offCanvas, offCtx, type) {
    const sw = 360;
    const sh = Math.round(sw * (img.height / img.width));
    offCanvas.width = sw;
    offCanvas.height = sh;

    offCtx.drawImage(img, 0, 0, sw, sh);
    const imgData = offCtx.getImageData(0, 0, sw, sh);
    const pixels = imgData.data;

    const samples = [];
    const step = 4;

    for (let y = 0; y < sh; y += step) {
      for (let x = 0; x < sw; x += step) {
        const idx = (y * sw + x) * 4;
        const r = pixels[idx];
        const g = pixels[idx + 1];
        const b = pixels[idx + 2];
        const a = pixels[idx + 3];

        if (a > 30) {
          const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
          if (brightness < 0.88) { // Black dots in halftone source
            samples.push({
              normX: x / sw,
              normY: y / sh,
              darkness: 1.0 - brightness,
              alpha: a / 255,
              phaseOffset: Math.random() * Math.PI * 2,
              pulseSpeed: 1.2 + Math.random() * 1.8
            });
          }
        }
      }
    }

    if (type === 'left') {
      this.sampleGridLeft = samples;
    } else {
      this.sampleGridRight = samples;
    }
  }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  resetAnimation() {
    this.startTime = Date.now();
    this.animProgress = 0;
  }

  render(slideIndex) {
    if (slideIndex !== 4) { // Only active on Slide 5 (index 4)
      this.startTime = null;
      return;
    }

    if (!this.startTime) {
      this.resetAnimation();
    }

    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;

    // ponytail: read hands movement delay and duration from slide 05 timing config
    const timing = slide05?.timing || {};
    const delaySec = (timing.handsMoveDelay || 1200) / 1000;
    const durationSec = (timing.handsDuration || 5500) / 1000;

    const elapsed = (Date.now() - this.startTime) / 1000;
    const rawProgress = Math.max(0, (elapsed - delaySec) / durationSec);
    // Cubic ease-out
    this.animProgress = Math.min(1.0, 1 - Math.pow(1 - Math.min(1.0, rawProgress), 3));

    const accentColor = themeManager.getColor('accent') || '#ff5722';
    const textSecondary = themeManager.getColor('textSecondary') || '#e2e8f0';

    const handW = Math.min(width * 0.50, 660);
    const handH = handW * 0.65;

    // Movement: Top-left arm moves from -26vw/-26vh to -18vw/-18vh
    const startXLeft = -width * 0.28;
    const startYLeft = -height * 0.28;
    const endXLeft = -width * 0.18;
    const endYLeft = -height * 0.18;

    const curXLeft = startXLeft + (endXLeft - startXLeft) * this.animProgress;
    const curYLeft = startYLeft + (endYLeft - startYLeft) * this.animProgress;

    // Movement: Bottom-right arm moves from 26vw/26vh to 18vw/18vh
    const startXRight = width * 0.28;
    const startYRight = height * 0.28;
    const endXRight = width * 0.18;
    const endYRight = height * 0.18;

    const curXRight = startXRight + (endXRight - startXRight) * this.animProgress;
    const curYRight = startYRight + (endYRight - startYRight) * this.animProgress;

    const centerAnchorX = width * 0.5;
    const centerAnchorY = height * 0.48;

    const CYBER_SYMBOLS = ['·', '+', '×', '░', '▒', '▓', '▫', '▸', '▪', '*', '::'];
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw Top-Left Hand Cybernetic Glyph Grid
    if (this.imgLeftLoaded && this.sampleGridLeft.length > 0) {
      const originX = centerAnchorX - handW / 2 + curXLeft;
      const originY = centerAnchorY - handH / 2 + curYLeft;

      ctx.fillStyle = textSecondary;
      for (let i = 0; i < this.sampleGridLeft.length; i++) {
        const pt = this.sampleGridLeft[i];
        const px = originX + pt.normX * handW;
        const py = originY + pt.normY * handH;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const phase = Math.sin(elapsed * pt.pulseSpeed + pt.phaseOffset);
          const sizePulse = 1.0 + phase * 0.35;

          const fontSize = Math.max(7, Math.round(pt.darkness * 12 * sizePulse));
          const transparencyFactor = 0.85;
          const alpha = (0.50 + phase * 0.15) * pt.alpha * transparencyFactor;
          ctx.globalAlpha = Math.max(0.20, Math.min(0.75, alpha));

          // ponytail: cybernetic symbol halftone replacement
          const symbolIdx = Math.floor(pt.darkness * (CYBER_SYMBOLS.length - 1));
          const char = CYBER_SYMBOLS[symbolIdx] || '+';

          ctx.font = `${fontSize}px "Share Tech Mono", monospace`;
          ctx.fillText(char, px, py);
        }
      }
    }

    // Draw Bottom-Right Hand Cybernetic Glyph Grid
    if (this.imgRightLoaded && this.sampleGridRight.length > 0) {
      const originX = centerAnchorX - handW / 2 + curXRight;
      const originY = centerAnchorY - handH / 2 + curYRight;

      ctx.fillStyle = textSecondary;
      for (let i = 0; i < this.sampleGridRight.length; i++) {
        const pt = this.sampleGridRight[i];
        const px = originX + pt.normX * handW;
        const py = originY + pt.normY * handH;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const phase = Math.sin(elapsed * pt.pulseSpeed + pt.phaseOffset);
          const sizePulse = 1.0 + phase * 0.35;

          const fontSize = Math.max(7, Math.round(pt.darkness * 12 * sizePulse));
          const transparencyFactor = 0.85;
          const alpha = (0.50 + phase * 0.15) * pt.alpha * transparencyFactor;
          ctx.globalAlpha = Math.max(0.20, Math.min(0.75, alpha));

          // ponytail: cybernetic symbol halftone replacement
          const symbolIdx = Math.floor(pt.darkness * (CYBER_SYMBOLS.length - 1));
          const char = CYBER_SYMBOLS[symbolIdx] || '+';

          ctx.font = `${fontSize}px "Share Tech Mono", monospace`;
          ctx.fillText(char, px, py);
        }
      }
    }

    ctx.globalAlpha = 1.0;
  }
}
