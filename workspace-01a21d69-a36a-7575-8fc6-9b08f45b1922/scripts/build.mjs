// Build script: bundles the React app, inlines Tailwind CSS + JS into one
// self-contained HTML file, and emits a deployable static site in dist/.
//
//   node scripts/build.mjs
//
// Requirements: dev deps only (esbuild, tailwindcss). No Python, no network.

import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const p = (...parts) => path.join(root, ...parts);

const read = (f) => fs.readFileSync(p(f), "utf8");
const write = (f, data) => {
  fs.mkdirSync(path.dirname(p(f)), { recursive: true });
  fs.writeFileSync(p(f), data);
};

// 1) Tailwind CSS ------------------------------------------------------------
console.log("▸ Building Tailwind CSS…");
execFileSync(
  process.execPath,
  [p("node_modules", "tailwindcss", "lib", "cli.js"), "-i", "src/index.css", "-o", "build/tw.css", "--minify"],
  { stdio: "inherit" }
);

// 2) React bundle (IIFE, minified, JSX transformed) --------------------------
console.log("▸ Bundling React app…");
await build({
  entryPoints: [p("src/main.jsx")],
  bundle: true,
  minify: true,
  format: "iife",
  jsx: "automatic",
  define: { "process.env.NODE_ENV": '"production"' },
  outfile: p("build/app.js"),
  logLevel: "info",
});

// 3) Inline everything into a single HTML document ---------------------------
console.log("▸ Assembling self-contained HTML…");
const css = read("build/tw.css");
const js = read("build/app.js");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Beat the Mess Rush · LPU Mess Queue &amp; Portion Optimizer</title>
<meta name="description" content="Lovely Professional University student prototype: smart mess slot booking, live counter crowd monitoring and customizable portions. All metrics are Prototype Simulation Data." />
<meta name="theme-color" content="#ea580c" />
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%23ea580c'/%3E%3Cpath d='M10 8v7a3 3 0 0 0 6 0V8M13 15v9' stroke='white' stroke-width='2' stroke-linecap='round' fill='none'/%3E%3Cpath d='M22 8c1.6 1 2.4 2.6 2.4 4.4 0 1.6-.8 2.6-2.4 3.1V24' stroke='white' stroke-width='2' stroke-linecap='round' fill='none'/%3E%3C/svg%3E" />
<script>
  try {
    var t = localStorage.getItem('btmr-theme');
    if (t === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
</script>
<style>
${css}
</style>
</head>
<body class="bg-slate-50 dark:bg-slate-950">
<div id="root"></div>
<noscript>This prototype needs JavaScript enabled.</noscript>
<script>
${js}
</script>
</body>
</html>
`;

// Keep the repo-root deliverable in sync.
write("beat-the-mess-rush.html", html);
// Static site output for deployment.
write("dist/index.html", html);
// Expose the single component file for download (used by the footer link).
write("dist/BeatTheMessRush.jsx", read("src/App.jsx"));
write("dist/robots.txt", "User-agent: *\nAllow: /\n");

console.log(`✔ dist/index.html (${(Buffer.byteLength(html) / 1024).toFixed(0)} KB) + dist/BeatTheMessRush.jsx`);
