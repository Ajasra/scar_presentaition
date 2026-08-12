import { appState } from '../engine/state.js';
import { slidesData } from '../slides/slides-data.js';
import { slide02 } from '../slides/slide-02.js';
import { slide05 } from '../slides/slide-05.js';
import { slide06 } from '../slides/slide-06.js';
import { slide07 } from '../slides/slide-07.js';
import { slide10 } from '../slides/slide-10.js';
import { slide14 } from '../slides/slide-14.js';
import { slide17 } from '../slides/slide-17.js';
import { slide18 } from '../slides/slide-18.js';
import { slide19 } from '../slides/slide-19.js';
import { slide22 } from '../slides/slide-22.js';
import { forensicLog } from '../engine/log.js';
import { BootSequence } from '../engine/boot.js';

export class MainViewController {
  constructor(canvasStack, syncEngine) {
    this.canvasStack = canvasStack;
    this.syncEngine = syncEngine;

    this.slideContainer = document.getElementById('slide-panel');
    this.statusBar = document.getElementById('status-bar');
    this.footer = document.getElementById('footer-bar');
    this.logPanel = document.getElementById('forensic-log-panel');
    this.logEntriesContainer = document.getElementById('log-entries');
    this.toastElement = document.getElementById('toast');

    this.isBooting = false;
    this.bootStarted = false;
    this.bootCompleted = false;
    this.isStateBound = false;

    if (this.canvasStack && this.canvasStack.palimpsest) {
      this.canvasStack.palimpsest.clear();
    }

    this.initKeyboard();

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('slide')) {
      this.bypassBoot();
    } else {
      this.prepareStandby();
      // ponytail: boot trigger & reset handlers from presenter
      if (this.syncEngine) {
        this.syncEngine.onBootTrigger = () => this.startBootFromStandby();
        this.syncEngine.onReset = () => {
          if (this.bootStarted && !this.bootCompleted) return; // Do nothing if boot animation is in progress
          if (this.canvasStack && this.canvasStack.palimpsest) {
            this.canvasStack.palimpsest.clear();
          }
          this.prepareStandby();
        };
      }
    }
  }

  prepareStandby() {
    this.stopStandbySpinner();
    this.bootStarted = false;
    this.bootCompleted = false;
    this.isBooting = false;

    if (this.syncEngine) {
      this.syncEngine.onBootTrigger = () => this.startBootFromStandby();
    }

    if (this.logPanel) {
      this.logPanel.classList.add('boot-mode');
    }

    const ids = ['rhizome-canvas', 'geometry-canvas', 'self-frame', 'status-bar', 'footer-bar', 'slide-container'];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.remove('boot-revealed');
        el.classList.add('boot-hidden');
      }
    });

    this.startStandbySpinner();
  }

  startStandbySpinner() {
    this.stopStandbySpinner();
    if (!this.logEntriesContainer) return;

    this.logEntriesContainer.innerHTML = `
      <div class="standby-welcome-container">
        <div class="standby-title mono-font text-accent">TRACING THE SCAR</div>
        <div class="standby-subtitle mono-font text-secondary">ASC Brazil 2026 · Track 3: Hybrid Matters · Vasily Betin</div>
        
        <div class="standby-desc mono-font text-dim">
          Interactive self-paced web presentation. Navigate through 23 slides and interactive conceptual steps alongside live speaker teleprompter notes.
        </div>

        <div class="standby-instructions mono-font">
          <div class="instruction-row"><span class="key-badge">→ / SPACE / PgDn</span> <span>Advance next step / slide</span></div>
          <div class="instruction-row"><span class="key-badge">← / PgUp</span> <span>Return to previous step / slide</span></div>
          <div class="instruction-row"><span class="key-badge">RIGHT PANEL</span> <span>Read active speaker notes &amp; controls</span></div>
        </div>

        <div class="standby-start-prompt mono-font pulse text-accent" id="standby-start-btn">
          [ CLICK OR PRESS ENTER/SPACE TO START PRESENTATION ]
        </div>

        <div class="standby-map-prompt mono-font" style="margin-top: 1.5rem;">
          <a href="?view=map" target="_blank" class="standby-map-link text-accent" style="text-decoration: none; display: inline-block;">
            [ EXPLORE CONCEPT MAP (472 NODES) ↗ ]
          </a>
          <div class="standby-map-desc mono-font text-dim" style="font-size: 0.8rem; margin-top: 0.5rem; max-width: 600px; line-height: 1.5; opacity: 0.75;">
            Interactive 2D graph network mapping 472 concept nodes, material traces, and 3,348 theoretical relations across Cybernetics, Agential Realism, Deleuzian Materialism, Ethics, and Media Archaeology.
          </div>
        </div>

      </div>

    `;

    const startBtn = document.getElementById('standby-start-btn');
    if (startBtn) {
      startBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.startBootFromStandby();
      });
    }

    const mapLink = document.querySelector('.standby-map-link');
    if (mapLink) {
      mapLink.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  }



  stopStandbySpinner() {
    if (this.standbySpinnerInterval) {
      clearInterval(this.standbySpinnerInterval);
      this.standbySpinnerInterval = null;
    }
  }

  startBootFromStandby() {
    if (this.bootStarted) return;
    if (this.syncEngine) {
      this.syncEngine.onBootTrigger = null;
    }
    this.stopStandbySpinner();
    this.bootStarted = true;
    this.isBooting = true;
    appState.resetState();
    appState.startTimer();
    this.initBootSequence();
  }

  bypassBoot() {
    appState.startTimer();
    this.isBooting = false;
    this.bootStarted = true;
    this.bootCompleted = true;
    const rhizome = document.getElementById('rhizome-canvas');
    if (rhizome) {
      rhizome.classList.remove('boot-hidden');
      rhizome.classList.add('boot-revealed');
    }
    const geometry = document.getElementById('geometry-canvas');
    if (geometry) {
      geometry.classList.remove('boot-hidden');
      geometry.classList.add('boot-revealed');
    }
    if (this.logPanel) {
      this.logPanel.classList.remove('boot-mode');
    }
    if (this.statusBar) {
      this.statusBar.classList.remove('boot-hidden');
      this.statusBar.classList.add('boot-revealed');
    }
    if (this.footer) {
      this.footer.classList.remove('boot-hidden');
      this.footer.classList.add('boot-revealed');
    }
    const slideContainer = document.getElementById('slide-container');
    if (slideContainer) {
      slideContainer.classList.remove('boot-hidden');
      slideContainer.classList.add('boot-revealed');
    }

    this.initKeyboard();
    this.bindState();
  }

  initBootSequence() {
    if (this.logPanel) {
      this.logPanel.classList.add('boot-mode');
    }
    if (this.logEntriesContainer) {
      this.logEntriesContainer.innerHTML = '';
    }

    const boot = new BootSequence();
    boot.start(this.logEntriesContainer, {
      onTrigger: (triggerName) => {
        if (triggerName === 'rhizome') {
          const rhizome = document.getElementById('rhizome-canvas');
          if (rhizome) {
            rhizome.classList.remove('boot-hidden');
            rhizome.classList.add('boot-revealed');
          }
        }
        if (triggerName === 'geometry') {
          const geometry = document.getElementById('geometry-canvas');
          if (geometry) {
            geometry.classList.remove('boot-hidden');
            geometry.classList.add('boot-revealed');
          }
        }
        if (triggerName === 'selfFrame') {
          const selfFrame = document.getElementById('self-frame');
          if (selfFrame) {
            selfFrame.classList.remove('boot-hidden');
            selfFrame.classList.add('boot-revealed');
          }
        }
      },
      onBootDone: () => {
        this.isBooting = false;
        this.bootCompleted = true;

        // Smoothly transition log panel out of boot-mode
        if (this.logPanel) {
          this.logPanel.classList.remove('boot-mode');
        }

        // Reveal geometry canvas & observer frame
        const geometry = document.getElementById('geometry-canvas');
        if (geometry) {
          geometry.classList.remove('boot-hidden');
          geometry.classList.add('boot-revealed');
        }
        const selfFrame = document.getElementById('self-frame');
        if (selfFrame) {
          selfFrame.classList.remove('boot-hidden');
          selfFrame.classList.add('boot-revealed');
        }

        // Reveal status bar, footer & slide container
        if (this.statusBar) {
          this.statusBar.classList.remove('boot-hidden');
          this.statusBar.classList.add('boot-revealed');
        }
        if (this.footer) {
          this.footer.classList.remove('boot-hidden');
          this.footer.classList.add('boot-revealed');
        }
        const slideContainer = document.getElementById('slide-container');
        if (slideContainer) {
          slideContainer.classList.remove('boot-hidden');
          slideContainer.classList.add('boot-revealed');
        }

        this.initKeyboard();
        this.bindState();
      }
    });
  }

  bindState() {
    if (this.isStateBound) return;
    this.isStateBound = true;

    this.initSidebarControls();

    appState.subscribe((snapshot) => {
      this.renderSlide(snapshot);
      this.renderSpeakerNotes(snapshot);
      this.renderStatusBar(snapshot);
      this.renderFooter(snapshot);
      this.renderLogVisibility(snapshot);
    });

    forensicLog.subscribe((entry) => {
      this.appendLogEntry(entry);
    });

    // Fire an immediate render with the current state so the view is correct
    // on first paint — regardless of whether ?slide= was used or not
    appState.notify();
  }

  initSidebarControls() {
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');

    if (btnNext) {
      btnNext.addEventListener('click', (e) => {
        e.preventDefault();
        appState.nextSlide();
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', (e) => {
        e.preventDefault();
        appState.prevSlide();
      });
    }
  }

  cleanSpeakerNoteText(rawText) {
    if (!rawText) return 'No speaker notes for this step.';
    return rawText.trim();
  }

  renderSpeakerNotes(snapshot) {
    const noteEl = document.getElementById('pres-note-current');
    const badgeEl = document.getElementById('pres-step-badge');

    if (badgeEl) {
      badgeEl.textContent = `[STEP ${snapshot.stepIndex + 1} OF ${snapshot.maxSteps}]`;
    }

    if (noteEl) {
      const cleanText = this.cleanSpeakerNoteText(snapshot.speakerNote);
      noteEl.innerHTML = `<p style="margin: 0; line-height: 1.5;">${cleanText}</p>`;
    }
  }


  renderLogVisibility(snapshot) {
    if (this.logPanel) {
      this.logPanel.style.display = snapshot.showBackgroundLog ? 'flex' : 'none';
    }
  }


  renderSlide(snapshot) {
    const slide = slidesData[snapshot.slideIndex] || slidesData[0];
    const newKey = `${snapshot.slideIndex}_${snapshot.stepIndex}`;

    // Only update innerHTML if slide or step index actually changed
    if (this.currentSlideKey !== newKey) {
      const isSameSlideStep = (this.currentSlideIndex === snapshot.slideIndex);
      const oldText = this.slideContainer.textContent;
      
      // ponytail optimization: Do not destroy DOM when navigating steps on Slide 09 to preserve floating label elements
      if (!isSameSlideStep) {
        this.slideContainer.innerHTML = slide.contentHtml;
      }
      this.slideContainer.className = `slide-panel step-${snapshot.stepIndex}${isSameSlideStep ? ' same-slide-step' : ''}`;

      // Disable bottom bar entrance animation if moving between steps on the same slide
      if (isSameSlideStep) {
        const bottomBar = this.slideContainer.querySelector('.slide-bottom-bar');
        if (bottomBar) {
          bottomBar.style.animation = 'none';
        }
      }

      // Forensic log slide transitions & custom graphic loading
      if (this.hasRenderedFirstSlide) {
        if (!isSameSlideStep) {
          forensicLog.log('SYS', `slide transition -> Slide ${snapshot.slideIndex + 1}/${snapshot.totalSlides}: "${slide.title || 'Untitled'}"`);
        } else {
          forensicLog.log('SYS', `step advance -> Slide ${snapshot.slideIndex + 1} (step ${snapshot.stepIndex + 1}/${snapshot.maxSteps})`);
        }
      } else {
        forensicLog.log('SYS', `slide initialized -> Slide ${snapshot.slideIndex + 1}/${snapshot.totalSlides}: "${slide.title || 'Untitled'}"`);
      }

      if (!isSameSlideStep || !this.hasRenderedFirstSlide) {
        this.logCustomGraphicForSlide(snapshot.slideIndex);
      }

      // Only capture palimpsest ghost on actual slide transitions after initial mount
      if (this.hasRenderedFirstSlide && !isSameSlideStep && outgoingTextIsDifferent(oldText, slide.contentHtml)) {
        this.canvasStack.onSlideChange(oldText);
      }
      this.hasRenderedFirstSlide = true;
      this.currentSlideIndex = snapshot.slideIndex;
      this.currentSlideKey = newKey;

      if (this.canvasStack && this.canvasStack.physics) {
        let activeNodesForStep = slide.activeNodes || [];
        if (typeof slide.activeNodes === 'object' && !Array.isArray(slide.activeNodes)) {
          activeNodesForStep = slide.activeNodes[snapshot.stepIndex] || slide.activeNodes[0] || [];
        }
        this.canvasStack.physics.setSlideState(snapshot.slideIndex + 1, activeNodesForStep);
      }

      if (snapshot.slideIndex === 1) {
        this.initSlide2Scroll();
      }

      if (snapshot.slideIndex === 4) {
        this.initSlide5Animations();
      }

      if (snapshot.slideIndex === 5) {
        this.renderSlide6Step(snapshot.stepIndex);
      }

      if (snapshot.slideIndex === 6) {
        this.renderSlide7Step(snapshot.stepIndex);
      }

      if (snapshot.slideIndex === 8) {
        this.renderSlide9Step(snapshot.stepIndex);
      }

      if (snapshot.slideIndex === 9) {
        this.renderSlide10Step(snapshot.stepIndex);
      }

      if (snapshot.slideIndex === 12) {
        this.renderSlide13Step(snapshot.stepIndex);
      }

      if (snapshot.slideIndex === 13) {
        this.renderSlide14Step(snapshot.stepIndex);
      }

      if (snapshot.slideIndex === 14) {
        this.renderSlide15Step(snapshot.stepIndex);
      }

      if (snapshot.slideIndex === 16) {
        this.initSlide17Typewriter();
      }

      if (snapshot.slideIndex === 17) {
        this.initSlide18Animations();
      }

      if (snapshot.slideIndex === 18) {
        this.initSlide19Animations();
      }

      if (snapshot.slideIndex === 20) {
        this.renderSlide21Step(snapshot.stepIndex);
      }

      if (snapshot.slideIndex === 21) {
        this.initSlide22Typewriter();
      }
    }
  }

  logCustomGraphicForSlide(slideIndex) {
    switch (slideIndex) {
      case 4: // Slide 5
        forensicLog.log('TRIGGER', 'custom graphic loaded: Halftone Hands (Dual-Arm Sedimentation)');
        break;
      case 5: // Slide 6
        forensicLog.log('TRIGGER', 'custom graphic loaded: FRIENDS (2019) Artwork Video Stream');
        break;
      case 8: // Slide 9
        forensicLog.log('TRIGGER', 'custom graphic loaded: 3D Tri-Geometry Manifold (Spiral / Prism / Mesh)');
        break;
      case 9: // Slide 10
        forensicLog.log('TRIGGER', 'custom graphic loaded: Autopoietic Blob Absorber');
        break;
      case 10: // Slide 11
        forensicLog.log('TRIGGER', 'custom graphic loaded: Möbius-Klein Surface & Glacial Crevasse Rupture');
        break;
      case 11: // Slide 12
        forensicLog.log('TRIGGER', 'custom graphic loaded: Möbius-Klein Surface & Glacial Crevasse (Phase II)');
        break;
      case 20: // Slide 21
        forensicLog.log('TRIGGER', 'custom graphic loaded: Umwelt Boundary Ring & Spherical Mesh');
        break;
    }
  }

  renderSlide9Step(stepIndex) {
    const notesLine1 = document.getElementById('s9-notes-line-1');
    const notesLine2 = document.getElementById('s9-notes-line-2');
    const ref = document.getElementById('s9-ref');
    const labelCybernetics = document.getElementById('s9-label-cybernetics');
    const labelBarad = document.getElementById('s9-label-barad');
    const labelDeleuze = document.getElementById('s9-label-deleuze');

    if (notesLine1 && notesLine2 && ref) {
      notesLine1.style.opacity = stepIndex >= 5 ? '1' : '0';
      notesLine2.style.opacity = stepIndex >= 5 ? '1' : '0';
      ref.style.opacity = stepIndex >= 5 ? '1' : '0';
    }

    if (!labelCybernetics || !labelBarad || !labelDeleuze) return;

    // Toggle opacity based on current step (fade-in at fixed final position)
    labelCybernetics.style.opacity = stepIndex >= 2 ? '1' : '0';
    labelBarad.style.opacity = stepIndex >= 3 ? '1' : '0';
    labelDeleuze.style.opacity = stepIndex >= 4 ? '1' : '0';
  }

  renderSlide10Step(stepIndex) {
    const impairedPara = document.getElementById('s10-impaired-para');
    const axiomEl = document.getElementById('s10-axiom');
    if (!impairedPara || !axiomEl) return;

    if (stepIndex === 0) {
      // Step 0: hide step-2 elements
      impairedPara.style.opacity = '0';
      axiomEl.style.opacity = '0';
      axiomEl.textContent = '';
      if (this.s10AxiomTimer) clearTimeout(this.s10AxiomTimer);
      if (this.s10TypewriterTimer) clearInterval(this.s10TypewriterTimer);
      return;
    }

    // Step 1: reveal impaired viability para
    impairedPara.style.opacity = '1';

    // Cancel any in-progress axiom typewriter
    if (this.s10AxiomTimer) clearTimeout(this.s10AxiomTimer);
    if (this.s10TypewriterTimer) clearInterval(this.s10TypewriterTimer);

    const axiomText = '\u25b8 A system is second-order not if it observes itself \u2014 but if it carries irreversible traces of its loops.';
    const speed = slide10?.timing?.typewriterSpeed || 28;
    const delay = slide10?.timing?.typewriterDelay || 600;
    const cursorHTML = '<span class="terminal-cursor" style="color:var(--accent);margin-left:2px;font-weight:bold;">_</span>';

    axiomEl.innerHTML = '';
    axiomEl.style.opacity = '1';

    this.s10AxiomTimer = setTimeout(() => {
      let idx = 0;
      this.s10TypewriterTimer = setInterval(() => {
        idx++;
        axiomEl.innerHTML = axiomText.slice(0, idx) + cursorHTML;
        if (idx >= axiomText.length) {
          clearInterval(this.s10TypewriterTimer);
          axiomEl.textContent = axiomText;
        }
      }, speed);
    }, delay);
  }

  renderSlide13Step(stepIndex) {
    const cards = [
      document.getElementById('s13-card-1'),
      document.getElementById('s13-card-2'),
      document.getElementById('s13-card-3'),
      document.getElementById('s13-card-4')
    ];
    const defs = [
      { el: document.getElementById('s13-def-1'), text: 'To name "scar" is to make an agential cut that cannot be retracted. The term scars itself.' },
      { el: document.getElementById('s13-def-2'), text: 'The thesis observes its own production, blind spots, asymptotic limits.' },
      { el: document.getElementById('s13-def-3'), text: 'Each pass through the circuit modifies internal state. The scar at Stage 6 is not the same as Stage 1.' },
      { el: document.getElementById('s13-def-4'), text: 'Not external critiques but structural features. A framework without limits is first-order.' }
    ];
    const bottomNote = document.getElementById('s13-bottom-note');

    if (!cards[0] || !cards[1] || !cards[2] || !cards[3] || !bottomNote) return;

    if (!this.s13TypewriterTimers) this.s13TypewriterTimers = {};
    if (this.s13DelayTimer) {
      clearTimeout(this.s13DelayTimer);
      this.s13DelayTimer = null;
    }

    const typeText = (idx) => {
      const def = defs[idx];
      if (!def.el) return;
      if (this.s13TypewriterTimers[idx]) clearInterval(this.s13TypewriterTimers[idx]);

      const fullText = def.text;
      const speed = 20; // ms per char
      let charIdx = 0;
      def.el.textContent = '';
      
      this.s13TypewriterTimers[idx] = setInterval(() => {
        charIdx++;
        def.el.textContent = fullText.slice(0, charIdx);
        if (charIdx >= fullText.length) {
          clearInterval(this.s13TypewriterTimers[idx]);
          this.s13TypewriterTimers[idx] = null;
        }
      }, speed);
    };

    cards.forEach((card, idx) => {
      const targetStep = idx + 1;
      if (stepIndex >= targetStep) {
        if (card.style.opacity !== '1') {
          card.style.opacity = '1';
          typeText(idx);
        }
      } else {
        card.style.opacity = '0';
        if (defs[idx].el) defs[idx].el.textContent = '';
        if (this.s13TypewriterTimers[idx]) {
          clearInterval(this.s13TypewriterTimers[idx]);
          this.s13TypewriterTimers[idx] = null;
        }
      }
    });

    if (stepIndex < 4) {
      bottomNote.style.opacity = '0';
    } else {
      // Step 4: Self-Limitation appears immediately, bottom note appears after 3s delay
      bottomNote.style.opacity = '0';
      this.s13DelayTimer = setTimeout(() => {
        bottomNote.style.opacity = '1';
      }, 3000);
    }
  }

  renderSlide14Step(stepIndex) {
    const thead = document.getElementById('s14-thead');
    const rows = [
      document.getElementById('s14-row-1'),
      document.getElementById('s14-row-2'),
      document.getElementById('s14-row-3'),
      document.getElementById('s14-row-4'),
      document.getElementById('s14-row-5'),
      document.getElementById('s14-row-6')
    ];
    const bottomNote = document.getElementById('s14-bottom-note');

    if (!rows[0] || !bottomNote) return;

    if (this.s14TypewriterInterval) {
      clearInterval(this.s14TypewriterInterval);
      this.s14TypewriterInterval = null;
    }

    if (thead) {
      thead.style.opacity = stepIndex >= 1 ? '1' : '0';
    }

    // Steps 1..6 reveal rows 1..6
    rows.forEach((row, idx) => {
      if (!row) return;
      const targetStep = idx + 1;
      row.style.opacity = stepIndex >= targetStep ? '1' : '0';
    });

    // Step 7: final orange typewriter aphorism in bottom bar
    const aphorismText = '\u25b8 The paper "Tracing the Scar" is a non-trivial machine run for the duration of its writing.';
    const cursorHTML = '<span class="terminal-cursor" style="color:var(--accent);margin-left:2px;font-weight:bold;">_</span>';

    if (stepIndex < 7) {
      bottomNote.style.opacity = '0';
      bottomNote.innerHTML = '';
    } else {
      if (bottomNote.style.opacity !== '1') {
        bottomNote.style.opacity = '1';
        let charIdx = 0;
        const speed = 25; // ms per char
        this.s14TypewriterInterval = setInterval(() => {
          charIdx++;
          bottomNote.innerHTML = aphorismText.slice(0, charIdx) + cursorHTML;
          if (charIdx >= aphorismText.length) {
            clearInterval(this.s14TypewriterInterval);
            bottomNote.textContent = aphorismText;
            this.s14TypewriterInterval = null;
          }
        }, speed);
      }
    }
  }

  renderSlide15Step(stepIndex) {
    const rows = [
      document.getElementById('s15-row-1'),
      document.getElementById('s15-row-2'),
      document.getElementById('s15-row-3'),
      document.getElementById('s15-row-4'),
      document.getElementById('s15-row-5'),
      document.getElementById('s15-row-6')
    ];
    const terms = [
      document.getElementById('s15-term-1'),
      document.getElementById('s15-term-2'),
      document.getElementById('s15-term-3'),
      document.getElementById('s15-term-4'),
      document.getElementById('s15-term-5'),
      document.getElementById('s15-term-6')
    ];
    const defs = [
      { el: document.getElementById('s15-def-1'), text: 'Lacks violence — surface registration without structural rupture.' },
      { el: document.getElementById('s15-def-2'), text: 'Lacks permanence — can fade, overwrite, or dissipate.' },
      { el: document.getElementById('s15-def-3'), text: 'Passive accumulation — lacks the active cut and collision event.' },
      { el: document.getElementById('s15-def-4'), text: 'No ethical demand — continuous deformation without non-consensual cost.' },
      { el: document.getElementById('s15-def-5'), text: 'Instantaneous — moment of rupture without historical persistence.' },
      { el: document.getElementById('s15-def-6'), text: 'Violent. Permanent. Enacts. To name the scar is to scar the scar — the name is the first agential cut.' }
    ];
    const bottomNote = document.getElementById('s15-bottom-note');

    if (!rows[0] || !bottomNote) return;

    if (!this.s15TypewriterTimers) this.s15TypewriterTimers = {};

    const typeText = (idx, onComplete) => {
      const def = defs[idx];
      if (!def.el) return;
      if (this.s15TypewriterTimers[idx]) clearInterval(this.s15TypewriterTimers[idx]);

      const fullText = def.text;
      const speed = 18; // ms per char
      let charIdx = 0;
      def.el.textContent = '';

      this.s15TypewriterTimers[idx] = setInterval(() => {
        charIdx++;
        def.el.textContent = fullText.slice(0, charIdx);
        if (charIdx >= fullText.length) {
          clearInterval(this.s15TypewriterTimers[idx]);
          this.s15TypewriterTimers[idx] = null;
          if (onComplete) onComplete();
        }
      }, speed);
    };

    rows.forEach((row, idx) => {
      const targetStep = idx + 1;
      const term = terms[idx];
      const def = defs[idx];

      if (stepIndex < targetStep) {
        if (row) row.style.opacity = '0';
        if (term) term.style.opacity = '0';
        if (def.el) def.el.textContent = '';
        if (this.s15TypewriterTimers[idx]) {
          clearInterval(this.s15TypewriterTimers[idx]);
          this.s15TypewriterTimers[idx] = null;
        }
      } else if (stepIndex === targetStep) {
        if (row) row.style.opacity = '1';
        if (term) term.style.opacity = '1';

        if (def.el && !def.el.textContent && !this.s15TypewriterTimers[idx]) {
          typeText(idx, () => {
            if (idx < 5 && row) row.style.opacity = '0.65';
          });
        }
      } else {
        if (row) row.style.opacity = idx === 5 ? '1' : '0.65';
        if (term) term.style.opacity = '1';
        if (def.el) def.el.textContent = def.text;
      }
    });

    const aphorismText = '\u25b8 That violence is the ethical demand.';
    const cursorHTML = '<span class="terminal-cursor" style="color:var(--accent);margin-left:2px;font-weight:bold;">_</span>';

    if (stepIndex < 6) {
      bottomNote.style.opacity = '0';
      bottomNote.innerHTML = '';
      if (this.s15BottomInterval) {
        clearInterval(this.s15BottomInterval);
        this.s15BottomInterval = null;
      }
    } else {
      if (bottomNote.style.opacity !== '1') {
        bottomNote.style.opacity = '1';
        let charIdx = 0;
        const speed = 25;
        this.s15BottomInterval = setInterval(() => {
          charIdx++;
          bottomNote.innerHTML = aphorismText.slice(0, charIdx) + cursorHTML;
          if (charIdx >= aphorismText.length) {
            clearInterval(this.s15BottomInterval);
            bottomNote.textContent = aphorismText;
            this.s15BottomInterval = null;
          }
        }, speed);
      }
    }
  }

  initSlide17Typewriter() {
    const el = document.getElementById('s17-bill-typewriter');
    if (!el) return;

    if (this.s17TypewriterInterval) {
      clearInterval(this.s17TypewriterInterval);
      this.s17TypewriterInterval = null;
    }

    const text = 'Hybrid Matters has a material bill.';
    const cursorHTML = '<span class="terminal-cursor" style="color:var(--accent);margin-left:2px;font-weight:bold;">_</span>';
    const speed = slide17?.timing?.typewriterSpeed || 30;

    el.innerHTML = '';
    let charIdx = 0;
    this.s17TypewriterInterval = setInterval(() => {
      charIdx++;
      el.innerHTML = text.slice(0, charIdx) + cursorHTML;
      if (charIdx >= text.length) {
        clearInterval(this.s17TypewriterInterval);
        el.textContent = text;
        this.s17TypewriterInterval = null;
      }
    }, speed);
  }

  initSlide18Animations() {
    const leftEls = [
      document.getElementById('s18-col-left-head'),
      document.getElementById('s18-col-left-r1'),
      document.getElementById('s18-col-left-r2'),
      document.getElementById('s18-col-left-r3')
    ];
    const rightEls = [
      document.getElementById('s18-col-right-head'),
      document.getElementById('s18-col-right-r1'),
      document.getElementById('s18-col-right-r2'),
      document.getElementById('s18-col-right-r3')
    ];
    const sub1 = document.getElementById('s18-sub-1');
    const sub2 = document.getElementById('s18-sub-2');
    const sub3 = document.getElementById('s18-sub-3');

    if (!leftEls[0] || !rightEls[0]) return;

    if (this.s18Timers) {
      this.s18Timers.forEach(t => clearTimeout(t));
    }
    this.s18Timers = [];

    const subTexts = [
      'The soil compacted by agriculture does not write poetry.',
      'The server farm cooled by freshwater does not philosophize its heat.',
      'The slime mold reorganized by voltage does not aestheticize its stress.'
    ];
    const subEls = [sub1, sub2, sub3];

    // Reset initial states
    leftEls.forEach(el => { if (el) el.style.opacity = '0'; });
    rightEls.forEach(el => { if (el) el.style.opacity = '0'; });
    subEls.forEach(el => { if (el) el.textContent = ''; });

    // Calculate dynamic keyframe timestamps from slide18.timing parameters
    const timing = slide18?.timing || {};
    const initialDelay = timing.initialDelay ?? 2000;
    const outwardDelay = timing.outwardDelay ?? 3500;
    const sub1Delay = timing.sub1Delay ?? 2000;
    const sub2Delay = timing.sub2Delay ?? 2400;
    const sub3Delay = timing.sub3Delay ?? 2600;
    const speed = timing.typewriterSpeed ?? 20;

    const tInward = initialDelay;
    const tOutward = tInward + outwardDelay;
    const tSub1 = tOutward + sub1Delay;
    const tSub2 = tSub1 + sub2Delay;
    const tSub3 = tSub2 + sub3Delay;

    const typeSubLine = (idx) => {
      const el = subEls[idx];
      const text = subTexts[idx];
      if (!el) return;

      const cursorHTML = '<span class="terminal-cursor" style="color:var(--accent);margin-left:2px;font-weight:bold;">_</span>';
      let charIdx = 0;
      el.innerHTML = '';

      const interval = setInterval(() => {
        charIdx++;
        el.innerHTML = text.slice(0, charIdx) + cursorHTML;
        if (charIdx >= text.length) {
          clearInterval(interval);
          el.textContent = text;
        }
      }, speed);
    };

    // 1. Left column (inward, dim grey)
    this.s18Timers.push(setTimeout(() => {
      leftEls.forEach(el => { if (el) el.style.opacity = '1'; });
    }, tInward));

    // 2. Right column (outward, bright orange)
    this.s18Timers.push(setTimeout(() => {
      rightEls.forEach(el => { if (el) el.style.opacity = '1'; });
    }, tOutward));

    // 3. Substrate lines typewriter animation
    this.s18Timers.push(setTimeout(() => typeSubLine(0), tSub1));
    this.s18Timers.push(setTimeout(() => typeSubLine(1), tSub2));
    this.s18Timers.push(setTimeout(() => typeSubLine(2), tSub3));
  }

  initSlide19Animations() {
    const kernel = document.getElementById('s19-kernel');
    const cardKintsugi = document.getElementById('s19-card-kintsugi');
    const cardUglyScar = document.getElementById('s19-card-uglyscar');
    const bottomNote = document.getElementById('s19-bottom-note');

    if (!kernel || !bottomNote) return;

    if (this.s19Timers) {
      this.s19Timers.forEach(t => clearTimeout(t));
      if (this.s19TypewriterInterval) clearInterval(this.s19TypewriterInterval);
    }
    this.s19Timers = [];

    kernel.style.opacity = '0';
    if (cardKintsugi) cardKintsugi.style.opacity = '0';
    if (cardUglyScar) cardUglyScar.style.opacity = '0';
    bottomNote.style.opacity = '0';
    bottomNote.innerHTML = '';

    const timing = slide19?.timing || {};
    const initialDelay = timing.initialDelay ?? 1500;
    const antiKintsugiDelay = timing.antiKintsugiDelay ?? 2200;
    const uglyScarDelay = timing.uglyScarDelay ?? 2500;
    const aphorismDelay = timing.aphorismDelay ?? 3200;
    const speed = timing.typewriterSpeed ?? 25;

    // 1. Confucian kernel appears in full white
    this.s19Timers.push(setTimeout(() => {
      kernel.style.opacity = '1';
    }, initialDelay));

    // 2. Anti-Kintsugi card appears
    this.s19Timers.push(setTimeout(() => {
      if (cardKintsugi) cardKintsugi.style.opacity = '1';
    }, antiKintsugiDelay));

    // 3. Ugly Scar card appears
    this.s19Timers.push(setTimeout(() => {
      if (cardUglyScar) cardUglyScar.style.opacity = '1';
    }, uglyScarDelay));

    // 4. Final orange aphorism types out
    const aphorismText = '\u25b8 Respond to damage without demanding that the wound justify itself.';
    const cursorHTML = '<span class="terminal-cursor" style="color:var(--accent);margin-left:2px;font-weight:bold;">_</span>';

    this.s19Timers.push(setTimeout(() => {
      bottomNote.style.opacity = '1';
      let charIdx = 0;
      this.s19TypewriterInterval = setInterval(() => {
        charIdx++;
        bottomNote.innerHTML = aphorismText.slice(0, charIdx) + cursorHTML;
        if (charIdx >= aphorismText.length) {
          clearInterval(this.s19TypewriterInterval);
          bottomNote.textContent = aphorismText;
          this.s19TypewriterInterval = null;
        }
      }, speed);
    }, aphorismDelay));
  }

  renderSlide21Step(stepIndex) {
    const el = document.getElementById('s21-diagnostic');
    if (!el) return;
    el.style.opacity = stepIndex >= 1 ? '1' : '0';
  }

  initSlide22Typewriter() {
    const el = document.getElementById('s22-epic-typewriter');
    if (!el) return;

    if (this.s22Timers) {
      this.s22Timers.forEach(t => clearTimeout(t));
      if (this.s22TypewriterInterval) clearInterval(this.s22TypewriterInterval);
    }
    this.s22Timers = [];

    const text = 'It cannot be reset.';
    const cursorHTML = '<span class="terminal-cursor" style="color:var(--accent);margin-left:4px;font-weight:bold;">_</span>';
    const initialDelay = slide22?.timing?.initialDelay ?? 2000;
    const speed = slide22?.timing?.typewriterSpeed ?? 200;

    el.innerHTML = '';

    this.s22Timers.push(setTimeout(() => {
      let charIdx = 0;
      this.s22TypewriterInterval = setInterval(() => {
        charIdx++;
        el.innerHTML = text.slice(0, charIdx) + cursorHTML;
        if (charIdx >= text.length) {
          clearInterval(this.s22TypewriterInterval);
          el.textContent = text;
          this.s22TypewriterInterval = null;
        }
      }, speed);
    }, initialDelay));
  }

  initSlide2Scroll() {
    const el = document.querySelector('.abstract-scroll-content');
    if (!el) return;

    const timing = slide02?.timing || {};
    const durationSec = (timing.scrollDuration || 45000) / 1000;

    // ponytail: reset animation to 0s so it begins from the top every time Slide 2 is viewed
    el.style.animation = 'none';
    void el.offsetHeight;
    el.style.animation = `scroll-abstract ${durationSec}s linear infinite`;
  }

  renderSlide6Step(stepIndex) {
    const step1El = document.querySelector('.step-1-content');
    const step2El = document.querySelector('.step-2-content');
    const para2El = document.getElementById('s6-para-2');
    const videoEl = document.getElementById('friends-video-player');
    const placeholderEl = document.getElementById('friends-video-placeholder');

    if (!step1El || !step2El) return;

    if (stepIndex === 0) {
      step1El.style.display = 'block';
      step2El.style.display = 'none';
      if (para2El) para2El.style.opacity = '0';
      if (videoEl) {
        videoEl.pause();
        videoEl.currentTime = 0;
      }
    } else if (stepIndex === 1) {
      step1El.style.display = 'block';
      step2El.style.display = 'none';
      if (para2El) para2El.style.opacity = '1';
      if (videoEl) {
        videoEl.pause();
        videoEl.currentTime = 0;
      }
    } else if (stepIndex >= 2) {
      step1El.style.display = 'none';
      step2El.style.display = 'block';

      this.triggerFriendsTypewriter();

      if (videoEl) {
        videoEl.muted = true;
        const playPromise = videoEl.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    }
  }

  triggerFriendsTypewriter() {
    // ponytail: read timing configuration directly from slide06 module
    const timing = slide06?.timing || {};
    const speed = timing.typewriterLineSpeed || 40;
    const pause = timing.linePause || 350;

    const lines = [
      { id: 'friends-line-1', text: 'FRIENDS (2019): Twenty identical Arduino machines.' },
      { id: 'friends-line-2', text: 'One pre-individual field.' },
      { id: 'friends-line-3', text: 'Twenty scarred individuals.' },
      { id: 'friends-line-4', text: 'No two ever converged.' }
    ];

    const cursorHTML = `<span class="terminal-cursor" style="color: var(--accent); margin-left: 2px; font-weight: bold;">_</span>`;

    lines.forEach(l => {
      const el = document.getElementById(l.id);
      if (el) el.innerHTML = '';
    });

    let currentLine = 0;

    const typeNextLine = () => {
      if (currentLine >= lines.length) return;
      const target = lines[currentLine];
      const el = document.getElementById(target.id);
      if (!el) return;

      let idx = 0;
      const timer = setInterval(() => {
        idx++;
        el.innerHTML = target.text.slice(0, idx) + cursorHTML;
        if (idx >= target.text.length) {
          clearInterval(timer);
          el.innerHTML = target.text; // Remove cursor
          currentLine++;
          setTimeout(typeNextLine, pause); // Configurable pause between lines
        }
      }, speed);
    };

    typeNextLine();
  }

  renderSlide7Step(stepIndex) {
    // ponytail: slide 07 step-controlled element appearance matching speaker notes
    const step1El = document.querySelector('.step-1-content');
    const step2El = document.querySelector('.step-2-content');

    if (!step1El || !step2El) return;

    if (stepIndex >= 5) {
      step1El.style.display = 'none';
      step2El.style.display = 'block';
      if (this.s7LineAnimFrame) cancelAnimationFrame(this.s7LineAnimFrame);

      // Preserve reg1 note so it does not disappear
      const defs = (slide07 && slide07.timing && slide07.timing.scarDefinitions) || [
        '▸ The real is that which scars; no state exists unscarred.'
      ];
      const container = document.getElementById('s7-bottom-registers');
      if (container && container.children.length === 0) {
        const p1 = document.createElement('p');
        p1.style.margin = '0';
        p1.style.color = 'var(--accent)';
        p1.style.fontWeight = 'bold';
        p1.style.minHeight = '1.4rem';
        p1.innerHTML = defs[0];
        container.appendChild(p1);
      }

      // Step 5: Dark Fringes table, Step 6: full dark fringes bottom register notes
      if (stepIndex >= 6) {
        this.triggerSlide7Step2Typewriter();
      }
    } else {
      step1El.style.display = 'block';
      step2El.style.display = 'none';

      if (this.s7TypewriterTimer) clearInterval(this.s7TypewriterTimer);
      if (this.s7QueueTimer) clearTimeout(this.s7QueueTimer);

      const defs = (slide07 && slide07.timing && slide07.timing.scarDefinitions) || [
        '▸ The real is that which scars; no state exists unscarred.'
      ];

      const container = document.getElementById('s7-bottom-registers');
      if (container) {
        container.innerHTML = '';
        const p1 = document.createElement('p');
        p1.style.margin = '0';
        p1.style.color = 'var(--accent)';
        p1.style.fontWeight = 'bold';
        p1.style.minHeight = '1.4rem';
        p1.innerHTML = defs[0];
        container.appendChild(p1);
      }

      this.initSlide7DynamicLines(stepIndex);
    }
  }

  initSlide7DynamicLines(stepIndex = 0) {
    if (this.s7LineAnimFrame) cancelAnimationFrame(this.s7LineAnimFrame);

    const container = document.getElementById('s7-diagram-box');
    const canvas = document.getElementById('s7-lines-canvas');
    const scarNode = document.getElementById('s7-scar-node');
    const scarDot = document.getElementById('s7-scar-dot') || scarNode;
    if (!container || !canvas || !scarNode) return;

    const ctx = canvas.getContext('2d');
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const cards = [
      { id: 's7-node-1', color: '#ff5722', side: 'left', minStep: 1 },
      { id: 's7-node-2', color: '#ffffff', side: 'right', minStep: 2 },
      { id: 's7-node-3', color: '#ff5722', side: 'left', minStep: 3 },
      { id: 's7-node-4', color: '#94a3b8', side: 'right', minStep: 4 }
    ];

    // Reveal SCAR node at Step 0+
    scarNode.style.opacity = stepIndex >= 0 ? '1' : '0';

    // Reveal framework nodes synchronously based on step index (0-based)
    cards.forEach(c => {
      const el = document.getElementById(c.id);
      if (el) el.style.opacity = stepIndex >= c.minStep ? '1' : '0';
    });

    let dashOffset = 0;

    const draw = () => {
      if (!document.getElementById('s7-lines-canvas')) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Target SCAR dot center coordinates
      const containerRect = container.getBoundingClientRect();
      const scarRect = scarDot.getBoundingClientRect();
      const scarX = (scarRect.left + scarRect.width / 2) - containerRect.left;
      const scarY = (scarRect.top + scarRect.height / 2) - containerRect.top;

      dashOffset -= 0.4;

      cards.forEach(c => {
        const cardEl = document.getElementById(c.id);
        if (!cardEl) return;
        const opacity = parseFloat(window.getComputedStyle(cardEl).opacity || '0');
        if (opacity <= 0.05) return; // Only draw vector line once card starts revealing

        const rect = cardEl.getBoundingClientRect();

        // Card dot anchor point (inner edge dot)
        const cardX = c.side === 'left' 
          ? (rect.right - containerRect.left - 4)
          : (rect.left - containerRect.left + 4);
        const cardY = (rect.top - containerRect.top + 9);

        // Draw single dotted connecting vector line cleanly connecting the dots
        ctx.beginPath();
        ctx.setLineDash([6, 5]);
        ctx.lineDashOffset = dashOffset;
        ctx.moveTo(cardX, cardY);
        ctx.lineTo(scarX, scarY);
        ctx.strokeStyle = c.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = opacity * 0.85;
        ctx.stroke();
      });

      this.s7LineAnimFrame = requestAnimationFrame(draw);
    };

    draw();
  }

  initSlide7CollisionCanvas() {
    if (this.s7CollisionAnimFrame) cancelAnimationFrame(this.s7CollisionAnimFrame);

    const box = document.getElementById('s7-collision-box');
    const canvas = document.getElementById('s7-collision-canvas');
    if (!box || !canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = box.clientWidth;
    canvas.height = box.clientHeight;

    // Colliding pairs
    const pairs = [
      { name1: 'Autopoiesis', name2: 'Barad', color1: '#ff5722', color2: '#ffffff', y: 35 },
      { name1: 'Deleuze', name2: 'Barad', color1: '#94a3b8', color2: '#ff5722', y: 85 }
    ];

    let progress = 0;

    const animateCollision = () => {
      if (!document.getElementById('s7-collision-canvas')) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      progress = (progress + 0.008) % 1;

      // Easing calculation for smooth collision
      const dist = (1 - Math.abs(Math.sin(progress * Math.PI))) * (canvas.width * 0.35);
      const centerX = canvas.width / 2;

      pairs.forEach(p => {
        const x1 = centerX - 60 - dist;
        const x2 = centerX + 60 + dist;

        // Draw left framework node
        ctx.fillStyle = p.color1;
        ctx.font = 'bold 13px var(--font-mono)';
        ctx.textAlign = 'right';
        ctx.fillText(p.name1, x1, p.y + 4);
        ctx.beginPath();
        ctx.arc(x1 + 10, p.y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw right framework node
        ctx.fillStyle = p.color2;
        ctx.textAlign = 'left';
        ctx.fillText(p.name2, x2, p.y + 4);
        ctx.beginPath();
        ctx.arc(x2 - 10, p.y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw connecting collision beam
        ctx.beginPath();
        ctx.moveTo(x1 + 14, p.y);
        ctx.lineTo(x2 - 14, p.y);
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = 'rgba(255, 87, 34, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Spark pulse when nodes collide in center
        if (dist < 20) {
          ctx.beginPath();
          ctx.arc(centerX, p.y, (20 - dist) * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 87, 34, 0.6)';
          ctx.fill();
        }
      });

      this.s7CollisionAnimFrame = requestAnimationFrame(animateCollision);
    };

    animateCollision();
  }

  triggerSlide7Step2Typewriter() {
    const defs = (slide07 && slide07.timing && slide07.timing.scarDefinitions) || [
      "▸ The real is that which scars; no state exists unscarred.",
      "▸ If it doesn't leave the scar, it is noise.",
      "▸ The world is a palimpsest of prior cuts; no state exists unscarred.",
      "▸ The scar is the material remainder of an irreversible agential cut.",
      "▸ Memory is Konsistenzprüfung — a consistency check preventing erasure.",
      "▸ The scar is an active operator, permanently reorganizing future response."
    ];

    const container = document.getElementById('s7-bottom-registers');
    if (!container) return;

    if (this.s7TypewriterTimer) clearInterval(this.s7TypewriterTimer);
    if (this.s7QueueTimer) clearTimeout(this.s7QueueTimer);

    const cursorHTML = `<span class="terminal-cursor" style="color: var(--accent); margin-left: 2px; font-weight: bold;">_</span>`;
    const speed = 35;
    const pause = 2200; // Pause between definition entries

    let defIndex = 0;

    // Helper to start typewriter loop
    const processNextDefinition = () => {
      if (!document.getElementById('s7-bottom-registers')) return;

      const currentText = defs[defIndex % defs.length];
      defIndex++;

      // Create new paragraph for typing
      const newP = document.createElement('p');
      newP.style.margin = '0';
      newP.style.color = 'var(--accent)';
      newP.style.fontWeight = 'bold';
      newP.style.minHeight = '1.4rem';
      newP.style.transition = 'all 0.5s ease';
      container.appendChild(newP);

      // If more than 3 elements exist, remove top one with smooth fade/shift
      if (container.children.length > 3) {
        const first = container.children[0];
        first.style.opacity = '0';
        first.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          if (first.parentNode === container) container.removeChild(first);
        }, 500);
      }

      // Typewriter animation into newP
      let charIdx = 0;
      this.s7TypewriterTimer = setInterval(() => {
        charIdx++;
        newP.innerHTML = currentText.slice(0, charIdx) + cursorHTML;
        if (charIdx >= currentText.length) {
          clearInterval(this.s7TypewriterTimer);
          newP.innerHTML = currentText;

          // Schedule next definition in loop
          this.s7QueueTimer = setTimeout(processNextDefinition, pause);
        }
      }, speed);
    };

    // Initialize container cleanly with item 0
    container.innerHTML = '';
    const p1 = document.createElement('p');
    p1.style.margin = '0';
    p1.style.color = 'var(--accent)';
    p1.style.fontWeight = 'bold';
    p1.style.minHeight = '1.4rem';
    p1.innerHTML = defs[0];
    container.appendChild(p1);

    defIndex = 1;
    this.s7QueueTimer = setTimeout(processNextDefinition, 1200);
  }

  initSlide5Animations() {
    // ponytail: read timing configuration directly from slide05 module
    const timing = slide05?.timing || {};

    const typeLine1Delay = timing.typeLine1Delay || 6700;
    const typeLine1Speed = timing.typeLine1Speed || 50;
    const line1Pause = timing.line1Pause || 1800;
    const typeLine2Speed = timing.typeLine2Speed || 45;
    const line2Pause = timing.line2Pause || 1000;
    const scrambleDelay = timing.scrambleDelay || 18300;
    const scrambleSpeed = timing.scrambleSpeed || 35;
    const scrambleFrames = timing.scrambleFrames || 30;

    const line1El = document.getElementById('type-line-1');
    const line2El = document.getElementById('type-line-2');
    if (!line1El || !line2El) return;

    const text1 = "Who is accumulating?";
    const text2 = "The Cartesian story says...";
    const cursorHTML = `<span class="terminal-cursor" style="color: var(--accent); margin-left: 2px; font-weight: bold;">_</span>`;

    line1El.innerHTML = '';
    line2El.innerHTML = '';

    // Step 1: Type Line 1 after hands stop
    setTimeout(() => {
      let idx = 0;
      const type1Timer = setInterval(() => {
        idx++;
        line1El.innerHTML = text1.slice(0, idx) + cursorHTML;
        if (idx >= text1.length) {
          clearInterval(type1Timer);
          // Wait cursor blinking before starting Line 2
          setTimeout(() => {
            // Step 2: Nudge Line 1 up & start typing Line 2
            line1El.innerHTML = text1; // Remove cursor from line 1
            line1El.style.transition = 'transform 0.5s ease-out';
            line1El.style.transform = 'translateY(-4px)';

            let idx2 = 0;
            const type2Timer = setInterval(() => {
              idx2++;
              line2El.innerHTML = text2.slice(0, idx2) + cursorHTML;
              if (idx2 >= text2.length) {
                clearInterval(type2Timer);
                // Leave cursor blinking on line 2 until block appears
                setTimeout(() => {
                  line2El.innerHTML = text2;
                }, line2Pause);
              }
            }, typeLine2Speed);
          }, line1Pause);
        }
      }, typeLine1Speed);
    }, typeLine1Delay);

    // Letter Shuffle for INTERACTION -> INTRA-ACTION
    setTimeout(() => {
      const targetEl = document.getElementById('shuffle-word');
      if (!targetEl) return;

      const targetText = 'INTRA-ACTION';
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ-#$&*';
      let frame = 0;

      const interval = setInterval(() => {
        frame++;
        const progress = frame / scrambleFrames;
        const revealedChars = Math.floor(progress * targetText.length);

        let currentStr = '';
        for (let i = 0; i < targetText.length; i++) {
          if (i < revealedChars) {
            currentStr += targetText[i];
          } else {
            currentStr += chars[Math.floor(Math.random() * chars.length)];
          }
        }

        targetEl.textContent = currentStr;

        if (frame >= scrambleFrames) {
          clearInterval(interval);
          targetEl.textContent = targetText;
        }
      }, scrambleSpeed);
    }, scrambleDelay);
  }

  renderStatusBar(snapshot) {
    const dot = document.getElementById('status-dot');
    const actBreadcrumb = document.getElementById('status-breadcrumb');
    const actCenter = document.getElementById('status-act');
    const regDisplay = document.getElementById('status-register');
    const clockDisplay = document.getElementById('status-clock');

    if (dot) {
      if (snapshot.isFrozen) {
        dot.className = 'status-dot frozen';
      } else if (snapshot.act === 3) {
        dot.className = 'status-dot pulse ethics-glow';
      } else {
        dot.className = 'status-dot pulse';
      }
    }

    const slide = slidesData[snapshot.slideIndex] || slidesData[0];
    const actRoman = ['ACT 0', 'ACT I', 'ACT II', 'ACT III', 'ACT IV'][snapshot.act] || 'ACT 0';

    let displayTitle = slide.title || '';
    // Strip duplicate "ACT X · " or "ACT X" prefix if present
    displayTitle = displayTitle.replace(/^ACT\s+[0-IV]+\s*(·\s*)?/i, '').trim();
    if (!displayTitle) displayTitle = slide.title;

    if (actCenter) {
      actCenter.textContent = `[${actRoman} > ${displayTitle}]`;
    }

    if (actBreadcrumb) {
      const actTag = ['0', 'i', 'ii', 'iii', 'iv'][snapshot.act] || '0';
      actBreadcrumb.textContent = `SCAR://act-${actTag}/slide-${String(snapshot.slideIndex + 1).padStart(2, '0')}`;
    }

    if (regDisplay) {
      regDisplay.textContent = snapshot.zRegister;
    }

    if (clockDisplay) {
      const elapsed = snapshot.elapsedSeconds;
      const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const secs = String(elapsed % 60).padStart(2, '0');
      clockDisplay.textContent = `⏴ 00:${mins}:${secs}`;
    }
  }

  renderFooter(snapshot) {
    const fill = document.getElementById('progress-fill');
    const entropyVal = document.getElementById('entropy-val');
    const slideCounter = document.getElementById('slide-counter');

    if (fill) {
      const pct = Math.floor(((snapshot.slideIndex + 1) / snapshot.totalSlides) * 100);
      fill.style.width = `${pct}%`;
    }
    if (entropyVal) {
      entropyVal.textContent = `${snapshot.entropy}%`;
    }
    if (slideCounter) {
      slideCounter.textContent = `${String(snapshot.slideIndex + 1).padStart(2, '0')} / ${snapshot.totalSlides}`;
    }

    this.updateCircuitTraces(snapshot.slideIndex);
  }

  updateCircuitTraces(slideIndex) {
    // Break Schedule:
    // Slide >= 10: Segment 3 breaks
    // Slide >= 15: Segment 5 breaks
    // Slide >= 19: Segment 1 breaks
    // Slide >= 21: Segments 2 & 4 break
    const brokenSegments = [];
    if (slideIndex >= 10) brokenSegments.push(3);
    if (slideIndex >= 15) brokenSegments.push(5);
    if (slideIndex >= 19) brokenSegments.push(1);
    if (slideIndex >= 21) brokenSegments.push(2, 4);

    const traceSegs = document.querySelectorAll('.trace-segment');
    traceSegs.forEach(seg => {
      const segId = parseInt(seg.getAttribute('data-seg'), 10);
      const isBroken = brokenSegments.includes(segId);

      if (isBroken && !seg.classList.contains('broken')) {
        seg.classList.add('sparking');
        setTimeout(() => {
          seg.classList.remove('sparking');
          seg.classList.add('broken');
        }, 300);
        forensicLog.log('SYS', `circuit trace #${segId} shorted & broken`);
      } else if (!isBroken && seg.classList.contains('broken')) {
        seg.classList.remove('broken');
      }
    });
  }

  initKeyboard() {
    if (this.keyboardInitialized) return;
    this.keyboardInitialized = true;

    window.addEventListener('keydown', (e) => {
      // Rehearsal reset key combo: Ctrl+Shift+R
      if (e.ctrlKey && e.shiftKey && e.code === 'KeyR') {
        e.preventDefault();
        if (this.bootStarted && !this.bootCompleted) return; // Do nothing if boot animation is in progress
        if (this.canvasStack && this.canvasStack.palimpsest) {
          this.canvasStack.palimpsest.clear();
        }
        if (this.syncEngine) {
          this.syncEngine.sendNavCmd('RESET');
        }
        appState.resetState();
        this.prepareStandby();
        forensicLog.log('SYS', 'rehearsal reset executed — standby engaged');
        this.showToast('REHEARSAL RESET EXECUTED');
        return;
      }

      // ponytail: if in standby, trigger boot ONLY on explicit Enter, Space, or ArrowRight keypress
      if (!this.bootStarted && !this.bootCompleted) {
        if (e.code === 'Enter' || e.code === 'Space' || e.code === 'ArrowRight' || e.code === 'PageDown') {
          e.preventDefault();
          this.startBootFromStandby();
        }
        return;
      }

      if (this.bootCompleted) {
        if (e.code === 'ArrowRight' || e.code === 'Space' || e.code === 'PageDown') {
          e.preventDefault();
          if (this.syncEngine) {
            this.syncEngine.sendNavCmd('NEXT');
          } else {
            appState.nextSlide();
          }
        } else if (e.code === 'ArrowLeft' || e.code === 'PageUp') {
          e.preventDefault();
          if (this.syncEngine) {
            this.syncEngine.sendNavCmd('PREV');
          } else {
            appState.prevSlide();
          }
        }
      }
    });
  }


  triggerNoUndoError() {
    this.slideContainer.classList.add('flash-error');
    setTimeout(() => this.slideContainer.classList.remove('flash-error'), 300);

    this.showToast('ERR: UNDO NOT AVAILABLE — STATE IS IRREVERSIBLE');
    forensicLog.log('WARN', 'attempted undo — denied');
  }

  showToast(msg) {
    if (!this.toastElement) return;
    this.toastElement.textContent = msg;
    this.toastElement.classList.add('show');
    setTimeout(() => this.toastElement.classList.remove('show'), 2500);
  }

  toggleLogPanel() {
    if (this.logPanel) {
      this.logPanel.classList.toggle('open');
    }
  }

  initLogPanel() {
    const entries = forensicLog.getEntries();
    entries.forEach(e => this.appendLogEntry(e));
  }

  appendLogEntry(entry) {
    if (!this.logEntriesContainer) return;
    const p = document.createElement('p');
    p.className = `log-entry ${entry.category.toLowerCase()}`;
    this.logEntriesContainer.appendChild(p);

    const fullText = `[${entry.timestamp}] ${entry.category}: ${entry.message}`;

    if (this.isBooting) {
      p.textContent = fullText;
      this.logEntriesContainer.scrollTop = this.logEntriesContainer.scrollHeight;
      return;
    }

    // Fast typing animation for live presentation log entries
    let charIdx = 0;
    const typeChar = () => {
      if (charIdx > fullText.length) {
        return;
      }
      p.textContent = fullText.substring(0, charIdx);
      this.logEntriesContainer.scrollTop = this.logEntriesContainer.scrollHeight;
      charIdx++;

      const currentChar = fullText[charIdx - 1];
      let delay = Math.floor(Math.random() * 4) + 2;
      if (currentChar === ':') delay += 10;
      else if (currentChar === ' ') delay += 4;

      setTimeout(typeChar, delay);
    };

    typeChar();
  }
}

function outgoingTextIsDifferent(oldTxt, newHtml) {
  return oldTxt && oldTxt.trim().length > 10;
}
