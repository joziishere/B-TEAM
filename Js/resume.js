// Resume page extras: scroll reveal (backup) + count-up numbers
(() => {
  const d = document, still = matchMedia('(prefers-reduced-motion:reduce)').matches;

  // backup reveal, so content never stays hidden even if another script stops early
  const rio = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); }
  }), { threshold: .12 });
  d.querySelectorAll('.reveal').forEach(el => rio.observe(el));
  setTimeout(() => d.querySelectorAll('.reveal').forEach(el => el.classList.add('in')), 3500);

  if (still) return;
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    cio.unobserve(e.target);
    const el = e.target, end = +el.dataset.count, t0 = performance.now();
    const tick = t => {
      const p = Math.min((t - t0) / 1400, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }), { threshold: .6 });
  d.querySelectorAll('[data-count]').forEach(el => { el.textContent = '0'; cio.observe(el); });
})();