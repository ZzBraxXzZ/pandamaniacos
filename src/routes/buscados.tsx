import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { suspects } from "@/data/pandamonium";
import { PageTitle } from "@/components/pn/site-header";
import { PaperDialog } from "@/components/pn/paper-dialog";
import { StatusStamp, SuspectDetail } from "@/components/pn/wanted";

type Search = { id?: string | undefined };

export const Route = createFileRoute("/buscados")({
  validateSearch: (s: Record<string, unknown>): Search => ({ id: typeof s.id === "string" ? s.id : undefined }),
  head: () => ({
    meta: [
      { title: "Los Más Buscados — PANDAMONIUM NEWS" },
      { name: "description", content: "Galería WANTED de los sospechosos más buscados de la Navidad." },
      { property: "og:title", content: "Los Más Buscados de Navidad" },
      { property: "og:description", content: "Carteles WANTED, recompensas y expedientes de los prófugos navideños." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WantedPage,
});

function WantedPage() {
  const { id } = Route.useSearch();
  const navigate = useNavigate({ from: "/buscados" });
  const open = suspects.find((s) => s.id === id);
  return (
    <div>
      <PageTitle kicker="SE BUSCA" title="Los Más Buscados" />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {suspects.map((s, i) => (
          <button
            key={s.id}
            onClick={() => navigate({ search: { id: s.id } })}
            className={`paper lift fade-in flex flex-col items-center gap-3 rounded border-4 border-ink/40 p-5 text-center shadow-poster ${i % 2 ? "rotate-1" : "-rotate-1"}`}
          >
            <span className="font-western text-5xl text-primary">WANTED</span>
            <img src={s.image} alt={s.alias} loading="lazy" className="aspect-[4/5] w-full rounded border-4 border-ink/70 bg-background-deep object-cover" />
            <span className="font-display text-3xl leading-none text-ink">{s.alias}</span>
            <span className="text-sm">{s.crimes[0]}</span>
            <StatusStamp status={s.status} />
            <span className="font-display text-lg text-primary">Recompensa: {s.reward}</span>
          </button>
        ))}
      </div>
      <PaperDialog open={!!open} onClose={() => navigate({ search: { id: undefined } })} title={open?.alias ?? ""}>
        {open && <SuspectDetail s={open} />}
      </PaperDialog>
    </div>
  );
}
