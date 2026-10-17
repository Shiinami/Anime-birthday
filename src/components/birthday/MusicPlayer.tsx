import { Music, Pause, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { birthday } from "@/config/birthday";
import { setSfx, startPiano } from "@/lib/sound";

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const stopRef = useRef<null | (() => void)>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => () => { stopRef.current?.(); audioRef.current?.pause(); }, []);

  const toggle = () => {
    if (playing) {
      stopRef.current?.(); stopRef.current = null; audioRef.current?.pause(); setPlaying(false); return;
    }
    if (birthday.backgroundMusicUrl) {
      if (!audioRef.current) { audioRef.current = new Audio(birthday.backgroundMusicUrl); audioRef.current.loop = true; audioRef.current.volume = 0.5; }
      audioRef.current.muted = muted; audioRef.current.play();
    } else if (!muted) stopRef.current = startPiano();
    setPlaying(true);
  };
  const toggleMute = () => {
    const m = !muted; setMuted(m); setSfx(!m);
    if (audioRef.current) audioRef.current.muted = m;
    if (!birthday.backgroundMusicUrl && playing) { if (m) { stopRef.current?.(); stopRef.current = null; } else stopRef.current = startPiano(); }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex gap-2 rounded-full border border-border bg-night/60 p-1.5 backdrop-blur-md">
      <button onClick={toggle} aria-label={playing ? "Jeda musik" : "Putar musik"} className="rounded-full bg-primary p-2.5 text-primary-foreground">
        {playing ? <Pause size={18} /> : <Music size={18} />}
      </button>
      <button onClick={toggleMute} aria-label={muted ? "Nyalakan suara" : "Bisukan suara"} className="rounded-full p-2.5 text-cream">
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </div>
  );
}
