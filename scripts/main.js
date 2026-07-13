/* ==============================================================
   Portfolio Jeremy MADAR — main.js
   --------------------------------------------------------------
   Responsabilités :
     1. Reveal au scroll via IntersectionObserver
        → ajoute .is-visible sur les [data-reveal]
     2. Toggle thème clair / sombre avec persistance localStorage
     3. Assistance a11y sur les clics d'ancre (focus programmatique)

   Notes :
     - Le thème initial et la suppression de .no-js sont gérés
       par un script inline dans le <head> pour éviter le flash.
     - Les accordéons <details> et le smooth scroll fonctionnent
       nativement (CSS scroll-behavior + toggle natif du navigateur),
       aucun JS supplémentaire nécessaire.
     - Respect strict de prefers-reduced-motion : le CSS neutralise
       les animations, on n'a rien à faire côté JS.
   ============================================================== */

(function () {
    'use strict';

    // --------------------------------------------------------------
    // 1. RÉVÉLATION AU SCROLL
    // Chaque [data-reveal] reçoit .is-visible dès son entrée dans
    // le viewport. Les [data-reveal-child] enchaînent via cascade CSS.
    // --------------------------------------------------------------
    var revealTargets = document.querySelectorAll('[data-reveal]');

    if (!('IntersectionObserver' in window)) {
        // Navigateur ancien : on affiche tout d'un coup, pas d'animation.
        revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
    } else if (revealTargets.length > 0) {
        var revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Une fois révélé, on arrête d'observer (économie CPU)
                    observer.unobserve(entry.target);
                }
            });
        }, {
            // Se déclenche quand 12% du bloc est visible OU dès que son
            // haut passe à 60px du bas de l'écran — idéal pour "en dessous
            // du pli" sans attendre que l'utilisateur voie l'élément entier.
            threshold: 0.12,
            rootMargin: '0px 0px -60px 0px'
        });

        revealTargets.forEach(function (el) { revealObserver.observe(el); });
    }

    // --------------------------------------------------------------
    // 2. TOGGLE THÈME CLAIR / SOMBRE
    // Le thème initial vient de l'inline script du <head> (anti-flash).
    // Ici on gère la bascule utilisateur + la persistance.
    // --------------------------------------------------------------
    var themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            var currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            var newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);

            // Met à jour la meta theme-color (barre nav mobile)
            var metaThemeColor = document.querySelector('meta[name="theme-color"]:not([media])');
            if (metaThemeColor) {
                metaThemeColor.setAttribute('content', newTheme === 'dark' ? '#0A1628' : '#FBFCFD');
            }

            try {
                localStorage.setItem('theme', newTheme);
            } catch (e) {
                // localStorage indisponible : bascule non persistée, on continue quand même
            }
        });
    }

    // --------------------------------------------------------------
    // 3. FOCUS PROGRAMMATIQUE SUR ANCRES (a11y RGAA)
    // Après un clic sur une ancre, le focus doit se poser sur la
    // cible pour que les lecteurs d'écran annoncent la nouvelle
    // section. Sans ça, le focus reste sur le lien cliqué.
    // Le scroll fluide lui reste géré par CSS scroll-behavior.
    // --------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function () {
            var targetId = this.getAttribute('href');
            if (!targetId || targetId === '#' || targetId === '#!') return;

            var target = document.querySelector(targetId);
            if (!target) return;

            // Rend la cible focusable temporairement si elle ne l'est pas
            if (!target.hasAttribute('tabindex')) {
                target.setAttribute('tabindex', '-1');
            }
            // preventScroll: true → laisse le CSS scroll-behavior faire le job
            target.focus({ preventScroll: true });
        });
    });

})();
