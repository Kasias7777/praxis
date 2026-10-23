import { assets, categories, products, services } from './data.js';

const EMAIL = 'a.kunach@ntnorge.com';
const PHONE = '+48 883 711 888';
const PHONE_LINK = '+48883711888';
const ADDRESS = 'ul. Cegielniana 4A / 15, 30-404 Kraków';
const page = document.body.dataset.page || 'home';
const pageNames = { home: 'Start', services: 'Usługi', catalog: 'Katalog produktów', contact: 'Kontakt' };
const root = document.querySelector('#site');

function navHref(path) {
  return page === 'home' ? path : `/${path}`;
}

function header() {
  const items = [
    ['Produkty', 'katalog-produktow/'],
    ['Usługi', 'uslugi/'],
    ['Kontakt', 'kontakt/'],
  ];
  return `
    <header class="site-header" id="top">
      <a class="brand" href="./" aria-label="PRAXIS Marketing Insight — strona główna"><img src="${assets.logo}" alt="PRAXIS Marketing Insight" /></a>
      <nav class="primary-nav" id="primary-nav" aria-label="Nawigacja główna">
        ${items.map(([label, href]) => `<a href="${href}"${label === pageNames[page] ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
      </nav>
      <div class="header-actions">
        <a class="header-phone" href="tel:${PHONE_LINK}">${PHONE}</a>
        <a class="button button-primary" href="kontakt/#formularz">Zapytaj o ofertę</a>
        <button class="menu-toggle" type="button" aria-label="Otwórz menu" aria-expanded="false" aria-controls="primary-nav">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
      </div>
    </header>`;
}

function footer() {
  return `
    <footer class="site-footer">
      <div class="footer-main">
        <div>
          <a class="footer-brand" href="./" aria-label="PRAXIS Marketing Insight — strona główna"><img src="${assets.logo}" alt="PRAXIS Marketing Insight" /></a>
          <p class="footer-description">Gadżety reklamowe, marketing i wsparcie firm w podróży oraz organizacji wydarzeń.</p>
        </div>
        <div>
          <span class="footer-label">Porozmawiajmy</span>
          <nav class="footer-links" aria-label="Linki w stopce">
            <a href="./">Start</a><a href="uslugi/">Usługi</a><a href="katalog-produktow/">Katalog produktów</a><a href="kontakt/">Kontakt</a>
          </nav>
        </div>
        <div class="footer-contact">
          <span class="footer-label">Dane kontaktowe</span>
          <a href="mailto:${EMAIL}">${EMAIL}</a>
          <a href="tel:${PHONE_LINK}">${PHONE}</a>
          <span>${ADDRESS}</span>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 PRAXIS Marketing Insight</span>
        <span class="footer-legal">PRAXIS MARKETING INSIGHT SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ</span>
      </div>
    </footer>`;
}

function sectionHead(kicker, title, intro = '') {
  return `<div class="section-head"><div><p class="section-kicker">${kicker}</p><h2 class="section-title">${title}</h2></div>${intro ? `<p class="section-intro">${intro}</p>` : ''}</div>`;
}

function contactForm({ compact = false } = {}) {
  return `
    <form class="contact-form" id="formularz">
      <h3>${compact ? 'Porozmawiajmy o Twojej firmie.' : 'Opowiedz nam, czego szuka Twoja firma.'}</h3>
      <p class="form-intro">Wspólnie ustalimy dobry kierunek. Napisz lub zadzwoń — zakres rozmowy dopasujemy do Twoich potrzeb.</p>
      <div class="form-grid">
        <div class="field"><label for="name">Imię lub firma</label><input id="name" name="name" autocomplete="name" placeholder="Jak się do Ciebie zwracać?" /></div>
        <div class="field"><label for="contact">Telefon lub e-mail *</label><input id="contact" name="contact" autocomplete="email" required placeholder="Jak odpowiedzieć?" /></div>
        <div class="field field-wide"><label for="topic">Temat rozmowy</label><select id="topic" name="topic"><option value="Gadżety reklamowe">Gadżety reklamowe</option><option value="Gadżety EKO">Gadżety EKO</option><option value="Marketing i reklama">Marketing i reklama</option><option value="Doradztwo biznesowe">Doradztwo biznesowe</option><option value="Wynajem samochodów">Wynajem samochodów</option><option value="Podróże i rezerwacje">Podróże i rezerwacje</option><option value="Targi, wystawy i kongresy">Targi, wystawy i kongresy</option><option value="Inny temat">Inny temat</option></select></div>
        <div class="field field-wide"><label for="message">Wiadomość *</label><textarea id="message" name="message" required placeholder="Opowiedz nam, czego potrzebuje Twoja firma."></textarea></div>
      </div>
      <div class="form-bottom"><p class="privacy-note">Po wysłaniu otworzy się szkic wiadomości w Twojej aplikacji pocztowej.</p><button class="button button-primary button-arrow" type="submit">Napisz wiadomość</button></div>
      <p class="form-status" role="status" aria-live="polite"></p>
    </form>`;
}

function contactSection() {
  return `
    <section class="section" id="kontakt">
      <div class="contact-layout">
        <div class="contact-copy">
          <p class="section-kicker">Zapytanie ofertowe</p>
          <h2>Nastawmy rozmowę na <span class="accent">Twoją markę.</span></h2>
          <p>Masz pomysł na gadżet albo potrzebujesz wsparcia? Opowiedz nam, czego szuka Twoja firma. Wspólnie ustalimy dobry kierunek.</p>
          <div class="contact-methods">
            <div class="contact-method"><span class="micro-label">Telefon</span><a href="tel:${PHONE_LINK}">${PHONE}</a></div>
            <div class="contact-method"><span class="micro-label">E-mail</span><a href="mailto:${EMAIL}">${EMAIL}</a></div>
          </div>
          <div class="company-address"><strong>PRAXIS Marketing Insight</strong>${ADDRESS}</div>
        </div>
        ${contactForm()}
      </div>
    </section>`;
}

function productCard(product) {
  return `
    <article class="product-card" data-product="${product.id}" data-category="${product.category}">
      <div class="product-image"><img src="${product.image}" alt="${product.alt}" loading="lazy" /></div>
      <div class="product-copy">
        <span class="product-tag">${product.category}</span>
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <a class="inline-link" href="?produkt=${encodeURIComponent(product.id)}#kontakt">Zapytaj o ten gadżet</a>
      </div>
    </article>`;
}

function homePage() {
  const featured = products;
  return `
    <main id="tresc">
      <section class="hero" id="top-start">
        <div class="hero-copy">
          <span class="eyebrow">PRAXIS Marketing Insight <span aria-hidden="true">/</span> Gadżety dla firm</span>
          <h1>Gadżety reklamowe,<br><span>które mówią</span><br>o Twojej marce.</h1>
          <p class="hero-lede">Dodaj logo, hasło albo własny projekt. Znajdziemy pomysł na gadżet, który pasuje do Twojej firmy, a przy okazji pomożemy w marketingu i codziennej organizacji.</p>
          <div class="hero-buttons"><a class="button button-primary button-arrow" href="#produkty">Zobacz produkty</a><a class="button button-ghost" href="uslugi/">Poznaj nasze usługi</a></div>
          <p class="hero-note">Personalizacja · gadżety firmowe · wsparcie dla zespołów</p>
        </div>
        <div class="hero-visual"><div class="hero-image-wrap"><img src="${assets.hero}" alt="Poglądowa kompozycja gadżetów reklamowych PRAXIS" fetchpriority="high" /><span class="hero-index"><b>01 /</b> Pomysły do personalizacji</span><span class="image-stamp">Twój znak.<br>Twoja marka.</span></div><span class="hero-rule" aria-hidden="true"></span></div>
      </section>

      <section class="section route-section" id="proces">
        ${sectionHead('Twój pomysł · nasza wspólna praca', 'Od pomysłu<br>do Twojej marki.', 'Zacznij od produktu, który pasuje do firmy. Dodaj własny znak, hasło albo projekt; konkretną personalizację i wycenę ustalimy po kontakcie.')}
        <div class="route-grid">
          <article class="route-card"><span class="index-no">01 / wybór</span><h3>Znajdź pomysł</h3><p>Biuro, pisanie, torby albo podróż — wybierz kategorię, która pasuje do Twojej marki.</p></article>
          <article class="route-card"><span class="index-no">02 / znak</span><h3>Dodaj własny projekt</h3><p>Logo, hasło albo indywidualny motyw nadają gadżetowi charakter Twojej firmy.</p></article>
          <article class="route-card"><span class="index-no">03 / rozmowa</span><h3>Omów możliwości</h3><p>Zapytaj o konkretny gadżet, materiały, dostępność i możliwości personalizacji.</p></article>
          <article class="route-card"><span class="index-no">04 / wycena</span><h3>Ustalmy szczegóły</h3><p>Konkretny produkt, znakowanie i wycenę dopasujemy indywidualnie po kontakcie.</p></article>
        </div>
      </section>

      <section class="section" id="produkty">
        ${sectionHead('Wybierz coś dla swojej marki', 'Nasze bestsellery.', 'Poznaj wybrane produkty z katalogu PRAXIS — propozycje, które można spersonalizować dla Twojej firmy.')}
        <div class="category-strip">
          <a class="category-link" href="katalog-produktow/?kategoria=Biuro%20i%20praca"><span class="index-no">01 / kategoria</span><strong>Biuro i praca</strong><span>Notesy i akcesoria na co dzień</span></a>
          <a class="category-link" href="katalog-produktow/?kategoria=Artyku%C5%82y%20pi%C5%9Bmiennicze"><span class="index-no">02 / kategoria</span><strong>Artykuły piśmiennicze</strong><span>Długopisy i zestawy do pisania</span></a>
          <a class="category-link" href="katalog-produktow/?kategoria=Torby"><span class="index-no">03 / kategoria</span><strong>Torby</strong><span>Torby i plecaki z własnym znakiem</span></a>
          <a class="category-link" href="katalog-produktow/?kategoria=Do%20podr%C3%B3%C5%BCy"><span class="index-no">04 / kategoria</span><strong>Do podróży</strong><span>Akcesoria dla osób w drodze</span></a>
        </div>
        <div class="carousel-toolbar">
          <a class="inline-link" href="katalog-produktow/">Zobacz cały katalog</a>
          <div class="carousel-controls" role="group" aria-label="Sterowanie karuzelą bestsellerów">
            <span class="carousel-position" id="featured-position" aria-live="polite">01 / ${String(featured.length).padStart(2, '0')}</span>
            <button class="carousel-button" type="button" data-carousel-prev aria-label="Poprzednie bestsellery" disabled><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m14.5 18-6-6 6-6"/><path d="M20 12H9"/></svg></button>
            <button class="carousel-button" type="button" data-carousel-next aria-label="Następne bestsellery"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 12h14"/><path d="m13 5 7 7-7 7"/></svg></button>
          </div>
        </div>
        <div class="product-carousel" id="featured-carousel" role="region" aria-roledescription="karuzela" aria-label="Bestsellery PRAXIS" tabindex="0">${featured.map(productCard).join('')}</div>
        <p class="disclaimer">To przykładowe wizualizacje. Dostępność, personalizację i wycenę ustalamy indywidualnie.</p>
      </section>

      <section class="section" id="eko">
        <div class="eco-band">
          <div><p class="section-kicker">Strefa EKO</p><h3>Gadżety EKO. <span class="accent">Pozytywny wizerunek marki.</span></h3><p>Wybierz gadżety wytwarzane z materiałów przyjaźniejszych środowisku. Kreuj pozytywny wizerunek marki i pokazuj wartości ważne dla Twojej firmy.</p></div>
          <a class="button button-ghost button-arrow" href="kontakt/#formularz">Zapytaj o gadżety EKO</a>
        </div>
      </section>

      <section class="section" id="uslugi">
        ${sectionHead('Więcej niż reklama', 'Wsparcie, którego<br>potrzebuje firma.', 'Od działań marketingowych po codzienną organizację. Wybierz obszar, o którym chcesz porozmawiać — zakres dopasujemy do tego, czego potrzebujesz.')}
        <div class="service-grid">${services.map((service) => `<article class="service-card"><span class="index-no">${service.number}</span><h3>${service.title}</h3><p>${service.description}</p><a class="inline-link" href="kontakt/?temat=${encodeURIComponent(service.title)}#formularz">Zapytaj o usługę</a></article>`).join('')}</div>
        <div class="service-section-cta"><p>Organizujemy również podróże, rezerwacje, wynajem samochodów oraz wydarzenia firmowe.</p><a class="inline-link" href="uslugi/">Zobacz wszystkie usługi</a></div>
      </section>

      <section class="section" id="obszary">
        ${sectionHead('Dobry wybór dla marki', 'Gadżet ma pracować<br><span class="soft">na Twoją markę.</span>', 'Przykładowe pomysły do codziennej pracy, na wydarzenie firmowe albo w podróży — spersonalizowane dla Twojej firmy.')}
        <div class="build-grid">
          <div class="build-image"><img src="assets/notebook.webp" alt="Poglądowy notes z okładką gotową do personalizacji" loading="lazy" /></div>
          <div class="build-copy"><p class="section-kicker">Gadżety firmowe</p><h3 class="section-title">Jedna marka.<br><span class="accent">Wiele okazji.</span></h3><p>Dodaj znak swojej firmy do przedmiotów, które towarzyszą w pracy, podczas wydarzeń firmowych albo w podróży. Wybierz kategorię i opowiedz nam, czego potrzebujesz.</p><ul class="feature-list"><li>Notesy i akcesoria do codziennej pracy</li><li>Długopisy i zestawy na wydarzenie</li><li>Torby i akcesoria dla osób w drodze</li></ul><a class="inline-link" style="margin-top:23px" href="kontakt/#formularz">Porozmawiajmy o Twoim pomyśle</a></div>
        </div>
      </section>
      ${contactSection()}
    </main>`;
}

function pageHero(kicker, headline, text, cta = 'kontakt/#formularz') {
  return `<section class="page-hero"><p class="page-hero-crumb">PRAXIS MARKETING INSIGHT <span class="accent">/</span> ${kicker}</p><h1>${headline}</h1><p class="lede">${text}</p><div class="hero-buttons"><a class="button button-primary button-arrow" href="${cta}">Porozmawiajmy</a></div></section>`;
}

function servicesPage() {
  return `
    <main id="tresc">
      ${pageHero('Usługi dla firm', 'Od dobrej reklamy<br><span>po sprawną organizację.</span>', 'Marketing, doradztwo, transport i podróże służbowe. PRAXIS Marketing Insight wspiera firmy w promocji i codziennych zadaniach organizacyjnych.')}
      <section class="section" id="uslugi">
        ${sectionHead('Jeden kontakt, różne potrzeby', 'Usługi dopasowane do tego,<br><span class="soft">jak działa Twoja firma.</span>', 'Wybierz obszar, o którym chcesz porozmawiać. Jeśli potrzebujesz kilku elementów naraz, opisz nam sytuację w jednej wiadomości.')}
        <div class="service-page-grid">${services.map((service) => `<article class="service-card"><span class="index-no">${service.number}</span><h3>${service.title}</h3><p>${service.description}</p><a class="inline-link" href="kontakt/?temat=${encodeURIComponent(service.title)}#formularz">Zapytaj o usługę</a></article>`).join('')}</div>
        <div class="service-details">
          <article class="detail-panel"><span class="index-no">Podróże i logistyka</span><h3>Pracownicy w drodze? Zadbaj o organizację.</h3><p>Możemy wesprzeć firmę w wynajmie samochodu, zakupie biletów i organizacji rezerwacji związanych z wyjazdem.</p><a class="inline-link" href="kontakt/?temat=${encodeURIComponent('Podróże i rezerwacje')}#formularz">Zapytaj o organizację podróży</a></article>
          <article class="detail-panel"><span class="index-no">Spotkania i wydarzenia</span><h3>Targi, wystawy i kongresy.</h3><p>Od wydarzenia branżowego po firmowe spotkanie: porozmawiajmy o organizacji i zakresie potrzebnego wsparcia.</p><a class="inline-link" href="kontakt/?temat=${encodeURIComponent('Targi, wystawy i kongresy')}#formularz">Porozmawiajmy</a></article>
        </div>
      </section>
      <section class="section"><div class="eco-band"><div><p class="section-kicker">Współpraca</p><h3>Którego obszaru potrzebuje <span class="accent">Twoja firma?</span></h3><p>Napisz lub zadzwoń. Poznamy cel i ustalimy, od czego zacząć.</p></div><a class="button button-ghost button-arrow" href="kontakt/#formularz">Napisz wiadomość</a></div></section>
    </main>`;
}

function catalogPage() {
  return `
    <main id="tresc">
      ${pageHero('Katalog PRAXIS', 'Gadżety reklamowe<br><span>dla Twojej firmy.</span>', 'Przykładowe produkty do pracy, pisania, noszenia i podróży. Dodaj logo, hasło albo własny projekt i nadaj im charakter.', 'kontakt/#formularz')}
      <section class="section" id="katalog">
        ${sectionHead('Pomysły do personalizacji', 'Przykładowe produkty.', 'Karty poniżej to inspiracje — nie cennik ani lista stanów magazynowych. Wybierz kategorię albo wpisz nazwę produktu.')}
        <div class="catalog-toolbar">
          <label class="search-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg><input id="product-search" type="search" placeholder="Szukaj po nazwie lub kategorii" aria-label="Szukaj produktów po nazwie lub kategorii" /></label>
          <div class="filter-list" role="group" aria-label="Filtruj produkty według kategorii">${categories.map((category) => `<button class="filter-chip" type="button" data-filter="${category}" aria-pressed="${category === 'Wszystkie'}">${category}</button>`).join('')}</div>
        </div>
        <p class="search-count" id="search-count" aria-live="polite">8 propozycji</p>
        <div class="product-grid" id="product-grid">${products.map(productCard).join('')}</div>
        <p class="empty-state" id="empty-state" hidden>Nie znaleźliśmy produktów w tej kategorii. Zmień kategorię lub wpisz inną nazwę.</p>
        <p class="disclaimer">Przedstawione obrazy i nazwy mają charakter poglądowy. Konkretny produkt, znakowanie, materiał i wycenę ustalamy po kontakcie.</p>
      </section>
      <section class="section"><div class="eco-band"><div><p class="section-kicker">Strefa EKO</p><h3>Wybierz gadżety <span class="accent">z myślą o środowisku.</span></h3><p>Zapytaj o produkty wytwarzane z materiałów przyjaźniejszych środowisku. Dobierzemy kierunek do charakteru Twojej marki.</p></div><a class="button button-ghost button-arrow" href="kontakt/?temat=Gadżety%20EKO#formularz">Zapytaj o strefę EKO</a></div></section>
    </main>`;
}

function contactPage() {
  return `
    <main id="tresc">
      ${pageHero('Kontakt · Kraków', 'Porozmawiajmy o potrzebach<br><span>Twojej firmy.</span>', 'Gadżety reklamowe, marketing, doradztwo albo organizacja podróży i wydarzeń. Wybierz wygodny sposób kontaktu.')}
      <section class="section" id="kontakt">
        <div class="contact-layout">
          <div class="contact-copy">
            <p class="section-kicker">PRAXIS Marketing Insight</p><h2>Napisz, czego <span class="accent">potrzebuje firma.</span></h2>
            <p>Wrócimy do rozmowy o gadżetach, usługach lub organizacji wyjazdu. Wybierz wygodny sposób kontaktu.</p>
            <div class="contact-methods">
              <div class="contact-method"><span class="micro-label">E-mail</span><a href="mailto:${EMAIL}">${EMAIL}</a></div>
              <div class="contact-method"><span class="micro-label">Telefon</span><a href="tel:${PHONE_LINK}">${PHONE}</a></div>
              <div class="contact-method"><span class="micro-label">Adres</span><span>${ADDRESS}</span></div>
            </div>
            <div class="company-address"><strong>Dane spółki</strong>PRAXIS MARKETING INSIGHT SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ<br>${ADDRESS}</div>
          </div>
          ${contactForm({ compact: true })}
        </div>
      </section>
    </main>`;
}

const content = page === 'catalog' ? catalogPage() : page === 'services' ? servicesPage() : page === 'contact' ? contactPage() : homePage();
root.innerHTML = `${header()}${content}${footer()}`;

root.querySelectorAll('h1, h2, h3').forEach((heading) => {
  const textNodes = [];
  const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((node) => { node.nodeValue = node.nodeValue.replace(/\./g, ''); });
});

const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
  navigation?.classList.toggle('is-open', open);
});
navigation?.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    navigation.classList.remove('is-open');
    menu?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-label', 'Otwórz menu');
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    navigation?.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.focus();
  }
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const revealItems = document.querySelectorAll('.section-head, .route-card, .category-link, .product-card, .service-card, .detail-panel, .area-card, .eco-band, .build-image, .contact-form');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
  revealItems.forEach((element, index) => {
    if (element.getBoundingClientRect().top > window.innerHeight * 0.86) {
      element.classList.add('motion-reveal');
      element.style.setProperty('--reveal-delay', `${(index % 5) * 55}ms`);
      revealObserver.observe(element);
    }
  });
}

function setupFeaturedCarousel() {
  const carousel = document.querySelector('#featured-carousel');
  if (!carousel) return;

  const cards = [...carousel.querySelectorAll('.product-card')];
  const previous = document.querySelector('[data-carousel-prev]');
  const next = document.querySelector('[data-carousel-next]');
  const position = document.querySelector('#featured-position');
  if (!cards.length || !previous || !next || !position) return;

  cards.forEach((card, index) => {
    const title = card.querySelector('h3')?.textContent.trim() || 'Produkt PRAXIS';
    card.setAttribute('role', 'group');
    card.setAttribute('aria-roledescription', 'slajd');
    card.setAttribute('aria-label', `${index + 1} z ${cards.length}: ${title}`);
  });

  const cardStep = () => {
    const width = cards[0].getBoundingClientRect().width;
    const gap = Number.parseFloat(getComputedStyle(carousel).gap) || 0;
    return width + gap;
  };

  const updateControls = () => {
    const step = cardStep();
    const index = Math.min(cards.length, Math.max(1, Math.round(carousel.scrollLeft / step) + 1));
    const total = String(cards.length).padStart(2, '0');
    position.textContent = `${String(index).padStart(2, '0')} / ${total}`;
    previous.disabled = carousel.scrollLeft <= 1;
    next.disabled = carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth - 1;
  };

  const move = (direction) => {
    const distance = direction * cardStep();
    if (prefersReducedMotion) carousel.scrollBy({ left: distance, behavior: 'auto' });
    else carousel.scrollBy({ left: distance, behavior: 'smooth' });
  };

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  carousel.addEventListener('scroll', updateControls, { passive: true });
  window.addEventListener('resize', updateControls, { passive: true });
  updateControls();
}

setupFeaturedCarousel();

if (page === 'catalog') {
  const search = document.querySelector('#product-search');
  const count = document.querySelector('#search-count');
  const empty = document.querySelector('#empty-state');
  const cards = [...document.querySelectorAll('.product-card')];
  const chips = [...document.querySelectorAll('.filter-chip')];
  const initialCategory = new URLSearchParams(location.search).get('kategoria');
  let activeCategory = categories.includes(initialCategory) ? initialCategory : 'Wszystkie';
  const normalize = (value) => value.toLocaleLowerCase('pl').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  function updateCatalog() {
    const query = normalize(search.value.trim());
    let visible = 0;
    cards.forEach((card) => {
      const product = products.find((item) => item.id === card.dataset.product);
      const categoryMatches = activeCategory === 'Wszystkie' || product.category === activeCategory;
      const searchMatches = !query || normalize(`${product.title} ${product.category} ${product.description}`).includes(query);
      const show = categoryMatches && searchMatches;
      card.hidden = !show;
      if (show) visible += 1;
    });
    count.textContent = `${visible} ${visible === 1 ? 'propozycja' : visible >= 2 && visible <= 4 ? 'propozycje' : 'propozycji'}`;
    empty.hidden = visible > 0;
    chips.forEach((chip) => chip.setAttribute('aria-pressed', String(chip.dataset.filter === activeCategory)));
  }
  chips.forEach((chip) => chip.addEventListener('click', () => { activeCategory = chip.dataset.filter; updateCatalog(); }));
  search.addEventListener('input', updateCatalog);
  updateCatalog();
}

const query = new URLSearchParams(location.search);
const requestedProduct = query.get('produkt');
const requestedTopic = query.get('temat');
if (requestedProduct) {
  const product = products.find((item) => item.id === requestedProduct);
  if (product) {
    const topic = document.querySelector('#topic');
    const message = document.querySelector('#message');
    if (topic) topic.value = 'Gadżety reklamowe';
    if (message && !message.value) message.value = `Proszę o informacje dotyczące produktu: ${product.title}.`;
  }
}
if (requestedTopic) {
  const topic = document.querySelector('#topic');
  if (topic && [...topic.options].some((option) => option.value === requestedTopic)) topic.value = requestedTopic;
}

document.querySelector('.contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const contact = String(data.get('contact') || '').trim();
  const message = String(data.get('message') || '').trim();
  const status = form.querySelector('.form-status');
  if (!contact || !message) {
    status.textContent = 'Podaj dane kontaktowe i treść wiadomości.';
    return;
  }
  const subject = `Zapytanie PRAXIS — ${String(data.get('topic') || 'Współpraca')}`;
  const body = [
    `Imię lub firma: ${String(data.get('name') || '—')}`,
    `Kontakt zwrotny: ${contact}`,
    `Temat: ${String(data.get('topic') || '—')}`,
    '',
    message,
  ].join('\n');
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  status.textContent = `Otwieramy szkic wiadomości do ${EMAIL} w Twojej aplikacji pocztowej. Dokończ wysyłkę w tej aplikacji.`;
  window.location.href = mailto;
});
