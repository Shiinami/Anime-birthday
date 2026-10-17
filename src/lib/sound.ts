let ctx: AudioContext | null = null;
export function audio() {
  if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

export let sfxEnabled = true;
export function setSfx(v: boolean) { sfxEnabled = v; }

export function tone(freq: number, when = 0, dur = 1.6, vol = 0.12, dest?: AudioNode) {
  const a = audio();
  const t = a.currentTime + when;
  const o = a.createOscillator();
  const o2 = a.createOscillator();
  const g = a.createGain();
  o.type = "sine"; o2.type = "triangle";
  o.frequency.value = freq; o2.frequency.value = freq * 2;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  const g2 = a.createGain(); g2.gain.value = 0.25;
  o.connect(g); o2.connect(g2).connect(g);
  g.connect(dest ?? a.destination);
  o.start(t); o2.start(t); o.stop(t + dur); o2.stop(t + dur);
}

export function chime() {
  if (!sfxEnabled) return;
  [1318.5, 1760, 2093].forEach((f, i) => tone(f, i * 0.08, 1.2, 0.06));
}
export function letterSfx() {
  if (!sfxEnabled) return;
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.12, 2, 0.08));
}

// Gentle generated piano loop (used when no music URL is configured)
export function startPiano() {
  const a = audio();
  const master = a.createGain(); master.gain.value = 0.5; master.connect(a.destination);
  const chords = [
    [261.63, 329.63, 392, 493.88], [220, 261.63, 329.63, 392],
    [174.61, 220, 261.63, 329.63], [196, 246.94, 293.66, 392],
  ];
  let i = 0;
  const play = () => {
    const c = chords[i++ % chords.length]!;
    tone(c[0]! / 2, 0, 3.5, 0.08, master);
    [0, 1, 2, 3, 2, 1].forEach((n, k) => tone(c[n]! * 2, k * 0.4, 2.2, 0.05, master));
  };
  play();
  const id = window.setInterval(play, 2400);
  return () => { window.clearInterval(id); master.gain.setTargetAtTime(0, a.currentTime, 0.3); };
}
