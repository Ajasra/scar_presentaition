# Style & Aesthetic Guide — Tracing the Scar

## 1. Aesthetic Vision: Dark Cybernetic Minimalism

The presentation screen is a **control panel and non-trivial apparatus** — not a generic slide deck.
Analog synthesizer patch-bay meets circuit-board schematic meets terminal console. Every visual element justifies itself as either:
1. **Content**: Raw theoretical aphorisms, equations, and diagrams.
2. **Structural Trace**: Apparatus lines, circuit borders, forensic timestamps, and internal state registers.
3. **Forensic Scar**: Permanent palimpsest ghosts, CRT phosphor burn-in, cracked trace lines, and frozen particle graphs left by prior operations.

---

## 2. Centralized Color Palette

All colors are controlled strictly via [`theme.config.json`](file:///c:/Users/user/Desktop/ASC/ScarPresentation/theme.config.json).
**Constraint**: Greyscale canvas with a **single accent color (Hot Orange `#ff5722`)**.

| Token | CSS Variable | JSON Path | Default Hex/RGBA | Role |
|---|---|---|---|---|
| Deep Background | `--bg-deep` | `colors.bgDeep` | `#05050a` | Main canvas backdrop |
| Panel Background | `--panel-bg` | `colors.panelBg` | `rgba(10,10,18,0.95)` | Semi-transparent slide card |
| Text Primary | `--text-primary` | `colors.textPrimary` | `#f4f4f5` | Headings, definitions, code |
| Text Secondary | `--text-secondary` | `colors.textSecondary` | `#cbd5e1` | Subheadings, framework labels |
| Text Dim | `--text-dim` | `colors.textDim` | `#94a3b8` | Citations, status bar, slide index |
| Subtle Border | `--border-subtle` | `colors.borderSubtle` | `rgba(255,255,255,0.12)`| Inset boundaries, panel borders |
| Active Border | `--border-active` | `colors.borderActive` | `rgba(255,255,255,0.25)`| Hover / active panel highlights |
| **Accent (The Cut)**| `--accent` | `colors.accent` | `#ff5722` | **Hot Orange**: Key aphorisms, scar |
| Accent Glow | `--accent-glow` | `colors.accentGlow` | `rgba(255,87,34,0.5)` | Connector lines, geometry edges |
| Accent Bloom | `--accent-bloom` | `colors.accentBloom` | `rgba(255,87,34,0.15)` | Ethics cluster radial ambient glow |
| Accent Dim | `--accent-dim` | `colors.accentDim` | `rgba(255,87,34,0.25)` | Frozen/faded accent state |

---

## 3. Typography & Hierarchy

### Fonts
- **Primary Display & Code**: `"Share Tech Mono", "JetBrains Mono", "Fira Code", monospace`
- **Secondary Body Prose**: `"IBM Plex Sans", "Inter", system-ui, sans-serif`
- **Fallback**: `monospace` everywhere.

### Scale Rules (Responsive `clamp()` configured in `theme.config.json`)
- **Mega** (`clamp(2.5rem, 4.4vw, 3.9rem)`): Title card, closing statement.
- **H1** (`clamp(1.75rem, 2.8vw, 2.45rem)`): Slide titles, Act title cards.
- **H2** (`clamp(1.5rem, 2.4vw, 2.1rem)`): Subheadings, geometry titles.
- **Body** (`clamp(1.3rem, 1.92vw, 1.62rem)`): Standard paragraphs, callouts, and table content.
- **Small** (`clamp(1.1rem, 1.5vw, 1.3rem)`): Citations, equation annotations, step notes.
- **Micro** (`0.95rem`): System registers, status bar, slide index.

---

## 4. Standardized Slide Bottom Bar (`.slide-bottom-bar`)

All slides must use the unified `.slide-bottom-bar` structure for Aphorisms / Notes and Academic References:

```html
<div class="slide-bottom-bar">
  <!-- Left Note / Aphorism (1.6rem bold accent) -->
  <p class="text-accent" style="font-family: var(--font-mono); font-size: 1.6rem; margin: 0; font-weight: bold; line-height: 1.2;">
    ▸ Aphorism / Remark text here.<br>
    <span style="font-size: 1.25rem; color: var(--text-dim); font-weight: normal; margin-left: 1.5rem;">— Attribution</span>
  </p>

  <!-- Right Reference (1.1rem mono dim text) -->
  <span class="slide-ref">— Author Name, <em>Publication Title</em>, Year</span>
</div>
```

### Shared Slide Animations & Helper Classes
- **Bottom Bar Entrance**: `.slide-bottom-bar` uses `@keyframes reveal-bottom-bar` (`600ms ease-out forwards`).
- **Standard CSS Font Tokens**: Always use `var(--font-body)` and `var(--font-small)` for slide content instead of hardcoded `rem` or `px` values.
- **Typewriter Effect**: Utilize standard `.typewriter-title` and central timing helper functions from `main-view.js` for step transitions and typewriter reveals.

```
┌──────────────────────────────────────────────────────────────┐
│  [status bar]   slide N/M  ·  act  ·  REG:z=[...]  ·  clock │  ← Top 2vh
├──────────┬───────────────────────────────────────────────────┤
│          │                                                   │
│ FORENSIC │              ┌──────────────────────────┐        │
│   LOG    │              │                          │        │
│ (collaps │              │      SLIDE PANEL         │        │
│  ed tab) │              │    max-width: 64rem      │        │
│          │              │    backdrop-blur: 4px    │        │
│          │              │                          │        │
│          │              └──────────────────────────┘       ┌─┤
│          │                                                 │░│← self-frame
├──────────┴───────────────────────────────────────────────────┤
│  [circuit traces]  ← → nav   [ENTROPY |||||    ] [PROG ||| ]│  ← Bottom 2vh
└──────────────────────────────────────────────────────────────┘
```

---

## 5. Visual Degradation Rules (Sclerosis Engine)

1. **Temperature ($T$)**:
   - Act 0: $T = 0.4$ (Drifting nodes)
   - Act I: $T = 1.0$ (Fluid, springy, alive)
   - Act II: $T = 0.8 \rightarrow 0.5$ (Cooling, geometry wireframes active)
   - Act III: $T = 0.5 \rightarrow 0.25$ (Slowing down, ethics nodes bloom hot orange)
   - Act IV: $T \rightarrow 0.0$ (Terminal freeze, motion stops, graph locks into hardened lattice)
2. **Palimpsest Ghosting**: Every slide transition leaves a low-opacity snapshot ($0.04$) on the offscreen canvas layer, building a physical history of all prior slides.
3. **CRT Phosphor Burn-in**: High-energy moments (SCAR pulse, ethics bloom) burn persistent radial and textual after-images into the canvas.

---

## 6. Single Configuration Rule

> [!CAUTION]
> **No hardcoded styles in code!**
> - In CSS files: Reference `var(--token-name)`.
> - In Canvas 2D/3D JS context drawing: Retrieve styles via `ThemeManager.getColor('accent')` or `ThemeManager.getCanvasConfig()`.
> - When `theme.config.json` is modified, the entire UI and canvas redraws dynamically to match the new token values.
