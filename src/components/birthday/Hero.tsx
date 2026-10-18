import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import sky from "@/assets/hero-sky.jpg";
import couple from "@/assets/couple.png";
import { birthday } from "@/config/birthday";
import { Petals } from "./Petals";

export function Hero({ onStart }: { onStart: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 }), sy = useSpring(my, { stiffness: 40, damping: 20 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx.set(e.clientX / window.innerWidth - 0.5); my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [mx, my]);

  const bgX = useTransform(sx, (v) => v * -15), bgY = useTransform(sy, (v) => v * -10);
  const bgScroll = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.2]);
  const cX = useTransform(sx, (v) => v * -35);
  const cScroll = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div style={{ y: bgScroll }} className="absolute inset-0">
        <motion.img src={sky} alt="Golden hour Japanese landscape" width={1920} height={1088}
          style={{ x: bgX, y: bgY, scale: bgScale }} className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-night/40 via-transparent to-night" />
      <div className="absolute -inset-x-1/4 top-0 h-2/3 bg-glow opacity-20 blur-3xl animate-leak mix-blend-screen" />
      <Petals count={30} className="opacity-70" />

      <motion.div style={{ x: cX, y: cScroll }} className="absolute bottom-[6%] right-[14%] w-24 md:w-36">
        <img src={couple} alt="A couple holding hands" width={240} height={310} className="w-full drop-shadow-[0_0_30px_rgba(255,200,170,0.6)]" />
      </motion.div>

      <Petals count={18} className="z-10" />

      <motion.div style={{ y: textY, opacity: fade }} className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1.2 }}
          className="mb-4 font-hand text-2xl text-cream text-glow">for {birthday.recipientName} ♡ {birthday.birthdayDate}</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.6, duration: 1.6 }}
          className="max-w-4xl font-display text-5xl font-semibold italic leading-tight text-cream text-glow md:text-7xl">
          {birthday.heroTitle} <span className="text-sakura">♡</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1.4 }}
          className="mt-6 max-w-xl text-lg text-cream/90 text-glow md:text-xl">{birthday.heroSubtitle}</motion.p>
        <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 1 }}
          onClick={onStart} className="btn-glow mt-10">{birthday.heroCta}</motion.button>
      </motion.div>
    </section>
  );
}
