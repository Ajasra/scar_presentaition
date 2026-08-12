import { CLUSTERS, conceptNodesMap, conceptNodesList } from '../graphics/concept-database.js';
import { ConceptMapRenderer } from '../graphics/concept-map-renderer.js';

export class MapViewController {
  constructor(containerElement) {
    this.container = containerElement;
    this.renderer = null;
    this.selectedNode = null;

    this.renderLayout();
    this.initRenderer();
    this.bindEvents();
  }

  renderLayout() {
    this.container.innerHTML = `
      <div class="map-view-wrapper">
        <!-- Top Map Bar -->
        <div class="map-top-bar mono-font">
          <div class="map-top-left">
            <a href="./" target="_blank" class="map-pres-link text-accent mono-font">[ PRESENTATION ↗ ]</a>
            <span class="map-logo text-accent">SCAR://CONCEPT-MAP</span>
            <span class="text-dim">// 472 NODES · 3,348 RELATIONS</span>
          </div>

          <div class="map-search-box">
            <span class="search-icon">//</span>
            <input type="text" id="map-search-input" placeholder="Search concepts, people, claims..." class="mono-font" />
          </div>


          <div class="map-cluster-filters">
            <button class="filter-btn active" data-cluster="ALL">ALL</button>
            <button class="filter-btn" data-cluster="A" style="--c-color: ${CLUSTERS.A.color}">CYBERNETICS</button>
            <button class="filter-btn" data-cluster="B" style="--c-color: ${CLUSTERS.B.color}">DELEUZE</button>
            <button class="filter-btn" data-cluster="C" style="--c-color: ${CLUSTERS.C.color}">BARAD</button>
            <button class="filter-btn" data-cluster="D" style="--c-color: ${CLUSTERS.D.color}">ETHICS</button>
            <button class="filter-btn" data-cluster="E" style="--c-color: ${CLUSTERS.E.color}">MEDIA ARCHAEOLOGY</button>
          </div>
        </div>

        <!-- Split View 60% / 40% -->
        <div class="map-split-container">
          <!-- Left 60% Map Canvas -->
          <div id="map-canvas-container" class="map-canvas-container">
            <canvas id="map-canvas"></canvas>
            
            <!-- Canvas Overlay Zoom Controls -->
            <div class="map-canvas-controls mono-font">
              <button id="btn-map-zoom-in" title="Zoom In">+</button>
              <button id="btn-map-zoom-out" title="Zoom Out">−</button>
              <button id="btn-map-zoom-reset" title="Reset View">RESET</button>
            </div>
            
            <div class="map-canvas-hint mono-font text-dim">
              <span>DRAG TO PAN</span> · <span>SCROLL TO ZOOM</span> · <span>CLICK NODE TO INSPECT</span>
            </div>
          </div>

          <!-- Right 40% Detail Sidebar -->
          <div id="map-detail-panel" class="map-detail-panel">
            <div id="map-detail-content" class="map-detail-content">
              <!-- Rendered via JS -->
              <div class="map-detail-empty mono-font">
                <div class="empty-title text-accent">SELECT A CONCEPT NODE</div>
                <div class="empty-desc text-secondary">
                  Explore the 470+ nodes in the SCAR research network. Click any node on the map to inspect its material trace, theoretical relations, and key extracts.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  initRenderer() {
    const canvas = document.getElementById('map-canvas');
    const container = document.getElementById('map-canvas-container');

    this.renderer = new ConceptMapRenderer(canvas, (node) => {
      this.displayNodeDetails(node);
    });

    const updateSize = () => {
      if (container && this.renderer) {
        this.renderer.resize(container.clientWidth, container.clientHeight);
      }
    };

    window.addEventListener('resize', updateSize);
    setTimeout(updateSize, 50);

    this.renderer.start();
  }

  bindEvents() {
    // Search input
    const searchInput = document.getElementById('map-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        if (this.renderer) {
          this.renderer.setSearchQuery(e.target.value);
        }
      });
    }

    // Cluster filter buttons
    const filterBtns = this.container.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cluster = btn.dataset.cluster;
        if (this.renderer) {
          this.renderer.setFilter(cluster);
        }
      });
    });

    // Zoom buttons
    const zoomIn = document.getElementById('btn-map-zoom-in');
    const zoomOut = document.getElementById('btn-map-zoom-out');
    const zoomReset = document.getElementById('btn-map-zoom-reset');

    if (zoomIn) {
      zoomIn.addEventListener('click', () => {
        if (this.renderer) this.renderer.targetZoom = Math.min(4.0, this.renderer.targetZoom * 1.3);
      });
    }
    if (zoomOut) {
      zoomOut.addEventListener('click', () => {
        if (this.renderer) this.renderer.targetZoom = Math.max(0.25, this.renderer.targetZoom * 0.7);
      });
    }
    if (zoomReset) {
      zoomReset.addEventListener('click', () => {
        if (this.renderer) {
          this.renderer.targetZoom = 1.0;
          this.renderer.targetPanX = 0;
          this.renderer.targetPanY = 0;
        }
      });
    }

    // Delegate crosslink clicks and hovers inside detail panel
    const detailPanel = document.getElementById('map-detail-panel');
    if (detailPanel) {
      detailPanel.addEventListener('click', (e) => {
        const linkBtn = e.target.closest('.wikilink-btn');
        if (linkBtn && linkBtn.dataset.targetId) {
          const targetId = linkBtn.dataset.targetId;
          if (this.renderer) {
            this.renderer.selectNodeById(targetId);
          }
        }
      });

      detailPanel.addEventListener('mouseover', (e) => {
        const linkBtn = e.target.closest('.wikilink-btn');
        if (linkBtn && linkBtn.dataset.targetId) {
          const targetId = linkBtn.dataset.targetId;
          if (this.renderer) {
            this.renderer.setHoveredNodeById(targetId);
          }
        }
      });

      detailPanel.addEventListener('mouseout', (e) => {
        const linkBtn = e.target.closest('.wikilink-btn');
        if (linkBtn) {
          if (this.renderer) {
            this.renderer.setHoveredNodeById(null);
          }
        }
      });
    }

  }

  // Helper to test if a raw string / link target is a source/input reference rather than a concept node
  isSourceRef(str) {
    if (!str) return false;
    const lower = str.toLowerCase().trim();
    if (
      lower.startsWith('distilled') ||
      lower.startsWith('ccc-') ||
      lower.startsWith('betin') ||
      lower.includes('_v0_') ||
      lower.includes('_v1_') ||
      lower.includes('research_synthesis') ||
      lower.includes('conversation') ||
      lower.includes('feedback_knot')
    ) {
      return true;
    }
    const id = str.split('|')[0].trim();
    const normalizedId = id.replace(/ /g, '-');
    if (!conceptNodesMap[id] && !conceptNodesMap[normalizedId]) {
      if (id.includes('_') || id.includes('Notes') || id.includes('critique') || id.includes('Synthesis') || id.includes('Abstract')) {
        return true;
      }
    }
    return false;
  }

  // Parse markdown WikiLinks [[NodeId|Label]] or [[NodeId]] into interactive HTML buttons
  // Strips out all source/file citation references cleanly
  parseWikiLinks(text) {
    if (!text) return '';
    const wikiRegex = /\[\[([^\]]+)\]\]/g;
    let cleanText = text.replace(wikiRegex, (match, content) => {
      let id = content.trim();
      let label = content.trim();
      if (content.includes('|')) {
        const parts = content.split('|');
        id = parts[0].trim();
        label = parts[1].trim();
      }

      if (this.isSourceRef(id) || this.isSourceRef(label)) {
        return ''; // Strip source reference completely
      }

      const targetNode = conceptNodesMap[id] || conceptNodesMap[id.replace(/ /g, '-')];
      const displayLabel = targetNode ? targetNode.title : label;
      const targetId = targetNode ? targetNode.id : id;
      return `<button class="wikilink-btn mono-font" data-target-id="${targetId}">${displayLabel}</button>`;
    });

    // Clean up empty brackets, empty quotes, extra spaces left by stripped citations
    cleanText = cleanText
      .replace(/\s\s+/g, ' ')
      .replace(/\(\s*\)/g, '')
      .replace(/\[\s*\]/g, '')
      .replace(/\s+([.,;:])/g, '$1')
      .trim();

    return cleanText;
  }

  // Format full markdown text (WikiLinks, bold, italic, bullet lists, blockquotes, code)
  formatMarkdown(text) {
    if (!text) return '';

    // 1. Parse WikiLinks & strip source citations
    let processed = this.parseWikiLinks(text);


    // 2. Inline Code `code`
    processed = processed.replace(/`([^`]+)`/g, '<code class="detail-code">$1</code>');

    // 3. Bold **text** or __text__
    processed = processed.replace(/\*\*([^*]+)\*\*/g, '<strong class="detail-bold">$1</strong>');
    processed = processed.replace(/__([^_]+)__/g, '<strong class="detail-bold">$1</strong>');

    // 4. Italic *text* or _text_
    processed = processed.replace(/(^|[^\w])\*([^*]+)\*/g, '$1<em class="detail-italic">$2</em>');

    // 5. Convert bullet lists (- or *) and blockquotes (> )
    const lines = processed.split('\n');
    const outputLines = [];
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if (!line) {
        if (inList) {
          outputLines.push('</ul>');
          inList = false;
        }
        continue;
      }

      if (line.startsWith('- ') || line.startsWith('* ')) {
        if (!inList) {
          outputLines.push('<ul class="detail-list">');
          inList = true;
        }
        const itemContent = line.slice(2).trim();
        outputLines.push(`<li class="detail-list-item"><span class="bullet-dot">•</span><span class="list-text">${itemContent}</span></li>`);
      } else if (line.startsWith('> ')) {
        if (inList) {
          outputLines.push('</ul>');
          inList = false;
        }
        const quoteContent = line.slice(2).trim();
        outputLines.push(`<blockquote class="detail-blockquote">${quoteContent}</blockquote>`);
      } else {
        if (inList) {
          outputLines.push('</ul>');
          inList = false;
        }
        outputLines.push(`<p class="detail-paragraph">${line}</p>`);
      }
    }

    if (inList) {
      outputLines.push('</ul>');
    }

    return outputLines.join('');
  }

  displayNodeDetails(node) {
    const detailContent = document.getElementById('map-detail-content');
    if (!detailContent) return;

    if (!node) {
      detailContent.innerHTML = `
        <div class="map-detail-empty mono-font">
          <div class="empty-title text-accent">SELECT A CONCEPT NODE</div>
          <div class="empty-desc text-secondary">
            Explore the 470+ nodes in the SCAR research network. Click any node on the map to inspect its material trace, theoretical relations, and key extracts.
          </div>
        </div>
      `;
      return;
    }

    const clusterInfo = CLUSTERS[node.cluster] || CLUSTERS.A;
    const typeLabel = (node.type || 'TERM').toUpperCase();
    const parsedSummary = this.formatMarkdown(node.summary);
    const parsedExamples = this.formatMarkdown(node.examples);
    const parsedRelations = this.formatMarkdown(node.relations);
    const parsedKeyExtracts = this.formatMarkdown(node.keyExtracts);


    const tagsHtml = node.tags && node.tags.length > 0
      ? `<div class="detail-tags mono-font">${node.tags.map(t => `<span class="detail-tag-pill">#${t}</span>`).join('')}</div>`
      : '';

    const filteredCrossLinks = (node.crossLinks || []).filter(targetId => {
      return !this.isSourceRef(targetId) && conceptNodesMap[targetId];
    });

    const crossLinksHtml = filteredCrossLinks.length > 0
      ? `<div class="detail-crosslinks mono-font">
          <div class="section-title text-accent">LINKED CONCEPTS (${filteredCrossLinks.length})</div>
          <div class="crosslinks-list">
            ${filteredCrossLinks.map(targetId => {
              const targetNode = conceptNodesMap[targetId];
              const title = targetNode ? targetNode.title : targetId;
              return `<button class="wikilink-btn crosslink-badge" data-target-id="${targetId}">${title}</button>`;
            }).join('')}
          </div>
        </div>`
      : '';


    detailContent.innerHTML = `
      <div class="detail-card">
        <!-- Header -->
        <div class="detail-header">
          <div class="detail-badges mono-font">
            <span class="type-badge badge-${node.type}">${typeLabel}</span>
            <span class="cluster-badge" style="background: ${clusterInfo.color}22; color: ${clusterInfo.color}; border-color: ${clusterInfo.color}66;">
              ${clusterInfo.name}
            </span>
          </div>
          <h2 class="detail-title mono-font text-primary">${node.title}</h2>
          ${tagsHtml}
        </div>

        <!-- Summary -->
        ${parsedSummary ? `
          <div class="detail-section">
            <div class="section-title mono-font text-accent">// OVERVIEW</div>
            <div class="section-body text-secondary">${parsedSummary}</div>
          </div>
        ` : ''}

        <!-- Evidence / Examples -->
        ${parsedExamples ? `
          <div class="detail-section">
            <div class="section-title mono-font text-accent">// EVIDENCE &amp; EXAMPLES</div>
            <div class="section-body text-secondary">${parsedExamples}</div>
          </div>
        ` : ''}

        <!-- Relations -->
        ${parsedRelations ? `
          <div class="detail-section">
            <div class="section-title mono-font text-accent">// RELATIONS &amp; ENTANGLEMENTS</div>
            <div class="section-body text-secondary">${parsedRelations}</div>
          </div>
        ` : ''}

        <!-- Key Extracts -->
        ${parsedKeyExtracts ? `
          <div class="detail-section">
            <div class="section-title mono-font text-accent">// KEY EXTRACTS</div>
            <div class="section-body extract-quote text-secondary">${parsedKeyExtracts}</div>
          </div>
        ` : ''}

        <!-- Crosslinks list -->
        ${crossLinksHtml}
      </div>
    `;

    detailContent.scrollTop = 0;
  }
}
