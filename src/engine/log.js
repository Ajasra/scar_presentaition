export class ForensicLogger {
  constructor() {
    this.entries = [];
    this.listeners = [];
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  log(category, message) {
    const timestamp = new Date().toISOString().substring(11, 19);
    const entry = { timestamp, category, message };
    this.entries.push(entry);
    this.listeners.forEach(cb => cb(entry, this.entries));
  }



  getEntries() {
    return [...this.entries];
  }
}

export const forensicLog = new ForensicLogger();
