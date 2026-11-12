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
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {CARDS.map(({ to, title, icon: Icon }) => (
        <Link key={to} to={to} className="paper lift group flex items-center gap-4 rounded-xl border-4 border-ink/30 p-4 shadow-poster sm:p-5">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-lg border-4 border-ink bg-primary text-primary-foreground transition group-hover:rotate-6 sm:h-16 sm:w-16">
            <Icon className="h-8 w-8" />
          </span>
          <span className="font-display text-2xl leading-none text-ink sm:text-3xl">{title}</span>
        </Link>
      ))}
    </div>
  );
}
