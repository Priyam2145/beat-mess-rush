import React from "react";
import {
  UtensilsCrossed, Utensils, Wheat, CookingPot, Carrot, Salad, Sunrise, Sun, MoonStar,
  Clock, Users, QrCode, Leaf, TrendingDown, UserRound, ClipboardList, Plus, X,
  CalendarClock, ChefHat, Timer, BadgeCheck, MessageSquareQuote, FlaskConical,
  Check, Trash2, RefreshCw, AlertTriangle, Activity, Send, Target, Ticket,
  CircleGauge, Scale, ScanLine, ArrowRight, Sparkles, Building2, Info, UserCheck,
  Flame, Gauge, ListChecks, Quote, Download
} from "lucide-react";

/* ============================================================
   Beat the Mess Rush — LPU Hostel Mess Queue & Portion Optimizer
   Single-file React prototype. No backend, no network calls.
   ALL numbers are Prototype Simulation Data.
   ============================================================ */

/* ---------------------------- data ---------------------------- */

const MESSES = [
  { id: "bh1", name: "BH-1 Central Mess", short: "BH1", residents: 1480, load: 1.0, note: "Boys Hostel 1 · 4 counters" },
  { id: "bh2", name: "BH-2 Dining Hall", short: "BH2", residents: 1120, load: 0.82, note: "Boys Hostel 2 · 3 counters" },
  { id: "gh1", name: "GH-1 Mess", short: "GH1", residents: 960, load: 0.66, note: "Girls Hostel 1 · 3 counters" },
];

const MEALS = [
  { id: "breakfast", key: "B", label: "Breakfast", time: "7:30–9:30 AM", start: 7.5, icon: Sunrise,
    curve: [0.44, 0.74, 0.96, 0.70, 0.46, 0.31, 0.22, 0.15] },
  { id: "lunch", key: "L", label: "Lunch", time: "12:30–2:30 PM", start: 12.5, icon: Sun,
    curve: [0.42, 0.88, 1.00, 0.76, 0.54, 0.37, 0.25, 0.15] },
  { id: "dinner", key: "D", label: "Dinner", time: "7:30–9:30 PM", start: 19.5, icon: MoonStar,
    curve: [0.31, 0.56, 0.87, 1.00, 0.79, 0.52, 0.33, 0.19] },
];

const PORTIONS = [
  { v: 0,    key: "skip",  label: "Skip",        pct: "0%",   short: "Skip" },
  { v: 0.5,  key: "half",  label: "Half / Trial", pct: "50%",  short: "Half" },
  { v: 1,    key: "full",  label: "Standard",    pct: "100%", short: "Full" },
  { v: 1.25, key: "extra", label: "Extra Hungry", pct: "125%", short: "Extra" },
];

const TRAY_ITEMS = [
  { id: "roti",  name: "Tawa Roti",       hi: "तवा रोटी",        base: 180, unit: "2 pcs · 180 g",  icon: Wheat },
  { id: "rice",  name: "Steamed Rice",    hi: "भाप वाला चावल",   base: 200, unit: "1 scoop · 200 g", icon: Utensils },
  { id: "dal",   name: "Dal Tadka",       hi: "दाल तड़का",        base: 160, unit: "1 ladle · 160 g", icon: CookingPot },
  { id: "sabzi", name: "Seasonal Sabzi",  hi: "मौसमी सब्ज़ी",    base: 140, unit: "1 ladle · 140 g", icon: Carrot },
  { id: "salad", name: "Salad / Curd",    hi: "सलाद / दही",      base: 90,  unit: "1 bowl · 90 g",  icon: Salad },
];

const INITIAL_FEED = [
  { id: "f1", who: "Ananya S.", hostel: "GH-1", meal: "Lunch",      saved: 96,  picks: { rice: 0.5, sabzi: 0.5 }, at: "2 min ago" },
  { id: "f2", who: "Rohit K.", hostel: "BH-1", meal: "Lunch",       saved: 142, picks: { roti: 1.25, rice: 0, sabzi: 0 }, at: "5 min ago" },
  { id: "f3", who: "Simran B.", hostel: "BH-2", meal: "Breakfast",  saved: 74,  picks: { roti: 0.5, salad: 0 }, at: "9 min ago" },
  { id: "f4", who: "Aditya M.", hostel: "BH-1", meal: "Lunch",      saved: 118, picks: { rice: 0.5, salad: 0.5 }, at: "14 min ago" },
  { id: "f5", who: "Neha T.", hostel: "GH-1", meal: "Dinner",       saved: 63,  picks: { dal: 0.5 }, at: "21 min ago" },
];

const ROOT_CAUSES = [
  { id: "rc1", title: "12:55 PM Class Dismissal Surge", icon: Clock,
    stat: "68% of lunch arrivals in 30 min",
    text: "Three academic blocks release at 12:55 PM, pushing ~700 students into BH-1 within a 25-minute window.",
    tags: ["Queue", "Timing"] },
  { id: "rc2", title: "Rigid Full-Ladle Serving Causes Leftovers", icon: Scale,
    stat: "145 g average plate waste",
    text: "Staff serve one fixed ladle regardless of appetite. Students who want less still receive a full scoop and leave 30–45% behind.",
    tags: ["Wastage", "Portioning"] },
  { id: "rc3", title: "Single Roti Counter Bottleneck", icon: Flame,
    stat: "Roti queue = 54% of total wait",
    text: "Warm rotis are supplied from one counter. The roti line stalls every 4–5 minutes when the hot box is refilled.",
    tags: ["Queue", "Capacity"] },
  { id: "rc4", title: "No Visibility Into Current Queue Length", icon: CircleGauge,
    stat: "0 live signals before Oct pilot",
    text: "Students walk in blind, see the crowd, and either wait or skip the meal — both outcomes hurt attendance and satisfaction.",
    tags: ["Queue", "Information"] },
];

const INSIGHTS = [
  { id: "i1", type: "student", role: "Student", who: "B.Tech CSE, 3rd year · BH-1", category: "Queue", rating: "Peak rush",
    text: "I have a 1:00 PM lab. If the line is past the handwash station I skip lunch completely — I'd rather lose a meal than a lab attendance." },
  { id: "i2", type: "student", role: "Student", who: "BBA, 2nd year · GH-1", category: "Wastage", rating: "Half portion",
    text: "I eat only one roti but get two by default. I feel awkward refusing, so it goes straight into the bin. Just let me tick 'half' before I arrive." },
  { id: "i3", type: "student", role: "Student", who: "B.Tech ME, 4th year · BH-2", category: "Queue", rating: "Suggestions",
    text: "A live 'how crowded is it right now' badge on the hostel WhatsApp group would change when I walk over." },
  { id: "i4", type: "staff", role: "Mess Staff", who: "Counter supervisor · BH-1", category: "Queue", rating: "Roti counter",
    text: "From 12:50 to 1:25 we cannot keep up. Two people on roti is not enough; the hot box empties in four minutes." },
  { id: "i5", type: "staff", role: "Mess Staff", who: "Head cook · BH-1", category: "Wastage", rating: "Plate audit",
    text: "The bins tell the story. At the end of lunch we collect almost three full bins of rice and sabzi, mostly from first-year trays." },
  { id: "i6", type: "staff", role: "Mess Staff", who: "Mess manager · GH-1", category: "Wastage", rating: "Pre-portioning",
    text: "If we get the headcount and portion split a few hours early, we cook closer to demand and throw away far less." },
  { id: "i7", type: "pilot", role: "Pilot Log", who: "Before vs After · BH-2 Dining Hall", category: "Queue", rating: "6-day pilot",
    text: "With staggered Quick-Pass windows, the 12:45–1:00 block queue dropped from 132 students outside to 48 — wait fell 18 → 6 minutes." },
  { id: "i8", type: "pilot", role: "Pilot Log", who: "Before vs After · BH-2 Dining Hall", category: "Wastage", rating: "6-day pilot",
    text: "Pre-portion selection cut plate wastage from 145 g to 42 g per student. The biggest drop came from rice and sabzi halves." },
  { id: "i9", type: "insight", role: "Observation", who: "Walkthrough · 3 messes", category: "Queue", rating: "Structural",
    text: "Queue time is driven less by total footfall and more by arrival clustering — the same 900 students spread over 90 minutes never queue." },
  { id: "i10", type: "insight", role: "Observation", who: "Plate-weight audit · 40 trays", category: "Wastage", rating: "Measured",
    text: "Waste scales with scoop size, not appetite: trays with a full rice scoop averaged 2.4× the leftovers of half-scoop trays." },
];

const COMPARISON = [
  { label: "Average wait time", unit: "min", before: 18, after: 6,  lowerBetter: true, icon: Timer },
  { label: "Plate wastage / student", unit: "g", before: 145, after: 42, lowerBetter: true, icon: Scale },
  { label: "Peak queue length", unit: "students", before: 132, after: 48, lowerBetter: true, icon: Users },
  { label: "Mess food wasted / day", unit: "kg", before: 72, after: 21, lowerBetter: true, icon: Trash2 },
];

const ROLE_OPTIONS = ["Student", "Mess Staff", "Evaluator"];
const CATEGORY_OPTIONS = ["Queue", "Wastage"];

const INITIAL_NOTES = [
  { id: "n1", role: "Evaluator", category: "Queue", note: "Counted 41 students waiting outside BH-1 at 12:52 PM; the roti counter was the last station to clear.", at: "Today · 12:58 PM" },
  { id: "n2", role: "Mess Staff", category: "Wastage", note: "Sabzi bin weighed 6.3 kg after lunch — largely untouched portions from 2nd-year trays.", at: "Yesterday · 2:40 PM" },
];

/* --------------------------- helpers --------------------------- */

const pad = (n) => String(n).padStart(2, "0");

function fmtTime(startDecimal, plusMin) {
  let t = startDecimal * 60 + plusMin;
  let h24 = Math.floor(t / 60) % 24;
  let m = t % 60;
  const suffix = h24 >= 12 ? "PM" : "AM";
  let h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${pad(m)} ${suffix}`;
}

function hashStr(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

function statusOf(crowd) {
  if (crowd <= 35) return { key: "low", label: "Low Rush", dot: "bg-emerald-500", chip: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30", bar: "bg-emerald-500" };
  if (crowd <= 68) return { key: "moderate", label: "Moderate", dot: "bg-amber-500", chip: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30", bar: "bg-amber-500" };
  return { key: "peak", label: "Peak Rush", dot: "bg-rose-500", chip: "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/30", bar: "bg-rose-500" };
}

function useLocalTheme() {
  const [theme, setTheme] = React.useState(() => {
    try { return localStorage.getItem("btmr-theme") || "light"; } catch { return "light"; }
  });
  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark"); else root.classList.remove("dark");
    try { localStorage.setItem("btmr-theme", theme); } catch {}
  }, [theme]);
  return [theme, setTheme];
}

/* -------------------------- primitives ------------------------- */

function Card({ className = "", children, ...rest }) {
  return (
    <div
      {...rest}
      className={`rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/40 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20 ${className}`}
    >
      {children}
    </div>
  );
}

function DataBadge({ compact = false }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500 ring-1 ring-inset ring-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700">
      <Sparkles className="h-3 w-3" />
      {compact ? "Simulated" : "Prototype Simulation Data"}
    </span>
  );
}

function SectionTitle({ icon: Icon, eyebrow, title, desc, right }) {
  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-sm shadow-orange-500/30">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          {eyebrow && <p className="text-[11px] font-bold uppercase tracking-widest text-orange-600 dark:text-amber-400">{eyebrow}</p>}
          <h2 className="text-lg font-bold text-slate-900 dark:text-white sm:text-xl">{title}</h2>
          {desc && <p className="mt-0.5 max-w-2xl text-sm text-slate-500 dark:text-slate-400">{desc}</p>}
        </div>
      </div>
      {right}
    </div>
  );
}

/* ============================== APP ============================== */

export default function App() {
  const [theme, setTheme] = useLocalTheme();
  const [tab, setTab] = React.useState("optimizer");
  const tabRefs = React.useRef({});

  React.useEffect(() => {
    const el = tabRefs.current[tab];
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [tab]);

  const TABS = [
    { id: "optimizer", label: "Live Mess Optimizer", icon: Activity },
    { id: "portion", label: "Smart Portion Selector", icon: Scale },
    { id: "research", label: "Field Research & Pilot Results", icon: FlaskConical },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {/* ---------------------------- navbar ---------------------------- */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/85">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-orange-700 text-white shadow-lg shadow-orange-500/30">
              <UtensilsCrossed className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-base font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-lg">
                Beat the Mess Rush
              </h1>
              <p className="truncate text-[11px] text-slate-500 dark:text-slate-400 sm:text-xs">
                LPU Hostel Mess Queue &amp; Portion Optimization Prototype
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 xl:flex">
            <DataBadge />
          </div>

          {/* theme switch */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            role="switch"
            aria-checked={theme === "dark"}
            aria-label="Toggle dark mode"
            className="group relative flex h-9 w-[76px] shrink-0 items-center rounded-full border border-slate-200 bg-slate-100 p-1 transition-colors duration-300 hover:border-orange-300 dark:border-slate-700 dark:bg-slate-800"
          >
            <span
              className={`absolute grid h-7 w-7 place-items-center rounded-full bg-white text-amber-600 shadow transition-all duration-300 dark:bg-slate-950 dark:text-amber-300 ${
                theme === "dark" ? "translate-x-[40px]" : "translate-x-0"
              }`}
            >
              {theme === "dark" ? <MoonStar className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </span>
            <span className="ml-1 flex w-full items-center justify-between px-1 text-slate-400 dark:text-slate-500">
              <Sun className="h-3.5 w-3.5" />
              <MoonStar className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>

        {/* tabs */}
        <nav className="mx-auto max-w-7xl px-2 sm:px-6">
          <div className="no-scrollbar -mb-px flex gap-1 overflow-x-auto">
            {TABS.map((t) => {
              const active = tab === t.id;
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  ref={(el) => { tabRefs.current[t.id] = el; }}
                  onClick={() => setTab(t.id)}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex shrink-0 items-center gap-2 whitespace-nowrap rounded-t-lg px-3 py-3 text-[13px] font-semibold transition-colors sm:px-4 ${
                    active
                      ? "text-orange-700 dark:text-amber-400"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {t.label}
                  <span
                    className={`absolute inset-x-2 bottom-0 h-[3px] rounded-t-full bg-gradient-to-r from-amber-400 to-orange-600 transition-opacity ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {tab === "optimizer" && <OptimizerTab />}
        {tab === "portion" && <PortionTab />}
        {tab === "research" && <ResearchTab />}
      </main>

      <footer className="mt-4 border-t border-slate-200 bg-white/60 py-6 transition-colors dark:border-slate-800 dark:bg-slate-950/60">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 text-xs text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:px-6">
          <p className="flex items-center gap-2">
            <BadgeCheck className="h-4 w-4 text-orange-500" />
            Lovely Professional University · Student Prototype Project · All metrics are Prototype Simulation Data.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <p className="flex items-center gap-2">
              <FlaskConical className="h-4 w-4" /> Self-contained demo · no backend, no network calls
            </p>
            <a
              href="./BeatTheMessRush.jsx"
              download
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2 py-1 font-semibold text-slate-600 transition-colors hover:border-orange-300 hover:text-orange-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-amber-500/40 dark:hover:text-amber-300"
            >
              <Download className="h-3.5 w-3.5" /> Component source (.jsx)
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ====================== TAB 1 — OPTIMIZER ====================== */

function windowKey(messId, mealId, i) { return `${messId}-${mealId}-${i}`; }

function buildWindows(mess, meal, bookings) {
  return meal.curve.map((c, i) => {
    const seed = hashStr(`${mess.id}|${meal.id}|${i}`);
    const jitter = (seed % 9) - 4;
    const bookedHere = bookings.filter((b) => b.window === windowKey(mess.id, meal.id, i)).length;
    const raw = Math.round(c * mess.load * 100) + jitter;
    const base = Math.max(6, Math.min(99, raw));
    const crowd = Math.max(4, base - bookedHere * 5);
    const frac = crowd / 99;
    const wait = Math.max(2, Math.round(crowd * 0.19));
    const counter = (offset, spread) => {
      const s = hashStr(`${mess.id}${meal.id}${i}${offset}`) % 13;
      return Math.max(6, Math.min(99, Math.round(crowd + offset + (s - 6) * spread)));
    };
    return {
      i,
      key: windowKey(mess.id, meal.id, i),
      from: fmtTime(meal.start, i * 15),
      to: fmtTime(meal.start, i * 15 + 15),
      crowd, frac, wait,
      status: statusOf(crowd),
      counters: { roti: counter(7, 0.8), rice: counter(-9, 0.7), sabzi: counter(-17, 0.6) },
      bookedHere,
    };
  });
}

function makeToken(mess, meal, win, n) {
  const seed = hashStr(`${win.key}-${n}`);
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const tail = Array.from({ length: 4 }, (_, k) => letters[(seed >>> (k * 5)) % letters.length]).join("");
  return {
    id: `LPU-${mess.short}-${meal.key}${pad(win.i + 1)}-${tail}`,
    mess: mess.name, messShort: mess.short, meal: meal.label, mealTime: meal.time,
    window: `${win.from} – ${win.to}`, windowKey: win.key, windowIndex: win.i,
    wait: win.wait, crowd: win.crowd,
    saved: Math.max(2, Math.round(win.wait * 0.62)),
    entry: `${win.from}`,
    seed,
  };
}

function OptimizerTab() {
  const [messId, setMessId] = React.useState("bh1");
  const [mealId, setMealId] = React.useState("lunch");
  const [bookings, setBookings] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState(null);
  const [rescheduling, setRescheduling] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [issuedCount, setIssuedCount] = React.useState(1284);

  const mess = MESSES.find((m) => m.id === messId);
  const meal = MEALS.find((m) => m.id === mealId);
  const windows = buildWindows(mess, meal, bookings);
  const tokenRef = React.useRef(null);
  const focusToken = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1280) {
      setTimeout(() => tokenRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  };

  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const selected = bookings.find((b) => b.id === selectedId) || null;
  const peakWindow = windows.reduce((a, b) => (b.wait > a.wait ? b : a), windows[0]);
  const avgWait = Math.round(windows.reduce((s, w) => s + w.wait, 0) / windows.length);
  const liveInside = Math.round(mess.residents * (windows[3].crowd / 100) * 0.028);
  const totalSaved = bookings.reduce((s, b) => s + b.saved, 0);

  function bookOrMove(win) {
    if (rescheduling) {
      const updated = bookings.map((b) => {
        if (b.id !== rescheduling) return b;
        const fresh = makeToken(mess, meal, win, issuedCount + 1);
        return { ...fresh, id: fresh.id };
      });
      setBookings(updated);
      const target = updated.find((b) => b.id !== rescheduling && b.windowKey === win.key) || updated[updated.length - 1];
      setSelectedId(target.id);
      setRescheduling(null);
      setToast({ kind: "move", text: "Slot rescheduled — crowd counts refreshed." });
      return;
    }
    const existing = bookings.find((b) => b.windowKey === win.key);
    if (existing) { setSelectedId(existing.id); return; }
    const token = makeToken(mess, meal, win, issuedCount + 1);
    setIssuedCount((n) => n + 1);
    setBookings([token, ...bookings]);
    setSelectedId(token.id);
    setToast({ kind: "book", text: `Quick-Pass ${token.id} confirmed for ${token.window}.` });
    focusToken();
  }

  function cancel(id) {
    setBookings(bookings.filter((b) => b.id !== id));
    if (selectedId === id) setSelectedId(null);
    if (rescheduling === id) setRescheduling(null);
    setToast({ kind: "cancel", text: "Pass cancelled — the slot has been released back to live capacity." });
  }

  return (
    <div className="space-y-6">
      {/* hero / live strip */}
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950 p-5 text-white shadow-lg shadow-orange-900/10 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-500/30">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Live counter feed · simulated
              </span>
              <DataBadge />
            </div>
            <h2 className="mt-3 text-xl font-extrabold tracking-tight sm:text-2xl">Live Mess Optimizer</h2>
            <p className="mt-1 max-w-xl text-sm text-slate-300">
              Pick a mess and meal, then grab a staggered Quick-Pass entry window to skip the peak-hour crush.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MiniStat icon={Users} label="Inside now" value={liveInside} />
            <MiniStat icon={Timer} label="Avg wait" value={`${avgWait} min`} />
            <MiniStat icon={QrCode} label="Passes issued" value={issuedCount.toLocaleString("en-IN")} />
            <MiniStat icon={Leaf} label="Wait saved" value={`${totalSaved} min`} accent />
          </div>
        </div>
      </div>

      {/* selectors */}
      <Card className="p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              <Building2 className="h-3.5 w-3.5" /> Hostel Mess
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              {MESSES.map((m) => {
                const active = m.id === messId;
                return (
                  <button
                    key={m.id}
                    onClick={() => { setMessId(m.id); setRescheduling(null); }}
                    aria-pressed={active}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      active
                        ? "border-orange-500 bg-orange-50 ring-2 ring-orange-500/20 dark:border-amber-500 dark:bg-amber-500/10 dark:ring-amber-500/20"
                        : "border-slate-200 bg-white hover:border-orange-300 hover:bg-orange-50/40 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-sm font-bold ${active ? "text-orange-800 dark:text-amber-300" : "text-slate-800 dark:text-slate-100"}`}>{m.name}</span>
                      {active && <Check className="h-4 w-4 shrink-0 text-orange-600 dark:text-amber-400" />}
                    </div>
                    <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">{m.note}</p>
                    <p className="mt-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                      {(m.residents * m.load).toLocaleString("en-IN", { maximumFractionDigits: 0 })} avg. footfall / meal
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              <Clock className="h-3.5 w-3.5" /> Meal Slot
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              {MEALS.map((m) => {
                const active = m.id === mealId;
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => { setMealId(m.id); setRescheduling(null); }}
                    aria-pressed={active}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      active
                        ? "border-orange-500 bg-gradient-to-br from-amber-50 to-orange-50 ring-2 ring-orange-500/20 dark:border-amber-500 dark:from-amber-500/10 dark:to-orange-500/5 dark:ring-amber-500/20"
                        : "border-slate-200 bg-white hover:border-orange-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Icon className={`h-4 w-4 shrink-0 ${active ? "text-orange-600 dark:text-amber-400" : "text-slate-400"}`} />
                      <span className={`text-[13px] font-bold ${active ? "text-orange-800 dark:text-amber-300" : "text-slate-800 dark:text-slate-100"}`}>{m.label}</span>
                    </span>
                    <p className="mt-1 whitespace-nowrap text-[10.5px] font-medium text-slate-500 dark:text-slate-400">{m.time}</p>
                  </button>
                );
              })}
            </div>
            <div className="mt-2 flex items-start gap-2 rounded-xl bg-slate-50 p-2.5 text-[11px] text-slate-600 ring-1 ring-inset ring-slate-200 dark:bg-slate-800/60 dark:text-slate-300 dark:ring-slate-700">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-500" />
              <span>
                <strong className="font-bold text-slate-800 dark:text-slate-100">Peak alert:</strong> the{" "}
                <strong className="font-bold text-slate-800 dark:text-slate-100">{peakWindow.from}</strong> window
                is the busiest for {mess.name} — Quick-Pass recommended.
              </span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.55fr_1fr]">
        {/* timeline */}
        <div>
          <SectionTitle
            icon={CalendarClock}
            eyebrow="Peak-hour timeline"
            title={`${meal.label} arrival windows · ${mess.name}`}
            desc="15-minute staggered windows. Tap a window to reserve a Quick-Pass entry token."
            right={<DataBadge />}
          />

          <div className="mb-3 flex flex-wrap items-center gap-3 text-[11px] font-medium text-slate-500 dark:text-slate-400">
            {[["Low Rush", "bg-emerald-500"], ["Moderate", "bg-amber-500"], ["Peak Rush", "bg-rose-500"]].map(([l, c]) => (
              <span key={l} className="inline-flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${c}`} /> {l}
              </span>
            ))}
            {bookings.length > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full ring-2 ring-orange-500" /> Your pass
              </span>
            )}
            <span className="ml-auto hidden items-center gap-1 text-slate-400 sm:inline-flex">
              <ScanLine className="h-3 w-3" /> tap a window to book
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {windows.map((w) => {
              const isBooked = w.bookedHere > 0;
              const isRescheduleTarget = !!rescheduling;
              return (
                <button
                  key={w.key}
                  onClick={() => bookOrMove(w)}
                  className={`group relative overflow-hidden rounded-xl border p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                    isBooked
                      ? "border-orange-500 bg-orange-50/70 ring-2 ring-orange-500/25 dark:border-amber-500 dark:bg-amber-500/10 dark:ring-amber-500/25"
                      : isRescheduleTarget
                      ? "border-dashed border-orange-400 bg-white hover:border-orange-600 dark:border-amber-500/60 dark:bg-slate-900"
                      : "border-slate-200 bg-white hover:border-orange-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500"
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <p className="flex items-center gap-1 text-[13px] font-extrabold leading-none text-slate-900 dark:text-white">
                        {w.from}
                        {isBooked && <span className="h-1.5 w-1.5 rounded-full bg-orange-500 ring-2 ring-orange-200 dark:ring-orange-500/30" />}
                      </p>
                      <p className="mt-1 text-[10px] font-medium text-slate-400">to {w.to}</p>
                    </div>
                    <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ring-1 ring-inset ${w.status.chip}`}>
                      {w.status.label}
                    </span>
                  </div>

                  <div className="mt-2.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Crowd</span>
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">{w.crowd}%</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div className={`h-full rounded-full transition-all duration-500 ${w.status.bar}`} style={{ width: `${w.crowd}%` }} />
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-200">
                      <Timer className="h-3 w-3 text-slate-400" /> ~{w.wait} min
                    </span>
                    <span className="text-[10px] text-slate-400">{isBooked ? "Pass active" : "Available"}</span>
                  </div>

                  <div className="mt-2 space-y-1 border-t border-slate-100 pt-2 dark:border-slate-800">
                    {[["Roti", w.counters.roti], ["Rice/Dal", w.counters.rice], ["Sabzi/Curd", w.counters.sabzi]].map(([lbl, val]) => (
                      <div key={lbl} className="flex items-center gap-1.5">
                        <span className="w-[52px] shrink-0 text-[9px] font-medium text-slate-400">{lbl}</span>
                        <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                          <div
                            className={`h-full rounded-full ${val > 80 ? "bg-rose-500" : val > 55 ? "bg-amber-500" : "bg-emerald-500"}`}
                            style={{ width: `${val}%` }}
                          />
                        </div>
                        <span className="w-5 text-right text-[9px] font-semibold text-slate-500 dark:text-slate-400">{val}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    className={`mt-2.5 flex items-center justify-center gap-1 rounded-lg py-1.5 text-[10px] font-bold transition-colors ${
                      isBooked
                        ? "bg-orange-600 text-white dark:bg-amber-500 dark:text-slate-950"
                        : "bg-slate-100 text-slate-600 group-hover:bg-orange-600 group-hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-amber-500 dark:group-hover:text-slate-950"
                    }`}
                  >
                    {isBooked ? <><Check className="h-3 w-3" /> Pass booked</> : <><ScanLine className="h-3 w-3" /> Book Quick-Pass</>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* counter load detail */}
          <Card className="mt-4 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-100">
                <Gauge className="h-4 w-4 text-orange-500" /> Active counter load · {meal.label}
              </p>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Simulated sensors</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { name: "Roti Counter", icon: Flame, key: "roti" },
                { name: "Rice / Dal Counter", icon: Utensils, key: "rice" },
                { name: "Sabzi / Curd Counter", icon: CookingPot, key: "sabzi" },
              ].map((c) => {
                const avg = Math.round(windows.reduce((s, w) => s + w.counters[c.key], 0) / windows.length);
                const max = Math.max(...windows.map((w) => w.counters[c.key]));
                const Icon = c.icon;
                const tone = avg > 75
                  ? "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300"
                  : avg > 55
                  ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300"
                  : "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300";
                return (
                  <div key={c.key} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <span className={`grid h-7 w-7 place-items-center rounded-lg ${tone}`}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[12px] font-bold text-slate-800 dark:text-slate-100">{c.name}</p>
                        <p className="text-[10px] text-slate-400">avg {avg}% · peak {max}%</p>
                      </div>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div
                        className={`h-full rounded-full ${avg > 75 ? "bg-rose-500" : avg > 55 ? "bg-amber-500" : "bg-emerald-500"}`}
                        style={{ width: `${avg}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* token panel */}
        <div ref={tokenRef} className="scroll-mt-40 xl:sticky xl:top-[120px] xl:self-start">
          <SectionTitle icon={QrCode} eyebrow="Digital mess token" title="Quick-Pass" desc="Show this at the entry gate." />
          {rescheduling && (
            <div className="mb-3 flex items-center gap-2 rounded-xl border border-orange-300 bg-orange-50 p-2.5 text-[11px] font-semibold text-orange-800 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-300">
              <RefreshCw className="h-3.5 w-3.5 shrink-0" />
              Reschedule mode — tap any window on the timeline to move this pass.
              <button onClick={() => setRescheduling(null)} className="ml-auto rounded-md p-0.5 hover:bg-orange-200/60 dark:hover:bg-amber-500/20" aria-label="Cancel reschedule">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {selected ? (
            <TokenCard token={selected} onCancel={() => cancel(selected.id)} onReschedule={() => setRescheduling(selected.id)} />
          ) : (
            <Card className="border-dashed p-6 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                <Ticket className="h-7 w-7" />
              </div>
              <p className="mt-3 text-sm font-bold text-slate-800 dark:text-slate-100">No active pass</p>
              <p className="mx-auto mt-1 max-w-[240px] text-xs text-slate-500 dark:text-slate-400">
                Tap any 15-minute window on the timeline to generate a staggered entry token.
              </p>
            </Card>
          )}

          {/* my passes list */}
          {bookings.length > 0 && (
            <Card className="mt-4 p-4">
              <p className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5"><ListChecks className="h-3.5 w-3.5" /> My passes</span>
                <span className="rounded-full bg-orange-100 px-1.5 py-0.5 text-[10px] text-orange-700 dark:bg-amber-500/15 dark:text-amber-300">{bookings.length}</span>
              </p>
              <div className="space-y-1.5">
                {bookings.map((b) => (
                  <div key={b.id} className="flex items-center gap-2 rounded-lg border border-slate-200 px-2 py-1.5 text-[11px] dark:border-slate-700">
                    <button onClick={() => setSelectedId(b.id)} className="min-w-0 flex-1 text-left">
                      <span className="block truncate font-bold text-slate-800 dark:text-slate-100">{b.messShort} · {b.meal}</span>
                      <span className="block truncate text-[10px] text-slate-500 dark:text-slate-400">{b.window}</span>
                    </button>
                    <button onClick={() => cancel(b.id)} className="rounded-md p-1 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-400" aria-label={`Cancel ${b.id}`}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <Card className="mt-4 p-4">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <Target className="h-3.5 w-3.5" /> How the stagger works
            </p>
            <ul className="mt-2 space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
              <li className="flex gap-1.5"><ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-orange-500" /> Each pass books a 15-minute entry window, not a fixed seat.</li>
              <li className="flex gap-1.5"><ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-orange-500" /> Booking a pass releases load from the window in real time (−5% simulated crowd).</li>
              <li className="flex gap-1.5"><ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-orange-500" /> Cancelling returns the slot to live capacity instantly.</li>
            </ul>
          </Card>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2">
          <div className="flex items-start gap-2.5 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white shadow-2xl">
            <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${toast.kind === "cancel" ? "bg-rose-500" : "bg-emerald-500"}`}>
              {toast.kind === "cancel" ? <X className="h-3 w-3" /> : <Check className="h-3 w-3" />}
            </span>
            <p className="text-[12px] leading-snug">{toast.text}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function MiniStat({ icon: Icon, label, value, accent }) {
  return (
    <div className={`rounded-xl px-3 py-2 ring-1 ring-inset ${accent ? "bg-amber-400/15 ring-amber-400/30" : "bg-white/10 ring-white/15"}`}>
      <p className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-slate-300">
        <Icon className="h-3 w-3" /> {label}
      </p>
      <p className={`mt-0.5 text-base font-extrabold leading-none ${accent ? "text-amber-300" : "text-white"}`}>{value}</p>
    </div>
  );
}

function QRPattern({ seed }) {
  const n = 25;
  const cells = React.useMemo(() => {
    let h = (seed || 12345) >>> 0 || 12345;
    const rand = () => {
      h ^= h << 13; h >>>= 0;
      h ^= h >>> 17;
      h ^= h << 5; h >>>= 0;
      return h / 4294967296;
    };
    const out = [];
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        const inFinder = (x < 7 && y < 7) || (x > n - 8 && y < 7) || (x < 7 && y > n - 8);
        let on;
        if (inFinder) {
          const lx = x < 7 ? x : x - (n - 7);
          const ly = y < 7 ? y : y - (n - 7);
          on = lx === 0 || lx === 6 || ly === 0 || ly === 6 || (lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4);
        } else {
          on = rand() > 0.5;
        }
        out.push(on);
      }
    }
    return out;
  }, [seed]);

  return (
    <div className="rounded-xl bg-white p-2 ring-1 ring-slate-200" aria-hidden="true">
      <div className="grid gap-[1px]" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
        {cells.map((on, i) => (
          <span key={i} className={`aspect-square rounded-[1px] ${on ? "bg-slate-900" : "bg-white"}`} />
        ))}
      </div>
    </div>
  );
}

function TokenCard({ token, onCancel, onReschedule }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between gap-2 bg-gradient-to-r from-orange-600 to-amber-500 px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <Ticket className="h-4 w-4" />
          <span className="text-xs font-extrabold uppercase tracking-widest">Mess Quick-Pass</span>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold">
          <BadgeCheck className="h-3 w-3" /> Confirmed
        </span>
      </div>

      <div className="p-4">
        <div className="mx-auto w-[172px]">
          <QRPattern seed={token.seed} />
        </div>
        <p className="mt-2 text-center font-mono text-[12px] font-bold tracking-wider text-slate-800 dark:text-slate-100">{token.id}</p>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-emerald-50 px-3 py-2.5 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/10 dark:ring-emerald-500/30">
          <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">
            <TrendingDown className="h-4 w-4" /> Wait saved
          </span>
          <span className="text-2xl font-extrabold leading-none text-emerald-700 dark:text-emerald-300">{token.saved} <span className="text-xs font-bold">min</span></span>
        </div>

        <dl className="mt-3 divide-y divide-slate-100 text-[12px] dark:divide-slate-800">
          {[
            ["Hostel Mess", token.mess],
            ["Meal Slot", `${token.meal} · ${token.mealTime}`],
            ["Entry Window", token.window],
            ["Live crowd at entry", `${token.crowd}% load`],
            ["Est. wait now", `${token.wait} min`],
          ].map(([k, v]) => (
            <div key={k} className="flex items-start justify-between gap-3 py-1.5">
              <dt className="shrink-0 text-slate-500 dark:text-slate-400">{k}</dt>
              <dd className="min-w-0 truncate text-right font-semibold text-slate-800 dark:text-slate-100" title={String(v)}>{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            onClick={onCancel}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[12px] font-bold text-slate-700 transition-colors hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-rose-500/40 dark:hover:bg-rose-500/10 dark:hover:text-rose-300"
          >
            <X className="h-3.5 w-3.5" /> Cancel
          </button>
          <button
            onClick={onReschedule}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-orange-600 px-3 py-2 text-[12px] font-bold text-white transition-colors hover:bg-orange-700 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Reschedule
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] leading-relaxed text-slate-400">
          Demo token · not a real mess entry pass. Prototype Simulation Data.
        </p>
      </div>
    </Card>
  );
}

/* ====================== TAB 2 — PORTION ====================== */

function PortionTab() {
  const [picks, setPicks] = React.useState({ roti: 1, rice: 1, dal: 1, sabzi: 1, salad: 1 });
  const [feed, setFeed] = React.useState(INITIAL_FEED);
  const [meal, setMeal] = React.useState("Lunch");
  const [streakDays, setStreakDays] = React.useState(6);
  const [flash, setFlash] = React.useState(false);
  const [logged, setLogged] = React.useState(0);

  const setPick = (id, v) => setPicks((p) => ({ ...p, [id]: v }));

  const calc = React.useMemo(() => {
    let served = 0, prevented = 0, extra = 0, customized = 0;
    TRAY_ITEMS.forEach((it) => {
      const v = picks[it.id];
      const chosen = it.base * v;
      served += chosen;
      if (v < 1) prevented += it.base * (1 - v) * 0.62;
      if (v > 1) extra += chosen - it.base;
      if (v !== 1) customized += 1;
    });
    const baseTotal = TRAY_ITEMS.reduce((s, i) => s + i.base, 0);
    const preventedG = Math.round(prevented);
    const dailyKg = (preventedG * 500) / 1000;
    const score = Math.max(0, Math.min(100, Math.round((preventedG / (baseTotal * 0.62)) * 100)));
    return { served: Math.round(served), baseTotal, preventedG, extra: Math.round(extra), dailyKg, score, customized, co2: Math.round(dailyKg * 2.2) };
  }, [picks]);

  const badge =
    calc.score >= 80 ? { name: "Zero-Waste Champion", tone: "emerald", icon: Sparkles } :
    calc.score >= 55 ? { name: "Green Campus Badge", tone: "emerald", icon: Leaf } :
    calc.score >= 25 ? { name: "Portion Aware", tone: "amber", icon: Wheat } :
    { name: "Plate Rookie", tone: "slate", icon: Scale };

  const summary = TRAY_ITEMS.filter((it) => picks[it.id] !== 1)
    .map((it) => {
      const p = PORTIONS.find((x) => x.v === picks[it.id]);
      return `${p.short} ${it.name.split(" ")[0]}`;
    });

  function submit() {
    const entry = {
      id: "f" + Date.now(),
      who: "You (prototype demo)",
      hostel: "BH-1",
      meal,
      saved: calc.preventedG,
      picks: Object.fromEntries(TRAY_ITEMS.filter((i) => picks[i.id] !== 1).map((i) => [i.id, picks[i.id]])),
      at: "just now",
    };
    setFeed([entry, ...feed].slice(0, 8));
    if (logged === 0) setStreakDays((d) => d + 1);
    setLogged((n) => n + 1);
    setFlash(true);
    setTimeout(() => setFlash(false), 1800);
  }

  function resetTray() { setPicks({ roti: 1, rice: 1, dal: 1, sabzi: 1, salad: 1 }); }

  const toneClasses = {
    emerald: "from-emerald-500 to-teal-600 text-white",
    amber: "from-amber-400 to-orange-500 text-white",
    slate: "from-slate-400 to-slate-600 text-white",
  };

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-900 p-5 text-white shadow-lg sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-500/30">
                <Leaf className="h-3 w-3" /> Wastage reduction simulator
              </span>
              <DataBadge />
            </div>
            <h2 className="mt-3 text-xl font-extrabold tracking-tight sm:text-2xl">Smart Portion Selector</h2>
            <p className="mt-1 max-w-xl text-sm text-slate-300">
              Pre-declare your portion sizes before entering the mess. Smaller scoops mean less left on the plate — and less cooked and thrown away.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/10 px-3 py-2 ring-1 ring-inset ring-white/15">
              <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-300">Your tray</p>
              <p className="mt-0.5 text-base font-extrabold leading-none">{calc.served} g</p>
            </div>
            <div className="rounded-xl bg-emerald-400/15 px-3 py-2 ring-1 ring-inset ring-emerald-400/30">
              <p className="text-[9px] font-semibold uppercase tracking-wide text-emerald-300">Waste prevented</p>
              <p className="mt-0.5 text-base font-extrabold leading-none text-emerald-300">{calc.preventedG} g</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* tray builder */}
        <div>
          <SectionTitle
            icon={Utensils}
            eyebrow="Interactive tray builder"
            title="Choose your portions"
            desc="Fixed-scoop serving is the baseline (100%). Tap a portion size on any item."
            right={
              <div className="flex items-center gap-2">
                <select
                  value={meal}
                  onChange={(e) => setMeal(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 outline-none transition-colors focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  aria-label="Meal for preference"
                >
                  {MEALS.map((m) => <option key={m.id} value={m.label}>{m.label}</option>)}
                </select>
                <button onClick={resetTray} className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                  <RefreshCw className="h-3.5 w-3.5" /> Reset
                </button>
              </div>
            }
          />

          <div className="space-y-3">
            {TRAY_ITEMS.map((item) => {
              const v = picks[item.id];
              const active = PORTIONS.find((p) => p.v === v);
              const grams = Math.round(item.base * v);
              const Icon = item.icon;
              const fillPct = Math.min(100, (v / 1.25) * 100);
              return (
                <Card key={item.id} className="p-3.5 sm:p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-200 text-orange-700 dark:from-amber-500/20 dark:to-orange-500/10 dark:text-amber-300">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="absolute -bottom-1 -right-1 rounded-full bg-white px-1 text-[9px] font-extrabold text-slate-700 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700">
                        {grams}g
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-slate-900 dark:text-white">{item.name}</p>
                      <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">{item.hi} · {item.unit}</p>
                    </div>

                    <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-extrabold ${
                      v === 0
                        ? "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                        : v > 1
                        ? "bg-orange-100 text-orange-700 dark:bg-amber-500/15 dark:text-amber-300"
                        : v < 1
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    }`}>
                      {active.pct}
                    </span>
                  </div>

                  <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${v === 0 ? "bg-slate-300 dark:bg-slate-600" : v > 1 ? "bg-orange-500" : "bg-emerald-500"}`}
                      style={{ width: `${fillPct}%` }}
                    />
                  </div>

                  <div className="mt-2.5 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                    {PORTIONS.map((p) => {
                      const on = p.v === v;
                      return (
                        <button
                          key={p.key}
                          onClick={() => setPick(item.id, p.v)}
                          aria-pressed={on}
                          className={`rounded-lg border px-2 py-2 text-left transition-all ${
                            on
                              ? p.key === "skip"
                                ? "border-slate-400 bg-slate-100 ring-2 ring-slate-400/20 dark:border-slate-500 dark:bg-slate-800 dark:ring-slate-500/25"
                                : p.key === "extra"
                                ? "border-orange-500 bg-orange-50 ring-2 ring-orange-500/20 dark:border-amber-500 dark:bg-amber-500/10 dark:ring-amber-500/25"
                                : "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20 dark:border-emerald-500 dark:bg-emerald-500/10 dark:ring-emerald-500/25"
                              : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600 dark:hover:bg-slate-800/60"
                          }`}
                        >
                          <span className="flex items-center justify-between gap-1">
                            <span className={`text-[11px] font-bold ${on ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-200"}`}>{p.label}</span>
                            {on && <Check className={`h-3 w-3 ${p.key === "skip" ? "text-slate-500" : p.key === "extra" ? "text-orange-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"}`} />}
                          </span>
                          <span className="mt-0.5 block text-[10px] font-semibold text-slate-400">{p.pct}</span>
                        </button>
                      );
                    })}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* impact panel */}
        <div className="space-y-4 xl:sticky xl:top-[136px] xl:self-start">
          <SectionTitle icon={CircleGauge} eyebrow="Live impact calculator" title="Your wastage impact" />
          <Card className="p-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-emerald-50 p-3 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/10 dark:ring-emerald-500/30">
                <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Plate waste prevented</p>
                <p className="mt-1 text-2xl font-extrabold leading-none text-emerald-700 dark:text-emerald-300">
                  {calc.preventedG}<span className="text-sm font-bold"> g</span>
                </p>
                <p className="mt-1 text-[10px] text-emerald-700/80 dark:text-emerald-400/80">vs fixed-scoop serving</p>
              </div>
              <div className="rounded-xl bg-amber-50 p-3 ring-1 ring-inset ring-amber-200 dark:bg-amber-500/10 dark:ring-amber-500/30">
                <p className="text-[10px] font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">Mess-wide daily saved</p>
                <p className="mt-1 text-2xl font-extrabold leading-none text-amber-700 dark:text-amber-300">
                  {calc.dailyKg.toFixed(1)}<span className="text-sm font-bold"> kg</span>
                </p>
                <p className="mt-1 text-[10px] text-amber-700/80 dark:text-amber-400/80">if 500 LPU students pre-portion</p>
              </div>
            </div>

            <p className="mt-2 flex items-start gap-1.5 rounded-lg bg-slate-50 px-2.5 py-2 text-[10px] leading-relaxed text-slate-500 ring-1 ring-inset ring-slate-200 dark:bg-slate-800/60 dark:text-slate-400 dark:ring-slate-700">
              <Info className="mt-0.5 h-3 w-3 shrink-0 text-orange-500" />
              Pilot benchmark: the BH-2 trial cut average plate waste from 145 g to 42 g per student with pre-portioning.
            </p>

            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              {[
                ["Tray weight", `${calc.served} g`],
                ["Scoops trimmed", `${calc.customized}/5`],
                ["CO₂e avoided", `${calc.co2} kg`],
              ].map(([l, v]) => (
                <div key={l} className="rounded-lg bg-slate-50 px-2 py-2 dark:bg-slate-800/60">
                  <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">{l}</p>
                  <p className="text-[12px] font-extrabold text-slate-800 dark:text-slate-100">{v}</p>
                </div>
              ))}
            </div>

            {calc.extra > 0 && (
              <p className="mt-2 flex items-start gap-1.5 rounded-lg bg-orange-50 px-2.5 py-2 text-[10px] font-semibold text-orange-700 ring-1 ring-inset ring-orange-200 dark:bg-orange-500/10 dark:text-orange-300 dark:ring-orange-500/30">
                <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
                You added +{calc.extra} g of extra portions. That's fine if you'll finish it — but it lowers your savings.
              </p>
            )}

            <div className="mt-3 grid grid-cols-3 gap-1.5 rounded-xl bg-slate-50 p-2 ring-1 ring-inset ring-slate-200 dark:bg-slate-800/60 dark:ring-slate-700">
              {[["Baseline", `${calc.baseTotal} g`], ["Serving", `${calc.served} g`], ["Saved", `−${calc.preventedG} g`]].map(([l, v]) => (
                <div key={l} className="text-center">
                  <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">{l}</p>
                  <p className="text-[11px] font-extrabold text-slate-700 dark:text-slate-200">{v}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* badge meter */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <BadgeCheck className="h-3.5 w-3.5" /> Zero-waste streak
              </p>
              <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-extrabold text-orange-700 dark:bg-amber-500/15 dark:text-amber-300">
                🔥 {streakDays} day streak
              </span>
            </div>

            <div className={`mt-3 flex items-center gap-3 rounded-xl bg-gradient-to-br p-3 ${toneClasses[badge.tone]}`}>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/20 ring-1 ring-inset ring-white/30">
                <badge.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wide opacity-80">Current badge</p>
                <p className="truncate text-sm font-extrabold leading-tight">{badge.name}</p>
              </div>
              <p className="ml-auto text-lg font-extrabold leading-none">{calc.score}%</p>
            </div>

            <div className="mt-3">
              <div className="relative h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-600 transition-all duration-700"
                  style={{ width: `${Math.max(3, calc.score)}%` }}
                />
                {[25, 55, 80].map((m) => (
                  <span key={m} className="absolute top-0 h-full w-px bg-white/70 dark:bg-slate-900/70" style={{ left: `${m}%` }} />
                ))}
              </div>
              <div className="mt-1 flex justify-between text-[9px] font-semibold text-slate-400">
                <span>Rookie</span><span>Aware</span><span>Green</span><span>Champion</span>
              </div>
            </div>

            <button
              onClick={submit}
              className={`mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-extrabold text-white shadow-sm transition-all ${
                flash ? "bg-emerald-600" : "bg-orange-600 hover:bg-orange-700 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400"
              }`}
            >
              {flash ? <><Check className="h-4 w-4" /> Preference logged!</> : <><Send className="h-4 w-4" /> Submit Meal Preference</>}
            </button>
            <p className="mt-2 text-center text-[10px] text-slate-400">
              Logs {calc.preventedG} g saved to the live feed · demo only
            </p>
          </Card>

          {/* feed */}
          <Card className="p-4">
            <p className="flex items-center justify-between text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5"><Activity className="h-3.5 w-3.5" /> Recent student choices</span>
              <span className="flex items-center gap-1 text-[10px] font-semibold normal-case text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> live
              </span>
            </p>
            <div className="mt-2 max-h-[290px] space-y-1.5 overflow-y-auto pr-1">
              {feed.map((f) => (
                <div key={f.id} className="rounded-lg border border-slate-200 px-2.5 py-2 dark:border-slate-700">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-[11px] font-bold text-slate-800 dark:text-slate-100">
                      {f.who} <span className="font-medium text-slate-400">· {f.hostel}</span>
                    </p>
                    <span className="shrink-0 text-[10px] text-slate-400">{f.at}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-1">
                    {Object.entries(f.picks).length === 0 && (
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">full plate</span>
                    )}
                    {Object.entries(f.picks).map(([k, v]) => {
                      const it = TRAY_ITEMS.find((i) => i.id === k);
                      const p = PORTIONS.find((x) => x.v === v);
                      return (
                        <span key={k} className="rounded bg-amber-50 px-1.5 py-0.5 text-[9px] font-semibold text-amber-800 ring-1 ring-inset ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30">
                          {p.short} {it ? it.name.split(" ")[0] : k}
                        </span>
                      );
                    })}
                    <span className="ml-auto text-[9px] font-extrabold text-emerald-600 dark:text-emerald-400">−{f.saved} g</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ====================== TAB 3 — RESEARCH ====================== */

const FILTERS = [
  { id: "all", label: "All Insights", icon: ClipboardList },
  { id: "student", label: "Student Interviews", icon: UserRound },
  { id: "staff", label: "Mess Staff Feedback", icon: ChefHat },
  { id: "pilot", label: "Before vs. After Pilot Test", icon: FlaskConical },
];

function ResearchTab() {
  const [filter, setFilter] = React.useState("all");
  const [notes, setNotes] = React.useState(INITIAL_NOTES);
  const [role, setRole] = React.useState("Student");
  const [category, setCategory] = React.useState("Queue");
  const [text, setText] = React.useState("");
  const [error, setError] = React.useState("");

  const list = filter === "all" ? INSIGHTS : INSIGHTS.filter((i) => i.type === filter);
  const showCauses = filter === "all" || filter === "student" || filter === "staff" || filter === "insight";

  function addNote(e) {
    e.preventDefault();
    if (text.trim().length < 6) { setError("Please write at least 6 characters so the note is useful."); return; }
    const now = new Date();
    let h = now.getHours();
    const suffix = h >= 12 ? "PM" : "AM";
    h = h % 12 === 0 ? 12 : h % 12;
    const at = `Today · ${h}:${pad(now.getMinutes())} ${suffix}`;
    setNotes([{ id: "n" + Date.now(), role, category, note: text.trim(), at }, ...notes]);
    setText("");
    setError("");
  }

  const typeMeta = {
    student: { label: "Student Interview", chip: "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/30", icon: UserRound },
    staff: { label: "Mess Staff Feedback", chip: "bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-500/30", icon: ChefHat },
    pilot: { label: "Pilot Test Log", chip: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30", icon: FlaskConical },
    insight: { label: "Field Observation", chip: "bg-amber-50 text-amber-800 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30", icon: ClipboardList },
  };

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900 p-5 text-white shadow-lg sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/15 px-2.5 py-1 text-[11px] font-semibold text-orange-300 ring-1 ring-inset ring-orange-500/30">
                <FlaskConical className="h-3 w-3" /> Field research showcase
              </span>
              <DataBadge />
            </div>
            <h2 className="mt-3 text-xl font-extrabold tracking-tight sm:text-2xl">Field Research &amp; Pilot Results</h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-300">
              Mixed-methods study across three LPU hostel messes: student interviews, mess staff feedback, plate-weight audits and a 6-day Quick-Pass pilot at BH-2 Dining Hall.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {[
              ["Students interviewed", "120", UserRound],
              ["Mess staff consulted", "9", ChefHat],
              ["Trays weighed", "40", Scale],
            ].map(([l, v, I]) => (
              <div key={l} className="rounded-xl bg-white/10 px-3 py-2 ring-1 ring-inset ring-white/15">
                <I className="h-3.5 w-3.5 text-amber-300" />
                <p className="mt-1 text-lg font-extrabold leading-none">{v}</p>
                <p className="mt-0.5 text-[9px] font-semibold uppercase leading-tight tracking-wide text-slate-300">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* filters */}
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {FILTERS.map((f) => {
          const active = filter === f.id;
          const Icon = f.icon;
          const count = f.id === "all" ? INSIGHTS.length : INSIGHTS.filter((i) => i.type === f.id).length;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              aria-pressed={active}
              className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-[12px] font-bold transition-all ${
                active
                  ? "border-orange-500 bg-orange-600 text-white shadow-sm shadow-orange-500/30 dark:border-amber-500 dark:bg-amber-500 dark:text-slate-950"
                  : "border-slate-200 bg-white text-slate-600 hover:border-orange-300 hover:text-orange-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600"
              }`}
            >
              <Icon className="h-3.5 w-3.5" /> {f.label}
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${active ? "bg-white/25 dark:bg-slate-950/20" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.55fr_1fr]">
        <div className="space-y-6">
          {/* before after */}
          {(filter === "all" || filter === "pilot") && (
            <Card className="p-4 sm:p-5">
              <SectionTitle
                icon={TrendingDown}
                eyebrow="Pilot test · BH-2 Dining Hall"
                title="Before vs. After Quick-Pass + Pre-Portioning"
                desc="Baseline week vs. 6-day pilot with staggered slots and portion pre-selection."
                right={<DataBadge />}
              />
              <div className="space-y-4">
                {COMPARISON.map((c) => {
                  const Icon = c.icon;
                  const drop = Math.round(((c.before - c.after) / c.before) * 100);
                  const beforeWidth = 100;
                  const afterWidth = Math.max(6, Math.round((c.after / c.before) * 100));
                  return (
                    <div key={c.label}>
                      <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
                        <p className="flex items-center gap-1.5 text-[12px] font-bold text-slate-800 dark:text-slate-100">
                          <Icon className="h-3.5 w-3.5 text-orange-500" /> {c.label}
                        </p>
                        <p className="flex items-center gap-1.5 text-[11px] font-bold">
                          <span className="text-slate-500 dark:text-slate-400">{c.before} {c.unit}</span>
                          <ArrowRight className="h-3 w-3 text-slate-400" />
                          <span className="text-emerald-600 dark:text-emerald-400">{c.after} {c.unit}</span>
                          <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-extrabold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">−{drop}%</span>
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-11 shrink-0 text-[9px] font-bold uppercase tracking-wide text-slate-400">Before</span>
                          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                            <div className="h-full rounded-full bg-gradient-to-r from-slate-400 to-slate-500 transition-all duration-700 dark:from-slate-600 dark:to-slate-500" style={{ width: `${beforeWidth}%` }} />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-11 shrink-0 text-[9px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">After</span>
                          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                            <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-600 transition-all duration-700" style={{ width: `${afterWidth}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 flex items-start gap-1.5 rounded-xl bg-slate-50 px-3 py-2 text-[10px] leading-relaxed text-slate-500 ring-1 ring-inset ring-slate-200 dark:bg-slate-800/60 dark:text-slate-400 dark:ring-slate-700">
                <Info className="mt-0.5 h-3 w-3 shrink-0 text-orange-500" />
                Illustration of prototype evaluation methodology. Figures are Prototype Simulation Data modelled on 40 weighed trays and 6 pilot days — not audited mess records.
              </p>
            </Card>
          )}

          {/* root causes */}
          {showCauses && (
            <div>
              <SectionTitle icon={Target} eyebrow="Root-cause analysis" title="Why the rush happens" desc="Four observed bottlenecks that shaped the prototype." />
              <div className="grid gap-3 sm:grid-cols-2">
                {ROOT_CAUSES.map((rc) => {
                  const Icon = rc.icon;
                  return (
                    <Card key={rc.id} className="group p-4 transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md dark:hover:border-slate-600">
                      <div className="flex items-start gap-2.5">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-inset ring-orange-200 transition-colors group-hover:bg-orange-600 group-hover:text-white dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[13px] font-extrabold leading-snug text-slate-900 dark:text-white">{rc.title}</p>
                          <p className="mt-1 text-[11px] font-bold text-orange-600 dark:text-amber-400">{rc.stat}</p>
                        </div>
                      </div>
                      <p className="mt-2 text-[11.5px] leading-relaxed text-slate-600 dark:text-slate-300">{rc.text}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {rc.tags.map((t) => (
                          <span key={t} className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">{t}</span>
                        ))}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* insights list */}
          <div>
            <SectionTitle
              icon={MessageSquareQuote}
              eyebrow="Research board"
              title={filter === "all" ? "All field insights" : FILTERS.find((f) => f.id === filter).label}
              desc={`${list.length} entries · click a filter above to narrow the board.`}
            />
            <div className="space-y-2.5">
              {list.map((i) => {
                const meta = typeMeta[i.type];
                const Icon = meta.icon;
                return (
                  <Card key={i.id} className="p-3.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide ring-1 ring-inset ${meta.chip}`}>
                        <Icon className="h-2.5 w-2.5" /> {meta.label}
                      </span>
                      <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">{i.who}</span>
                      <span className="text-[10px] text-slate-400">· {i.category}</span>
                      <span className="ml-auto rounded-full bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">{i.rating}</span>
                    </div>
                    <p className="mt-2 flex gap-1.5 text-[12px] leading-relaxed text-slate-700 dark:text-slate-200">
                      <Quote className="mt-0.5 h-3 w-3 shrink-0 text-orange-400" />
                      {i.text}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* right column: add observation + board */}
        <div className="space-y-4 xl:sticky xl:top-[136px] xl:self-start">
          <Card className="p-4">
            <p className="flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white">
              <Plus className="h-4 w-4 text-orange-500" /> Add field observation / test note
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">For presenters, evaluators and mess staff during the demo.</p>

            <form onSubmit={addNote} className="mt-3 space-y-3">
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Role</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {ROLE_OPTIONS.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      aria-pressed={role === r}
                      className={`rounded-lg border px-1 py-1.5 text-[11px] font-bold transition-colors ${
                        role === r
                          ? "border-orange-500 bg-orange-50 text-orange-700 dark:border-amber-500 dark:bg-amber-500/10 dark:text-amber-300"
                          : "border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Category</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {CATEGORY_OPTIONS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCategory(c)}
                      aria-pressed={category === c}
                      className={`rounded-lg border px-1 py-1.5 text-[11px] font-bold transition-colors ${
                        category === c
                          ? "border-orange-500 bg-orange-50 text-orange-700 dark:border-amber-500 dark:bg-amber-500/10 dark:text-amber-300"
                          : "border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="note" className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Observation note</label>
                <textarea
                  id="note"
                  value={text}
                  onChange={(e) => { setText(e.target.value); if (error) setError(""); }}
                  rows={3}
                  placeholder="e.g. Roti counter refilled at 1:05 PM, line stalled for 4 minutes."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
                {error && (
                  <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-rose-600 dark:text-rose-400">
                    <AlertTriangle className="h-3 w-3" /> {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-extrabold text-white transition-colors hover:bg-orange-700 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400"
              >
                <Send className="h-4 w-4" /> Add to research board
              </button>
            </form>
          </Card>

          <Card className="p-4">
            <p className="flex items-center justify-between text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5"><ClipboardList className="h-3.5 w-3.5" /> Observation board</span>
              <span className="rounded-full bg-orange-100 px-1.5 py-0.5 text-[10px] text-orange-700 dark:bg-amber-500/15 dark:text-amber-300">{notes.length}</span>
            </p>
            <div className="mt-2 max-h-[340px] space-y-2 overflow-y-auto pr-1">
              {notes.map((n) => (
                <div key={n.id} className="group rounded-lg border border-slate-200 p-2.5 dark:border-slate-700">
                  <div className="flex items-center gap-1.5">
                    <span className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide ring-1 ring-inset ${
                      n.role === "Evaluator"
                        ? "bg-orange-50 text-orange-700 ring-orange-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/30"
                        : n.role === "Mess Staff"
                        ? "bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-500/30"
                        : "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/30"
                    }`}>
                      {n.role === "Evaluator" ? <UserCheck className="h-2.5 w-2.5" /> : n.role === "Mess Staff" ? <ChefHat className="h-2.5 w-2.5" /> : <UserRound className="h-2.5 w-2.5" />}
                      {n.role}
                    </span>
                    <span className={`text-[9px] font-bold ${n.category === "Queue" ? "text-sky-600 dark:text-sky-400" : "text-emerald-600 dark:text-emerald-400"}`}>{n.category}</span>
                    <button
                      onClick={() => setNotes(notes.filter((x) => x.id !== n.id))}
                      className="ml-auto rounded p-0.5 text-slate-300 opacity-0 transition-opacity hover:bg-rose-50 hover:text-rose-600 group-hover:opacity-100 dark:hover:bg-rose-500/10"
                      aria-label="Delete note"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="mt-1 text-[11.5px] leading-relaxed text-slate-700 dark:text-slate-200">{n.note}</p>
                  <p className="mt-1 text-[9px] text-slate-400">{n.at}</p>
                </div>
              ))}
              {notes.length === 0 && (
                <p className="rounded-lg border border-dashed border-slate-200 py-6 text-center text-[11px] text-slate-400 dark:border-slate-700">
                  No observations yet — add the first one.
                </p>
              )}
            </div>
          </Card>

          <Card className="p-4">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <Info className="h-3.5 w-3.5" /> Prototype scope
            </p>
            <ul className="mt-2 space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
              <li className="flex gap-1.5"><ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-orange-500" /> Prototype scope: BH-1, BH-2, GH-1 messes; 3 meals; 8 windows each.</li>
              <li className="flex gap-1.5"><ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-orange-500" /> Sensors, QR scanning and payment are simulated in-browser.</li>
              <li className="flex gap-1.5"><ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-orange-500" /> No student data is collected or transmitted anywhere.</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
