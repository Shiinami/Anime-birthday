import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { birthday } from "@/config/birthday";

const tilts = [-6, 4, -3, 5, -4, 3];

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, []);
  const item = open !== null ? birthday.gallery[open] : null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-night via-secondary to-night px-6 py-28">
      <div className="text-center">
        <p className="font-hand text-2xl text-gold">Chapter III</p>
        <h2 className="mt-2 font-display text-4xl italic text-cream text-glow md:text-6xl">Our Little Universe</h2>
      </div>
      <div className="mx-auto mt-16 flex max-w-6xl flex-wrap justify-center gap-10 [perspective:1200px]">
        {birthday.gallery.map((g, i) => (
          <motion.button key={i} onClick={() => setOpen(i)}
            initial={{ opacity: 0, y: 60, rotate: 0 }} whileInView={{ opacity: 1, y: 0, rotate: tilts[i % 6] ?? 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, delay: i * 0.15 }}
            whileHover={{ rotate: 0, scale: 1.06, rotateY: 8, z: 40 }} whileFocus={{ rotate: 0, scale: 1.04 }}
            className="w-64 rounded-sm bg-card p-3 pb-5 text-left shadow-card outline-none ring-sakura focus-visible:ring-2 md:w-72"
            style={{ animationDelay: `${i * 0.8}s` }} aria-label={`Buka kenangan: ${g.title}`}>
            <div className="animate-floaty" style={{ animationDelay: `${i}s` }}>
              <img src={g.image} alt={g.title} loading="lazy" width={816} height={816} className="aspect-square w-full rounded-sm border-4 border-sakura/40 object-cover" />
              <p className="mt-3 font-hand text-2xl text-ink">{g.title}</p>
              <p className="text-sm text-ink/70">{g.caption}</p>
            </div>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {item && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-night/85 p-6 backdrop-blur-md" role="dialog" aria-modal>
            <motion.div initial={{ scale: 0.85, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} className="relative max-w-lg rounded-sm bg-card p-4 pb-6 shadow-glow">
              <button onClick={() => setOpen(null)} aria-label="Tutup" autoFocus className="absolute -right-3 -top-3 rounded-full bg-primary p-2 text-primary-foreground"><X size={18} /></button>
              <img src={item.image} alt={item.title} className="w-full rounded-sm" />
              <p className="mt-4 font-hand text-3xl text-ink">{item.title}</p>
              <p className="mt-1 text-ink/80">{item.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
