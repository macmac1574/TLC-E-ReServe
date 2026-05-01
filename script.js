// =====================================================
// TLC E-Reserve — Landing Page Scripts
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
  // ---- Lucide icons ----
  if (window.lucide) lucide.createIcons();

  // ---- Theme (dark / light) ----
  const root = document.documentElement;
  const storageKey = 'tlc-theme';

  const getPreferredTheme = () => {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const setTheme = (theme) => {
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem(storageKey, theme);
    updateThemeIcons(theme);
  };

  const updateThemeIcons = (theme) => {
    const show = (id) => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('hidden');
    };
    const hide = (id) => {
      const el = document.getElementById(id);
      if (el) el.classList.add('hidden');
    };

    // Show icon that represents the action you can take next:
    // - If currently dark -> show sun (switch to light)
    // - If currently light -> show moon (switch to dark)
    if (theme === 'dark') {
      show('iconSun');
      hide('iconMoon');
      show('iconSunMobile');
      hide('iconMoonMobile');
    } else {
      hide('iconSun');
      show('iconMoon');
      hide('iconSunMobile');
      show('iconMoonMobile');
    }

    if (window.lucide) lucide.createIcons();
  };

  const initialTheme = getPreferredTheme();
  if (initialTheme === 'dark') root.classList.add('dark');
  updateThemeIcons(initialTheme);

  const toggleTheme = () => {
    const isDark = root.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
  };

  const themeToggle = document.getElementById('themeToggle');
  const themeToggleMobile = document.getElementById('themeToggleMobile');
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

  // ---- AOS animations ----
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }

  // ---- Footer year ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Sticky navbar shadow ----
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 8) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Mobile menu ----
  const menuBtn    = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    mobileMenu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => mobileMenu.classList.add('hidden'))
    );
  }

  // ---- Lightbox ----
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const screenshots   = Array.from(document.querySelectorAll('.screenshot'));
  let currentIndex = 0;

  const openLightbox = (index) => {
    const img = screenshots[index].querySelector('img');
    if (!img) return;
    currentIndex = index;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    lightbox.classList.remove('hidden');
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  document.querySelectorAll('.screenshot').forEach((btn, index) => {
    btn.addEventListener('click', () => openLightbox(index));
  });

  const closeLightbox = () => {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('is-open');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  };
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && !lightbox.classList.contains('hidden')) {
      closeLightbox();
    }
  });

  // ---- Swipe gestures for lightbox ----
  let touchStartX = 0;
  let touchEndX = 0;

  if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next image
        const nextIndex = (currentIndex + 1) % screenshots.length;
        openLightbox(nextIndex);
      } else {
        // Swipe right - previous image
        const prevIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
        openLightbox(prevIndex);
      }
    }
  };
});
