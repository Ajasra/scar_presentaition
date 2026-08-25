import { appState } from '../engine/state.js';
import { slidesData } from '../slides/slides-data.js';

export class PresenterView {
  constructor(syncEngine) {
    this.syncEngine = syncEngine;
    this.container = document.getElementById('app');
    this.initLayout();
    this.bindSync();
  }

  initLayout() {
    this.container.innerHTML = `
      <div class="status-bar">
        <div class="status-left">
          <span class="status-dot pulse"></span>
          <span class="mono-font" style="color: var(--accent);">[PRESENTER CONSOLE]</span>
        </div>
        <div class="status-center mono-font" id="pres-timer">00:00:00</div>
        <div class="status-right mono-font" id="pres-slide-num">SLIDE 01 / 23</div>
      </div>

      <div class="presenter-layout">
        <div class="presenter-notes">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem; margin-bottom: 1.25rem;">
            <h2 class="mono-font text-accent" style="margin: 0; font-size: 1.1rem;">SPEAKER TELEPROMPTER NOTES</h2>
            <span id="pres-step-badge" class="mono-font text-secondary" style="font-size: 0.9rem;">[STEP 1 OF 1]</span>
          </div>
          <div id="pres-notes-text"></div>
        </div>

        <div class="presenter-main-preview">
          <div style="padding: 0.4rem 0.75rem; background: rgba(255,255,255,0.04); font-size: 0.7rem; color: var(--text-dim);" class="mono-font">PROJECTOR PREVIEW (MAIN SCREEN)</div>
          <div id="pres-current-content"></div>
        </div>

        <div class="presenter-next-box">
          <span class="mono-font text-dim" style="font-size: 0.75rem; display: block; margin-bottom: 0.4rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.2rem;">NEXT SLIDE CUE</span>
          <div id="pres-next-preview" style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4;"></div>
        </div>

        <div class="presenter-controls">
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <button class="btn-ctrl" id="btn-prev" style="flex: 1;">◀ PREV</button>
            <div class="notes-lang-switch mono-font" id="pres-lang-switch">
              <button type="button" class="btn-lang active" data-lang="en">EN</button>
              <button type="button" class="btn-lang" data-lang="pt">PT</button>
              <button type="button" class="btn-lang" data-lang="ru">RU</button>
              <button type="button" class="btn-lang" data-lang="zh">ZH</button>
            </div>
            <button class="btn-ctrl" id="btn-next" style="flex: 1.5; background: rgba(255,87,34,0.2); border-color: var(--accent);">NEXT ▶</button>
          </div>
          <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
            <button class="btn-ctrl" id="btn-log" style="flex: 1;">TOGGLE FORENSIC LOG</button>
            <button class="btn-ctrl" id="btn-reset" style="flex: 1; color: #ff8888;">REHEARSAL RESET</button>
          </div>
          <div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 0.5rem;" class="mono-font" id="pres-z-reg">
            z=[0:false:0.40:38:1:0]
          </div>
        </div>
      </div>

      <div class="footer">
        <span class="mono-font">ENTROPY: <span id="pres-entropy" class="text-accent">0%</span></span>
        <span class="mono-font text-dim">SYNC CHANNEL ACTIVE (BroadcastChannel)</span>
      </div>
    `;

    document.getElementById('btn-next').addEventListener('click', () => {
      appState.nextSlide();
    });

    document.getElementById('btn-prev').addEventListener('click', () => {
      appState.prevSlide();
    });

    // ponytail: presenter view language switcher listeners
    const langBtns = document.querySelectorAll('#pres-lang-switch .btn-lang');
    langBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = btn.getAttribute('data-lang');
        if (lang) {
          appState.setNotesLanguage(lang);
        }
      });
    });

    document.getElementById('btn-log').addEventListener('click', () => {
      const newState = !appState.showBackgroundLog;
      this.syncEngine.sendNavCmd('TOGGLE_LOG', newState);
    });

    document.getElementById('btn-reset').addEventListener('click', () => {
      if (confirm('Execute rehearsal reset?')) {
        this.syncEngine.sendNavCmd('RESET');
        appState.resetState();
      }
    });

    // Keyboard controls in presenter view
    window.addEventListener('keydown', (e) => {
      if (e.code === 'ArrowRight' || e.code === 'Space' || e.code === 'PageDown') {
        e.preventDefault();
        appState.nextSlide();
      } else if (e.code === 'ArrowLeft' || e.code === 'PageUp') {
        e.preventDefault();
        appState.prevSlide();
      }
    });

    // Stopwatch interval
    setInterval(() => {
      const elapsed = Math.floor((Date.now() - appState.startTime) / 1000);
      const hrs = String(Math.floor(elapsed / 3600)).padStart(2, '0');
      const mins = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
      const secs = String(elapsed % 60).padStart(2, '0');
      const timerEl = document.getElementById('pres-timer');
      if (timerEl) timerEl.textContent = `${hrs}:${mins}:${secs}`;
    }, 1000);
  }

  bindSync() {
    this.syncEngine.onPresenterStateUpdate = (snapshot) => this.updateView(snapshot);
    appState.subscribe((snapshot) => this.updateView(snapshot));
    this.updateView(appState.getStateSnapshot());
  }

  updateView(snapshot) {
    // Only update if snapshot actually changed state to avoid unnecessary DOM work on 1s timer ticks
    const stateKey = `${snapshot.slideIndex}_${snapshot.stepIndex}_${snapshot.notesLanguage}_${snapshot.showBackgroundLog}_${snapshot.entropy}_${snapshot.zRegister}`;
    if (this._lastStateKey === stateKey) return;
    this._lastStateKey = stateKey;

    const slide = slidesData[snapshot.slideIndex] || slidesData[0];
    const nextSlide = slidesData[snapshot.slideIndex + 1];

    const currentEl = document.getElementById('pres-current-content');
    const notesEl = document.getElementById('pres-notes-text');
    const stepBadgeEl = document.getElementById('pres-step-badge');
    const nextEl = document.getElementById('pres-next-preview');
    const slideNumEl = document.getElementById('pres-slide-num');
    const entropyEl = document.getElementById('pres-entropy');
    const regEl = document.getElementById('pres-z-reg');

    // Update active language toggle button in presenter view
    const langBtns = document.querySelectorAll('#pres-lang-switch .btn-lang');
    langBtns.forEach(btn => {
      const lang = btn.getAttribute('data-lang');
      if (lang === snapshot.notesLanguage) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const btnLog = document.getElementById('btn-log');
    if (btnLog) {
      btnLog.textContent = snapshot.showBackgroundLog ? 'LOG STREAM: ON' : 'LOG STREAM: OFF';
      btnLog.style.color = snapshot.showBackgroundLog ? 'var(--accent)' : 'var(--text-dim)';
    }

    if (this.currentSlideIdx !== snapshot.slideIndex) {
      if (currentEl) currentEl.innerHTML = slide.contentHtml;
      this.currentSlideIdx = snapshot.slideIndex;
      this.currentNotesSlideIdx = null; // force notes rebuild on slide change
    }

    if (stepBadgeEl) {
      stepBadgeEl.textContent = `[STEP ${snapshot.stepIndex + 1} OF ${snapshot.maxSteps}]`;
    }

    if (notesEl) {
      if (this.currentNotesSlideIdx !== snapshot.slideIndex || this.currentNotesLang !== snapshot.notesLanguage) {
        const allNotes = snapshot.allSlideNotes || [];
        notesEl.innerHTML = allNotes.map((noteText, idx) => {
          const numPrefix = `${idx + 1} > `;
          return `<div class="step-note step-note-item" data-idx="${idx}"><span class="step-note-num">${numPrefix}</span>${noteText}</div>`;
        }).join('');
        this.currentNotesSlideIdx = snapshot.slideIndex;
        this.currentNotesLang = snapshot.notesLanguage;
      }

      // Update active note class smoothly without destroying HTML
      const noteItems = notesEl.querySelectorAll('.step-note-item');
      noteItems.forEach((el, idx) => {
        if (idx === snapshot.stepIndex) {
          el.classList.add('active');
          el.classList.remove('inactive');
        } else {
          el.classList.remove('active');
          el.classList.add('inactive');
        }
      });

      // Auto-scroll active step paragraph
      const activeEl = notesEl.querySelector('.step-note-item.active');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    if (nextEl) {
      const nextNotes = nextSlide ? appState.getAllNotesForSlide(snapshot.slideIndex + 1, snapshot.notesLanguage) : [];
      const nextCue = nextNotes && nextNotes[0] ? nextNotes[0] : (nextSlide?.speakerNotes || '');
      nextEl.innerHTML = nextSlide ? `<strong class="text-accent" style="display: block; margin-bottom: 0.25rem;">Slide ${nextSlide.id}: ${nextSlide.title}</strong><span>${nextCue}</span>` : "End of presentation.";
    }

    if (slideNumEl) {
      slideNumEl.textContent = `SLIDE ${String(snapshot.slideIndex + 1).padStart(2, '0')} / ${snapshot.totalSlides} (STEP ${snapshot.stepIndex + 1}/${snapshot.maxSteps})`;
    }
    if (entropyEl) entropyEl.textContent = `${snapshot.entropy}%`;
    if (regEl) regEl.textContent = snapshot.zRegister;
    if (regEl) regEl.textContent = snapshot.zRegister;
  }
}
