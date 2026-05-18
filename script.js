// ===== PAGE LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
  }, 700);
});

// ===== SIDEBAR =====
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
const hamburger = document.getElementById('hamburger');
const sidebarClose = document.getElementById('sidebar-close');

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}
hamburger.addEventListener('click', openSidebar);
sidebarClose.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

// Sidebar nav active state on click
document.querySelectorAll('.sidebar-nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.sidebar-nav a').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    closeSidebar();
  });
});

// ===== STICKY HEADER =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== HERO CAROUSEL =====
const track = document.getElementById('carouselTrack');
const dots  = document.querySelectorAll('.dot');
const slides = document.querySelectorAll('.carousel-slide');
let current = 0;
let autoTimer;

function goToSlide(idx) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (idx + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
  track.style.transform = `translateX(-${current * 100}%)`;
}

function startAuto() {
  autoTimer = setInterval(() => goToSlide(current + 1), 5000);
}
function resetAuto() {
  clearInterval(autoTimer);
  startAuto();
}

document.getElementById('prevBtn').addEventListener('click', () => { goToSlide(current - 1); resetAuto(); });
document.getElementById('nextBtn').addEventListener('click', () => { goToSlide(current + 1); resetAuto(); });
dots.forEach((d, i) => d.addEventListener('click', () => { goToSlide(i); resetAuto(); }));

// Swipe support
let touchStartX = 0;
track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) { goToSlide(current + (diff > 0 ? 1 : -1)); resetAuto(); }
});

// Init
goToSlide(0);
startAuto();

// ===== SMOOTH SCROLL for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== SEARCH INPUT LIVE FILTER =====
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim();
    document.querySelectorAll('.car-card').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = (!q || text.includes(q)) ? '' : 'none';
    });
  });
}
