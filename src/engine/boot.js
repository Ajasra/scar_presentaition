import { forensicLog } from './log.js';

export class BootSequence {
  constructor(onComplete) {
    this.onComplete = onComplete;
    this.lines = [
      { 
        text: "SCAR/boot — v1.0 — tracing-the-scar.bin", 
        cat: "SYS", 
        preThink: 500,
        gap: 120 
      },
      { text: "", cat: "", gap: 40 },
      { 
        text: "[OK]    memory test....................................... 8192K OK", 
        cat: "SYS", 
        preThink: 400,
        gap: 180 
      },
      { 
        text: "[OK]    initializing concept cloud........................ 471 nodes loaded", 
        cat: "SYS", 
        trigger: "rhizome", 
        gap: 200 
      },
      { 
        text: "[OK]    force-directed physics engine..................... springs engaged", 
        cat: "SYS", 
        trigger: "geometry",
        gap: 150 
      },
      { 
        text: "[WARN]  ethics module not found in ROM.................... loading from disk", 
        cat: "WARN", 
        preThink: 700,
        gap: 320 
      },
      { 
        text: "[OK]    hysteresis driver................................. temperature = 1.0", 
        cat: "SYS", 
        gap: 120 
      },
      { 
        text: "[OK]    second-order observation loop..................... recursive frame enabled", 
        cat: "SYS", 
        trigger: "selfFrame",
        gap: 160 
      },
      { 
        text: "[OK]    agential cut authorization........................ granted", 
        cat: "SYS", 
        gap: 180 
      },
      { 
        text: "[WARN]  undo subsystem.................................... DISABLED", 
        cat: "WARN", 
        gap: 280 
      },
      { 
        text: "[OK]    boot complete. the apparatus is alive.", 
        cat: "SYS", 
        gap: 140 
      },
      { 
        text: ">", 
        cat: "SYS", 
        gap: 600 
      }
    ];

    this.spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  }

  playPreThinkAnimation(pEl, logContainer, durationMs, onDone) {
    let frameIdx = 0;
    const intervalTime = 60;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= durationMs) {
        clearInterval(interval);
        pEl.textContent = '';
        onDone();
        return;
      }

      const frame = this.spinnerFrames[frameIdx % this.spinnerFrames.length];
      pEl.textContent = `${frame}`;
      pEl.className = 'log-entry sys text-accent';
      frameIdx++;
      logContainer.scrollTop = logContainer.scrollHeight;
    }, intervalTime);
  }

  start(logContainer, callbacks = {}) {
    if (!logContainer) return;

    const { onTrigger, onBootDone } = callbacks;
    let currentIdx = 0;

    const typeLine = (item, lineEl, charIdx, onLineDone) => {
      if (charIdx > item.text.length) {
        onLineDone();
        return;
      }

      lineEl.textContent = item.text.substring(0, charIdx);

      const currentChar = item.text[charIdx - 1];
      let charDelay = Math.floor(Math.random() * 4) + 2;
      if (currentChar === '.') charDelay += 8;
      else if (currentChar === ' ') charDelay += 4;

      setTimeout(() => {
        typeLine(item, lineEl, charIdx + 1, onLineDone);
      }, charDelay);

      logContainer.scrollTop = logContainer.scrollHeight;
    };

    const processNextLine = () => {
      if (currentIdx >= this.lines.length) {
        setTimeout(() => {
          if (onBootDone) onBootDone();
        }, 500);
        return;
      }

      const item = this.lines[currentIdx];
      const p = document.createElement('p');

      const isWarn = item.cat === 'WARN' || item.text.includes('[WARN]');
      p.className = `log-entry ${isWarn ? 'warn' : 'sys'}`;
      logContainer.appendChild(p);

      if (item.text === '>') {
        p.innerHTML = `&gt; <span class="boot-cursor">█</span>`;
        currentIdx++;
        setTimeout(processNextLine, item.gap);
      } else if (!item.text) {
        p.innerHTML = '&nbsp;';
        currentIdx++;
        setTimeout(processNextLine, item.gap);
      } else {
        const startTyping = () => {
          // Ensure element class is reset to final category class before typing text
          p.className = `log-entry ${isWarn ? 'warn' : 'sys'}`;
          typeLine(item, p, 0, () => {
            if (item.trigger && onTrigger) {
              onTrigger(item.trigger);
            }

            currentIdx++;
            setTimeout(processNextLine, item.gap);
          });
        };

        if (item.preThink && item.preThink > 0) {
          this.playPreThinkAnimation(p, logContainer, item.preThink, () => {
            startTyping();
          });
        } else {
          startTyping();
        }
      }
    };

    processNextLine();
  }
}
