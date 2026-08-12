export class SyncEngine {
  constructor(state, channelName = 'scar_presentation_sync') {
    this.state = state;
    this.channelName = channelName;
    this.channel = null;
    this.senderId = Math.random().toString(36).substring(2, 9);
    this.initChannel();
    this.bindState();
  }

  initChannel() {
    if ('BroadcastChannel' in window) {
      this.channel = new BroadcastChannel(this.channelName);
      this.channel.onmessage = (event) => this.handleMessage(event.data);
    } else {
      // Fallback for older browsers using storage events
      window.addEventListener('storage', (e) => {
        if (e.key === this.channelName && e.newValue) {
          try {
            const data = JSON.parse(e.newValue);
            this.handleMessage(data);
          } catch (err) {
            console.error('Storage sync error:', err);
          }
        }
      });
    }
  }

  bindState() {
    this.state.subscribe((snapshot) => {
      this.broadcast({
        type: 'STATE_UPDATE',
        payload: snapshot
      });
    });
  }

  broadcast(message) {
    const msgData = { ...message, senderId: this.senderId };
    if (this.channel) {
      this.channel.postMessage(msgData);
    } else {
      localStorage.setItem(this.channelName, JSON.stringify({ ...msgData, timestamp: Date.now() }));
    }
  }

  sendNavCmd(action, param) {
    this.broadcast({
      type: 'NAV_COMMAND',
      action,
      param
    });
  }

  handleMessage(data) {
    if (!data || !data.type) return;
    // Ignore self-emitted messages
    if (data.senderId === this.senderId) return;

    const isPresenter = window.location.search.includes('mode=presenter');

    if (data.type === 'NAV_COMMAND') {
      if (isPresenter) {
        if (data.action === 'NEXT') this.state.nextSlide();
        else if (data.action === 'PREV') this.state.prevSlide();
        else if (data.action === 'GOTO') this.state.setSlide(data.param, false);
        else if (data.action === 'RESET') this.state.resetState();
        else if (data.action === 'TOGGLE_LOG') this.state.toggleBackgroundLog(data.param);
      } else {
        if (data.action === 'RESET') {
          if (this.onReset) this.onReset();
        }
      }
    } else if (data.type === 'STATE_UPDATE') {
      if (isPresenter) {
        if (this.onPresenterStateUpdate) {
          this.onPresenterStateUpdate(data.payload);
        }
      } else {
        // Main view synchronizes state from presenter snapshot
        if (data.payload) {
          if (this.state.slideIndex !== data.payload.slideIndex || this.state.stepIndex !== data.payload.stepIndex) {
            // ponytail: boot trigger — if main is in standby and presenter user explicitly navigates, start boot
            if (this.onBootTrigger) {
              this.onBootTrigger();
            }
            this.state.slideIndex = data.payload.slideIndex;
            this.state.stepIndex = data.payload.stepIndex;
            this.state.showBackgroundLog = data.payload.showBackgroundLog;
            this.state.notify();
          }
        }
      }
    }
  }
}
