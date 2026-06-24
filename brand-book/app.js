/* ══════════════════════════════════════════
   REALIZZATI BRAND BOOK — APP.JS
   Navegação SPA + interatividade
══════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Elementos ──────────────────────────────────────
  const sidebar       = document.getElementById('sidebar');
  const mainContent   = document.getElementById('mainContent');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const copyToast     = document.getElementById('copyToast');
  const navLinks      = document.querySelectorAll('.nav-link[data-section]');

  // Cria overlay mobile dinamicamente
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay hidden';
  document.body.appendChild(overlay);

  // ─── Mobile Sidebar ──────────────────────────────────
  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openSidebar);
  if (sidebarToggle) sidebarToggle.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);

  // Fecha ao clicar num link no mobile
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) closeSidebar();
    });
  });

  // ─── Active Nav Link (IntersectionObserver) ──────────
  const sections = document.querySelectorAll('.content-section, .hero');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        setActiveLink(id);
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  function setActiveLink(id) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.dataset.section === id) {
        link.classList.add('active');
        // Garante que o link ativo fica visível na sidebar
        link.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    });
  }

  // ─── Copy Hex ao clicar no swatch ───────────────────
  const swatches = document.querySelectorAll('.color-swatch');
  let toastTimer = null;

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const hex = swatch.dataset.hex;
      if (!hex) return;

      navigator.clipboard.writeText(hex).then(() => {
        showToast(`✓ ${hex} copiado!`);
      }).catch(() => {
        // Fallback para navegadores sem clipboard API
        const ta = document.createElement('textarea');
        ta.value = hex;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast(`✓ ${hex} copiado!`);
      });
    });
  });

  function showToast(message) {
    if (toastTimer) clearTimeout(toastTimer);
    copyToast.textContent = message;
    copyToast.classList.add('show');
    toastTimer = setTimeout(() => {
      copyToast.classList.remove('show');
    }, 2200);
  }

  // ─── Token rows: copiar ao clicar ───────────────────
  const tokenRows = document.querySelectorAll('.token-row');
  tokenRows.forEach(row => {
    row.style.cursor = 'pointer';
    row.title = 'Clique para copiar o valor';
    row.addEventListener('click', () => {
      const valueEl = row.querySelector('span');
      if (!valueEl) return;
      const value = valueEl.textContent.trim();
      navigator.clipboard.writeText(value).then(() => {
        showToast(`✓ "${value}" copiado!`);
      }).catch(() => {});
    });
  });

  // ─── Animação de entrada das seções ─────────────────
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  // Aplica animação de fade-in via CSS
  const animatedEls = document.querySelectorAll(
    '.bezel-card, .profile-card, .pillar, .color-swatch, .rule-card, ' +
    '.agent-rule, .arch-item, .checklist-item, .objection, .copy-card, .type-card'
  );

  animatedEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.04}s, transform 0.5s cubic-bezier(0.32, 0.72, 0, 1) ${i * 0.04}s`;
    fadeObserver.observe(el);
  });

  // Adiciona classe 'visible' via CSS ao ser observado
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    .visible {
      opacity: 1 !important;
      transform: none !important;
    }
  `;
  document.head.appendChild(styleTag);

  // ─── Highlight do link de navegação ao clicar ────────
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ─── Progress bar no topo ────────────────────────────
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed; top: 0; left: var(--sidebar-width, 272px); right: 0;
    height: 2px; background: transparent; z-index: 300; pointer-events: none;
  `;
  const progressFill = document.createElement('div');
  progressFill.style.cssText = `
    height: 100%; width: 0%;
    background: linear-gradient(90deg, #C4A482, #DFD1C1);
    transition: width 0.1s linear;
  `;
  progressBar.appendChild(progressFill);
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressFill.style.width = pct + '%';
  });

  // Ajusta progress bar no mobile
  function adjustProgressBar() {
    if (window.innerWidth < 768) {
      progressBar.style.left = '0';
    } else {
      progressBar.style.left = 'var(--sidebar-width, 272px)';
    }
  }
  window.addEventListener('resize', adjustProgressBar);
  adjustProgressBar();

})();
