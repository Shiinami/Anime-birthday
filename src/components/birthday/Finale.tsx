import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import night from "@/assets/night.jpg";
import couple from "@/assets/couple.png";
import { birthday } from "@/config/birthday";
import { Petals } from "./Petals";

export function Finale({ onReplay }: { onReplay: () => void }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <img src={night} alt="" aria-hidden loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full scale-x-[-1] object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-night" />
      <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-sakura/25 blur-3xl" />
      <Petals count={40} />
      <img src={couple} alt="The couple beneath the stars" loading="lazy" width={240} height={310}
        className="absolute bottom-[8%] left-[16%] w-20 brightness-50 drop-shadow-[0_0_25px_rgba(220,170,255,0.7)] md:w-28" />
      <div className="relative z-10 max-w-3xl px-6 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="mb-8 flex justify-center">
          <Heart size={64} className="animate-heartbeat text-sakura drop-shadow-[0_0_25px_rgba(255,170,210,0.95)]" fill="currentColor" />
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }}
          className="font-display text-2xl italic text-cream/90 text-glow md:text-3xl">{birthday.finaleMessage}</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: 0.6 }}
          className="mt-8 font-display text-4xl font-semibold text-cream text-glow md:text-6xl">{birthday.finaleHeading}</motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2, delay: 1.6 }}
          className="mt-8 font-hand text-2xl text-gold">{birthday.signature}</motion.p>
        <button onClick={onReplay} className="btn-glow mt-10">Ulangi Cerita Kita ↻</button>
      </div>
    </section>
  );
}
