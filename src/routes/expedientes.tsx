import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FolderOpen } from "lucide-react";
import { secretFiles, type SecretFile } from "@/data/pandamonium";
import { PageTitle } from "@/components/pn/site-header";
import { PaperDialog } from "@/components/pn/paper-dialog";

export const Route = createFileRoute("/expedientes")({
  head: () => ({
    meta: [
      { title: "Expedientes Secretos — PANDAMONIUM NEWS" },
      { name: "description", content: "Archivo confidencial: investigaciones, pistas y evidencias del caos navideño." },
      { property: "og:title", content: "Expedientes Secretos" },
      { property: "og:description", content: "Archivo confidencial de las investigaciones de Pandamonium." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FilesPage,
});

function FilesPage() {
  const [open, setOpen] = useState<SecretFile | null>(null);
  return (
    <div>
      <PageTitle kicker="CLASIFICADO" title="Expedientes Secretos" />
      <div className="grid gap-6 md:grid-cols-2">
        {secretFiles.map((f) => (
          <article key={f.code} className="paper lift fade-in relative grid overflow-hidden rounded-xl rounded-tl-none border-4 border-ink/30 shadow-poster sm:grid-cols-[180px_1fr]">
            <img src={f.image} alt="" loading="lazy" className="h-44 w-full bg-background-deep object-cover grayscale-[40%] sepia-[30%] sm:h-full" />
            <div className="flex flex-col gap-2 p-5">
              <div className="flex items-center justify-between">
                <span className="font-display text-xl text-muted-foreground">{f.code}</span>
                <span className="stamp text-sm text-primary">{f.level}</span>
              </div>
              <h2 className="text-3xl leading-none text-ink">{f.title}</h2>
              <p className="text-sm">{f.summary}</p>
              <button onClick={() => setOpen(f)} className="btn-poster mt-auto w-fit text-base">
                <FolderOpen className="h-4 w-4" /> Consultar
              </button>
            </div>
          </article>
        ))}
      </div>
      <PaperDialog open={!!open} onClose={() => setOpen(null)} title={open?.title ?? ""}>
        {open && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl text-muted-foreground">{open.code}</span>
              <span className="stamp text-lg text-primary">{open.level}</span>
            </div>
            <h2 className="text-4xl leading-none text-ink">{open.title}</h2>
            <img src={open.image} alt="Evidencia" className="max-h-64 w-full rounded border-4 border-ink/60 bg-background-deep object-cover sepia-[30%]" />
            <p>{open.summary}</p>
            <div>
              <b>Pistas:</b>
              <ul className="mt-1 list-disc pl-5">{open.clues.map((c) => <li key={c}>{c}</li>)}</ul>
            </div>
          </div>
        )}
      </PaperDialog>
    </div>
  );
}
