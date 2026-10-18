import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { birthday } from "@/config/birthday";
import { letterSfx } from "@/lib/sound";
import { Petals } from "./Petals";

export function Letter({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-night via-secondary to-night px-4 py-24">
      <Petals count={20} />
      <div className="relative z-10 text-center">
        <p className="font-hand text-2xl text-gold">Chapter V</p>
        <h2 className="mt-2 font-display text-4xl italic text-cream text-glow md:text-6xl">The Birthday Letter</h2>
      </div>
      <div className="relative z-10 mt-12 w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.div key="env" exit={{ opacity: 0, y: -40, scale: 0.9 }} transition={{ duration: 0.8 }} className="flex flex-col items-center">
              <div className="relative h-56 w-80 animate-floaty rounded-lg bg-cream shadow-glow md:h-64 md:w-96">
                <div className="absolute inset-x-0 top-0 h-1/2 origin-top bg-sakura/50 [clip-path:polygon(0_0,100%_0,50%_100%)]" />
                <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-destructive shadow-card">
                  <Heart className="text-cream" fill="currentColor" />
                </div>
              </div>
              <button onClick={() => { letterSfx(); setOpen(true); }} className="btn-glow mt-10">Buka Suratku</button>
            </motion.div>
          ) : (
            <motion.article key="letter" initial={{ opacity: 0, y: 80, rotateX: 40 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative rounded-md bg-cream p-8 text-ink shadow-glow md:p-12">
              <Petals count={30} glow className="-inset-20 h-[calc(100%+10rem)] w-[calc(100%+10rem)]" />
              <h3 className="font-hand text-3xl leading-snug text-destructive md:text-4xl">{birthday.letterHeading}</h3>
              <div className="mt-6 space-y-4 text-base leading-relaxed md:text-lg">
                {birthday.loveLetter.split("\n\n").map((p, i) => (
                  <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + i * 0.35 }}>{p}</motion.p>
                ))}
              </div>
              <p className="mt-8 text-right font-hand text-3xl text-destructive">{birthday.letterSignoff}<br /><span className="text-2xl text-ink">— {birthday.senderName}</span></p>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
