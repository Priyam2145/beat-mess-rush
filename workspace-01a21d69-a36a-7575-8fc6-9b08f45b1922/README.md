# Beat the Mess Rush — LPU Hostel Mess Queue & Portion Optimizer

A self-contained, single-page **React + Tailwind CSS + Lucide** prototype for a Lovely Professional University student project.
No backend, no network requests, no external CDNs — everything (React runtime, Tailwind CSS, icons) is inlined into one HTML file.

## Files

| File | What it is |
| --- | --- |
| **`beat-the-mess-rush.html`** | **The deliverable.** Open in any browser (works offline). ~340 KB, fully self-contained. |
| `BeatTheMessRush.jsx` | The single clean React component file (`export default function App()`), as requested. |
| `src/App.jsx` | Source used to build the bundle (identical to `BeatTheMessRush.jsx`). |
| `src/main.jsx`, `src/index.css` | Mount point + Tailwind entry. |
| `build_html.py`, `tailwind.config.js` | Inline-everything build script + Tailwind config (`darkMode: 'class'`). |

## Rebuild after editing

```bash
npm install          # react, react-dom, lucide-react, esbuild, tailwindcss
npm run build        # -> beat-the-mess-rush.html
```

## Feature map

**Navbar** — project title + LPU subtitle, three tabs, working Light/Dark switch (persisted in `localStorage`, smooth colour transitions on every card, table, input, badge and modal).

**Tab 1 · Live Mess Optimizer**
- Mess pills (BH-1 Central Mess / BH-2 Dining Hall / GH-1 Mess) with distinct simulated footfall and load curves.
- Meal tabs: Breakfast 7:30–9:30 AM · Lunch 12:30–2:30 PM · Dinner 7:30–9:30 PM.
- Eight clickable 15-minute arrival windows with Low Rush / Moderate / Peak Rush badges, crowd %, wait estimate and per-counter load (Roti, Rice/Dal, Sabzi/Curd).
- Booking generates a deterministic QR-style **Mess Quick-Pass** token (Token ID, mess, window, wait saved) with **Cancel** and **Reschedule** — both update the live crowd numbers.

**Tab 2 · Smart Portion Selector**
- 5 mess items × 4 portion states (Skip 0% · Half/Trial 50% · Standard 100% · Extra Hungry 125%).
- Live calculator: plate waste prevented (g), projected hostel-wide daily saving for 500 students (kg), CO₂e, badge/zero-waste streak meter.
- "Submit Meal Preference" logs the tray into a live feed of recent student choices.

**Tab 3 · Field Research & Pilot Results**
- Sub-filters: All Insights · Student Interviews · Mess Staff Feedback · Before vs. After Pilot Test.
- Four root-cause cards, before/after bar comparisons (18 → 6 min wait, 145 g → 42 g waste), research board.
- Add Field Observation form (role / category / note) with validation, appending to a deletable observation board.

Every metric across the app is labelled **Prototype Simulation Data**.
