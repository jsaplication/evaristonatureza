const menuBar = document.querySelector('.menu-bar')
const menuMobile = document.querySelector('.menu-mobile')
const menuClose = document.querySelector('.menu-close')

menuBar.addEventListener('click', () => {
  menuMobile.classList.add('active')
})

menuClose.addEventListener('click', () => {
  menuMobile.classList.remove('active')
})

// --- HEADER INTERATIVO ---
(function () {
  const header = document.querySelector('.header');
  const btnMenu = document.getElementById('btn-menu');
  const mainNav = document.getElementById('main-nav');

  if (!header) return;

  // ajusta --header-height e padding-top do body
  function setHeaderHeight() {
    const h = header.offsetHeight;
    document.documentElement.style.setProperty('--header-height', h + 'px');
    // se quiser corpo deslocado (para evitar overlay), usa isto:
    document.body.style.paddingTop = h + 'px';
  }
  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight);

  // troca classe scrolled ao rolar (muda background e reduz logo)
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });

  // abrir/fechar menu mobile
  if (btnMenu && mainNav) {
    btnMenu.addEventListener('click', () => {
      const open = mainNav.classList.toggle('open');
      btnMenu.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // fechar ao clicar em um link
    mainNav.querySelectorAll('a[href^="#"]').forEach(a =>
      a.addEventListener('click', () => {
        mainNav.classList.remove('open');
        btnMenu.setAttribute('aria-expanded', 'false');
      })
    );

    // fechar com ESC
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        mainNav.classList.remove('open');
        btnMenu.setAttribute('aria-expanded', 'false');
      }
    });

    // fechar ao clicar fora (somente em mobile)
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 991) {
        if (!mainNav.contains(e.target) && !btnMenu.contains(e.target)) {
          mainNav.classList.remove('open');
          btnMenu.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  // Destaque de link ativo via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#main-nav a[href^="#"]');
  if (sections.length && navLinks.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = document.querySelector(`#main-nav a[href="#${id}"]`);
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          if (link) link.classList.add('active');
        }
      });
    }, { threshold: 0.55 });
    sections.forEach(s => obs.observe(s));
  }
})();




