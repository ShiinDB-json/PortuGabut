/* ============================================================
   SCRIPT.JS — The Deep Observer Portfolio
   Deskripsi: JavaScript minimal. Hanya dua fungsi utama:
   1. Scroll reveal via Intersection Observer
   2. Tandai link navigasi yang sedang aktif
   Tidak ada animasi via JS, tidak ada DOM manipulation berat.
   ============================================================ */

(function () {
  'use strict';

  // ─── 1. SCROLL REVEAL (Intersection Observer) ───────────────
  // Elemen dengan class .reveal akan muncul saat masuk viewport
  // Animasi transisi didefinisikan di CSS, JS hanya toggle class

  function initScrollReveal() {
    // Jika browser tidak support IntersectionObserver, langsung tampilkan semua
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Unobserve setelah muncul — tidak perlu observe terus
            observer.unobserve(entry.target);
          }
        });
      },
      {
        // Trigger saat 10% elemen terlihat
        threshold: 0.1,
        // Mulai sedikit sebelum masuk viewport
        rootMargin: '0px 0px -40px 0px'
      }
    );

    // Observe semua elemen dengan class .reveal
    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  // ─── 2. ACTIVE NAV LINK ─────────────────────────────────────
  // Tandai link navigasi yang sesuai dengan halaman aktif
  // Menggunakan pathname saja, bukan hash

  function setActiveNav() {
    var currentPath = window.location.pathname;
    // Normalisasi: hapus trailing slash
    var normalizedPath = currentPath.replace(/\/$/, '') || '/';

    var navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href') || '';
      // Cek kecocokan exact atau substring (untuk path bertingkat)
      if (href === normalizedPath || 
          (href !== '/' && href !== '/index.html' && normalizedPath.startsWith(href))) {
        link.setAttribute('aria-current', 'page');
      } else if (
        (href === '/' || href === 'index.html') && 
        (normalizedPath === '/' || normalizedPath.endsWith('index.html') || normalizedPath === '')
      ) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  // ─── INISIALISASI ─────────────────────────────────────────
  // Jalankan setelah DOM siap

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initScrollReveal();
      setActiveNav();
    });
  } else {
    // DOM sudah siap
    initScrollReveal();
    setActiveNav();
  }

})();
