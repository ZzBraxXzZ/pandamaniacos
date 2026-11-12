// Central demo content for PANDAMONIUM NEWS. Replace or load from a database later
// without touching the page designs.
import gifts from "@/assets/news-gifts.jpg";
import reindeer from "@/assets/news-reindeer.jpg";
import santa from "@/assets/news-santa.jpg";
import cookieThief from "@/assets/suspect-cookie.jpg";
import logo from "@/assets/pandamonium-logo.png.asset.json";

export const LOGO_URL = logo.url;

export const NEWS_CATEGORIES = [
  "Última hora",
  "Sucesos del Polo Norte",
  "Investigaciones",
  "Declaraciones",
  "Noticias de Pandatech",
] as const;
export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  body: string;
  category: NewsCategory;
  date: string;
  image: string;
  featured?: boolean;
};

export const news: NewsItem[] = [
  {
    id: "200-regalos",
    title: "¡Desaparecen 200 regalos del Polo Norte!",
    summary: "Autoridades del Polo Norte investigan un posible sabotaje de Pandamonium.",
    body: "Los elfos de inventario reportaron un hueco del tamaño de un trineo en el almacén central. Solo quedó una huella de panda y olor a chocolate caliente. Pandamonium no confirma ni niega, pero se ríe mucho.",
    category: "Última hora",
    date: "2026-12-01",
    image: gifts,
    featured: true,
  },
  {
    id: "santa-renuncia",
    title: "Santa Claus presenta su renuncia",
    summary: "Se le vio salir del taller con un maletín y sin gorro.",
    body: "Testigos aseguran que Santa gritó «¡que lo reparta Pandamonium!» antes de perderse en la nieve. Los elfos siguen trabajando por si acaso.",
    category: "Declaraciones",
    date: "2026-12-03",
    image: santa,
    featured: true,
  },
  {
    id: "huelga-renos",
    title: "Los renos anuncian una huelga indefinida",
    summary: "Exigen más zanahorias y menos vuelos nocturnos.",
    body: "Rodolfo lidera la protesta con la nariz más brillante que nunca. El sindicato de renos culpa a «agitadores con manchas negras y blancas».",
    category: "Sucesos del Polo Norte",
    date: "2026-12-04",
    image: reindeer,
    featured: true,
  },
  {
    id: "actividad-pandas",
    title: "Se reporta actividad sospechosa de pandas",
    summary: "Radares detectan un trineo con cohetes sobre la oficina.",
    body: "El objeto volador no identificado tocaba cornetas y dejaba un rastro de confeti. Fuentes cercanas lo describen como «adorable pero peligroso».",
    category: "Investigaciones",
    date: "2026-12-05",
    image: logo.url,
  },
  {
    id: "duenos-navidad",
    title: "PANDAMONIUM se declara dueño de la Navidad",
    summary: "«No traemos la magia, la desatamos», afirmó su vocero.",
    body: "En un comunicado escrito con crayón rojo, el equipo anunció que la Navidad de Pandatech queda oficialmente bajo su caótica administración.",
    category: "Noticias de Pandatech",
    date: "2026-12-06",
    image: logo.url,
  },
  {
    id: "ladron-galletas",
    title: "Un misterioso ladrón amenaza las reservas de galletas",
    summary: "Desaparecen tres bandejas de la cocina de los elfos.",
    body: "Solo quedan migas y una nota: «Volveré por las de jengibre». Se recomienda esconder las galletas en lugares secretos.",
    category: "Última hora",
    date: "2026-12-07",
    image: cookieThief,
  },
];

export type SuspectStatus = "PRÓFUGO" | "CAPTURADO" | "REINCIDENTE";
export type Suspect = {
  id: string;
  alias: string;
  image: string;
  description: string;
  crimes: string[];
  danger: 1 | 2 | 3 | 4 | 5;
  reward: string;
  status: SuspectStatus;
  history: string[];
};

export const suspects: Suspect[] = [
  {
    id: "ladron-galletas",
    alias: "El Ladrón de Galletas",
    image: cookieThief,
    description: "Silencioso, goloso y siempre con gorro navideño. Nadie ha visto su cara.",
    crimes: ["Robo masivo de galletas", "Migas en la escena del crimen"],
    danger: 4,
    reward: "1 000 galletas de jengibre",
    status: "PRÓFUGO",
    history: ["Cocina de elfos — 3 bandejas", "Mesa de Santa — vaso de leche vacío"],
  },
  {
    id: "panda-trineo",
    alias: "El Piloto del Caos",
    image: logo.url,
    description: "Conduce un trineo con cohetes y cornetas. Le acompañan dos pandas bebé.",
    crimes: ["Exceso de velocidad aérea", "Contaminación sonora navideña"],
    danger: 5,
    reward: "Un año de chocolate caliente",
    status: "REINCIDENTE",
    history: ["Vuelo rasante sobre el Polo Norte", "Choque contra un muñeco de nieve"],
  },
  {
    id: "reno-rebelde",
    alias: "El Reno Rebelde",
    image: reindeer,
    description: "Líder sindical de los renos. Nariz roja, carácter peor.",
    crimes: ["Huelga no autorizada", "Pancartas sin permiso"],
    danger: 2,
    reward: "Un saco de zanahorias",
    status: "CAPTURADO",
    history: ["Bloqueo del establo principal"],
  },
];

export type SecretFile = {
  code: string;
  title: string;
  level: "CONFIDENCIAL" | "SECRETO" | "ULTRASECRETO";
  image: string;
  summary: string;
  clues: string[];
};

export const secretFiles: SecretFile[] = [
  {
    code: "EXP-001",
    title: "El misterio de los 200 regalos",
    level: "ULTRASECRETO",
    image: gifts,
    summary: "200 regalos desaparecidos en una sola noche. Un regalo negro con signo de interrogación quedó en su lugar.",
    clues: ["Huella de panda en la nieve", "Confeti en el almacén", "Olor a chocolate"],
  },
  {
    code: "EXP-002",
    title: "La desaparición de los renos",
    level: "SECRETO",
    image: reindeer,
    summary: "Los renos no desaparecieron: están en huelga. Pero alguien les imprimió las pancartas.",
    clues: ["Pancartas en blanco", "Recibo de imprenta firmado «P.»"],
  },
  {
    code: "EXP-003",
    title: "Operación Galleta",
    level: "CONFIDENCIAL",
    image: cookieThief,
    summary: "Plan para atrapar al ladrón con una galleta señuelo. La galleta también desapareció.",
    clues: ["Migas que llevan al techo", "Gorro rojo abandonado"],
  },
  {
    code: "EXP-004",
    title: "El origen del caos",
    level: "ULTRASECRETO",
    image: logo.url,
    summary: "Todo comenzó cuando un panda encontró un trineo y un par de cohetes.",
    clues: ["Fotografía borrosa de un trineo", "Manual de cohetes con huellas de bambú"],
  },
];

export type LiveReport = { time: string; text: string; alert?: boolean };
export const liveReports: LiveReport[] = [
  { time: "08:15", text: "Se detecta trineo no identificado sobre la oficina.", alert: true },
  { time: "09:40", text: "Los elfos piden refuerzos en el almacén de regalos." },
  { time: "11:02", text: "Desaparece la última bandeja de galletas.", alert: true },
  { time: "13:30", text: "Santa no responde llamadas. Su buzón dice «jo jo no»." },
  { time: "15:45", text: "Pandamonium suma puntos en la competencia navideña." },
];

/** Paste a video embed URL here (e.g. YouTube embed) when a broadcast is available. */
export const LIVE_VIDEO_URL: string | null = null;

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("es-CR", { day: "numeric", month: "short", year: "numeric" });
