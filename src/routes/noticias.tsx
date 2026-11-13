import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { formatDate, news, NEWS_CATEGORIES, type NewsCategory } from "@/data/pandamonium";
import { PageTitle } from "@/components/pn/site-header";
import { PaperDialog } from "@/components/pn/paper-dialog";

type Search = { id?: string | undefined };

export const Route = createFileRoute("/noticias")({
  validateSearch: (s: Record<string, unknown>): Search => ({ id: typeof s["id"] === "string" ? s["id"] : undefined }),
  head: () => ({
    meta: [
      { title: "Noticias del Caos — PANDAMONIUM NEWS" },
      { name: "description", content: "Todas las noticias del caos navideño: Polo Norte, investigaciones, declaraciones y Pandatech." },
      { property: "og:title", content: "Noticias del Caos — PANDAMONIUM NEWS" },
      { property: "og:description", content: "Todas las noticias del caos navideño, filtradas por categoría." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const { id } = Route.useSearch();
  const navigate = useNavigate({ from: "/noticias" });
  const [cat, setCat] = useState<NewsCategory | "Todas">("Todas");
  const list = cat === "Todas" ? news : news.filter((n) => n.category === cat);
  const open = news.find((n) => n.id === id);

  return (
    <div>
      <PageTitle kicker="EXTRA · EXTRA" title="Noticias del Caos" />
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {(["Todas", ...NEWS_CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full border-2 px-4 py-1 font-display text-lg tracking-wide transition ${
              cat === c ? "border-primary bg-primary text-primary-foreground" : "border-foreground/40 text-foreground hover:bg-foreground/10"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((n) => (
          <article key={n.id} className="paper lift fade-in flex flex-col overflow-hidden rounded-xl border-4 border-ink/30 shadow-poster">
            <img src={n.image} alt="" loading="lazy" className="h-48 w-full bg-background-deep object-cover" />
            <div className="flex flex-1 flex-col gap-2 p-5">
              <div className="flex items-center justify-between text-xs">
                <span className="rounded bg-primary px-2 py-0.5 font-display text-sm tracking-wide text-primary-foreground">{n.category}</span>
                <span className="flex items-center gap-1 text-muted-foreground"><CalendarDays className="h-3.5 w-3.5" />{formatDate(n.date)}</span>
              </div>
              <h2 className="text-3xl leading-none text-ink">{n.title}</h2>
              <p className="text-sm">{n.summary}</p>
              <button onClick={() => navigate({ search: { id: n.id } })} className="btn-poster mt-auto w-fit text-base">Leer noticia</button>
            </div>
          </article>
        ))}
      </div>
      <PaperDialog open={!!open} onClose={() => navigate({ search: { id: undefined } })} title={open?.title ?? ""}>
        {open && (
          <article className="space-y-3">
            <img src={open.image} alt="" className="max-h-72 w-full rounded border-4 border-ink/60 bg-background-deep object-cover" />
            <div className="flex items-center gap-3 text-xs">
              <span className="rounded bg-primary px-2 py-0.5 font-display text-sm text-primary-foreground">{open.category}</span>
              <span className="text-muted-foreground">{formatDate(open.date)}</span>
            </div>
            <h2 className="text-4xl leading-none text-ink">{open.title}</h2>
            <p className="font-semibold">{open.summary}</p>
            <p>{open.body}</p>
            <p className="text-xs italic text-muted-foreground">Noticia ficticia y humorística.</p>
          </article>
        )}
      </PaperDialog>
    </div>
  );
}
