// Tema Halloween (Max 31/10/2026): solo decorazioni, nessuna scritta. Attivo SOLO il 31/10/2026 (ora di Chicago);
// ?halloween=1 per provarlo in un altro giorno. Dal 1/11 non fa nulla da solo. Non tocca le foto né onoff.js.
(function () {
  const oggi = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago' }).format(new Date());
  if (oggi !== '2026-10-31' && new URLSearchParams(location.search).get('halloween') !== '1') return;
  const css = document.createElement('style');
  css.textContent = `
  #hw{position:fixed;inset:0;z-index:50;pointer-events:none;overflow:hidden}
  #hw .luce{position:absolute;inset:0;background:
    radial-gradient(ellipse at 50% 50%,transparent 58%,rgba(255,110,0,.20) 82%,rgba(70,0,110,.42) 100%)}
  #hw .rete{position:absolute;width:21vw;height:21vw;opacity:.55}
  #hw .rete.sx{left:0;top:0}
  #hw .rete.dx{right:0;top:0;transform:scaleX(-1)}
  #hw .zucca{position:absolute;bottom:-1vw;width:13vw;height:auto;filter:drop-shadow(0 0 1.2vw rgba(255,120,0,.75));animation:lampeggio 3.2s ease-in-out infinite}
  #hw .zucca.sx{left:1vw}
  #hw .zucca.dx{right:1vw;animation-delay:1.1s}
  @keyframes lampeggio{0%,100%{opacity:.93}45%{opacity:.78}55%{opacity:.95}70%{opacity:.82}}
  #hw .pipi{position:absolute;left:-12vw;width:9vw;opacity:.9;animation:volo var(--t) linear infinite;animation-delay:var(--r)}
  @keyframes volo{0%{transform:translate(0,0)}25%{transform:translate(35vw,calc(var(--y)*-1))}50%{transform:translate(70vw,var(--y))}75%{transform:translate(105vw,calc(var(--y)*-.6))}100%{transform:translate(135vw,0)}}
  #hw .pipi svg{animation:ali .45s ease-in-out infinite alternate;transform-origin:50% 50%}
  @keyframes ali{from{transform:scaleY(1)}to{transform:scaleY(.55)}}
  `;
  document.head.appendChild(css);
  const rete = `<svg class="rete" viewBox="0 0 100 100" fill="none" stroke="#fff" stroke-width=".7" stroke-linecap="round">
    <path d="M0 0L100 0M0 0L0 100M0 0L100 100M0 0L70 100M0 0L100 70M0 0L35 100M0 0L100 35"/>
    <path d="M12 0Q12 12 0 12M26 0Q26 26 0 26M42 0Q42 42 0 42M60 0Q60 60 0 60M82 0Q82 82 0 82"/>
    <path d="M10 2Q14 14 2 10M24 4Q30 30 4 24M40 6Q48 48 6 40M58 8Q68 68 8 58"/></svg>`;
  const zucca = `<svg class="zucca" viewBox="0 0 120 100"><ellipse cx="60" cy="58" rx="52" ry="38" fill="#ff7a00"/>
    <ellipse cx="34" cy="58" rx="22" ry="37" fill="#f56a00"/><ellipse cx="86" cy="58" rx="22" ry="37" fill="#f56a00"/>
    <rect x="54" y="14" width="12" height="16" rx="3" fill="#3b5d1f"/>
    <path d="M32 46L48 46L40 34Z M72 46L88 46L80 34Z" fill="#2a0a00"/>
    <path d="M36 70Q60 94 84 70L78 68L72 76L66 68L60 78L54 68L48 76L42 68Z" fill="#2a0a00"/></svg>`;
  const pipi = (y, t, r, w) => `<div class="pipi" style="top:${y}vh;--y:${w}vh;--t:${t}s;--r:${r}s"><svg viewBox="0 0 100 50"><path d="M50 18C46 10 40 4 30 6C24 2 12 8 0 22C10 22 16 26 20 34C26 26 32 26 38 32C42 28 46 28 50 40C54 28 58 28 62 32C68 26 74 26 80 34C84 26 90 22 100 22C88 8 76 2 70 6C60 4 54 10 50 18Z" fill="#0b0014"/></svg></div>`;
  const d = document.createElement('div'); d.id = 'hw';
  d.innerHTML = '<div class="luce"></div>' + rete.replace('class="rete"', 'class="rete sx"') + rete.replace('class="rete"', 'class="rete dx"') +
    zucca.replace('class="zucca"', 'class="zucca sx"') + zucca.replace('class="zucca"', 'class="zucca dx"') +
    pipi(14, 17, 0, 6) + pipi(30, 23, 6, 9) + pipi(8, 29, 13, 5);
  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(d));
})();
