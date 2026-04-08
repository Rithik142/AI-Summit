const cursorGlow = document.querySelector('.cursor-glow');

window.addEventListener('pointermove', (e) => {
  if (!cursorGlow) return;
  cursorGlow.style.setProperty('--x', `${e.clientX}px`);
  cursorGlow.style.setProperty('--y', `${e.clientY}px`);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal, .stagger').forEach((el) => observer.observe(el));

const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuBtn.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuBtn.textContent = '☰';
    });
  });
}

const magneticItems = document.querySelectorAll('.magnetic');
magneticItems.forEach((item) => {
  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    item.style.transform = `translate(${x * 0.025}px, ${y * 0.025}px)`;
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = '';
  });
});

function openToast(message = 'Demo form submitted. Connect this to Google Forms or your backend.') {
  const toast = document.createElement('div');
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    padding: '14px 18px',
    borderRadius: '16px',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #c62839, #0c1f4a)',
    boxShadow: '0 18px 40px rgba(10,28,72,0.2)',
    zIndex: '1000',
    fontWeight: '700',
    opacity: '0',
    transform: 'translateY(16px)',
    transition: 'opacity .35s ease, transform .35s ease'
  });

  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(16px)';
    setTimeout(() => toast.remove(), 350);
  }, 2600);
}

window.openToast = openToast;
