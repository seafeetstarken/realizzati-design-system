═════════════════════════════════════════════════════════
  // 2. PRINT ACTION
  // ═══════════════════════════════════════════════════════════
  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }


  // ═══════════════════════════════════════════════════════════
  // 3. MOBILE SIDEBAR
  // ═══════════════════════════════════════════════════════════
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContent');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

  // Cria overlay mobile dinamicamente
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay hidden';
  document.body.appendChild(overlay);

  function openSidebar() {
    if (!sidebar) return;
    sidebar.classList.add('open');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (!sidebar) return;
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


  // ═══════════════════════════════════════════════════════════
  // 4. ACTIVE NAV LINK (IntersectionObserver)
  // ═══════════════════════════════════════════════════════════
  const sections = document.querySelectorAll('.content-section, .hero');

  const navObserverOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0,
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        if (id) setActiveLink(id);
      }
    });
  }, navObserverOptions);

  sections.forEach(section => navObserver.observe(section));

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

  // ─── Scroll suave para links da sidebar ─────────────────
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


  // ═══════════════════════════════════════════════════════════
  // 5. COPY HEX / TOKEN VALUES
  // ═══════════════════════════════════════════════════════════
  const copyToast = document.getElementById('copyToast');
  let toastTimer = null;

  function showToast(message) {
    if (!copyToast) return;
    if (toastTimer) clearTimeout(toastTimer);
    copyToast.textContent = message;
    copyToast.classList.add('show');
    toastTimer = setTimeout(() => {
      copyToast.classList.remove('show');
    }, 2200);
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback
    return new Promise((resolve) => {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0;left:-9999px;';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      resolve();
    });
  }

  // Copy hex ao clicar no swatch
  const swatches = document.querySelectorAll('.color-swatch[data-hex]');
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const hex = swatch.dataset.hex;
      if (!hex) return;
      copyToClipboard(hex).then(() => {
        showToast(`✓ ${hex} copiado!`);
      });
    });
  });

  // Copy semantic swatch
  const semanticSwatches = document.querySelectorAll('.semantic-swatch[data-hex]');
  semanticSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const hex = swatch.dataset.hex;
      if (!hex) return;
      copyToClipboard(hex).then(() => {
        showToast(`✓ ${hex} copiado!`);
      });
    });
  });

  // Copy ao clicar em token rows
  const tokenRows = document.querySelectorAll('.token-row');
  tokenRows.forEach(row => {
    row.style.cursor = 'pointer';
    row.title = 'Clique para copiar o valor';
    row.addEventListener('click', () => {
      const valueEl = row.querySelector('span');
      if (!valueEl) return;
      const value = valueEl.textContent.trim();
      copyToClipboard(value).then(() => {
        showToast(`✓ "${value}" copiado!`);
      });
    });
  });


  // ═══════════════════════════════════════════════════════════
  // 6. FADE-IN ANIMATIONS (IntersectionObserver)
  // ═══════════════════════════════════════════════════════════
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  const animatedEls = document.querySelectorAll(
    '.bezel-card, .profile-card, .pillar, .color-swatch, .rule-card, ' +
    '.agent-rule, .arch-item, .checklist-item, .objection, .copy-card, ' +
    '.type-card, .icon-cell, .competitor-card, .easing-card, ' +
    '.motion-demo-row, .logo-variant, .semantic-swatch, .photo-guideline'
  );

  animatedEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.03}s, transform 0.5s cubic-bezier(0.32, 0.72, 0, 1) ${i * 0.03}s`;
    fadeObserver.observe(el);
  });

  // Injeta classe 'visible'
  const visibleStyle = document.createElement('style');
  visibleStyle.textContent = `
    .visible {
      opacity: 1 !important;
      transform: none !important;
    }
  `;
  document.head.appendChild(visibleStyle);


  // ═══════════════════════════════════════════════════════════
  // 7. MOTION DEMO — Trigger de animações ao clicar
  // ═══════════════════════════════════════════════════════════
  const motionTriggers = document.querySelectorAll('.motion-trigger-btn[data-anim]');

  motionTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const animClass = btn.dataset.anim;
      const row = btn.closest('.motion-demo-row');
      if (!row) return;

      const box = row.querySelector('.motion-demo-box');
      if (!box) return;

      // Remove a classe de animação para poder re-aplicar
      box.classList.remove(animClass);
      // Reset visual
      box.style.opacity = '0';

      // Force reflow para reiniciar a animação
      void box.offsetWidth;

      // Re-aplica
      box.classList.add(animClass);
      box.style.opacity = '';
    });
  });


  // ═══════════════════════════════════════════════════════════
  // 8. PROGRESS BAR
  // ═══════════════════════════════════════════════════════════
  const progressBar = document.createElement('div');
  progressBar.id = 'progressBar';
  progressBar.style.cssText = `
    position: fixed; top: 52px; left: var(--sidebar-width, 272px); right: 0;
    height: 2px; background: transparent; z-index: 300; pointer-events: none;
    transition: left 0.2s ease;
  `;
  const progressFill = document.createElement('div');
  progressFill.style.cssText = `
    height: 100%; width: 0%;
    background: linear-gradient(90deg, var(--color-rose-gold, #B76E79), var(--color-sand-gold, #C4A482));
    transition: width 0.1s linear;
  `;
  progressBar.appendChild(progressFill);
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressFill.style.width = pct + '%';
  }, { passive: true });

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


  // ═══════════════════════════════════════════════════════════
  // 9. EASING CURVE HOVER DEMO
  // ═══════════════════════════════════════════════════════════
  // As barras de easing animam via CSS :hover — nenhum JS adicional necessário.
  // O código abaixo adiciona suporte touch para mobile.
  const easingCards = document.querySelectorAll('.easing-card');
  easingCards.forEach(card => {
    card.addEventListener('touchstart', () => {
      const fill = card.querySelector('.easing-bar-fill');
      if (fill) fill.style.width = '100%';
    }, { passive: true });

    card.addEventListener('touchend', () => {
      const fill = card.querySelector('.easing-bar-fill');
      if (fill) {
        setTimeout(() => { fill.style.width = '0%'; }, 600);
      }
    }, { passive: true });
  });


  // ═══════════════════════════════════════════════════════════
  // 10. KEYBOARD SHORTCUTS
  // ═══════════════════════════════════════════════════════════
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + P → Print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      // Deixa o print padrão do navegador funcionar
    }
  });

})();
