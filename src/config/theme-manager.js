import themeConfig from '../../theme.config.json';

class ThemeManager {
  constructor() {
    this.config = themeConfig.theme;
    this.init();
  }

  init() {
    this.applyCssVariables();
  }

  applyCssVariables() {
    const root = document.documentElement;
    const { colors, typography, layout, animation } = this.config;

    // Colors
    root.style.setProperty('--bg-deep', colors.bgDeep);
    root.style.setProperty('--panel-bg', colors.panelBg);
    root.style.setProperty('--text-primary', colors.textPrimary);
    root.style.setProperty('--text-secondary', colors.textSecondary);
    root.style.setProperty('--text-dim', colors.textDim);
    root.style.setProperty('--border-subtle', colors.borderSubtle);
    root.style.setProperty('--border-active', colors.borderActive);
    root.style.setProperty('--accent', colors.accent);
    root.style.setProperty('--accent-glow', colors.accentGlow);
    root.style.setProperty('--accent-bloom', colors.accentBloom);
    root.style.setProperty('--accent-dim', colors.accentDim);
    root.style.setProperty('--node-fluid', colors.nodeFluid);
    root.style.setProperty('--node-frozen', colors.nodeFrozen);
    root.style.setProperty('--node-edge-fluid', colors.nodeEdgeFluid);
    root.style.setProperty('--node-edge-frozen', colors.nodeEdgeFrozen);

    // Typography
    root.style.setProperty('--font-mono', typography.fontMono);
    root.style.setProperty('--font-sans', typography.fontSans);
    root.style.setProperty('--font-mega', typography.sizes.mega);
    root.style.setProperty('--font-h1', typography.sizes.h1);
    root.style.setProperty('--font-h2', typography.sizes.h2);
    root.style.setProperty('--font-body', typography.sizes.body);
    root.style.setProperty('--font-small', typography.sizes.small);
    root.style.setProperty('--font-micro', typography.sizes.micro);
    root.style.setProperty('--lh-heading', typography.lineHeights.heading);
    root.style.setProperty('--lh-body', typography.lineHeights.body);

    // Layout & Animation
    root.style.setProperty('--panel-max-width', layout.panelMaxWidth);
    root.style.setProperty('--panel-padding', layout.panelPadding);
    root.style.setProperty('--panel-blur', layout.panelBlur);
    root.style.setProperty('--status-bar-height', layout.statusBarHeight);
    root.style.setProperty('--footer-height', layout.footerHeight);
    root.style.setProperty('--anim-typewriter-char', `${animation.typewriterCharMs}ms`);
    root.style.setProperty('--anim-crossfade', `${animation.crossfadeMs}ms`);
  }

  getColor(key) {
    return this.config.colors[key] || '#ffffff';
  }

  getTypography(key) {
    return this.config.typography[key];
  }

  getCanvasConfig() {
    return this.config.canvas;
  }
}

export const themeManager = new ThemeManager();
