// Tema Halloween (Max 31/10/2026): solo atmosfera, nessuna scritta. Attivo SOLO il 31/10/2026 (ora di Chicago);
// ?halloween=1 per provarlo in un altro giorno. Dal 1/11 non fa nulla da solo. Non tocca le foto né onoff.js.
// Solo animazioni leggere (CSS), pensate per il browser del TV: rami scuri dagli angoli, nebbia bassa, braci che salgono,
// pipistrelli in volo, un ragno appeso a un filo, bordo caldo come luce di candela.
(function () {
  const chi = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago' }).format(new Date());
  const prova = new URLSearchParams(location.search).get('halloween') === '1';
  if (chi() !== '2026-10-31' && !prova) return;

  // numeri casuali ripetibili: i rami vengono sempre uguali
  let sm = 20261031; const rnd = () => { sm |= 0; sm = (sm + 0x6D2B79F5) | 0; let t = Math.imul(sm ^ (sm >>> 15), 1 | sm); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const rami = [];
  function cresci(x, y, a, len, w, prof) {
    if (prof < 0 || w < .5) return;
    const curva = (rnd() - .5) * .5, a2 = a + curva;
    const x2 = x + Math.cos(a2) * len, y2 = y + Math.sin(a2) * len;
    const cx = x + Math.cos(a + curva * 2) * len * .55 + (rnd() - .5) * len * .15, cy = y + Math.sin(a + curva * 2) * len * .55;
    rami.push(`<path d="M${x.toFixed(1)} ${y.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}" stroke-width="${w.toFixed(1)}"/>`);
    const n = prof > 3 ? 2 : (rnd() < .65 ? 2 : 1);
    for (let i = 0; i < n; i++) cresci(x2, y2, a2 + (i === 0 ? -1 : 1) * (.3 + rnd() * .3) * (n === 1 ? .5 : 1), len * (.68 + rnd() * .14), w * .66, prof - 1);
    if (prof > 3 && rnd() < .6) cresci(x + (x2 - x) * .55, y + (y2 - y) * .55, a2 + (rnd() < .5 ? -1.1 : 1.1), len * .5, w * .5, prof - 2);   // rametto laterale
  }
  cresci(-30, -30, .5, 215, 15, 5);
  cresci(-30, -30, 1.15, 160, 10, 4);
  const sxr = rami.splice(0).join('');
  sm = 777; cresci(1950, -30, Math.PI - .52, 205, 15, 5); cresci(1950, -30, Math.PI - 1.12, 150, 10, 4);
  const dxr = rami.splice(0).join('');

  const ala = 'M0 0C-14-24-46-36-86-30C-74-20-72-8-64 2C-56-6-48-4-40 6C-34-2-26 0-20 10C-14 6-8 6 0 14Z';   // un'ala: bordo inferiore a festone
  const pipistrello = (cls, y, durata, ritardo, alto, scala) => `<div class="hp ${cls}" style="top:${y}vh;--d:${durata}s;--r:${ritardo}s;--h:${alto}vh;--s:${scala}">
    <svg viewBox="-100 -40 200 70" width="100%"><g fill="#07030c">
    <g class="ha"><path d="${ala}"/></g><g transform="scale(-1 1)"><g class="ha"><path d="${ala}"/></g></g>
    <ellipse cx="0" cy="3" rx="7" ry="11"/><circle cx="0" cy="-9" r="6"/><path d="M-5-13L-7-23L-1-15ZM5-13L7-23L1-15Z"/></g></svg></div>`;
  const braci = Array.from({ length: 24 }, (_, i) => `<i style="left:${(4 + rnd() * 92).toFixed(1)}vw;--d:${(9 + rnd() * 9).toFixed(1)}s;--r:${(-rnd() * 18).toFixed(1)}s;--x:${((rnd() - .5) * 8).toFixed(1)}vw;--z:${(.35 + rnd() * .5).toFixed(2)}"></i>`).join('');

  const css = document.createElement('style');
  css.textContent = `
  #hw{position:fixed;inset:0;z-index:50;pointer-events:none;overflow:hidden}
  #hw .bordo{position:absolute;inset:0;background:
    radial-gradient(ellipse 75% 70% at 50% 45%,transparent 55%,rgba(20,0,35,.45) 100%),
    linear-gradient(to top,rgba(255,110,10,.30),rgba(255,110,10,0) 22%)}
  #hw .rami{position:absolute;inset:0;width:100%;height:100%}
  #hw .rami g{fill:none;stroke:#07030c;stroke-linecap:round;stroke-linejoin:round}
  #hw .nebbia{position:absolute;left:-30vw;bottom:-6vh;width:160vw;height:26vh;opacity:.55;
    background:radial-gradient(ellipse 18% 55% at 12% 60%,rgba(215,205,235,.55),transparent 70%),radial-gradient(ellipse 22% 60% at 38% 70%,rgba(215,205,235,.45),transparent 70%),
      radial-gradient(ellipse 20% 55% at 63% 55%,rgba(215,205,235,.5),transparent 70%),radial-gradient(ellipse 18% 60% at 88% 68%,rgba(215,205,235,.45),transparent 70%);
    filter:blur(14px);animation:nebbia 38s ease-in-out infinite alternate}
  #hw .nebbia.due{bottom:-10vh;opacity:.4;animation-duration:55s;animation-direction:alternate-reverse}
  @keyframes nebbia{from{transform:translateX(-6vw)}to{transform:translateX(12vw)}}
  #hw .braci i{position:absolute;bottom:-2vh;width:.7vw;height:.7vw;border-radius:50%;background:#ffb347;box-shadow:0 0 .8vw .25vw rgba(255,120,20,.8);
    opacity:0;animation:sale var(--d) linear infinite;animation-delay:var(--r)}
  @keyframes sale{0%{transform:translate(0,0) scale(var(--z));opacity:0}12%{opacity:.9}85%{opacity:.55}100%{transform:translate(var(--x),-105vh) scale(calc(var(--z)*.4));opacity:0}}
  #hw .hp{position:absolute;left:-14vw;width:calc(10vw*var(--s));animation:volo var(--d) linear infinite;animation-delay:var(--r);opacity:.95}
  @keyframes volo{0%{transform:translate(0,0)}20%{transform:translate(32vw,calc(var(--h)*-1))}45%{transform:translate(66vw,calc(var(--h)*.7))}70%{transform:translate(100vw,calc(var(--h)*-.8))}100%{transform:translate(130vw,calc(var(--h)*.3))}}
  #hw .ha{transform-box:fill-box;transform-origin:100% 100%;animation:batti .32s ease-in-out infinite alternate}
  @keyframes batti{from{transform:rotate(-18deg)}to{transform:rotate(22deg)}}
  #hw .ragno{position:absolute;left:11vw;top:-2vh;width:2.6vw;transform-origin:50% 0;animation:dondola 5s ease-in-out infinite}
  #hw .ragno .filo{position:absolute;left:50%;bottom:100%;width:1px;height:var(--l);background:rgba(235,235,245,.55)}
  #hw .ragno{--l:12vh;top:12vh;left:9vw}
  @keyframes dondola{0%,100%{transform:rotate(-3deg) translateY(0)}50%{transform:rotate(3deg) translateY(1.2vh)}}
  `;
  document.head.appendChild(css);

  const ragno = `<div class="ragno"><div class="filo"></div><svg viewBox="-20 -20 40 40" width="100%"><g stroke="#07030c" stroke-width="1.6" fill="none" stroke-linecap="round">
    <path d="M-4-2L-12-9L-17-4M-5 0L-15-1L-19 6M-4 3L-11 9L-14 16M-3 5L-7 13L-8 19M4-2L12-9L17-4M5 0L15-1L19 6M4 3L11 9L14 16M3 5L7 13L8 19"/></g>
    <ellipse cx="0" cy="3" rx="6" ry="8" fill="#07030c"/><circle cx="0" cy="-6" r="4" fill="#07030c"/></svg></div>`;
  const d = document.createElement('div'); d.id = 'hw';
  d.innerHTML = '<div class="bordo"></div><div class="nebbia"></div><div class="nebbia due"></div><div class="braci">' + braci + '</div>' +
    `<svg class="rami" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice"><g>${sxr}</g><g>${dxr}</g></svg>` + ragno +
    pipistrello('', 16, 21, 0, 7, 1) + pipistrello('', 34, 27, 8, 10, .75) + pipistrello('', 9, 33, 16, 5, .6);
  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(d));
  // a mezzanotte (ora di Chicago) le decorazioni spariscono da sole, anche senza ricaricare la pagina
  setInterval(() => { if (chi() !== '2026-10-31' && !prova) d.remove(); }, 60000);
})();
