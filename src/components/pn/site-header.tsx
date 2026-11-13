import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { FileSearch, Home, Menu, Newspaper, Radio, ShieldAlert } from "lucide-react";
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
      <div className="relative mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 pt-4 pb-2 md:flex md:justify-between md:gap-4 md:px-4">
        <button
          aria-label="Abrir menú"
          onClick={() => setOpen((o) => !o)}
          className="rounded-md p-2 text-foreground transition hover:bg-foreground/10 md:hidden"
        >
          <Menu className="h-7 w-7" />
        </button>
        <div className="hidden w-32 md:block" />
        <Link to="/" className="group flex min-w-0 flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
          <img
            src={LOGO_URL}
            alt="Logo oficial de PANDAMONIUM"
            width={547}
            height={324}
            className="h-14 w-auto shrink-0 drop-shadow-lg transition-transform group-hover:-rotate-3 sm:h-24 md:h-28"
          />
          <div className="text-center leading-none">
            <span className="block font-western text-[1.35rem] text-foreground text-outline min-[400px]:text-2xl sm:text-4xl md:text-5xl">
              PANDAMONIUM
            </span>
            <span className="mt-1 inline-block rounded-sm bg-primary px-3 py-0.5 font-display text-base tracking-widest text-primary-foreground sm:text-2xl">
              ★ NEWS ★
            </span>
          </div>
        </Link>
        <Link
          to="/en-vivo"
          aria-label="En vivo"
          className="flex shrink-0 items-center gap-1.5 rounded-full border-2 border-foreground/40 bg-primary px-2 py-1 font-display text-sm sm:gap-2 sm:px-3 sm:text-lg tracking-wider text-primary-foreground shadow-poster transition hover:brightness-110"
        >
          <span className="live-dot h-2.5 w-2.5 rounded-full bg-primary-foreground" />
          <span className="hidden min-[400px]:inline md:inline">EN VIVO</span>
          <span className="min-[400px]:hidden">VIVO</span>
          <Radio className="hidden h-5 w-5 sm:block" />
        </Link>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="paper w-[78%] max-w-xs border-r-4 border-ink/40 bg-card p-0 text-card-foreground">
          <SheetTitle className="sr-only">Menú</SheetTitle>
          <div className="flex flex-col items-center gap-1 border-b-4 border-double border-ink/30 p-5">
            <img src={LOGO_URL} alt="Logo oficial de PANDAMONIUM" width={547} height={324} className="h-16 w-auto" />
            <span className="font-western text-xl text-primary">PANDAMONIUM NEWS</span>
          </div>
          <ul className="flex flex-col p-2">
            {NAV.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: to === "/" }}
                  className="flex items-center gap-3 rounded-md border-l-4 border-transparent px-4 py-3 font-display text-2xl tracking-wide text-ink transition hover:bg-ink/5 hover:text-primary data-[status=active]:border-primary data-[status=active]:text-primary"
                >
                  <Icon className="h-5 w-5 shrink-0" /> {label}
                </Link>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
      <nav className="hidden md:block">
        <ul className="paper mx-auto flex max-w-7xl flex-row justify-around rounded-md border-4 border-double border-ink/40">
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
    <footer className="mx-auto mt-12 max-w-7xl px-5 pb-10 text-center md:mt-16">
      <p className="font-western text-lg text-secondary md:text-xl">«El periódico que Santa no quiere que leas»</p>
      <p className="mt-2 font-display text-xl tracking-wider md:text-2xl text-foreground">¡No traemos la magia, la desatamos!</p>
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
