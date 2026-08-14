// ---------- Header scroll state ----------
const header = document.getElementById('siteHeader');
function onScroll() {
  header.classList.toggle('scrolled', window.scrollY > 40);
}
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// ---------- Scroll spy for nav ----------
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.main-nav a[data-nav]');
const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`.main-nav a[href="#${id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => spyObserver.observe(s));

// ---------- Ripple effect (water drop) on buttons ----------
document.querySelectorAll('[data-ripple]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
});

// ---------- Subtle water-ring cursor (desktop only) ----------
const cursor = document.getElementById('waterCursor');
let cursorActive = false;
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  window.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    if (!cursorActive) {
      cursor.style.opacity = '0.5';
      cursorActive = true;
    }
  });
  document.querySelectorAll('a, button, .card-box, .card-plain, .person-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '38px';
      cursor.style.height = '38px';
      cursor.style.opacity = '0.9';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '22px';
      cursor.style.height = '22px';
      cursor.style.opacity = '0.5';
    });
  });
  window.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget) cursor.style.opacity = '0';
  });
}
