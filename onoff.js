// B-86 (Max 29/10/2026): ON/OFF del Monitor 1 da Brigade (pagina MONITORS). Aggiunta, non tocca lo slideshow:
// se Brigade dice OFF copre lo schermo di nero; se ON (o se non c'è rete / risposta) lo slideshow resta visibile.
(function () {
  const URL_ = 'https://ydqmumpytgrlceuinoqt.supabase.co/rest/v1/rpc/sb_public', KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkcW11bXB5dGdybGNldWlub3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5MzcyOTUsImV4cCI6MjA5NDUxMzI5NX0.MSIKL4nCOxK8YFFTkt9AbFGViiwl-KEhHy6cL25gnKc';
  const v = document.createElement('div');
  v.style.cssText = 'position:fixed;inset:0;background:#000;z-index:2147483647;display:none;cursor:none;';
  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(v));
  async function tick() {
    try {
      const r = await fetch(URL_, { method: 'POST', cache: 'no-store', headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' }, body: '{}' });
      if (!r.ok) return;
      const p = await r.json();
      v.style.display = p && p.guest_on === false ? 'block' : 'none';
    } catch (e) {}
  }
  tick(); setInterval(tick, 10000);
})();
