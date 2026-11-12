import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Play, Star } from "lucide-react";
import { news, suspects } from "@/data/pandamonium";
import { QuickLinks } from "@/components/pn/quick-links";
import { StatusStamp } from "@/components/pn/wanted";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PANDAMONIUM NEWS — El periódico que Santa no quiere que leas" },
      { name: "description", content: "Última hora del caos navideño: regalos desaparecidos, renos en huelga y los más buscados de Navidad." },
      { property: "og:title", content: "PANDAMONIUM NEWS" },
      { property: "og:description", content: "¡No traemos la magia, la desatamos! El noticiero navideño ficticio de Pandamonium." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Dots({ count, active, onPick }: { count: number; active: number; onPick: (i: number) => void }) {
  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          aria-label={`Ir a ${i + 1}`}
          onClick={() => onPick(i)}
          className={`h-3 w-3 rounded-full border-2 border-ink/40 transition ${i === active ? "scale-125 bg-primary" : "bg-card"}`}
        />
      ))}
    </div>
  );
}

function Index() {
  const featured = news.filter((n) => n.featured);
  const [h, setH] = useState(0);
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setH((i) => (i + 1) % featured.length), 7000);
    return () => clearInterval(t);
  }, [featured.length]);
  const item = featured[h];
  const s = suspects[w];
  const step = (d: number) => setW((i) => (i + d + suspects.length) % suspects.length);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Última hora */}
        <section className="poster-frame relative overflow-hidden bg-background-deep shadow-poster">
          <div key={item.id} className="fade-in grid min-h-[420px] md:grid-cols-[1fr_1.1fr]">
            <div className="relative z-10 flex flex-col justify-center gap-4 p-6 sm:p-8">
              <span className="w-fit -skew-x-12 bg-primary px-4 py-1 font-display text-2xl tracking-wider text-primary-foreground shadow-poster">
                ÚLTIMA HORA //
              </span>
              <h1 className="-rotate-2 text-5xl leading-[0.95] text-foreground text-outline sm:text-6xl">{item.title}</h1>
              <p className="max-w-sm text-foreground/90">{item.summary}</p>
              <Link to="/noticias" search={{ id: item.id }} className="btn-poster w-fit">
                Ver Noticia <Play className="h-4 w-4 fill-current" />
              </Link>
            </div>
            <img src={item.image} alt="" width={1280} height={832} className="h-64 w-full object-cover md:h-full" />
          </div>
          <div className="absolute bottom-4 left-0 right-0 z-20 md:left-8 md:right-auto">
            <Dots count={featured.length} active={h} onPick={setH} />
          </div>
        </section>

        {/* Más buscados */}
        <section className="poster-frame flex flex-col gap-4 bg-background-deep p-5 shadow-poster">
          <div className="paper mx-auto flex items-center gap-3 rounded border-4 border-double border-primary px-4 py-2 text-center">
            <Star className="h-5 w-5 fill-primary text-primary" />
            <h2 className="text-2xl leading-none text-primary sm:text-3xl">Los más buscados de Navidad</h2>
            <Star className="h-5 w-5 fill-primary text-primary" />
          </div>
          <div className="relative flex items-center gap-2">
            <button aria-label="Anterior" onClick={() => step(-1)} className="paper z-10 rounded-full p-1.5 text-primary shadow-poster transition hover:scale-110">
              <ChevronLeft />
            </button>
            <div key={s.id} className="paper fade-in flex flex-1 gap-4 rounded p-4 shadow-poster">
              <img src={s.image} alt={s.alias} className="aspect-[4/5] w-28 shrink-0 rounded border-4 border-ink/70 object-cover sm:w-36" />
              <div className="flex flex-col gap-2 text-sm">
                <h3 className="text-3xl leading-none text-ink">{s.alias}</h3>
                <p><b>Delito:</b> {s.crimes[0]}.</p>
                <p className="flex items-center gap-2"><b>Estado:</b> <StatusStamp status={s.status} /></p>
                <Link to="/buscados" search={{ id: s.id }} className="btn-poster mt-auto w-fit text-base">
                  Ver Expediente <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <button aria-label="Siguiente" onClick={() => step(1)} className="paper z-10 rounded-full p-1.5 text-primary shadow-poster transition hover:scale-110">
              <ChevronRight />
            </button>
          </div>
          <Dots count={suspects.length} active={w} onPick={setW} />
        </section>
      </div>
      <QuickLinks />
    </div>
  );
}
