import { themeManager } from './config/theme-manager.js';
import { appState } from './engine/state.js';
import { SyncEngine } from './engine/sync.js';
import { CanvasStackManager } from './graphics/canvas-stack.js';
import { MainViewController } from './views/main-view.js';
import { PresenterView } from './views/presenter-view.js';

document.addEventListener('DOMContentLoaded', () => {
  const canvasStack = new CanvasStackManager();
  canvasStack.start();
  new MainViewController(canvasStack);

  // Screen orientation and mobile viewport warning check
  initScreenCheck();
});

function initScreenCheck() {
  const modal = document.getElementById('screen-warning-modal');
  const dismissBtn = document.getElementById('btn-dismiss-warning');

  if (!modal) return;

  let userDismissed = false;

  function checkViewport() {
    if (userDismissed) return;

    const isPortrait = window.innerHeight > window.innerWidth;
    const isSmallScreen = window.innerWidth < 1024;
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isPortrait || isSmallScreen || isMobileDevice) {
      modal.classList.remove('hidden');
    } else {
      modal.classList.add('hidden');
    }
  }

  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      userDismissed = true;
      modal.classList.add('hidden');
    });
  }

  checkViewport();
  window.addEventListener('resize', checkViewport);
  window.addEventListener('orientationchange', checkViewport);
}

