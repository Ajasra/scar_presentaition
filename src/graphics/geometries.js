import { themeManager } from '../config/theme-manager.js';

export class GeometriesRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.rotationAngle = 0;
  }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  render(act, slideIndex, stepIndex = 0) {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    ctx.clearRect(0, 0, width, height);

    if (slideIndex === 5 || (this.s6ExitProgress || 0) < 1.0) {
      if (slideIndex === 5) {
        if (this.s6FadeIn === undefined) this.s6FadeIn = 0;
        this.s6FadeIn = Math.min(1.0, this.s6FadeIn + (1.0 / 210)); // ~3.5s fade-in
        if (stepIndex >= 2) {
          this.s6ExitProgress = Math.min(1.0, (this.s6ExitProgress || 0) + (1.0 / 120)); // ~2s fade-out for video step
        } else {
          this.s6ExitProgress = 0;
        }
      } else {
        this.s6ExitProgress = Math.min(1.0, (this.s6ExitProgress || 0) + (1.0 / 120)); // ~2s exit fade-out
      }

      const fadeInOpacity = 1 - Math.pow(1 - (this.s6FadeIn || 0), 2);
      const fadeOutOpacity = Math.max(0, 1.0 - (this.s6ExitProgress || 0));
      const s6Opacity = fadeInOpacity * fadeOutOpacity;

      if (s6Opacity > 0) {
        this.renderPreIndividualField(ctx, width, height, stepIndex, s6Opacity);
      }
      if (slideIndex === 5 && stepIndex < 2) {
        return;
      }
    }

    if (slideIndex !== 5) {
      this.s6Time = 0;
      this.s6FadeIn = 0;
      this.s6ExitProgress = 0;
    }

    if (slideIndex !== 9) {
      this.blobDots = null;
      this.blobTime = 0;
      this.blobGrowth = 0;
      this.blobIntroProgress = 0;
    }

    if (slideIndex === 9) {
      // Smoothly animate geometries flying out off-screen during transition to Slide 10
      this.s9ExitProgress = Math.min(1.0, (this.s9ExitProgress || 0) + (1.0 / 72)); // ~1.2s at 60fps
      if (this.s9ExitProgress < 1.0) {
        this.renderS9ExitGeometries(ctx, width, height, this.s9ExitProgress);
      }
      this.renderBlob(ctx, width, height, stepIndex);
      return;
    }
    if (slideIndex !== 10 && slideIndex !== 11 && slideIndex !== 12) {
      this.s10ExitProgress = 0;
      this.mobiusFadeIn = 0;
      this.mobiusExitProgress = 0;
    }

    if (slideIndex === 10 || slideIndex === 11 || (slideIndex === 12 && (this.mobiusExitProgress || 0) < 1.0)) {
      this.rotationAngle += 0.003;

      // Blob exit on entering slide 11
      if (slideIndex === 10) {
        this.s10ExitProgress = Math.min(1.0, (this.s10ExitProgress || 0) + (1.0 / 72)); // ~1.2s
        if (this.s10ExitProgress < 1.0) {
          this.renderBlobExit(ctx, width, height, this.s10ExitProgress);
        }
      }

      // Smooth 3.5s fade-in (210 frames at 60fps) for Möbius-Klein appearing on slide 11
      if (slideIndex === 10 || slideIndex === 11) {
        if (this.mobiusFadeIn === undefined) this.mobiusFadeIn = 0;
        this.mobiusFadeIn = Math.min(1.0, this.mobiusFadeIn + (1.0 / 210));
        this.mobiusExitProgress = 0;
      }

      // Smooth 3.5s fade-out (210 frames at 60fps) when leaving slide 12 (slideIndex === 12)
      if (slideIndex === 12) {
        this.mobiusExitProgress = Math.min(1.0, (this.mobiusExitProgress || 0) + (1.0 / 210));
      }

      if (slideIndex === 11) {
        // 1.5s smooth transition for crevasse negative volume (90 frames at 60fps)
        this.crevasseProgress = Math.min(1.0, (this.crevasseProgress || 0) + (1.0 / 90));
      } else if (slideIndex === 10) {
        this.crevasseProgress = 0;
      }

      const fadeInOpacity = 1 - Math.pow(1 - (this.mobiusFadeIn || 0), 2); // easeOutQuad
      const fadeOutOpacity = Math.max(0, 1.0 - (this.mobiusExitProgress || 0));
      const mobiusOpacity = fadeInOpacity * fadeOutOpacity;

      // Position Möbius-Klein shifted to the right of the screen (62% width), matching the blob
      const cxMobius = width * 0.62;
      this.drawMobiusKlein(ctx, cxMobius, height / 2, Math.min(width, height) * 0.46, this.crevasseProgress, mobiusOpacity);
      if (slideIndex === 10 || slideIndex === 11 || mobiusOpacity > 0) {
        return;
      }
    }
    if (slideIndex === 20 || (this.umweltExitProgress || 0) < 1.0) {
      if (slideIndex === 20) {
        if (this.umweltFadeIn === undefined) this.umweltFadeIn = 0;
        this.umweltFadeIn = Math.min(1.0, this.umweltFadeIn + (1.0 / 210)); // ~3.5s fade-in
        this.umweltExitProgress = 0;
      } else {
        this.umweltExitProgress = Math.min(1.0, (this.umweltExitProgress || 0) + (1.0 / 210)); // ~3.5s fade-out
      }

      const fadeInOpacity = 1 - Math.pow(1 - (this.umweltFadeIn || 0), 2); // easeOutQuad
      const fadeOutOpacity = Math.max(0, 1.0 - (this.umweltExitProgress || 0));
      const umweltOpacity = fadeInOpacity * fadeOutOpacity;

      if (umweltOpacity > 0) {
        this.renderUmweltRing(ctx, width, height, umweltOpacity);
      }
      if (slideIndex === 20 || umweltOpacity > 0) {
        return;
      }
    }

    if (slideIndex !== 20) {
      this.umweltTime = 0;
      this.umweltFadeIn = 0;
      this.umweltExitProgress = 0;
    }

    if (slideIndex !== 8) return;


    this.rotationAngle += 0.005;

    const cx = width / 2;
    const cy = height / 2;
    const rx = width * 0.36;
    const ry = height * 0.36;

    const accentGlow = themeManager.getColor('accentGlow');
    const textPrimary = themeManager.getColor('textPrimary');
    const textSecondary = themeManager.getColor('textSecondary');

    // On Slide 9 (slideIndex === 8), sequence through the 6 step states:
    if (slideIndex === 8) {
      const spiralPos = { x: cx - rx * 0.7, y: cy - ry * 0.2 };
      const prismPos = { x: cx, y: cy + ry * 0.3 };
      const meshPos = { x: cx + rx * 0.7, y: cy - ry * 0.2 };
      const bigRadius = Math.min(width, height) * 0.25; // 50% screen size radius/diameter scaling

      if (stepIndex === 0) {
        // Step 1: Title only - no geometries on screen
        this.s9CameraPitch = 0;
        this.s9SpiralPos = { x: cx, y: cy };
        this.s9SpiralRadius = bigRadius;
        this.s9PrismPos = { x: cx, y: cy };
        this.s9PrismSize = 0;
        this.s9MeshPos = { x: cx, y: cy };
        this.s9MeshSize = 0;
        this.s9CircleScale = 0;
      } else if (stepIndex === 1) {
        // Step 2: 3D Spiral viewed flat from front (pitch = 0) -> projects as 50% circle growing from 0 over 3.0s!
        this.s9CameraPitch = 0;
        this.s9SpiralPos = { x: cx, y: cy };
        this.s9SpiralRadius = bigRadius;
        this.s9PrismPos = { x: cx, y: cy };
        this.s9PrismSize = 0;
        this.s9MeshPos = { x: cx, y: cy };
        this.s9MeshSize = 0;

        if (this.s9CircleScale === undefined) this.s9CircleScale = 0;
        // 3.0s transition = 180 frames at 60fps
        this.s9CircleScale = Math.min(1.0, this.s9CircleScale + (1.0 / 180));
        // Smooth ease-out quad curve (1 - (1-t)^2)
        const easedScale = 1 - Math.pow(1 - this.s9CircleScale, 2);

        this.drawSpiral3D(ctx, cx, cy, textPrimary, bigRadius * easedScale, 0);
      } else if (stepIndex === 2) {
        // Step 3: Camera moves (pitch rotates to ~60 deg) -> reveals 3D spiral!
        if (this.s9CameraPitch === undefined) this.s9CameraPitch = 0;
        const targetPitch = Math.PI * 0.35; // ~63 deg tilt
        this.s9CameraPitch += (targetPitch - this.s9CameraPitch) * 0.05; // smooth camera pitch move
        this.s9SpiralPos = { x: cx, y: cy };
        this.s9SpiralRadius = bigRadius;
        this.s9PrismPos = { x: cx, y: cy };
        this.s9PrismSize = 0;
        this.s9MeshPos = { x: cx, y: cy };
        this.s9MeshSize = 0;

        this.drawSpiral3D(ctx, cx, cy, textPrimary, bigRadius, this.s9CameraPitch);
      } else if (stepIndex === 3) {
        this.s9CameraPitch = Math.PI * 0.35;
        this.s9PrismPos = { x: cx, y: cy };
        this.s9MeshPos = { x: cx, y: cy };
        this.s9MeshSize = 0;
        // Step 4: Spiral glides to top-left position & scales to size 75, Prism expands at center
        const targetSpiralPos = { x: cx - rx * 0.55, y: cy - ry * 0.35 };
        const targetSpiralRadius = 75;
        const targetPrismSize = bigRadius * 0.75;

        if (!this.s9SpiralPos) this.s9SpiralPos = { x: cx, y: cy };
        if (!this.s9SpiralRadius) this.s9SpiralRadius = bigRadius;
        if (!this.s9PrismSize) this.s9PrismSize = 0;

        // Smooth Lerp (2.5% per frame for slower, smoother glide)
        this.s9SpiralPos.x += (targetSpiralPos.x - this.s9SpiralPos.x) * 0.025;
        this.s9SpiralPos.y += (targetSpiralPos.y - this.s9SpiralPos.y) * 0.025;
        this.s9SpiralRadius += (targetSpiralRadius - this.s9SpiralRadius) * 0.025;
        this.s9PrismSize += (targetPrismSize - this.s9PrismSize) * 0.025;

        this.drawSpiral3D(ctx, this.s9SpiralPos.x, this.s9SpiralPos.y, textPrimary, this.s9SpiralRadius, this.s9CameraPitch);
        this.drawPrism(ctx, cx, cy, textPrimary, this.s9PrismSize);
      } else if (stepIndex === 4) {
        this.s9CameraPitch = Math.PI * 0.35;
        // Step 5: Prism glides to top-right position, Mesh expands at center
        const targetSpiralPos = { x: cx - rx * 0.55, y: cy - ry * 0.35 };
        const targetPrismPos = { x: cx + rx * 0.55, y: cy - ry * 0.35 };
        const targetPrismSize = 75;
        const targetMeshSize = bigRadius * 0.7;

        if (!this.s9SpiralPos) this.s9SpiralPos = targetSpiralPos;
        if (!this.s9PrismPos) this.s9PrismPos = { x: cx, y: cy };
        if (!this.s9PrismSize) this.s9PrismSize = bigRadius * 0.75;
        if (!this.s9MeshSize) this.s9MeshSize = 0;

        // Smooth Lerp (2.5% per frame for slower, smoother glide)
        this.s9PrismPos.x += (targetPrismPos.x - this.s9PrismPos.x) * 0.025;
        this.s9PrismPos.y += (targetPrismPos.y - this.s9PrismPos.y) * 0.025;
        this.s9PrismSize += (targetPrismSize - this.s9PrismSize) * 0.025;
        this.s9MeshSize += (targetMeshSize - this.s9MeshSize) * 0.025;

        this.drawSpiral3D(ctx, targetSpiralPos.x, targetSpiralPos.y, textPrimary, 75, this.s9CameraPitch);
        this.drawPrism(ctx, this.s9PrismPos.x, this.s9PrismPos.y, textPrimary, this.s9PrismSize);
        this.drawMesh(ctx, cx, cy, textSecondary, this.s9MeshSize, 0.4);
      } else if (stepIndex >= 5) {
        this.s9CameraPitch = Math.PI * 0.35;
        // Step 6: Deleuze Mesh glides down to bottom-center, framing Sovereign Void
        const uniformSize = 75;
        
        const targetSpiralPos = { x: cx - rx * 0.55, y: cy - ry * 0.35 };
        const targetPrismPos = { x: cx + rx * 0.55, y: cy - ry * 0.35 };
        const targetMeshPos = { x: cx, y: cy + ry * 0.5 };

        if (!this.s9SpiralPos) this.s9SpiralPos = targetSpiralPos;
        if (!this.s9PrismPos) this.s9PrismPos = targetPrismPos;
        if (!this.s9MeshPos) this.s9MeshPos = { x: cx, y: cy };

        if (!this.s9SpiralRadius) this.s9SpiralRadius = uniformSize;
        if (!this.s9PrismSize) this.s9PrismSize = uniformSize;
        if (!this.s9MeshSize) this.s9MeshSize = bigRadius * 0.7;

        // Smooth Lerp for Mesh glide to bottom-center (2.5% per frame)
        this.s9MeshPos.x += (targetMeshPos.x - this.s9MeshPos.x) * 0.025;
        this.s9MeshPos.y += (targetMeshPos.y - this.s9MeshPos.y) * 0.025;
        this.s9MeshSize += (uniformSize - this.s9MeshSize) * 0.025;

        // Draw pure black blurred void circle at center (no stroke edges)
        this.drawPureBlackBlurredVoid(ctx, cx, cy, 110);

        // Render all 3 geometries around the pure black blurred central void
        this.drawSpiral3D(ctx, targetSpiralPos.x, targetSpiralPos.y, textPrimary, uniformSize, this.s9CameraPitch);
        this.drawPrism(ctx, targetPrismPos.x, targetPrismPos.y, textPrimary, uniformSize);
        this.drawMesh(ctx, this.s9MeshPos.x, this.s9MeshPos.y, textSecondary, this.s9MeshSize, 0.4);
      }
    }
  }

  renderS9ExitGeometries(ctx, width, height, progress) {
    ctx.save();
    // Ease-in quad for accelerating exit motion
    const ease = Math.pow(progress, 2);
    const alpha = Math.max(0, 1.0 - progress);
    ctx.globalAlpha = alpha;

    const cx = width / 2;
    const cy = height / 2;
    const rx = width * 0.36;
    const ry = height * 0.36;
    const uniformSize = 75;

    const accentGlow = themeManager.getColor('accentGlow');
    const textPrimary = themeManager.getColor('textPrimary');
    const textSecondary = themeManager.getColor('textSecondary');

    // Geometries drift outward off-screen
    const spiralPos = {
      x: (cx - rx * 0.55) - ease * (width * 0.35),
      y: (cy - ry * 0.35) - ease * (height * 0.35)
    };
    const prismPos = {
      x: (cx + rx * 0.55) + ease * (width * 0.35),
      y: (cy - ry * 0.35) - ease * (height * 0.35)
    };
    const meshPos = {
      x: cx,
      y: (cy + ry * 0.5) + ease * (height * 0.4)
    };

    const pitch = Math.PI * 0.35;
    this.drawSpiral3D(ctx, spiralPos.x, spiralPos.y, textPrimary, uniformSize, pitch);
    this.drawPrism(ctx, prismPos.x, prismPos.y, textPrimary, uniformSize);
    this.drawMesh(ctx, meshPos.x, meshPos.y, textSecondary, uniformSize, 0.4 * alpha);
    ctx.restore();
  }

  drawCircle(ctx, cx, cy, radius, color) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.restore();
  }

  drawSpiral3D(ctx, cx, cy, color, radius = 100, pitchAngle = 0) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.2;

    const loops = 4;
    const totalPoints = 180;
    const heightZ = radius * 1.2; // 3D depth of the spiral spring/cone

    const cosPitch = Math.cos(pitchAngle);
    const sinPitch = Math.sin(pitchAngle);

    for (let i = 0; i <= totalPoints; i++) {
      const t = i / totalPoints;
      const angle = t * loops * Math.PI * 2 + this.rotationAngle;

      // 3D coordinates: helical spring along Z axis with UNIFORM RADIUS
      // When pitchAngle == 0 (front view), x = R cos θ and y = R sin θ -> projects as a single clean circle!
      const r = radius;
      const x3d = r * Math.cos(angle);
      const y3d = r * Math.sin(angle);
      const z3d = (t - 0.5) * heightZ;

      // Rotate camera around X-axis by pitchAngle
      // When pitchAngle == 0 (front view), screen_x = x3d, screen_y = y3d -> perfect circle!
      // When pitchAngle > 0 (tilted view), Z-axis extends out, revealing the 3D spiral!
      const projX = x3d;
      const projY = y3d * cosPitch - z3d * sinPitch;

      const screenX = cx + projX;
      const screenY = cy + projY;

      if (i === 0) ctx.moveTo(screenX, screenY);
      else ctx.lineTo(screenX, screenY);
    }
    ctx.stroke();
    ctx.restore();
  }

  drawFloatingTextLabel(ctx, x, y, title, subtitle, color) {
    ctx.save();
    
    // Large presentation scale font sizing (75px title / 42px subtitle) with 1.2 line height
    const titleSize = 75;
    const subtitleSize = 42;
    const lineGap = subtitleSize * 1.2;

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Title centered over shape center
    ctx.font = `bold ${titleSize}px var(--font-mono, monospace), monospace`;
    ctx.fillStyle = color;
    ctx.fillText(title, x, y - lineGap * 0.75);

    // Subtitle centered over shape center with 1.2 gap
    ctx.font = `${subtitleSize}px var(--font-mono, monospace), monospace`;
    ctx.fillStyle = themeManager.getColor('textPrimary');
    ctx.fillText(subtitle, x, y + lineGap * 0.75);

    ctx.restore();
  }

  drawSpiral(ctx, cx, cy, color, outerRadius = null) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.2;
    let radius = 2;
    let angle = this.rotationAngle;

    const totalSteps = 80;
    const stepIncrement = outerRadius ? (outerRadius - 2) / totalSteps : 0.8;

    for (let i = 0; i < totalSteps; i++) {
      radius += stepIncrement;
      angle += 0.2;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();
  }

  drawPrism(ctx, cx, cy, color, size = 35) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.2;

    const rot = this.rotationAngle;

    // 3D Triangular Prism geometry: top triangle and bottom triangle offset in 3D
    const height = size * 1.4;
    const rad = size;

    // 3D rotation angles
    const rotY = rot * 0.8;
    const rotX = Math.PI * 0.15;

    const transformPoint = (x, y, z) => {
      // Rotate Y
      const x1 = x * Math.cos(rotY) + z * Math.sin(rotY);
      const z1 = -x * Math.sin(rotY) + z * Math.cos(rotY);
      // Rotate X
      const y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
      const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);

      return { x: cx + x1, y: cy + y2, z: z2 };
    };

    // Base triangle vertices (Y = -height/2) & Top triangle vertices (Y = height/2)
    const basePts = [];
    const topPts = [];
    for (let i = 0; i < 3; i++) {
      const a = (i * Math.PI * 2) / 3;
      basePts.push(transformPoint(rad * Math.cos(a), -height / 2, rad * Math.sin(a)));
      topPts.push(transformPoint(rad * Math.cos(a), height / 2, rad * Math.sin(a)));
    }

    // Draw base triangle
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.moveTo(basePts[0].x, basePts[0].y);
    ctx.lineTo(basePts[1].x, basePts[1].y);
    ctx.lineTo(basePts[2].x, basePts[2].y);
    ctx.closePath();
    ctx.stroke();

    // Draw top triangle
    ctx.beginPath();
    ctx.moveTo(topPts[0].x, topPts[0].y);
    ctx.lineTo(topPts[1].x, topPts[1].y);
    ctx.lineTo(topPts[2].x, topPts[2].y);
    ctx.closePath();
    ctx.stroke();

    // Connect vertical edges
    ctx.globalAlpha = 0.8;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(basePts[i].x, basePts[i].y);
      ctx.lineTo(topPts[i].x, topPts[i].y);
      ctx.stroke();
    }

    // Diffractive refraction light beams radiating from central prism
    ctx.globalAlpha = 0.25;
    ctx.setLineDash([4, 6]);
    const beamColors = ['rgba(255,87,34,0.6)', 'rgba(0,229,255,0.6)', 'rgba(255,255,255,0.6)'];
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = beamColors[i];
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      const beamAngle = rotY + (i * Math.PI * 2) / 3;
      ctx.lineTo(cx + Math.cos(beamAngle) * (size * 1.6), cy + Math.sin(beamAngle) * (size * 1.6));
      ctx.stroke();
    }

    ctx.restore();
  }

  drawMesh(ctx, cx, cy, color, size = 50, opacity = 0.4) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.globalAlpha = opacity;
    ctx.lineWidth = 1.0;

    const cols = 7;
    const rows = 7;
    const spacing = (size * 2) / cols;

    // Draw deforming intensive fold mesh
    for (let i = 0; i < cols; i++) {
      ctx.beginPath();
      for (let j = 0; j < rows; j++) {
        const deformX = Math.sin(this.rotationAngle * 1.5 + i * 0.5 + j * 0.5) * (spacing * 0.5);
        const deformY = Math.cos(this.rotationAngle * 1.5 + i * 0.5 + j * 0.5) * (spacing * 0.5);
        const x = cx + (i - cols / 2) * spacing + deformX;
        const y = cy + (j - rows / 2) * spacing + deformY;
        if (j === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Cross-grid line connects
    for (let j = 0; j < rows; j++) {
      ctx.beginPath();
      for (let i = 0; i < cols; i++) {
        const deformX = Math.sin(this.rotationAngle * 1.5 + i * 0.5 + j * 0.5) * (spacing * 0.5);
        const deformY = Math.cos(this.rotationAngle * 1.5 + i * 0.5 + j * 0.5) * (spacing * 0.5);
        const x = cx + (i - cols / 2) * spacing + deformX;
        const y = cy + (j - rows / 2) * spacing + deformY;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    ctx.restore();
  }

  drawSovereignVoid(ctx, cx, cy) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, 28, 0, Math.PI * 2);
    ctx.strokeStyle = themeManager.getColor('textDim');
    ctx.lineWidth = 1.2;
    ctx.globalAlpha = 0.5;
    ctx.stroke(); // Does not deform, refuses to enter synthesis
    ctx.restore();
  }

  drawPureBlackBlurredVoid(ctx, cx, cy, radius = 90) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    
    // Pure black radial gradient blurring outwards into zero opacity with no hard stroke edges
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    grad.addColorStop(0, '#000000');
    grad.addColorStop(0.5, '#000000');
    grad.addColorStop(0.8, 'rgba(0,0,0,0.6)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
  }

  // ponytail: iconic 3D Klein Bottle parametric surface for slide 11 & 12
  // Continuous 3D manifold with animated flow tracers streaming INTO the central hole and OUT from the bottom
  drawMobiusKlein(ctx, cx, cy, size, crevasseProgress = 0, opacity = 1.0) {
    if (opacity <= 0) return;
    // Dual-axis 3D rotation: slow Y-spin (left-right) + smooth X-pitch (up-down tilt)
    const rotY = this.rotationAngle * 0.6;
    // Pitch oscillates smoothly between front view and deep top-down perspective (~70°), looking inside the top aperture
    const rotX = 0.55 + Math.sin(this.rotationAngle * 0.2) * 0.65;
    const textPrimary = themeManager.getColor('textPrimary');
    const accent = themeManager.getColor('accent');

    // Scale factor to map Klein bottle coordinates to screen size
    const scale = size / 22;

    // Slow, continuous breathing motion: shape expands fatter and hole gets bigger in sync
    const pulse = 0.5 + 0.5 * Math.sin(this.rotationAngle * 0.25);
    const holeScale = 6.0 + (1.6 + 2.4 * crevasseProgress) * pulse; // Hole expands smoothly
    const tubeFatness = 5.8 + (1.4 + 2.0 * crevasseProgress) * pulse; // Shape gets fatter smoothly

    // 100% Continuous 3D Klein Bottle Parametric Surface (no breaks or tears)
    const surface = (u, v) => {
      let x, y, z;
      const cosU = Math.cos(u);
      const sinU = Math.sin(u);
      const cosV = Math.cos(v);
      const sinV = Math.sin(v);

      const r = tubeFatness * (1 - cosU / 2);

      if (u <= Math.PI) {
        x = holeScale * cosU * (1 + sinU) + r * cosU * cosV;
        y = 16 * sinU + r * sinU * cosV;
      } else {
        x = holeScale * cosU * (1 + sinU) + r * Math.cos(v + Math.PI);
        y = 16 * sinU;
      }
      z = r * sinV;

      // Adjust center of mass vertical offset
      const yCentered = y - 4;

      // 3D rotation (Y-spin, X-tilt)
      const x1 = x * Math.cos(rotY) + z * Math.sin(rotY);
      const z1 = -x * Math.sin(rotY) + z * Math.cos(rotY);

      const y2 = yCentered * Math.cos(rotX) - z1 * Math.sin(rotX);
      const z2 = yCentered * Math.sin(rotX) + z1 * Math.cos(rotX);

      return {
        sx: cx + x1 * scale,
        sy: cy - y2 * scale,
        z: z2
      };
    };

    const uSteps = 48; // longitudinal contours
    const vSteps = 24; // latitudinal cross-section rings

    ctx.save();

    // 1. Latitudinal Cross-Section Rings (Unbroken clean mesh)
    for (let ui = 0; ui <= uSteps; ui++) {
      const u = (ui / uSteps) * Math.PI * 2;
      ctx.beginPath();
      const isMajorRing = (ui % 4 === 0);
      ctx.strokeStyle = textPrimary;
      ctx.lineWidth = isMajorRing ? 1.1 : 0.8;
      ctx.globalAlpha = (isMajorRing ? 0.45 : 0.2) * opacity;

      for (let vi = 0; vi <= vSteps; vi++) {
        const v = (vi / vSteps) * Math.PI * 2;
        const pt = surface(u, v);
        if (vi === 0) ctx.moveTo(pt.sx, pt.sy);
        else ctx.lineTo(pt.sx, pt.sy);
      }
      ctx.stroke();
    }

    // 2. Longitudinal Contour Ribs & Flow Tracers (Streaming INTO the top hole & OUT from the bottom)
    const flowOffset = (this.rotationAngle * 0.8) % (Math.PI * 2);

    for (let vi = 0; vi < vSteps; vi++) {
      const v = (vi / vSteps) * Math.PI * 2;
      ctx.beginPath();

      const isAccentStrip = (vi === 0 || vi === Math.floor(vSteps / 2));
      ctx.strokeStyle = isAccentStrip ? accent : textPrimary;
      ctx.lineWidth = isAccentStrip ? 1.2 : 0.9;
      ctx.globalAlpha = (isAccentStrip ? 0.85 : 0.28) * opacity;

      for (let ui = 0; ui <= uSteps; ui++) {
        const u = (ui / uSteps) * Math.PI * 2;
        const pt = surface(u, v);
        if (ui === 0) ctx.moveTo(pt.sx, pt.sy);
        else ctx.lineTo(pt.sx, pt.sy);
      }
      ctx.stroke();

      // Flow Tracers: Spawn, grow, and stream only on Slide 12 (crevasseProgress > 0)
      if (crevasseProgress > 0) {
        const numTracers = 3;
        const dotScale = crevasseProgress; // dots grow in size over transition
        for (let tIdx = 0; tIdx < numTracers; tIdx++) {
          const uTracer = (flowOffset + (tIdx / numTracers) * Math.PI * 2 + (vi / vSteps) * 0.5) % (Math.PI * 2);
          const ptTracer = surface(uTracer, v);

          const rDot = (isAccentStrip ? 4.5 : 3.2) * dotScale;
          ctx.beginPath();
          ctx.arc(ptTracer.sx, ptTracer.sy, rDot, 0, Math.PI * 2);
          ctx.fillStyle = isAccentStrip ? accent : textPrimary;
          ctx.globalAlpha = (isAccentStrip ? 0.95 : 0.65) * dotScale * opacity;
          ctx.fill();
        }
      }
    }

    ctx.restore();
  }

  renderBlobExit(ctx, width, height, progress) {
    ctx.save();
    const t = (this.blobTime || 0);
    const cx = width * 0.62 + Math.sin(t * 0.18) * width * 0.04;
    const cy = height * 0.5 + Math.cos(t * 0.12) * height * 0.05;

    // Growth multiplier: expands by +60% while fading to 0
    const growMult = 1.0 + progress * 0.6;
    const alpha = Math.max(0, 1.0 - progress);

    const baseR = (Math.min(width, height) * 0.25 + (this.blobGrowth || 0)) * growMult;
    const blobR = (angle) => {
      return baseR
        + Math.sin(angle * 2 + t * 0.42) * baseR * 0.18
        + Math.sin(angle * 3 - t * 0.3) * baseR * 0.12
        + Math.sin(angle * 5 + t * 0.55) * baseR * 0.07
        + Math.cos(angle * 4 - t * 0.25) * baseR * 0.09;
    };

    const steps = 120;
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * Math.PI * 2;
      const r = blobR(a);
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = `rgba(255,255,255,${0.18 * alpha})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 1.3);
    grd.addColorStop(0, `rgba(255,87,34,${0.04 * alpha})`);
    grd.addColorStop(1, 'rgba(255,87,34,0)');
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.restore();
  }

  // ponytail: organic blob absorber for slide 10
  renderBlob(ctx, width, height, stepIndex = 0) {
    const t = (this.blobTime = (this.blobTime || 0) + 0.002);
    // Shift blob center to the right of the screen (62% width)
    const cx = width * 0.62 + Math.sin(t * 0.18) * width * 0.04;
    const cy = height * 0.5 + Math.cos(t * 0.12) * height * 0.05;

    // 3-Second entrance scale animation (180 frames @ 60fps)
    this.blobIntroProgress = Math.min(1.0, (this.blobIntroProgress || 0) + (1.0 / 180));
    const introScale = 1 - Math.pow(1 - this.blobIntroProgress, 2); // easeOutQuad curve

    // Growth: continuous on step 1 (doubles over ~20s @ 60fps), decays on step 0
    const minDim = Math.min(width, height);
    const maxGrowth = minDim * 0.25; // +100% of initial radius = 2x total size
    if (stepIndex >= 1) {
      // minDim * 0.25 / 1200 frames = doubles in ~20s
      this.blobGrowth = Math.min((this.blobGrowth || 0) + minDim * 0.000208, maxGrowth);
    } else {
      this.blobGrowth = (this.blobGrowth || 0) * 0.97; // smooth decay back on step 0
    }

    const baseR = (Math.min(width, height) * 0.25 + (this.blobGrowth || 0)) * introScale;
    const blobR = (angle) => {
      return baseR
        + Math.sin(angle * 2 + t * 0.42) * baseR * 0.18
        + Math.sin(angle * 3 - t * 0.3) * baseR * 0.12
        + Math.sin(angle * 5 + t * 0.55) * baseR * 0.07
        + Math.cos(angle * 4 - t * 0.25) * baseR * 0.09;
    };

    // Draw blob outline — closed path via polar to cartesian
    const steps = 120;
    ctx.save();
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * Math.PI * 2;
      const r = blobR(a);
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // Soft inner glow
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 1.3);
    grd.addColorStop(0, 'rgba(255,87,34,0.04)');
    grd.addColorStop(1, 'rgba(255,87,34,0)');
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.restore();

    // Dots — init pool once
    if (!this.blobDots) {
      this.blobDots = Array.from({ length: 8 }, () => this._spawnDot(width, height));
    }

    // Update & draw each dot
    this.blobDots = this.blobDots.map(d => {
      // Drift toward blob center
      d.x += (cx - d.x) * 0.004 + (Math.random() - 0.5) * 0.3;
      d.y += (cy - d.y) * 0.004 + (Math.random() - 0.5) * 0.3;

      // Distance to blob edge at this angle
      const ang = Math.atan2(d.y - cy, d.x - cx);
      const edgeR = blobR(ang);
      const dist = Math.hypot(d.x - cx, d.y - cy);

      if (dist < edgeR) {
        // Inside blob: flash orange then die
        if (!d.flashing) d.flashing = true;
        d.flashAlpha = (d.flashAlpha || 1) - 0.025;
        if (d.flashAlpha <= 0) return this._spawnDot(width, height); // respawn, growth is time-based
        ctx.save();
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,87,34,${d.flashAlpha})`;
        ctx.fill();
        ctx.restore();
      } else {
        // Outside: normal dim dot
        ctx.save();
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148,163,184,${d.alpha})`;
        ctx.fill();
        ctx.restore();
      }
      return d;
    });
  }

  _spawnDot(width, height) {
    // ponytail: spawn on random edge of screen so dots visibly travel inward
    const side = Math.floor(Math.random() * 4);
    const margin = 40;
    let x, y;
    if (side === 0) { x = Math.random() * width; y = margin; }
    else if (side === 1) { x = width - margin; y = Math.random() * height; }
    else if (side === 2) { x = Math.random() * width; y = height - margin; }
    else { x = margin; y = Math.random() * height; }
    return { x, y, r: 2 + Math.random() * 2.5, alpha: 0.3 + Math.random() * 0.4, flashing: false, flashAlpha: 1 };
  }

  renderUmweltRing(ctx, width, height, opacity = 1.0) {
    if (opacity <= 0) return;
    const cx = width * 0.70; // Position on right half to complement text layout
    const cy = height * 0.5;
    const maxReadingRadius = Math.min(width, height) * 0.58;
    const minReadingRadius = Math.min(width, height) * 0.08;
    const nodeBaseRadius = Math.min(width, height) * 0.52;

    if (!this.umweltTime) this.umweltTime = 0;
    // Slowed down time progression for a much calmer, deliberate motion
    this.umweltTime += 0.0007;

    // Smooth continuous shrinking loop for the READING horizon (umwelt)
    const progress = (Math.sin(this.umweltTime * 0.5) + 1) / 2;
    const readingRadius = minReadingRadius + (maxReadingRadius - minReadingRadius) * (1 - progress);

    const accent = themeManager.getColor('accent') || '#ff5722';

    ctx.save();
    ctx.globalAlpha = opacity;

    // 1. Draw EXPANDING Cut Waves (Shockwaves expanding far beyond reading horizon - slowed down)
    const cutPhase = (this.umweltTime * 0.35) % 1.0;
    const cutRadius1 = cutPhase * nodeBaseRadius * 1.4;
    const cutRadius2 = ((cutPhase + 0.5) % 1.0) * nodeBaseRadius * 1.4;

    [cutRadius1, cutRadius2].forEach(r => {
      if (r > 10) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        const alpha = Math.max(0, 0.5 * (1 - r / (nodeBaseRadius * 1.4))) * opacity;
        ctx.strokeStyle = `rgba(255, 87, 34, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([8, 4]);
        ctx.stroke();
        ctx.restore();
      }
    });

    // 2. Draw nonhuman substrate nodes (soil, server, lithium, slime) - slowed orbital rotation
    const substrates = ['soil', 'server', 'lithium', 'slime', 'carbon', 'voltage', 'freshwater', 'silicon'];
    const numOuterNodes = substrates.length;
    ctx.save();
    for (let i = 0; i < numOuterNodes; i++) {
      const angle = (i / numOuterNodes) * Math.PI * 2 + this.umweltTime * 0.025;
      // Stagger node distances (some close, some far) so they transition progressively as circle shrinks
      const distOffset = (i % 3) * 0.07;
      const dist = nodeBaseRadius * (0.55 + distOffset + 0.15 * Math.sin(i * 1.5 + this.umweltTime * 0.3));
      const nx = cx + Math.cos(angle) * dist;
      const ny = cy + Math.sin(angle) * dist;

      const dCenter = Math.hypot(nx - cx, ny - cy);
      const isInside = dCenter <= readingRadius;

      // Connection line: Solid white inside vs dashed orange/grey outside
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(nx, ny);
      if (isInside) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.45 * opacity})`;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([]);
      } else {
        ctx.strokeStyle = `rgba(255, 87, 34, ${0.45 * opacity})`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
      }
      ctx.stroke();

      // Node dot: Bright White inside vs Dim Grey/Orange outside when circle gets smaller
      ctx.beginPath();
      ctx.arc(nx, ny, isInside ? 4 : 4.5, 0, Math.PI * 2);
      ctx.fillStyle = isInside ? `rgba(255, 255, 255, ${opacity})` : `rgba(148, 163, 184, ${0.6 * opacity})`;
      if (isInside) {
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 8;
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.fill();

      // Node text label: Bright White inside vs Dim Grey outside
      ctx.font = '10px monospace';
      ctx.fillStyle = isInside ? `rgba(255, 255, 255, ${opacity})` : `rgba(148, 163, 184, ${0.55 * opacity})`;
      ctx.fillText(substrates[i], nx + 7, ny + 3);
    }
    ctx.restore();

    // 3. Draw Shrinking Reading Umwelt Horizon Ring
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, readingRadius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.85 * opacity})`;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.stroke();

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, readingRadius);
    grad.addColorStop(0, `rgba(255, 255, 255, ${0.08 * opacity})`);
    grad.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();

    // 4. Central Observer Node
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, 7, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.shadowColor = accent;
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.restore();

    // Annotations: Reading vs Cut Horizon
    ctx.save();
    ctx.font = '10px monospace';
    ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * opacity})`;
    ctx.fillText('READING HORIZON [R_read → 0]', cx - 65, cy - readingRadius - 10);

    ctx.fillStyle = accent;
    ctx.globalAlpha = opacity;
    ctx.fillText('CUT CASCADE [R_cut → ∞]', cx - 55, cy + nodeBaseRadius * 1.35);
    ctx.restore();

    ctx.restore();
  }

  // Simondon's Pre-Individual Field & Agential Cut Foreclosure (Slide 06)
  renderPreIndividualField(ctx, width, height, stepIndex = 0, opacity = 1.0) {
    if (opacity <= 0) return;

    if (!this.s6Time) this.s6Time = 0;
    this.s6Time += 0.003;
    const t = this.s6Time;

    const cx = width * 0.5;
    const cy = height * 0.5;
    const fieldRadius = width * 0.52;

    const textPrimary = themeManager.getColor('textPrimary') || '#ffffff';

    ctx.save();
    ctx.globalAlpha = opacity;

    // 5-Second transition duration (300 frames @ 60fps)
    if (stepIndex >= 1) {
      if (this.s6CutProgress === undefined) this.s6CutProgress = 0;
      this.s6CutProgress = Math.min(1.0, this.s6CutProgress + (1.0 / 300));
    } else {
      this.s6CutProgress = (this.s6CutProgress || 0) * 0.92;
    }
    const cutProg = this.s6CutProgress || 0;

    // Deterministic random offsets for each curve's fade start & duration
    const numCurves = 22;
    if (!this.s6CurveFadeSeeds) {
      this.s6CurveFadeSeeds = Array.from({ length: numCurves }, (_, i) => {
        // Random start threshold between 0.0 and 0.65, fade duration 0.35
        const start = 0.05 + (Math.sin(i * 9.7 + 3.1) * 0.5 + 0.5) * 0.6;
        return { start, dur: 0.35 };
      });
    }

    // Draw Metastable Potential Trajectories
    for (let c = 0; c < numCurves; c++) {
      ctx.beginPath();
      const isPrimaryIndividuated = (c === 11); // The single trajectory that crystallizes into the individual
      const curvePhase = (c / numCurves) * Math.PI * 2;

      ctx.save();
      if (isPrimaryIndividuated) {
        // Primary line smoothly transitions to bright highlighted white over 5 seconds
        const lineAlpha = (0.7 + 0.3 * cutProg) * opacity;
        ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
        ctx.lineWidth = 1.2 + 1.2 * cutProg;
        if (cutProg > 0) {
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 12 * cutProg;
        }
      } else {
        // Other lines fade out randomly at different times across the 5 seconds
        const seed = this.s6CurveFadeSeeds[c];
        let lineAlpha = 0.7; // Step 0: all lines clearly visible
        if (cutProg > seed.start) {
          const fadeProgress = Math.min(1.0, (cutProg - seed.start) / seed.dur);
          lineAlpha = 0.7 * (1.0 - fadeProgress);
        }
        if (lineAlpha <= 0.01) {
          ctx.restore();
          continue; // Skip rendering fully faded lines
        }
        ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha * opacity})`;
        ctx.lineWidth = 1.0;
      }

      const points = 40;
      for (let p = 0; p <= points; p++) {
        const ptProgress = (p / points) - 0.5;
        const xBase = cx + ptProgress * fieldRadius * 2.0;
        
        // Harmonic wave superposition displacement
        const yWiggle = Math.sin(t * 1.2 + curvePhase + ptProgress * 4) * (fieldRadius * 0.28)
                      + Math.cos(t * 0.8 - curvePhase * 1.5 + ptProgress * 6) * (fieldRadius * 0.15);
        const yPos = cy + yWiggle;

        if (p === 0) ctx.moveTo(xBase, yPos);
        else ctx.lineTo(xBase, yPos);
      }
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();
  }
}
