import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
const errs = [];
p.on('pageerror', e => errs.push('PAGEERROR: ' + e.message));
p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
// serve dist over http like Vercel would (no network egress needed)
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const srv = http.createServer((req, res) => {
  const f = req.url === '/' ? 'index.html' : req.url.slice(1);
  const fp = path.join('/home/user/dist', f);
  if (!fs.existsSync(fp)) { res.writeHead(404); return res.end('nf'); }
  const ext = path.extname(fp);
  res.writeHead(200, { 'Content-Type': ext === '.html' ? 'text/html' : ext === '.jsx' ? 'text/plain' : 'text/plain' });
  res.end(fs.readFileSync(fp));
});
await new Promise(r => srv.listen(4599, '0.0.0.0', r));
await p.goto('http://localhost:4599/');
await p.waitForTimeout(700);
console.log('title:', await p.title());
console.log('h1:', await p.locator('h1').first().textContent());
await p.locator('button:has-text("Book Quick-Pass")').nth(1).click();
await p.waitForTimeout(400);
console.log('token rendered:', await p.getByText('MESS QUICK-PASS').count());
const href = await p.locator('a[download]').first().getAttribute('href');
const r = await p.request.get('http://localhost:4599/' + href.replace('./',''));
console.log('jsx download link:', href, r.status(), (await r.text()).length, 'bytes');
await p.screenshot({ path: 'shot-deploy.png' });
console.log('ERRORS:', errs.length ? errs : 'none');
await srv.close(); await b.close();
