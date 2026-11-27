css = open('build/tw.css').read()
js = open('build/app.js').read()
html = f'''<!DOCTYPE html>
<html lang="en" class="">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Beat the Mess Rush · LPU Mess Queue &amp; Portion Optimizer</title>
<meta name="description" content="LPU student prototype: smart mess slot booking, live counter crowd monitoring and customizable portions." />
<script>
  try {{
    var t = localStorage.getItem('btmr-theme');
    if (t === 'dark') document.documentElement.classList.add('dark');
  }} catch (e) {{}}
</script>
<style>
{css}
</style>
</head>
<body class="bg-slate-50 dark:bg-slate-950">
<div id="root"></div>
<noscript>This prototype needs JavaScript enabled.</noscript>
<script>
{js}
</script>
</body>
</html>
'''
open('beat-the-mess-rush.html','w').write(html)
print(len(html))
