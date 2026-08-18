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
const businessContacts = {
  'telecom': {
    address: 'Mediacom Trade City, Jaranwala Road, Faisalabad, Pakistan',
    phone: 'UAN: +92 41 111 888 300 | PTCL: 041 8502337 | Mob: 0314 4902595',
    uan: null,
    email: 'info@mediacom.com.pk'
  },
  'mscol': {
    address: 'Mediacom Trade City, Jaranwala Road, Faisalabad, Pakistan',
    phone: 'PTCL: 041 8502338 | Mob: +92 313 1668300',
    uan: null,
    email: 'info@mcsol.com.pk'
  },
  'real-estate': {
    address: 'Mediacom Trade City, Jaranwala Road, Faisalabad, Pakistan',
    phone: 'PTCL: 041 8502339 | Mob: +92 313 1668300',
    uan: null,
    email: 'info@mediacom.com.pk'
  },
  'agriculture': {
    address: 'Chak no 44, JB Sahianwala interchange to Chiniot Road chak jhumra Fasialabad, Pakistan',
    phone: 'Mob: 0300 7864417',
    uan: null,
    email: 'info@mediacom.com.pk'
  },
  'petroleum': {
    address: 'Chak no 19, JB Sahianwala interchange to Chiniot Road chak jhumra Fasialabad, Pakistan',
    phone: 'Mob: 0300 4775949',
    uan: null,
    email: 'info@mediacom.com.pk'
  },
  'digital-institute': {
    address: 'Sabri Tower Moza kalooana Gojra Road Jhang Sadar.',
    phone: 'UAN: 0477622463',
    uan: null,
    email: 'info@mediacomdigital.com.pk'
  },
  'trade-city': {
    address: 'Mediacom Trade City, Kohinoor City, Jaranwala Road, Faisalabad',
    phone: 'UAN: +92 41 111 888 300',
    uan: null,
    email: 'info@mediacom.com.pk'
  },
  'c8-central': {
    address: 'Mediacom Trade City, Jaranwala Road, Faisalabad, Pakistan',
    phone: 'UAN: +92 41 111 888 300 | PTCL: 041 8502340 | Mob: 0306 3644545',
    uan: null,
    email: 'info@mediacom.com.pk'
  },
  'mcwell-pharma': {
    address: 'Adjacent Small Estate Industrial Area, Main Sargodha Road Bypass, Near Nishatabad Police Station, Faisalabad, Punjab, Pakistan',
    phone: 'Mob: 0323 0176176',
    uan: null,
    email: 'info@mediacom.com.pk'
  }
};

// Default head-office contact
const defaultContact = {
  address: 'Mediacom Trade City, Jaranwala Road, Faisalabad, Pakistan',
  phone: 'UAN: +92 41 111 888 300',
  uan: null,
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
    phone.textContent = data.phone || '';
    phone.style.display = data.phone ? '' : 'none';
  }
  if (uan) {
    uan.textContent = data.uan || '';
    uan.style.display = data.uan ? '' : 'none';
  }
  if (email) {
    email.textContent = data.email;
  }
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
