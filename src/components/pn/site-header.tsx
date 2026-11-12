import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { FileSearch, Home, Menu, Newspaper, Radio, ShieldAlert, X } from "lucide-react";
import { LOGO_URL } from "@/data/pandamonium";

const NAV = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/noticias", label: "Noticias", icon: Newspaper },
  { to: "/buscados", label: "Más Buscados", icon: ShieldAlert },
  { to: "/expedientes", label: "Expedientes", icon: FileSearch },
  { to: "/en-vivo", label: "En Vivo", icon: Radio },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="relative">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 pt-4 pb-2">
        <button
          aria-label="Abrir menú"
          onClick={() => setOpen((o) => !o)}
          className="rounded-md p-2 text-foreground transition hover:bg-foreground/10 md:hidden"
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
        <div className="hidden w-32 md:block" />
        <Link to="/" className="group flex items-center gap-2 sm:gap-4">
          <img
            src={LOGO_URL}
            alt="Logo oficial de PANDAMONIUM"
            width={547}
            height={324}
            className="h-16 w-auto drop-shadow-lg transition-transform group-hover:-rotate-3 sm:h-24 md:h-28"
          />
          <div className="text-center leading-none">
            <span className="block font-western text-2xl text-foreground text-outline sm:text-4xl md:text-5xl">
              PANDAMONIUM
            </span>
            <span className="mt-1 inline-block rounded-sm bg-primary px-3 py-0.5 font-display text-lg tracking-widest text-primary-foreground sm:text-2xl">
              ★ NEWS ★
            </span>
          </div>
        </Link>
        <Link
          to="/en-vivo"
          className="flex items-center gap-2 rounded-full border-2 border-foreground/40 bg-primary px-3 py-1 font-display text-lg tracking-wider text-primary-foreground shadow-poster transition hover:brightness-110"
        >
          <span className="live-dot h-2.5 w-2.5 rounded-full bg-primary-foreground" />
          EN VIVO
          <Radio className="hidden h-5 w-5 sm:block" />
        </Link>
      </div>
      <nav className={`${open ? "block" : "hidden"} md:block`}>
        <ul className="paper mx-auto flex max-w-7xl flex-col border-y-4 border-double border-ink/40 md:flex-row md:justify-around md:rounded-md md:border-4">
          {NAV.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <Link
                to={to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: to === "/" }}
                className="flex items-center gap-2 border-b-4 border-transparent px-5 py-3 font-display text-xl tracking-wide text-ink transition hover:text-primary data-[status=active]:border-primary data-[status=active]:text-primary"
              >
                <Icon className="h-5 w-5" /> {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-16 max-w-7xl px-4 pb-10 text-center">
      <p className="font-western text-xl text-secondary">«El periódico que Santa no quiere que leas»</p>
      <p className="mt-2 font-display text-2xl tracking-wider text-foreground">¡No traemos la magia, la desatamos!</p>
      <p className="mt-3 text-xs text-foreground/60">
        Contenido humorístico y ficticio creado por el equipo PANDAMONIUM de Pandatech para la competencia navideña.
      </p>
    </footer>
  );
}

export function PageTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="fade-in mb-8 text-center">
      <span className="inline-block -skew-x-12 bg-primary px-4 py-1 font-display text-lg tracking-widest text-primary-foreground">
        {kicker}
      </span>
      <h1 className="mt-3 text-5xl text-foreground text-outline sm:text-6xl">{title}</h1>
    </div>
  );
}
