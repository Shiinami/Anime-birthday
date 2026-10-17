import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import { useRef, useState } from "react";
import night from "@/assets/night.jpg";
import { birthday } from "@/config/birthday";
import { chime } from "@/lib/sound";
import { Petals } from "./Petals";

const spots = [
  { left: "14%", top: "22%" }, { left: "38%", top: "12%" }, { left: "60%", top: "28%" }, { left: "26%", top: "44%" },
  { left: "78%", top: "16%" }, { left: "50%", top: "48%" },
];

export function Wishes() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const [active, setActive] = useState<number | null>(null);
  const [seen, setSeen] = useState<Set<number>>(new Set());

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      <motion.img style={{ y, scale: 1.2 }} src={night} alt="Starry night over a glowing city" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-night via-transparent to-night/80" />
      <Petals count={35} glow />
      <div className="relative z-10 px-6 pt-24 text-center">
        <p className="font-hand text-2xl text-gold">Chapter IV</p>
        <h2 className="mt-2 font-display text-4xl italic text-cream text-glow md:text-6xl">A Sky Full of Wishes</h2>
        <p className="mt-3 text-cream/80">Sentuh bintang-bintangnya ✦ ({seen.size}/{birthday.birthdayWishes.length})</p>
      </div>
      <div className="absolute inset-0 z-10">
        {birthday.birthdayWishes.map((_, i) => (
          <button key={i} onClick={() => { chime(); setActive(i); setSeen((s) => new Set(s).add(i)); }}
            style={{ ...spots[i % spots.length], marginTop: "8rem", animationDelay: `${i * 0.5}s` }}
            className="absolute animate-twinkle rounded-full p-3 text-gold outline-none focus-visible:ring-2 ring-cream"
            aria-label={`Buka harapan ${i + 1}`}>
            <Star size={34} fill="currentColor" className={`drop-shadow-[0_0_14px_rgba(255,220,150,0.95)] ${seen.has(i) ? "opacity-60" : ""}`} />
          </button>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-16 z-20 flex justify-center px-6">
        <AnimatePresence mode="wait">
          {active !== null && (
            <motion.p key={active} initial={{ opacity: 0, y: 20, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.8 }}
              className="max-w-xl rounded-2xl border border-border bg-night/50 px-6 py-5 text-center font-display text-2xl italic text-cream backdrop-blur-md text-glow md:text-3xl" aria-live="polite">
              “{birthday.birthdayWishes[active]}”
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
