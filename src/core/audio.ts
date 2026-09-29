export class Audio {
  muted = true; private context?: AudioContext;
  async toggle() { this.muted = !this.muted; if (!this.muted) { this.context ??= new AudioContext(); await this.context.resume(); this.play(); } }
  play() {
    if(this.muted || !this.context) return;
    const c = this.context, oscillator = c.createOscillator(), gain = c.createGain();
    oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(660,c.currentTime); oscillator.frequency.exponentialRampToValueAtTime(990,c.currentTime+.1);
    gain.gain.setValueAtTime(.04,c.currentTime); gain.gain.exponentialRampToValueAtTime(.001,c.currentTime+.22);
    oscillator.connect(gain).connect(c.destination); oscillator.start(); oscillator.stop(c.currentTime+.23);
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
  }
}
