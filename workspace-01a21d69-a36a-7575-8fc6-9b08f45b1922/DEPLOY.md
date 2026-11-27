# Deploying "Beat the Mess Rush"

`npm run build` → `node scripts/build.mjs` → writes `dist/index.html` (single self-contained file) + `dist/BeatTheMessRush.jsx` + `dist/robots.txt`.
It needs only the dev dependencies (esbuild + tailwindcss) — no Python, no network, Node >= 18.

## Deployed target (already created on Vercel)

| | |
| --- | --- |
| Account | `princebisht280-9399` |
| Project ID | `prj_GzRbe5dblKxqeDxzBENlgAC4R1f9` |
| Project name | `beat-the-mess-rush` |
| Framework preset | Other / none (`framework.json` = null) |
| Install command | `npm install` |
| Build command | `npm run build` |
| Output directory | `dist` |

`vercel.json` in the repo root carries the same settings plus security headers.

## Option A — from this workspace with an access token (fastest)

```bash
npx vercel deploy --prod --yes --token=YOUR_VERCEL_TOKEN
# or, once linked:
npx vercel link --yes --project beat-the-mess-rush --token=YOUR_VERCEL_TOKEN
npm run deploy -- --token=YOUR_VERCEL_TOKEN
```

Create a token at <https://vercel.com/account/tokens> (scope: your personal account, expiry as short as you like) and revoke it once the deploy finishes.

## Option B — from your own machine / laptop

```bash
npx vercel link --project beat-the-mess-rush   # interactive: log in, confirm
npm run deploy                                  # = vercel deploy --prod --yes
```

## Option C — Git integration

```bash
git init && git add -A && git commit -m "Beat the Mess Rush prototype"
git remote add origin <your-repo-url> && git push -u origin main
```

Then in Vercel: **Project → Settings → Git → Connect repository**. Framework = *Other*, build `npm run build`, output `dist`. Every push to `main` then deploys automatically.

## Verify after deploy

- Production URL: `https://beat-the-mess-rush.vercel.app`
- Check: tabs switch, Quick-Pass booking generates a token, dark mode persists on reload, footer "Component source (.jsx)" downloads `BeatTheMessRush.jsx`.
