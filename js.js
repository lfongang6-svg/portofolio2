const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const contactForm = document.getElementById('contactForm');
const scrollTopButton = document.querySelector('.scroll-top');
const formStatus = document.getElementById('formStatus');
const revealElements = document.querySelectorAll('section, .service-card, .portfolio-card, .product-card, .testimonial-card, .blog-card, .hero-card');

// ====== FUNCTION: Sélectionner un produit et aller au formulaire ======
function selectProductAndScroll(productName) {
  const serviceSelect = document.querySelector('select[name="service"]');
  serviceSelect.value = productName.includes('E-book') ? 'ebook' : 'templates';
  document.querySelector('textarea[name="message"]').value = `Je suis intéressé par : ${productName}`;
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  document.querySelector('input[name="name"]').focus();
}

// ====== PORTFOLIO FILTERING ======
const updatePortfolioFilter = (filter) => {
  portfolioCards.forEach((card) => {
    if (filter === 'all' || card.dataset.category === filter) {
      card.style.display = 'grid';
    } else {
      card.style.display = 'none';
    }
  });
};

if (filterButtons.length) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      updatePortfolioFilter(button.dataset.filter);
    });
  });
}

// ====== MOBILE MENU ======
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });
  
  // Fermer le menu au clic sur un lien
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
    });
  });
}

// ====== CONTACT FORM WITH VALIDATION ======
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Récupération et validation des données
    const formData = new FormData(contactForm);
    const name = formData.get('name')?.trim();
    const phone = formData.get('phone')?.trim();
    const email = formData.get('email')?.trim();
    const service = formData.get('service');
    const message = formData.get('message')?.trim();
    
    // Validation supplémentaire
    if (!name || name.length < 3) {
      showFormStatus('❌ Veuillez entrer un nom valide (minimum 3 caractères)', 'error');
      return;
    }
    if (!phone || phone.length < 9) {
      showFormStatus('❌ Veuillez entrer un numéro de téléphone valide', 'error');
      return;
    }
    if (!message || message.length < 10) {
      showFormStatus('❌ Votre message doit faire au minimum 10 caractères', 'error');
      return;
    }
    
    // Récit de succès avec confiance
    showFormStatus(`✅ Merci ${name} ! Votre demande a été reçue. Je vous recontacte sous 24h au ${phone}.`, 'success');
    
    // Animation de succès
    contactForm.style.opacity = '0.7';
    setTimeout(() => {
      contactForm.reset();
      contactForm.style.opacity = '1';
    }, 2000);
  });
}

// ====== FORM STATUS DISPLAY ======
function showFormStatus(message, type) {
  formStatus.textContent = message;
  formStatus.style.display = 'block';
  formStatus.style.backgroundColor = type === 'success' ? 'rgba(18, 165, 95, 0.15)' : 'rgba(220, 53, 69, 0.15)';
  formStatus.style.borderLeft = type === 'success' ? '4px solid #12a165' : '4px solid #dc3545';
  formStatus.style.color = type === 'success' ? '#12a165' : '#dc3545';
  
  if (type === 'success') {
    setTimeout(() => {
      formStatus.style.display = 'none';
    }, 4000);
  }
}

// ====== INTERSECTION OBSERVER FOR ANIMATIONS ======
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => {
  element.classList.add('reveal');
  observer.observe(element);
});

// ====== SCROLL TO TOP BUTTON ======
window.addEventListener('scroll', () => {
  if (window.scrollY > 450) {
    scrollTopButton?.classList.add('visible');
  } else {
    scrollTopButton?.classList.remove('visible');
  }
});

scrollTopButton?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
