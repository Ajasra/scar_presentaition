import { speakerNotesData } from '../slides/speaker-notes.js';

export class PresentationState {
  constructor(totalSlides = 23) {
    this.totalSlides = totalSlides;
    this.slideIndex = 0;
    this.stepIndex = 0;
    this.act = 0;
    this.temperature = 0.4;
    this.entropy = 0;
    this.isFrozen = false;
    this.showBackgroundLog = true;
    this.interactionCount = 0;
    this.startTime = null;
    this.triggersFired = [false, false, false, false];
    this.listeners = [];
    this.notesLanguage = (typeof localStorage !== 'undefined' && localStorage.getItem('scar_speaker_notes_lang')) || 'en';

    // Parse URL parameter ?slide=XX or ?slide=2 for direct dev jump
    const urlParams = new URLSearchParams(window.location.search);
    const slideParam = urlParams.get('slide');
    if (slideParam) {
      const parsedNum = parseInt(slideParam, 10);
      if (!isNaN(parsedNum) && parsedNum >= 1 && parsedNum <= totalSlides) {
        this.slideIndex = parsedNum - 1;
      }
      this.startTime = Date.now();
    }

    // Initialize act, temperature & triggers identically regardless of URL params
    this.updateActAndTemperature();

    // Ticking session clock interval
    setInterval(() => {
      // ponytail: notify subscribers every second to keep main view status bar clock updated continuously
      this.updateEntropy();
      this.notify();
    }, 1000);
  }

  startTimer() {
    if (!this.startTime) {
      this.startTime = Date.now();
      this.notify();
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify() {
    const data = this.getStateSnapshot();
    this.listeners.forEach(cb => cb(data));
  }

  // ponytail: seamless language switcher for speaker notes
  setNotesLanguage(lang) {
    if (['en', 'pt', 'ru', 'zh'].includes(lang)) {
      this.notesLanguage = lang;
      try {
        localStorage.setItem('scar_speaker_notes_lang', lang);
      } catch (e) {}
      this.notify();
    }
  }

  getMaxStepsForSlide(slideIdx = this.slideIndex) {
    const slideId = slideIdx + 1;
    const noteObj = speakerNotesData[slideId];
    if (!noteObj || !noteObj.notes) return 1;
    const notesArray = Array.isArray(noteObj.notes)
      ? noteObj.notes
      : (noteObj.notes[this.notesLanguage] || noteObj.notes.en || []);
    return notesArray.length > 0 ? notesArray.length : 1;
  }

  getAllNotesForSlide(slideIdx = this.slideIndex, lang = this.notesLanguage) {
    const slideId = slideIdx + 1;
    const noteObj = speakerNotesData[slideId];
    if (!noteObj || !noteObj.notes) {
      return ["No speaker notes for this slide."];
    }
    if (Array.isArray(noteObj.notes)) {
      return noteObj.notes;
    }
    const localized = noteObj.notes[lang] || noteObj.notes.en;
    if (!localized || localized.length === 0) {
      return ["No speaker notes for this slide."];
    }
    return localized;
  }

  getCurrentSpeakerNote() {
    const notes = this.getAllNotesForSlide();
    const noteIdx = Math.min(this.stepIndex, notes.length - 1);
    return notes[noteIdx];
  }

  getStateSnapshot() {
    const maxSteps = this.getMaxStepsForSlide();
    return {
      slideIndex: this.slideIndex,
      stepIndex: this.stepIndex,
      maxSteps: maxSteps,
      totalSlides: this.totalSlides,
      act: this.act,
      temperature: this.temperature,
      entropy: Math.min(100, Math.floor(this.entropy)),
      isFrozen: this.isFrozen,
      showBackgroundLog: this.showBackgroundLog,
      notesLanguage: this.notesLanguage,
      interactionCount: this.interactionCount,
      elapsedSeconds: this.startTime ? Math.floor((Date.now() - this.startTime) / 1000) : 0,
      triggersFired: [...this.triggersFired],
      zRegister: this.getZRegisterString(),
      speakerNote: this.getCurrentSpeakerNote(),
      allSlideNotes: this.getAllNotesForSlide()
    };
  }

  toggleBackgroundLog(forcedState) {
    this.showBackgroundLog = forcedState !== undefined ? forcedState : !this.showBackgroundLog;
    this.notify();
    return this.showBackgroundLog;
  }

  getZRegisterString() {
    const bitmask = this.triggersFired.reduce((acc, val, idx) => acc | (val ? (1 << idx) : 0), 0);
    return `z=[${this.slideIndex}:${this.isFrozen}:${this.temperature.toFixed(2)}:38:${bitmask}:${this.interactionCount}]`;
  }

  setSlide(index, userInitiated = true) {
    if (!this.startTime) {
      this.startTimer();
    }

    if (this.isFrozen && index < this.slideIndex && userInitiated) {
      return false; // Backwards navigation blocked when frozen
    }

    if (index < 0 || index >= this.totalSlides) return false;

    this.slideIndex = index;
    this.stepIndex = 0;
    if (userInitiated) this.interactionCount++;

    this.updateActAndTemperature();
    this.updateEntropy();
    this.notify();
    return true;
  }

  nextSlide() {
    const maxSteps = this.getMaxStepsForSlide();
    if (this.stepIndex < maxSteps - 1) {
      this.stepIndex++;
      this.interactionCount++;
      this.notify();
      return true;
    }
    return this.setSlide(this.slideIndex + 1);
  }

  prevSlide() {
    if (this.isFrozen) {
      return false; // Back-navigation strictly blocked in Act IV
    }

    if (this.stepIndex > 0) {
      this.stepIndex--;
      this.notify();
      return true;
    }

    if (this.slideIndex > 0) {
      const prevIdx = this.slideIndex - 1;
      this.slideIndex = prevIdx;
      this.stepIndex = Math.max(0, this.getMaxStepsForSlide(prevIdx) - 1);
      this.updateActAndTemperature();
      this.notify();
      return true;
    }

    return false;
  }

  updateActAndTemperature() {
    const idx = this.slideIndex;

    // Act determination & sclerosis schedule
    if (idx <= 1) {
      this.act = 0;
      this.temperature = 0.4;
      this.triggersFired[0] = true;
    } else if (idx <= 7) {
      this.act = 1;
      this.temperature = 1.0;
      this.triggersFired[1] = true;
    } else if (idx <= 15) {
      this.act = 2;
      // Linear cooling 1.0 -> 0.5 across slides 8 to 15
      const progress = (idx - 8) / 7;
      this.temperature = 0.8 - (progress * 0.3);
      this.triggersFired[2] = true;
    } else if (idx <= 19) {
      this.act = 3;
      // Cooling 0.5 -> 0.25
      const progress = (idx - 16) / 3;
      this.temperature = 0.5 - (progress * 0.25);
      this.triggersFired[3] = true;
    } else {
      this.act = 4;
      // Terminal sclerosis: slide 20 to 22 drops to 0.0
      const progress = Math.min(1.0, (idx - 20) / 2);
      this.temperature = Math.max(0.0, 0.25 * (1.0 - progress));
      if (idx >= 22) {
        this.temperature = 0.0;
        this.isFrozen = true;
      }
    }
  }

  updateEntropy() {
    const timeSec = this.startTime ? (Date.now() - this.startTime) / 1000 : 0;
    this.entropy = (this.slideIndex * 3.5) + (this.interactionCount * 0.5) + (timeSec * 0.05);
  }

  resetState() {
    this.slideIndex = 0;
    this.act = 0;
    this.temperature = 0.4;
    this.entropy = 0;
    this.isFrozen = false;
    this.interactionCount = 0;
    this.startTime = null;
    this.triggersFired = [false, false, false, false];
    this.notify();
  }
}

export const appState = new PresentationState();
