import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Hero } from "@/components/birthday/Hero";
import { Story } from "@/components/birthday/Story";
import { Gallery } from "@/components/birthday/Gallery";
import { Wishes } from "@/components/birthday/Wishes";
import { Letter } from "@/components/birthday/Letter";
import { Finale } from "@/components/birthday/Finale";
import { MusicPlayer } from "@/components/birthday/MusicPlayer";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Happy Birthday, My Favorite Person ♡" },
      { name: "description", content: "Sebuah cerita ulang tahun bergaya anime romantis, dibuat khusus untukmu." },
      { property: "og:title", content: "Happy Birthday, My Favorite Person ♡" },
      { property: "og:description", content: "Sebuah cerita ulang tahun bergaya anime romantis, dibuat khusus untukmu." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const storyRef = useRef<HTMLElement>(null);
  const [letterOpen, setLetterOpen] = useState(false);
  const [key, setKey] = useState(0);
  return (
    <main className="overflow-x-hidden">
      <div key={key}>
        <Hero onStart={() => storyRef.current?.scrollIntoView({ behavior: "smooth" })} />
        <Story ref={storyRef} />
        <Gallery />
        <Wishes />
        <Letter open={letterOpen} setOpen={setLetterOpen} />
        <Finale onReplay={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setTimeout(() => { setLetterOpen(false); setKey((k) => k + 1); }, 1200);
        }} />
      </div>
      <MusicPlayer />
    </main>
  );
}
