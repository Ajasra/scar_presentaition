export class SelfFrameObserver {
  constructor() {
    this.container = document.getElementById('self-frame');
    this.canvas = document.getElementById('self-frame-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.lastDrawTime = 0;
    this.targetFpsInterval = 1000 / 15; // 15 FPS throttle (~66ms)
    this.isFrozen = false;

    this.init();
  }

  init() {
    if (this.canvas) {
      this.canvas.width = 140;
      this.canvas.height = 90;
    }
  }

  update(mainRhizomeCanvas, geometryCanvas, snapshot) {
    if (!this.container || !this.canvas || !this.ctx) return;

    // Reveal self-frame if booted
    if (this.container.classList.contains('boot-hidden')) {
      this.container.style.display = 'block';
    }

    const actNum = typeof snapshot.act === 'number' ? snapshot.act : parseInt(snapshot.act, 10);
    const currentActStr = String(snapshot.act ?? '');
    const isAct3 = actNum === 3 || currentActStr.includes('III') || currentActStr.includes('Act III') || (snapshot.slideIndex >= 16 && snapshot.slideIndex <= 19);
    const isAct4 = actNum === 4 || currentActStr.includes('IV') || currentActStr.includes('Act IV') || snapshot.temperature <= 0.001 || snapshot.slideIndex >= 20;

    // Handle Ethics Bloom (Act III) styling
    if (isAct3 && !isAct4) {
      this.container.classList.add('ethics-bloom');
    } else {
      this.container.classList.remove('ethics-bloom');
    }

    // Handle Sclerosis Freeze (Act IV)
    if (isAct4) {
      if (!this.isFrozen) {
        this.isFrozen = true;
        this.container.classList.add('frozen');
      }
      return; // Freeze observer canvas on final frame
    } else {
      this.isFrozen = false;
      this.container.classList.remove('frozen');
    }

    // 15 FPS Render Throttle
    const now = performance.now();
    if (now - this.lastDrawTime < this.targetFpsInterval) {
      return;
    }
    this.lastDrawTime = now;

    this.renderRecursion(mainRhizomeCanvas, geometryCanvas);
  }

  renderRecursion(mainRhizomeCanvas, geometryCanvas) {
    const w = this.canvas.width;
    const h = this.canvas.height;

    // 0. Base dark backdrop
    this.ctx.fillStyle = '#05050a';
    this.ctx.fillRect(0, 0, w, h);

    // 1. Level 1: Render main presentation canvases (Rhizome + Geometry)
    if (mainRhizomeCanvas && mainRhizomeCanvas.width > 0) {
      this.ctx.drawImage(mainRhizomeCanvas, 0, 0, w, h);
    }
    if (geometryCanvas && geometryCanvas.width > 0) {
      this.ctx.drawImage(geometryCanvas, 0, 0, w, h);
    }

    // 2. Level 2 (Recursion Depth 2): Render self-frame onto itself in bottom-right corner
    const subW = Math.floor(w * 0.28);
    const subH = Math.floor(h * 0.28);
    const subX = w - subW - 4;
    const subY = h - subH - 14;

    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(subX - 1, subY - 1, subW + 2, subH + 2);
    this.ctx.drawImage(this.canvas, 0, 0, w, h, subX, subY, subW, subH);

    // 3. Level 3 (Recursion Limit): Faked inner depth limit block
    const sub2W = Math.floor(subW * 0.28);
    const sub2H = Math.floor(subH * 0.28);
    const sub2X = subX + subW - sub2W - 2;
    const sub2Y = subY + subH - sub2H - 2;

    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(sub2X, sub2Y, sub2W, sub2H);
    this.ctx.strokeStyle = 'rgba(226, 135, 67, 0.4)';
    this.ctx.strokeRect(sub2X, sub2Y, sub2W, sub2H);
  }
}

