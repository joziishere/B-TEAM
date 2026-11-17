/* B Team language switch (English <-> Persian).
   Swaps text and text attributes only. No layout, CSS or markup changes. */
(() => {
  const KEY = 'bteam-lang';
  const norm = s => s.replace(/[\u2018\u2019]/g, "'");

  const FA = {
    // shared
    'Skip to content': 'رفتن به محتوا',
    'B Team Resume': 'رزومه B Team',
    'About us': 'درباره ما',
    'Work with us': 'با ما کار کنید',
    'Contact': 'تماس با ما',
    'Contact us': 'تماس با ما',
    '© 2026 B Team. Websites, design and photography.': '© 2026 B Team. وب‌سایت، طراحی و عکاسی.',

    // home
    'Websites, design and photography from one team.': 'وب‌سایت، طراحی و عکاسی؛ همه از یک تیم.',
    'B Team builds your site, designs how it looks and photographs what it shows, so every piece fits together.': 'B Team سایت شما را می‌سازد، ظاهر آن را طراحی می‌کند و از آنچه نمایش می‌دهد عکس می‌گیرد؛ تا همه اجزا در کنار هم کامل باشند.',
    'See our resume': 'رزومه ما را ببینید',
    'Projects we’ve shipped.': 'پروژه‌هایی که ساخته‌ایم.',
    'Websites, design systems and photo series. Swap the placeholders below for your own work.': 'وب‌سایت، سیستم طراحی و مجموعه عکس. نمونه‌های زیر را با کارهای خودتان جایگزین کنید.',
    'Website': 'وب‌سایت',
    'Design': 'طراحی',
    'Photography': 'عکاسی',
    'See Our full resume': 'رزومه کامل ما را ببینید',
    'A dedicated team that covers the full picture.': 'تیمی متخصص که همه تصویر را پوشش می‌دهد.',
    'Website projects': 'پروژه‌های وب‌سایت',
    'We design and code fast, responsive sites that are easy to find on search engines and easy to maintain.': 'سایت‌های سریع و واکنش‌گرا طراحی و کدنویسی می‌کنیم؛ سایت‌هایی که در موتورهای جستجو راحت پیدا می‌شوند و نگهداری‌شان ساده است.',
    'Frontend, SEO, performance': 'فرانت‌اند، سئو، کارایی',
    'Design projects': 'پروژه‌های طراحی',
    'Brand identities, interfaces and visual systems that stay consistent from logo to landing page.': 'هویت برند، رابط کاربری و سیستم‌های بصری که از لوگو تا صفحه فرود یکدست می‌مانند.',
    'Branding, UI, graphics': 'برندینگ، رابط کاربری، گرافیک',
    'Photos of products, places and people that give your brand and website a real face.': 'عکس محصولات، مکان‌ها و آدم‌ها که به برند و سایت شما چهره‌ای واقعی می‌بخشد.',
    'Product, portrait, events': 'محصول، پرتره، رویداد',
    'Have a project in mind?': 'پروژه‌ای در ذهن دارید؟',
    'Websites, design or photography. Tell us what you need and we’ll take it from there.': 'وب‌سایت، طراحی یا عکاسی. بگویید چه لازم دارید و بقیه‌اش با ما.',
    'Work with us • Say hello • Start a project • ': 'با ما کار کنید • سلام بگویید • پروژه را شروع کنید • ',

    // resume page
    'Work we’re proud of, and people who vouch for it.': 'کارهایی که به آن‌ها افتخار می‌کنیم، و کسانی که تأییدشان می‌کنند.',
    'A look at what we’ve built, designed and photographed, and what clients say about working with us.': 'نگاهی به آنچه ساخته‌ایم، طراحی کرده‌ایم و عکاسی کرده‌ایم، و آنچه مشتریان درباره کار با ما می‌گویند.',
    'Project name': 'نام پروژه',
    'Why clients trust us.': 'چرا مشتریان به ما اعتماد می‌کنند.',
    'Projects delivered': 'پروژه تحویل‌شده',
    'Clients who trusted us': 'مشتریانی که به ما اعتماد کردند',
    'Crafts, one team': 'تخصص، یک تیم',
    'Write your best client review here. Keep it short and specific: what they needed and what changed.': 'بهترین نظر مشتری را اینجا بنویسید. کوتاه و دقیق: چه چیزی لازم داشتند و چه چیزی تغییر کرد.',
    'A second, shorter review goes here.': 'نظر دوم، کوتاه‌تر، اینجا قرار می‌گیرد.',
    'A third review goes here.': 'نظر سوم اینجا قرار می‌گیرد.',
    'Client name': 'نام مشتری',
    'Role, company': 'سمت، شرکت',
    'Want to be next?': 'می‌خواهید نفر بعدی باشید؟',
    'Tell us what you need and we’ll take it from there.': 'بگویید چه لازم دارید و بقیه‌اش با ما.',

    // contact page
    'Let’s make something people remember.': 'بیایید چیزی بسازیم که در یادها بماند.',
    'Message us on WhatsApp': 'در واتساپ به ما پیام بدهید',
    'Call us': 'تماس بگیرید',
    'Email us': 'ایمیل ما را داشته باشید تا با شما تماس بگیریم.',
    'WhatsApp': 'واتساپ',
    'Pick the way you like.': 'هر راهی که دوست دارید را انتخاب کنید.',
    'What happens next.': 'بعد از این چه می‌شود.',
    'Tell us what you need': 'بگویید چه لازم دارید',
    'Send a message, call or email. A few lines about your project is enough.': 'پیام بدهید، تماس بگیرید یا ایمیل بزنید. چند خط درباره پروژه‌تان کافی است.',
    'We reply with a plan': 'با یک برنامه پاسخ می‌دهیم',
    'We come back with ideas, a timeline and next steps for your project.': 'با ایده‌ها، یک زمان‌بندی و قدم‌های بعدی پروژه‌تان برمی‌گردیم.',
    'We build it': 'آن را می‌سازیم',
    'Your website, design or photos get made, with you in the loop.': 'وب‌سایت، طراحی یا عکس‌های شما ساخته می‌شود، و شما در جریان کار هستید.',
    'Websites': 'وب‌سایت‌ها'
  };

  const FA_ATTR = {
    'B Team home': 'خانه B Team',
    'B Team logo': 'لوگوی B Team',
    'Main': 'اصلی',
    'Footer': 'پایین صفحه',
    'Open menu': 'باز کردن منو',
    'Close menu': 'بستن منو',
    'Work with us: go to the contact page': 'با ما کار کنید: رفتن به صفحه تماس',
    'Clients we have worked with': 'مشتریانی که با آن‌ها کار کرده‌ایم',
    '3D model of a camera with a floating website window and a design anchor point': 'مدل سه‌بعدی دوربین با پنجره شناور وب‌سایت و نقطه اتکای طراحی',
    'Project one: website for a client': 'پروژه یک: وب‌سایت برای یک مشتری',
    'Project two: brand design for a client': 'پروژه دو: طراحی برند برای یک مشتری',
    'Project three: photography series': 'پروژه سه: مجموعه عکاسی',
    'Website project for a client': 'پروژه وب‌سایت برای یک مشتری',
    'Brand design project for a client': 'پروژه طراحی برند برای یک مشتری',
    'Photography series for a client': 'مجموعه عکاسی برای یک مشتری',
    'Design project for a client': 'پروژه طراحی برای یک مشتری',
    'Photography project for a client': 'پروژه عکاسی برای یک مشتری',
    'Client one logo': 'لوگوی مشتری یک',
    'Client two logo': 'لوگوی مشتری دو',
    'Client three logo': 'لوگوی مشتری سه',
    'Client four logo': 'لوگوی مشتری چهار',
    'Client name': 'نام مشتری'
  };

  const FA_TITLE = {
    'B Team | Web, Design & Photography Studio': 'B Team | استودیوی وب، طراحی و عکاسی',
    'B Team Resume | Projects, Clients & Reviews': 'رزومه B Team | پروژه‌ها، مشتریان و نظرات',
    'Contact Us | B Team': 'تماس با ما | B Team'
  };

  const FA_DESC = {
    'B Team is a creative studio that builds websites, designs brands and interfaces, and shoots photography. See our resume and work with us.': 'B Team استودیوی خلاقی است که وب‌سایت می‌سازد، برند و رابط کاربری طراحی می‌کند و عکاسی می‌کند. رزومه ما را ببینید و با ما کار کنید.',
    'See the websites, design projects and photography B Team has delivered, the clients we work with and what they say about us.': 'وب‌سایت‌ها، پروژه‌های طراحی و عکاسی B Team، مشتریانی که با آن‌ها کار می‌کنیم و آنچه درباره ما می‌گویند را ببینید.',
    'Contact B Team for website projects, design projects and photography. Call us, email us or message us on WhatsApp.': 'برای پروژه‌های وب‌سایت، طراحی و عکاسی با B Team در تماس باشید. تماس بگیرید، ایمیل بزنید یا در واتساپ پیام بدهید.'
  };

  const asMap = obj => new Map(Object.entries(obj).map(([k, v]) => [norm(k.trim()), v]));
  const dict = asMap(FA), adict = asMap(FA_ATTR), tdict = asMap(FA_TITLE), ddict = asMap(FA_DESC);

  const html = document.documentElement;
  const rawTitle = document.title;
  const descEl = document.querySelector('meta[name="description"]');
  const rawDesc = descEl && descEl.getAttribute('content');

  const nodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const raw = n.nodeValue;
    if (!raw.trim()) continue;
    if (n.parentElement && n.parentElement.closest('.lang-toggle')) continue;
    const key = norm(raw.trim());
    if (dict.has(key)) nodes.push({ n, raw, key });
  }

  const attrs = [];
  document.querySelectorAll('[alt],[aria-label],[title],[placeholder]').forEach(el => {
    ['alt', 'aria-label', 'title', 'placeholder'].forEach(name => {
      const raw = el.getAttribute(name);
      if (!raw) return;
      const key = norm(raw.trim());
      if (adict.has(key)) attrs.push({ el, name, raw, key });
    });
  });

  const rings = [...document.querySelectorAll('textPath')].map(tp => ({ tp, la: tp.getAttribute('lengthAdjust') }));

  const style = document.createElement('style');
  style.textContent = `
.lang-toggle{position:fixed;left:1.25rem;top:26px;z-index:70;
display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:.6rem 1.05rem;
border:1.5px solid var(--ink);border-radius:999px;background:rgba(29,24,30,.88);color:var(--blue);
font:600 .9rem/1 var(--fb);cursor:pointer;box-shadow:0 10px 30px rgba(0,0,0,.35);
-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);
transition:background .25s,color .25s,transform .25s}
.lang-toggle:hover{background:var(--ink);color:var(--paper);transform:translateY(-2px)}
.lang-toggle:active{transform:none}
@media(prefers-reduced-motion:reduce){.lang-toggle{transition:none}}
html[lang="fa"] :is(h1,h2,h3,p,blockquote){direction:rtl}
html[lang="fa"] h2,
html[lang="fa"] .sec-lead,
html[lang="fa"] .quote blockquote,
html[lang="fa"] .c-hero h1{margin-left:auto;margin-right:0}
html[lang="fa"] .c-hero .actions{justify-content:flex-end}
html[lang="fa"] .quote.big::before{left:auto;right:clamp(1.2rem,3.5vw,2.8rem)}
`;
  document.head.appendChild(style);

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'lang-toggle';
  document.body.appendChild(btn);

  const place = () => {
    const logo = document.querySelector('.nav .logo');
    if (!logo) return;
    const r = logo.getBoundingClientRect();
    btn.style.left = Math.round(r.right + 12) + 'px';
    btn.style.top = Math.round(r.top + (r.height - btn.offsetHeight) / 2) + 'px';
  };
  place();
  addEventListener('resize', place);
  addEventListener('load', place);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);

  const paint = fa => {
    btn.textContent = fa ? 'English' : 'فارسی';
    const label = fa ? 'Switch to English' : 'تغییر زبان به فارسی';
    btn.setAttribute('aria-label', label);
    btn.title = label;
    btn.setAttribute('aria-pressed', String(fa));
  };

  const swap = (raw, key, map) => {
    const core = raw.trim();
    const i = raw.indexOf(core);
    return raw.slice(0, i) + map.get(key) + raw.slice(i + core.length);
  };

  const set = fa => {
    html.lang = fa ? 'fa' : 'en';
    nodes.forEach(({ n, raw, key }) => { n.nodeValue = fa ? swap(raw, key, dict) : raw; });
    attrs.forEach(({ el, name, raw, key }) => el.setAttribute(name, fa ? adict.get(key) : raw));
    rings.forEach(({ tp, la }) => {
      if (fa) tp.setAttribute('lengthAdjust', 'spacingAndGlyphs');
      else if (la) tp.setAttribute('lengthAdjust', la);
    });
    document.title = fa ? (tdict.get(norm(rawTitle)) || rawTitle) : rawTitle;
    if (rawDesc) descEl.setAttribute('content', (fa && ddict.get(norm(rawDesc))) || rawDesc);
    paint(fa);
    try { localStorage.setItem(KEY, fa ? 'fa' : 'en'); } catch (e) {}
  };

  btn.addEventListener('click', () => set(html.lang !== 'fa'));

  const burger = document.querySelector('.burger');
  if (burger) new MutationObserver(() => {
    if (html.lang !== 'fa') return;
    const label = burger.getAttribute('aria-label');
    if (label === 'Open menu') burger.setAttribute('aria-label', 'باز کردن منو');
    if (label === 'Close menu') burger.setAttribute('aria-label', 'بستن منو');
  }).observe(burger, { attributes: true, attributeFilter: ['aria-label'] });

  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved === 'en') paint(false); else set(true);
})();
