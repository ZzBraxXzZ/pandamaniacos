import { Link } from "@tanstack/react-router";
import { FolderSearch, Newspaper, RadioTower, Star } from "lucide-react";

const CARDS = [
  { to: "/noticias", title: "Noticias del Caos", icon: Newspaper },
  { to: "/buscados", title: "Los Más Buscados", icon: Star },
  { to: "/expedientes", title: "Expedientes Secretos", icon: FolderSearch },
  { to: "/en-vivo", title: "Pandamonium en Vivo", icon: RadioTower },
] as const;

export function QuickLinks() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {CARDS.map(({ to, title, icon: Icon }) => (
        <Link key={to} to={to} className="paper lift group flex min-w-0 flex-col items-center gap-2 rounded-xl border-4 border-ink/30 p-3 text-center shadow-poster sm:flex-row sm:gap-4 sm:p-5 sm:text-left">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border-4 border-ink bg-primary text-primary-foreground transition group-hover:rotate-6 sm:h-16 sm:w-16">
            <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
          </span>
          <span className="min-w-0 break-words font-display text-xl leading-[1.05] text-ink sm:text-3xl sm:leading-none">{title}</span>
        </Link>
      ))}
    </div>
  );
}
