// Contact page: tile spotlight + 3D camera scene (three.js r128)
(() => {
  const d = document, FOLLOW = true; // set FOLLOW = false to stop the model reacting to the cursor

  d.querySelectorAll('.tile').forEach(t => t.addEventListener('pointermove', e => {
    const r = t.getBoundingClientRect();
    t.style.setProperty('--mx', e.clientX - r.left + 'px');
    t.style.setProperty('--my', e.clientY - r.top + 'px');
  }));

  const box = d.getElementById('stage3d'), T = window.THREE;
  if (!box) return;
  if (!T) { box.classList.add('no3d'); return; }
  let renderer;
  try { renderer = new T.WebGLRenderer({ antialias: true, alpha: true }); }
  catch (e) { box.classList.add('no3d'); return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  box.appendChild(renderer.domElement);

  const scene = new T.Scene();
  const cam = new T.PerspectiveCamera(32, 1, .1, 100);
  cam.position.set(0, 0, 11);
  scene.add(new T.HemisphereLight(0xece1e2, 0x2a2229, .7));
  const key = new T.DirectionalLight(0xfff3df, 1.1); key.position.set(4, 5, 6); scene.add(key);
  const warm = new T.PointLight(0xe0ad4a, 1.5, 30); warm.position.set(-5, 2, 5); scene.add(warm);
  const rim = new T.PointLight(0xece1e2, 1, 30); rim.position.set(5, -2, -4); scene.add(rim);

  const mat = (c, m, r, x) => new T.MeshStandardMaterial(Object.assign({ color: c, metalness: m, roughness: r }, x));
  const dark = mat(0x2a2229, .3, .5), black = mat(0x0c0a0d, .3, .4), goldM = mat(0xaa791e, .6, .35),
        goldL = mat(0xe0ad4a, .6, .3), ivory = mat(0xece1e2, .1, .5);
  const basic = (c, o) => new T.MeshBasicMaterial(Object.assign({ color: c }, o));
  const add = (g, m, x, y, z, p) => { const o = new T.Mesh(g, m); o.position.set(x || 0, y || 0, z || 0); p.add(o); return o; };
  const R = Math.PI / 2;

  // camera
  const cam3d = new T.Group(); scene.add(cam3d); cam3d.scale.setScalar(.8);
  add(new T.BoxGeometry(4.2, 1.9, 1.5), dark, 0, -.3, 0, cam3d);
  add(new T.BoxGeometry(4.2, .7, 1.5), goldM, 0, 1, 0, cam3d);
  add(new T.BoxGeometry(.9, 1.9, .2), black, -1.6, -.3, .8, cam3d);
  add(new T.BoxGeometry(1.1, .45, .9), goldM, 0, 1.55, -.1, cam3d);
  add(new T.BoxGeometry(.7, .3, .1), mat(0xece1e2, .1, .5, { emissive: 0xece1e2, emissiveIntensity: .45 }), -1.4, 1, .78, cam3d);
  add(new T.CylinderGeometry(.18, .18, .2, 24), goldL, 1.5, 1.45, 0, cam3d);
  add(new T.CylinderGeometry(.32, .32, .25, 32), goldL, -1.3, 1.5, 0, cam3d);
  [-2.2, 2.2].forEach(x => { add(new T.CylinderGeometry(.12, .12, .3, 16), goldM, x, .85, 0, cam3d).rotation.z = R; });

  // lens
  const lens = new T.Group(); lens.position.set(.2, -.15, .75); cam3d.add(lens);
  add(new T.CylinderGeometry(1.15, 1.15, .25, 64), goldM, 0, 0, .1, lens).rotation.x = R;
  add(new T.CylinderGeometry(.95, 1, .9, 64), dark, 0, 0, .55, lens).rotation.x = R;
  add(new T.CylinderGeometry(1.06, 1.06, .3, 64), black, 0, 0, .75, lens).rotation.x = R;
  add(new T.TorusGeometry(1.06, .04, 12, 64), goldL, 0, 0, .92, lens);
  add(new T.TorusGeometry(.78, .06, 16, 64), goldM, 0, 0, 1.02, lens);
  add(new T.CircleGeometry(.72, 64), basic(0x120d16), 0, 0, 1.041, lens);
  add(new T.RingGeometry(.36, .54, 64), basic(0xaa791e), 0, 0, 1.043, lens);
  add(new T.RingGeometry(.54, .6, 64), basic(0xe0ad4a), 0, 0, 1.044, lens);
  add(new T.CircleGeometry(.3, 48), basic(0x07050a), 0, 0, 1.045, lens);
  add(new T.CircleGeometry(.08, 24), basic(0xffffff, { transparent: true, opacity: .9 }), .2, .22, 1.05, lens);

  // floating website window (web)
  const win = new T.Group(); win.position.set(-2.4, 2.2, .8); scene.add(win);
  add(new T.BoxGeometry(1.5, 1, .08), ivory, 0, 0, 0, win);
  add(new T.BoxGeometry(1.5, .2, .1), goldM, 0, .4, .01, win);
  [-.6, -.48, -.36].forEach(x => add(new T.SphereGeometry(.045, 12, 12), dark, x, .4, .07, win));
  add(new T.BoxGeometry(.9, .09, .04), goldM, -.2, .08, .06, win);
  add(new T.BoxGeometry(1.15, .09, .04), dark, -.07, -.1, .06, win);
  add(new T.BoxGeometry(.7, .09, .04), dark, -.28, -.28, .06, win);

  // design anchor point (design)
  const anchor = new T.Group(); anchor.position.set(2.5, -2.1, 1); scene.add(anchor);
  add(new T.OctahedronGeometry(.4), goldL, 0, 0, 0, anchor);
  add(new T.OctahedronGeometry(.52), basic(0xece1e2, { wireframe: true }), 0, 0, 0, anchor);

  const ptr = { x: 0, y: 0 }, cur = { x: 0, y: 0 }, t0 = performance.now();
  if (FOLLOW) addEventListener('pointermove', e => { ptr.x = (e.clientX / innerWidth - .5) * 2; ptr.y = (e.clientY / innerHeight - .5) * 2; }, { passive: true });

  const draw = now => {
    const t = (now - t0) / 1000;
    cur.x += (ptr.x - cur.x) * .05; cur.y += (ptr.y - cur.y) * .05;
    cam3d.rotation.y = -.45 + Math.sin(t * .5) * .18 + cur.x * .35;
    cam3d.rotation.x = .1 + cur.y * .18;
    cam3d.position.y = Math.sin(t * .9) * .08;
    win.position.y = 2.2 + Math.sin(t * .8 + 1) * .15;
    win.rotation.set(-.12 + cur.y * .1, .4 + cur.x * .2, 0);
    anchor.position.y = -2.1 + Math.sin(t * 1.1) * .15;
    anchor.rotation.set(t * .4, t * .6, 0);
    renderer.render(scene, cam);
  };

  const size = () => { const w = box.clientWidth || 400; renderer.setSize(w, w, false); draw(performance.now()); };
  new ResizeObserver(size).observe(box);
  size();

  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  let on = true, id = 0;
  const loop = now => { draw(now); id = requestAnimationFrame(loop); };
  const play = () => { if (!id) id = requestAnimationFrame(loop); };
  const stop = () => { cancelAnimationFrame(id); id = 0; };
  new IntersectionObserver(([e]) => { on = e.isIntersecting; on ? play() : stop(); }).observe(box);
  d.addEventListener('visibilitychange', () => (d.hidden ? stop() : on && play()));
})();