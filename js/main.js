// ── Scroll Animations ──
const animEls = document.querySelectorAll('.animate-fade-up, .animate-fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

animEls.forEach(el => observer.observe(el));

// ── Active nav link ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const businessPages = new Set([
  'telecom.html', 'mscol.html', 'cybersecurity.html',
  'real-estate.html', 'agriculture.html', 'petroleum.html',
  'digital-institute.html', 'trade-city.html', 'c8-central.html', 'mcwell-pharma.html'
]);

// Desktop nav
document.querySelectorAll('.nav-link-mc').forEach(link => {
  link.classList.remove('active');
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
  if (businessPages.has(currentPage) && href === 'projects.html') {
    link.classList.add('active');
  }
});

// Mobile nav
document.querySelectorAll('#mobileMenu .footer-link').forEach(link => {
  link.classList.remove('active');
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
  if (businessPages.has(currentPage) && href === 'projects.html') {
    link.classList.add('active');
  }
});

// ── Navbar scroll shrink ──
const navbar = document.querySelector('.navbar-mc');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar && navbar.classList.add('scrolled');
  } else {
    navbar && navbar.classList.remove('scrolled');
  }
});

// ── Back to top ──
const btt = document.getElementById('back-to-top');
if (btt) {
  window.addEventListener('scroll', () => {
    btt.classList.toggle('show', window.scrollY > 400);
  });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── Contact form ──
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Message Sent! ✓';
    btn.disabled = true;
    btn.style.background = '#4ade80';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}

// ── Footer Business Selector — dynamic contact panel ──
// Contact data per business (placeholders — swap values when client shares real details)
const businessContacts = {
  'telecom': {
    address: 'Mediacom Trade City, Jaranwala Road, Faisalabad, Pakistan',
    phone: '+92-41-111 888 300',       // ← PLACEHOLDER
    uan: null,
    email: 'catv@mediacom.com.pk'      // ← PLACEHOLDER
  },
  'mscol': {
    address: 'Mediacom Trade City, Jaranwala Road, Faisalabad, Pakistan',
    phone: '+92-41-111 888 300',       // ← PLACEHOLDER
    uan: null,
    email: 'mcsol@mediacom.com.pk'     // ← PLACEHOLDER
  },
  'real-estate': {
    address: 'Mediacom Trade City, Jaranwala Road, Faisalabad, Pakistan',
    phone: '+92-41-111 888 300',       // ← PLACEHOLDER
    uan: null,
    email: 'developers@mediacom.com.pk' // ← PLACEHOLDER
  },
  'agriculture': {
    address: 'Mediacom Trade City, Jaranwala Road, Faisalabad, Pakistan',
    phone: '+92-41-111 888 300',       // ← PLACEHOLDER
    uan: null,
    email: 'agriculture@mediacom.com.pk' // ← PLACEHOLDER
  },
  'petroleum': {
    address: 'Mediacom Trade City, Jaranwala Road, Faisalabad, Pakistan',
    phone: '+92-41-111 888 300',       // ← PLACEHOLDER
    uan: null,
    email: 'petroleum@mediacom.com.pk' // ← PLACEHOLDER
  },
  'digital-institute': {
    address: 'Mediacom Trade City, Jaranwala Road, Faisalabad, Pakistan',
    phone: '+92-41-111 888 300',       // ← PLACEHOLDER
    uan: null,
    email: 'mdi@mediacom.com.pk'       // ← PLACEHOLDER
  },
  'trade-city': {
    address: 'Mediacom Trade City, Kohinoor City, Jaranwala Road, Faisalabad',
    phone: '+92-41-111 888 300',       // ← PLACEHOLDER
    uan: null,
    email: 'tradecity@mediacom.com.pk' // ← PLACEHOLDER
  },
  'c8-central': {
    address: 'Mediacom Trade City, Jaranwala Road, Faisalabad, Pakistan',
    phone: '+92-41-111 888 300',       // ← PLACEHOLDER
    uan: null,
    email: 'c8central@mediacom.com.pk' // ← PLACEHOLDER
  },
  'mcwell-pharma': {
    address: 'Mediacom Trade City, Jaranwala Road, Faisalabad, Pakistan',
    phone: '+92-41-111 888 300',       // ← PLACEHOLDER
    uan: null,
    email: 'mcwell@mediacom.com.pk'    // ← PLACEHOLDER
  }
};

// Default head-office contact
const defaultContact = {
  address: 'Mediacom Trade City, Jaranwala Road, Faisalabad, Pakistan',
  phone: '+92-41-111 888 300',
  uan: '+92 41 111 888 300',
  email: 'info@mediacom.com.pk'
};

// Map page filenames → business keys
const pageToBusinessKey = {
  'telecom.html':           'telecom',
  'mscol.html':             'mscol',
  'real-estate.html':       'real-estate',
  'agriculture.html':       'agriculture',
  'petroleum.html':         'petroleum',
  'digital-institute.html': 'digital-institute',
  'trade-city.html':        'trade-city',
  'c8-central.html':        'c8-central',
  'mcwell-pharma.html':     'mcwell-pharma'
};

function setFooterContact(data) {
  const addr  = document.getElementById('footer-contact-address');
  const phone = document.getElementById('footer-contact-phone');
  const uan   = document.getElementById('footer-contact-uan');
  const email = document.getElementById('footer-contact-email');
  if (!addr) return; // footer contact panel not present on this page

  addr.textContent = data.address;

  if (phone) {
    phone.textContent = data.phone ? 'Tel: ' + data.phone : '';
    phone.style.display = data.phone ? '' : 'none';
  }
  if (uan) {
    uan.textContent = data.uan ? 'UAN: ' + data.uan : '';
    uan.style.display = data.uan ? '' : 'none';
  }
  if (email) email.textContent = data.email;
}

// On page load: auto-highlight current business + set its contact
const activeBusinessKey = pageToBusinessKey[currentPage];
const footerBusinessLinks = document.querySelectorAll('.footer-businesses .footer-link[data-business]');

footerBusinessLinks.forEach(link => link.classList.remove('active'));

if (activeBusinessKey) {
  // We're on a business page — auto-highlight + show its contact
  const activeLink = document.querySelector(`.footer-businesses .footer-link[data-business="${activeBusinessKey}"]`);
  if (activeLink) activeLink.classList.add('active');
  setFooterContact(businessContacts[activeBusinessKey] || defaultContact);
} else {
  // Home page or other page — show default head-office contact
  setFooterContact(defaultContact);
}
