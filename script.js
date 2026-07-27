document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }

  // ============================================
  // LOADER
  // ============================================
  const loader = document.getElementById('loader');
  const loaderLine = document.querySelector('.loader-line');
  const loaderText = document.querySelector('.loader-text');
  const tlLoader = gsap.timeline();

  tlLoader
    .to(loaderText, { opacity: 1, duration: 0.4, ease: 'power2.out' })
    .to(loaderLine, { width: '120px', duration: 1.2, ease: 'power3.inOut' })
    .to(loaderLine, { width: '180px', duration: 0.4, ease: 'power2.out' })
    .to(loader, { opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.2 })
    .set(loader, { display: 'none' });

  // ============================================
  // LENIS
  // ============================================
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // ============================================
  // SCROLL PROGRESS
  // ============================================
  const scrollProgress = document.querySelector('.scroll-progress');

  lenis.on('scroll', (e) => {
    const progress = e.progress * 100;
    scrollProgress.style.width = `${progress}%`;
  });

  // ============================================
  // MOUSE GLOW
  // ============================================
  const glow = document.querySelector('.mouse-glow');
  let glowX = window.innerWidth / 2;
  let glowY = window.innerHeight / 2;

  document.addEventListener('mousemove', (e) => {
    glowX = e.clientX;
    glowY = e.clientY;
    glow.style.transform = `translate(${glowX - 200}px, ${glowY - 200}px)`;
  });

  // ============================================
  // NAVBAR
  // ============================================
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  lenis.on('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // ============================================
  // ABOUT STICKY TEXT REVEAL
  // ============================================
  gsap.from('.sticky-paragraphs p', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.3,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.sticky-story',
      start: 'top 60%',
      once: true,
    },
  });

  // ============================================
  // HERO ANIMATIONS
  // ============================================
  const heroLines = document.querySelectorAll('.hero-line');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroButtons = document.querySelector('.hero-buttons');
  const heroLabel = document.querySelector('.hero-label');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const shapes = document.querySelectorAll('.shape');

  const tlHero = gsap.timeline({ delay: 2.2 });

  tlHero
    .to(heroLabel, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
    .to(heroLines, { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }, '-=0.4')
    .to(heroSubtitle, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6')
    .to(heroButtons, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
    .to(scrollIndicator, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2');

  // Hero shapes parallax
  shapes.forEach((shape, i) => {
    gsap.to(shape, {
      y: () => (i + 1) * 60 * (i % 2 === 0 ? 1 : -1),
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    });
  });

  // ============================================
  // SPLIT TYPE (Section Titles)
  // ============================================
  document.querySelectorAll('.split-reveal').forEach((el) => {
    const split = new SplitType(el, { types: 'lines,words', lineClass: 'split-line', wordClass: 'split-word' });
    split.lines.forEach((line) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'split-wrapper';
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });
    gsap.set(split.words, { y: '100%', rotate: 3, opacity: 0 });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(split.words, {
          y: 0,
          rotate: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.015,
          ease: 'power3.out',
        });
      },
    });
  });

  // ============================================
  // REVEAL ON SCROLL
  // ============================================
  document.querySelectorAll('.reveal').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => el.classList.add('visible'),
    });
  });

  // ============================================
  // EDITORIAL SPREADS STAGGER
  // ============================================
  gsap.from('.spread-feature', {
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.3,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.spread-features',
      start: 'top 80%',
      once: true,
    },
  });

  // ============================================
  // EXPERIENCE TIMELINE
  // ============================================
  const expItems = document.querySelectorAll('.experience-item');
  const expProgress = document.querySelector('.experience-line-progress');

  expItems.forEach((item, i) => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top 80%',
      once: true,
      onEnter: () => item.classList.add('visible'),
    });
  });

  ScrollTrigger.create({
    trigger: '.experience-track',
    start: 'top 70%',
    end: 'bottom 30%',
    scrub: 1,
    onUpdate: (self) => {
      expProgress.style.height = `${self.progress * 100}%`;
    },
  });

  // ============================================
  // APPLE STATS REVEAL
  // ============================================
  gsap.from('.apple-stat, .apple-stat-arrow', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.apple-stats',
      start: 'top 80%',
      once: true,
    },
  });

  // ============================================
  // ANIMATED COUNTERS
  // ============================================
  const counters = document.querySelectorAll('.apple-stat-number');

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute('data-target'), 10);

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        let current = 0;
        const increment = Math.ceil(target / 60);
        const interval = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          counter.textContent = current;
        }, 30);
      },
    });
  });

  // ============================================
  // FULL-WIDTH QUOTE REVEAL
  // ============================================
  gsap.from('.fw-quote-text, .fw-quote-author', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.fw-quote',
      start: 'top 80%',
      once: true,
    },
  });

  // ============================================
  // MAGNETIC BUTTONS
  // ============================================
  document.querySelectorAll('.magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    });
  });

  // ============================================
  // THEME SWITCHER — COLLAPSIBLE
  // ============================================
  const themeSwitcher = document.querySelector('.theme-switcher');
  const toggleBtn = document.querySelector('.theme-toggle-btn');
  const themeBtns = document.querySelectorAll('.theme-btn');
  const savedTheme = localStorage.getItem('ss-theme') || 'editorial';

  document.documentElement.setAttribute('data-theme', savedTheme);
  themeBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.themeVal === savedTheme);
  });

  toggleBtn.addEventListener('click', () => {
    themeSwitcher.classList.toggle('open');
  });

  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.themeVal;
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('ss-theme', theme);
      themeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ============================================
  // BACK TO TOP
  // ============================================
  document.querySelector('.back-to-top').addEventListener('click', (e) => {
    e.preventDefault();
    lenis.scrollTo('#hero', { duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 3) });
  });

  // ============================================
  // SMOOTH NAV LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 3) });
        }
      }
    });
  });

  // ============================================
  // REFRESH SCROLLTRIGGER
  // ============================================
  ScrollTrigger.refresh();

});
