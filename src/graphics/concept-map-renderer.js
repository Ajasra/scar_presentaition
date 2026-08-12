import { CLUSTERS, conceptNodesList, conceptEdges } from './concept-database.js';

export class ConceptMapRenderer {
  constructor(canvas, onNodeSelectCallback) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.onNodeSelect = onNodeSelectCallback;

    this.nodes = [];
    this.nodeMap = new Map();
    this.adjMap = new Map();
    this.edges = [];

    // Viewport transform (Initial zoom set to 0.50 for rich clear perspective)
    this.zoom = 0.50;
    this.targetZoom = 0.50;
    this.panX = 0;
    this.panY = 0;
    this.targetPanX = 0;
    this.targetPanY = 0;

    // Interaction state
    this.hoveredNode = null;
    this.selectedNode = null;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.activeFilterCluster = 'ALL';
    this.searchQuery = '';

    this.animId = null;
    this.isRunning = false;

    this.initGraph();
    this.initEvents();
  }

  initGraph() {
    this.nodeMap.clear();
    this.adjMap.clear();

    // Spread nodes in an expansive 2D disk around (0,0) [2000px radius]
    this.nodes = conceptNodesList.map((def) => {
      const angle = Math.random() * Math.PI * 2;
      const isScar = def.id === 'scar' || def.id === 'SCAR' || def.id === 'scar-concept';
      const radius = isScar ? 0 : Math.sqrt(Math.random()) * 2000 + 100;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      const degreeEstimate = (def.crossLinks && def.crossLinks.length) || 0;
      const isHub = isScar || def.type === 'person' || degreeEstimate > 8;
      const baseRadius = isScar ? 16 : (def.type === 'person' ? 11.5 : def.type === 'claim' ? 9.5 : 8.0);

      // Presentation theme palette: SCAR Accent Orange (#ff5722), Crisp White (#ffffff), Silver (#cbd5e1), Slate (#94a3b8)
      const color = isScar
        ? '#ff5722'
        : def.type === 'person'
          ? '#ffffff'
          : def.type === 'claim'
            ? '#cbd5e1'
            : '#94a3b8';


      const nodeObj = {
        ...def,
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        radius: baseRadius,
        isHub: isHub,
        color: color,
        highlightAnim: 0,
        selectedAnim: 0,
        pulsePhase: Math.random() * Math.PI * 2
      };

      this.nodeMap.set(def.id, nodeObj);
      this.adjMap.set(def.id, new Set());
      return nodeObj;
    });

    // Build edges & adjacency
    this.edges = [];
    conceptEdges.forEach(([srcId, tgtId]) => {
      const src = this.nodeMap.get(srcId);
      const tgt = this.nodeMap.get(tgtId);
      if (src && tgt) {
        this.edges.push({ source: src, target: tgt });
        this.adjMap.get(srcId).add(tgtId);
        this.adjMap.get(tgtId).add(srcId);
      }
    });

    // Crosslink fallback edges
    this.nodes.forEach(node => {
      if (node.crossLinks && Array.isArray(node.crossLinks)) {
        node.crossLinks.forEach(tgtId => {
          const tgt = this.nodeMap.get(tgtId);
          if (tgt && !this.adjMap.get(node.id).has(tgtId)) {
            this.edges.push({ source: node, target: tgt });
            this.adjMap.get(node.id).add(tgtId);
            this.adjMap.get(tgtId).add(node.id);
          }
        });
      }
    });
  }

  resize(w, h) {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = w * dpr;
    this.canvas.height = h * dpr;
    this.canvas.style.width = w + 'px';
    this.canvas.style.height = h + 'px';
    this.ctx.scale(dpr, dpr);
    this.width = w;
    this.height = h;
  }

  initEvents() {
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.dragStartX = e.clientX - this.panX;
      this.dragStartY = e.clientY - this.panY;
    });

    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      this.lastMouseX = mouseX;
      this.lastMouseY = mouseY;

      if (this.isDragging) {
        this.targetPanX = e.clientX - this.dragStartX;
        this.targetPanY = e.clientY - this.dragStartY;
      } else {
        if (mouseX >= 0 && mouseX <= this.width && mouseY >= 0 && mouseY <= this.height) {
          this.updateHover(mouseX, mouseY);
        }
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
      const newZoom = Math.max(0.12, Math.min(4.5, this.targetZoom * zoomFactor));

      const mouseWorldX = (this.lastMouseX - this.width / 2 - this.panX) / this.zoom;
      const mouseWorldY = (this.lastMouseY - this.height / 2 - this.panY) / this.zoom;

      this.targetZoom = newZoom;
      this.targetPanX = this.lastMouseX - this.width / 2 - mouseWorldX * newZoom;
      this.targetPanY = this.lastMouseY - this.height / 2 - mouseWorldY * newZoom;
    }, { passive: false });

    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const clicked = this.getNodeAt(mouseX, mouseY);
      if (clicked) {
        this.selectNode(clicked);
      }
    });
  }

  // Screen-space closest node hit detection for easy selection
  getNodeAt(mouseX, mouseY) {
    let closestNode = null;
    let closestDistSq = Infinity;
    // Generous selection radius in screen pixels
    const maxHitRadius = Math.max(22, 16 / this.zoom);
    const maxHitRadiusSq = maxHitRadius * maxHitRadius;

    for (let i = 0; i < this.nodes.length; i++) {
      const n = this.nodes[i];
      if (!this.isNodeVisible(n)) continue;

      // Project node position to screen coordinates
      const screenX = this.width / 2 + this.panX + n.x * this.zoom;
      const screenY = this.height / 2 + this.panY + n.y * this.zoom;

      const dx = mouseX - screenX;
      const dy = mouseY - screenY;
      const distSq = dx * dx + dy * dy;

      if (distSq <= maxHitRadiusSq && distSq < closestDistSq) {
        closestDistSq = distSq;
        closestNode = n;
      }
    }
    return closestNode;
  }

  updateHover(mouseX, mouseY) {
    const prevHovered = this.hoveredNode;
    this.hoveredNode = this.getNodeAt(mouseX, mouseY);
    if (this.hoveredNode !== prevHovered) {
      this.canvas.style.cursor = this.hoveredNode ? 'pointer' : 'grab';
    }
  }

  selectNode(node) {
    this.selectedNode = node;
    if (this.onNodeSelect) {
      this.onNodeSelect(node);
    }
    if (node) {
      this.targetPanX = -node.x * this.zoom;
      this.targetPanY = -node.y * this.zoom;
    }
  }

  selectNodeById(nodeId) {
    const node = this.nodeMap.get(nodeId);
    if (node) {
      this.selectNode(node);
    }
  }

  setHoveredNodeById(nodeId) {
    if (!nodeId) {
      this.hoveredNode = null;
      return;
    }
    const node = this.nodeMap.get(nodeId);
    if (node && this.isNodeVisible(node)) {
      this.hoveredNode = node;
    } else {
      this.hoveredNode = null;
    }
  }

  setFilter(clusterId) {
    this.activeFilterCluster = clusterId;
  }

  setSearchQuery(query) {
    this.searchQuery = (query || '').toLowerCase().trim();
  }

  isNodeVisible(node) {
    if (this.activeFilterCluster !== 'ALL' && node.cluster !== this.activeFilterCluster) {
      return false;
    }
    if (this.searchQuery) {
      const titleMatch = node.title.toLowerCase().includes(this.searchQuery);
      const tagMatch = node.tags && node.tags.some(t => t.toLowerCase().includes(this.searchQuery));
      return titleMatch || tagMatch;
    }
    return true;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.loop();
  }

  stop() {
    this.isRunning = false;
    if (this.animId) cancelAnimationFrame(this.animId);
  }

  updatePhysics() {
    // Smooth camera transform interpolation
    this.zoom += (this.targetZoom - this.zoom) * 0.12;
    this.panX += (this.targetPanX - this.panX) * 0.12;
    this.panY += (this.targetPanY - this.panY) * 0.12;

    const damp = 0.86;
    const centerGravity = 0.00001; // Ultra-gentle gravity to allow huge open space
    const minSpacing = 55; // Hard anti-collision buffer so no two nodes ever overlap

    // 1. Repulsion between ALL node pairs
    const nodeCount = this.nodes.length;
    for (let i = 0; i < nodeCount; i++) {
      const na = this.nodes[i];
      if (!this.isNodeVisible(na)) continue;

      const isScar = na.id === 'scar' || na.id === 'SCAR' || na.id === 'scar-concept';
      if (!isScar) {
        na.vx -= na.x * centerGravity;
        na.vy -= na.y * centerGravity;
      } else {
        na.vx *= 0.05;
        na.vy *= 0.05;
        na.x = 0;
        na.y = 0;
      }

      for (let j = i + 1; j < nodeCount; j++) {
        const nb = this.nodes[j];
        if (!this.isNodeVisible(nb)) continue;

        const dx = nb.x - na.x;
        const dy = nb.y - na.y;
        const distSq = dx * dx + dy * dy + 0.1;
        const dist = Math.sqrt(distSq);

        // Hard collision push if nodes get closer than minSpacing (55px)
        if (dist < minSpacing) {
          const push = (minSpacing - dist) * 0.25;
          const fx = (dx / dist) * push;
          const fy = (dy / dist) * push;
          na.vx -= fx;
          na.vy -= fy;
          nb.vx += fx;
          nb.vy += fy;
        }

        // Long-range Inverse-Square Coulomb Repulsion up to 600px
        if (dist < 600) {
          const repulsionForce = 90000 / (distSq + 20);
          const fx = (dx / dist) * repulsionForce;
          const fy = (dy / dist) * repulsionForce;
          na.vx -= fx;
          na.vy -= fy;
          nb.vx += fx;
          nb.vy += fy;
        }
      }
    }

    // 2. Edge Spring Attraction (Only pull if dist > 320px)
    for (let i = 0; i < this.edges.length; i++) {
      const e = this.edges[i];
      if (!this.isNodeVisible(e.source) || !this.isNodeVisible(e.target)) continue;

      const dx = e.target.x - e.source.x;
      const dy = e.target.y - e.source.y;
      const dist = Math.sqrt(dx * dx + dy * dy) + 0.1;
      const restLength = 320;

      if (dist > restLength) {
        const force = (dist - restLength) * 0.00015;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;

        e.source.vx += fx;
        e.source.vy += fy;
        e.target.vx -= fx;
        e.target.vy -= fy;
      }
    }

    // 3. Position Integration & Dampening
    for (let i = 0; i < nodeCount; i++) {
      const n = this.nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      n.vx *= damp;
      n.vy *= damp;

      const isHover = this.hoveredNode === n;
      const isSelected = this.selectedNode === n;
      const isConnected = this.hoveredNode && (this.adjMap.get(this.hoveredNode.id)?.has(n.id) || n === this.hoveredNode);
      const targetHighlight = isHover || isSelected || isConnected ? 1.0 : 0.0;
      n.highlightAnim += (targetHighlight - n.highlightAnim) * 0.18;
      n.pulsePhase += 0.03;
    }
  }

  findShortestPathToScar(startId) {
    if (!startId || startId === 'scar' || startId === 'SCAR' || startId === 'scar-concept') return [];

    const queue = [[startId]];
    const visited = new Set([startId]);

    while (queue.length > 0) {
      const path = queue.shift();
      const current = path[path.length - 1];

      if (current === 'scar' || current === 'SCAR' || current === 'scar-concept') {
        return path.map(id => this.nodeMap.get(id)).filter(Boolean);
      }

      const neighbors = this.adjMap.get(current);
      if (neighbors) {
        for (const neighborId of neighbors) {
          if (!visited.has(neighborId)) {
            visited.add(neighborId);
            queue.push([...path, neighborId]);
          }
        }
      }
    }
    return [];
  }

  // Draw node geometry matching Rhizome canvas style (Circle for People/SCAR, Diamond for Terms)
  drawNodeShape(ctx, n, x, y, r, isHover, isSelected, isConnected) {
    const isScar = n.id === 'scar' || n.id === 'SCAR' || n.id === 'scar-concept';
    const isPerson = n.type === 'person';

    ctx.beginPath();

    if (isScar || isPerson) {
      // People & SCAR: Circle
      ctx.arc(x, y, r, 0, Math.PI * 2);
    } else {
      // Terms & Claims: Diamond (Rhombus)
      const d = r * 1.25;
      ctx.moveTo(x, y - d);
      ctx.lineTo(x + d, y);
      ctx.lineTo(x, y + d);
      ctx.lineTo(x - d, y);
      ctx.closePath();
    }

    if (isScar) {
      ctx.fillStyle = '#ff5722';
      ctx.shadowColor = 'rgba(255, 87, 34, 0.8)';
      ctx.shadowBlur = 12 / this.zoom;
    } else if (isSelected || isHover) {
      ctx.fillStyle = '#ff5722';
      ctx.shadowColor = 'rgba(255, 87, 34, 0.9)';
      ctx.shadowBlur = 14 / this.zoom;
    } else if (isConnected) {
      ctx.fillStyle = 'rgba(240, 240, 250, 0.95)';
      ctx.shadowColor = 'rgba(255, 87, 34, 0.5)';
      ctx.shadowBlur = 8 / this.zoom;
    } else if (isPerson) {
      ctx.fillStyle = 'rgba(160, 160, 175, 0.35)';
      ctx.shadowBlur = 0;
    } else {
      ctx.fillStyle = 'rgba(110, 110, 120, 0.22)';
      ctx.shadowBlur = 0;
    }

    ctx.fill();

    // Outer concentric outline ring for People (Thinkers)
    if (isPerson && !isScar) {
      ctx.beginPath();
      ctx.arc(x, y, r + 2.8 / this.zoom, 0, Math.PI * 2);
      ctx.strokeStyle = isSelected || isHover
        ? '#ff5722'
        : isConnected
          ? 'rgba(255, 255, 255, 0.5)'
          : 'rgba(180, 180, 190, 0.25)';
      ctx.lineWidth = 0.8 / this.zoom;
      ctx.stroke();
    }

    ctx.shadowBlur = 0;
  }

  render() {
    const w = this.width;
    const h = this.height;
    const ctx = this.ctx;

    // Deep void space background matching presentation
    ctx.fillStyle = '#08080f';
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.translate(w / 2 + this.panX, h / 2 + this.panY);
    ctx.scale(this.zoom, this.zoom);

    // 1. Render Edges (All background edges render as faint subtle threads)
    const edgeCount = this.edges.length;
    const now = performance.now();
    const dashOffset = -(now / 90) % (8 / this.zoom);

    ctx.setLineDash([]);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
    ctx.lineWidth = 0.5 / this.zoom;

    for (let i = 0; i < edgeCount; i++) {
      const e = this.edges[i];
      if (!this.isNodeVisible(e.source) || !this.isNodeVisible(e.target)) continue;

      ctx.beginPath();
      ctx.moveTo(e.source.x, e.source.y);
      ctx.lineTo(e.target.x, e.target.y);
      ctx.stroke();
    }

    // 1.5 Render White Animated Dotted Connections & Path to SCAR for SELECTED Node
    if (this.selectedNode) {
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.lineWidth = 1.4 / this.zoom;
      ctx.setLineDash([4 / this.zoom, 4 / this.zoom]);
      ctx.lineDashOffset = dashOffset;

      // Connected Edges to Selected Node
      for (let i = 0; i < edgeCount; i++) {
        const e = this.edges[i];
        if (!this.isNodeVisible(e.source) || !this.isNodeVisible(e.target)) continue;

        if (e.source === this.selectedNode || e.target === this.selectedNode) {
          ctx.beginPath();
          ctx.moveTo(e.source.x, e.source.y);
          ctx.lineTo(e.target.x, e.target.y);
          ctx.stroke();
        }
      }

      // Shortest Dotted Path connecting Selected Node to SCAR
      const isSelectedScar = this.selectedNode.id === 'scar' || this.selectedNode.id === 'SCAR' || this.selectedNode.id === 'scar-concept';
      if (!isSelectedScar) {
        const pathNodes = this.findShortestPathToScar(this.selectedNode.id);
        if (pathNodes.length > 1) {
          ctx.beginPath();
          ctx.moveTo(pathNodes[0].x, pathNodes[0].y);
          for (let i = 1; i < pathNodes.length; i++) {
            ctx.lineTo(pathNodes[i].x, pathNodes[i].y);
          }
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    // 2. Render Nodes
    const activeHoverId = this.hoveredNode ? this.hoveredNode.id : null;
    const activeSelectedId = this.selectedNode ? this.selectedNode.id : null;
    const selectNeighbors = activeSelectedId ? this.adjMap.get(activeSelectedId) : null;

    for (let i = 0; i < this.nodes.length; i++) {
      const n = this.nodes[i];
      if (!this.isNodeVisible(n)) continue;

      const isHover = activeHoverId === n.id;
      const isSelected = activeSelectedId === n.id;
      const isScar = n.id === 'scar' || n.id === 'SCAR' || n.id === 'scar-concept';
      const isConnected = selectNeighbors && selectNeighbors.has(n.id);

      // Ensure node dots stay clearly visible regardless of zoom level
      const minScreenR = 4.5 / Math.max(0.2, this.zoom);
      const r = Math.max(minScreenR, n.radius + n.highlightAnim * 3.0);

      // Draw distinct node shape
      this.drawNodeShape(ctx, n, n.x, n.y, r, isHover, isSelected, isConnected);

      // Render Text Label & Telemetry directly on Canvas for Hovered, Selected, or Central Scar Node
      const showLabel = isHover || isSelected || isScar;
      if (showLabel) {
        ctx.save();
        const displayLabel = n.title || n.label;
        const fontWorldSize = 16 / this.zoom;
        ctx.font = `700 ${fontWorldSize}px "Share Tech Mono", "JetBrains Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';

        const textX = n.x;
        const titleY = n.y - r - (12 / this.zoom);

        // Dark backdrop stroke for legibility
        ctx.strokeStyle = '#08080f';
        ctx.lineWidth = 4 / this.zoom;
        ctx.strokeText(displayLabel, textX, titleY);

        // Hot orange accent filled text with bloom
        ctx.fillStyle = '#ff5722';
        ctx.shadowColor = 'rgba(255, 87, 34, 0.8)';
        ctx.shadowBlur = 12 / this.zoom;
        ctx.fillText(displayLabel, textX, titleY);

        // Diagnostic Telemetry under node dot
        const degree = (this.adjMap.get(n.id) && this.adjMap.get(n.id).size) || 0;
        const padDegree = degree < 10 ? `0${degree}` : `${degree}`;
        const telemetry = `[MASS::${padDegree}]`;

        const teleWorldSize = 9 / this.zoom;
        const telemetryY = n.y + r + (14 / this.zoom);

        ctx.shadowBlur = 0;
        ctx.font = `400 ${teleWorldSize}px "Share Tech Mono", "JetBrains Mono", monospace`;
        ctx.textBaseline = 'top';

        ctx.strokeStyle = '#08080f';
        ctx.lineWidth = 3 / this.zoom;
        ctx.strokeText(telemetry, textX, telemetryY);

        ctx.fillStyle = 'rgba(160, 160, 170, 0.45)';
        ctx.fillText(telemetry, textX, telemetryY);
        ctx.restore();
      }

      // Precision Reticle Brackets (┌ ┐ └ ┘) around Hovered, Selected, or Central Scar Node
      if (isHover || isSelected || isScar) {
        ctx.save();
        ctx.globalAlpha = isSelected || isScar ? 0.9 : 0.6;
        ctx.strokeStyle = '#ff5722';
        ctx.lineWidth = 1.0 / this.zoom;
        const bSize = r + (6 / this.zoom);
        const bLen = 4 / this.zoom;

        // Top-left
        ctx.beginPath(); ctx.moveTo(n.x - bSize, n.y - bSize + bLen); ctx.lineTo(n.x - bSize, n.y - bSize); ctx.lineTo(n.x - bSize + bLen, n.y - bSize); ctx.stroke();
        // Top-right
        ctx.beginPath(); ctx.moveTo(n.x + bSize - bLen, n.y - bSize); ctx.lineTo(n.x + bSize, n.y - bSize); ctx.lineTo(n.x + bSize, n.y - bSize + bLen); ctx.stroke();
        // Bottom-left
        ctx.beginPath(); ctx.moveTo(n.x - bSize, n.y + bSize - bLen); ctx.lineTo(n.x - bSize, n.y + bSize); ctx.lineTo(n.x - bSize + bLen, n.y + bSize); ctx.stroke();
        // Bottom-right
        ctx.beginPath(); ctx.moveTo(n.x + bSize - bLen, n.y + bSize); ctx.lineTo(n.x + bSize, n.y + bSize); ctx.lineTo(n.x + bSize, n.y + bSize - bLen); ctx.stroke();
        ctx.restore();
      }
    }

    ctx.restore();
  }

  loop() {

    if (!this.isRunning) return;
    this.updatePhysics();
    this.render();
    this.animId = requestAnimationFrame(() => this.loop());
  }
}
