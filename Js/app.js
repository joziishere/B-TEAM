(() => {
  const d = document;
  const TO = 'hello@example.com'; 

  // nav state + scroll progress
  const nav = d.querySelector('.nav'), bar = d.querySelector('.bar');
  const onScroll = () => {
    const max = d.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle('solid', scrollY > 20);
    bar.style.setProperty('--p', max > 0 ? scrollY / max : 0);
  };
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });


 

  // scroll reveal
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .15 });
  d.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 3) * 90 + 'ms';
    io.observe(el);
  });

  
  // mobile menu
  const root = d.documentElement, burger = d.querySelector('.burger'), links = d.getElementById('links');
  const toggle = open => {
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    links.classList.toggle('open', open);
    root.classList.toggle('menu-open', open);
  };
  burger.addEventListener('click', () => toggle(!links.classList.contains('open')));
  links.addEventListener('click', e => { if (e.target.closest('a')) toggle(false); });
  d.addEventListener('click', e => { if (e.target === d.body) toggle(false); });
  d.addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });
  matchMedia('(min-width:821px)').addEventListener('change', () => toggle(false));

  // contact form (frontend only: opens the visitor's email app)
  const form = d.getElementById('form'), status = form.querySelector('.status');
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) { status.textContent = 'Please fill in your name, a valid email and a message.'; return; }
    const f = new FormData(form);
    const body = `${f.get('message')}\n\n${f.get('name')} (${f.get('email')})`;
    location.href = `mailto:${TO}?subject=${encodeURIComponent('B Team inquiry: ' + f.get('service'))}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Opening your email app to send the message.';
  });

    // magnetic contact button (desktop only)
  const orb = d.querySelector('.orb');
  if (orb && matchMedia('(hover:hover)').matches) {
    orb.addEventListener('pointermove', e => {
      const r = orb.getBoundingClientRect();
      orb.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px,${(e.clientY - r.top - r.height / 2) * .18}px)`;
    });
    orb.addEventListener('pointerleave', () => { orb.style.transform = ''; });
  }
})();