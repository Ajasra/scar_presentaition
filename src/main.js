import { themeManager } from './config/theme-manager.js';
import { appState } from './engine/state.js';
import { SyncEngine } from './engine/sync.js';
import { CanvasStackManager } from './graphics/canvas-stack.js';
import { MainViewController } from './views/main-view.js';
import { PresenterView } from './views/presenter-view.js';

import { MapViewController } from './views/map-view.js';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const isMapRoute = window.location.pathname === '/map' || window.location.hash === '#map' || urlParams.get('view') === 'map';

  if (isMapRoute) {
    const mapViewContainer = document.getElementById('map-view-container');
    const slideContainer = document.getElementById('slide-container');
    const statusBar = document.getElementById('status-bar');
    const forensicLogPanel = document.getElementById('forensic-log-panel');

    if (mapViewContainer) mapViewContainer.classList.remove('hidden');
    if (slideContainer) slideContainer.classList.add('hidden');
    if (statusBar) {
      statusBar.classList.add('hidden');
      statusBar.style.display = 'none';
    }
    if (forensicLogPanel) forensicLogPanel.style.opacity = '0.15';


    new MapViewController(mapViewContainer);
  } else {
    const canvasStack = new CanvasStackManager();
    canvasStack.start();
    new MainViewController(canvasStack);
  }

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

