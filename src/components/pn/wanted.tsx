import type { Suspect } from "@/data/pandamonium";

export function StatusStamp({ status }: { status: Suspect["status"] }) {
  const tone = status === "CAPTURADO" ? "text-background" : status === "REINCIDENTE" ? "text-secondary" : "text-primary";
  return <span className={`stamp text-xl ${tone}`}>{status}</span>;
}

export function DangerMeter({ level }: { level: number }) {
  return (
    <div className="flex gap-1" aria-label={`Peligrosidad ${level} de 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`h-3 w-6 rounded-sm border border-ink ${i <= level ? "bg-primary" : "bg-transparent"}`} />
      ))}
    </div>
  );
}

export function SuspectDetail({ s }: { s: Suspect }) {
  return (
    <div className="grid gap-5 sm:grid-cols-[200px_1fr]">
      <img src={s.image} alt={s.alias} className="aspect-[4/5] w-full rounded border-4 border-ink/70 object-cover" />
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between gap-2">
          <span className="font-display text-lg text-muted-foreground">EXPEDIENTE WANTED</span>
          <StatusStamp status={s.status} />
        </div>
        <h2 className="text-4xl text-ink">{s.alias}</h2>
        <p>{s.description}</p>
        <div><b>Delitos:</b> {s.crimes.join(" · ")}</div>
        <div className="flex items-center gap-3"><b>Peligrosidad:</b> <DangerMeter level={s.danger} /></div>
        <div><b>Recompensa:</b> <span className="font-display text-lg text-primary">{s.reward}</span></div>
        <div>
          <b>Historial de incidentes:</b>
          <ul className="mt-1 list-disc pl-5">{s.history.map((h) => <li key={h}>{h}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}
