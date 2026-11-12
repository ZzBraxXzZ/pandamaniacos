import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Radio, VideoOff } from "lucide-react";
import { LIVE_VIDEO_URL, liveReports, LOGO_URL } from "@/data/pandamonium";
import { PageTitle } from "@/components/pn/site-header";

export const Route = createFileRoute("/en-vivo")({
  head: () => ({
    meta: [
      { title: "Pandamonium en Vivo — PANDAMONIUM NEWS" },
      { name: "description", content: "Centro de transmisiones de Pandamonium: reportes y alertas de la competencia navideña." },
      { property: "og:title", content: "Pandamonium en Vivo" },
      { property: "og:description", content: "Reportes, alertas y transmisiones del caos navideño." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LivePage,
});

function LivePage() {
  const alerts = liveReports.filter((r) => r.alert);
  return (
    <div>
      <PageTitle kicker="CENTRO DE TRANSMISIONES" title="Pandamonium en Vivo" />
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <section className="poster-frame overflow-hidden bg-background-deep shadow-poster">
          <div className="flex items-center gap-2 bg-primary px-4 py-2 font-display text-xl tracking-wider text-primary-foreground">
            <Radio className="h-5 w-5" />
            {LIVE_VIDEO_URL ? (<><span className="live-dot h-2.5 w-2.5 rounded-full bg-primary-foreground" /> EN VIVO</>) : "SIN SEÑAL"}
          </div>
          <div className="aspect-video">
            {LIVE_VIDEO_URL ? (
              <iframe src={LIVE_VIDEO_URL} title="Transmisión Pandamonium" className="h-full w-full" allowFullScreen />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
                <img src={LOGO_URL} alt="PANDAMONIUM" className="h-32 w-auto opacity-80" />
                <VideoOff className="h-8 w-8 text-secondary" />
                <p className="font-display text-2xl text-foreground">Próxima transmisión muy pronto</p>
                <p className="text-sm text-foreground/70">Aquí aparecerá el video cuando haya una transmisión disponible.</p>
              </div>
            )}
          </div>
        </section>
        <div className="space-y-6">
          <section className="paper rounded-xl border-4 border-primary p-5 shadow-poster">
            <h2 className="mb-3 flex items-center gap-2 text-3xl text-primary"><AlertTriangle /> Alertas</h2>
            <ul className="space-y-2 text-sm">
              {alerts.map((a) => <li key={a.time} className="font-semibold">⚠ {a.text}</li>)}
            </ul>
          </section>
          <section className="paper rounded-xl border-4 border-ink/30 p-5 shadow-poster">
            <h2 className="mb-3 text-3xl text-ink">Últimos reportes</h2>
            <ol className="space-y-3 border-l-4 border-secondary pl-4 text-sm">
              {liveReports.map((r) => (
                <li key={r.time}><span className="font-display text-lg text-primary">{r.time}</span> — {r.text}</li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
