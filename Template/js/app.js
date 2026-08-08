/* ==========================================================
   js/app.js — Production-Grade Application Interactions
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Initialization of application modules
  initMobileNav();
  initRevealAnimations();
  renderFeaturedProperties();
  renderAllProperties(PROPERTIES_DATA);
  renderAgents();
  initTestimonialsSlider();
  initFilters();
  initInquiryModal();
  initContactForms();
  initNewsletterForm();
});

/* ==========================================================
   Security & Escaping Helpers
   ========================================================== */
function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ==========================================================
   Mobile Navigation & Drawer
   ========================================================== */
function initMobileNav() {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const navBackdrop = document.getElementById("nav-backdrop");
  const header = document.querySelector(".header");

  if (!menuToggle || !navLinks) return;

  function openMenu() {
    menuToggle.setAttribute("aria-expanded", "true");
    navLinks.classList.add("nav-active");
    menuToggle.classList.add("toggle-active");
    if (navBackdrop) {
      navBackdrop.classList.add("active");
      navBackdrop.setAttribute("aria-hidden", "false");
    }
    document.body.classList.add("body-scroll-lock");
  }

  function closeMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("nav-active");
    menuToggle.classList.remove("toggle-active");
    if (navBackdrop) {
      navBackdrop.classList.remove("active");
      navBackdrop.setAttribute("aria-hidden", "true");
    }
    document.body.classList.remove("body-scroll-lock");
  }

  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Backdrop click dismiss
  if (navBackdrop) {
    navBackdrop.addEventListener("click", closeMenu);
  }

  // Close menu when clicking any nav link
  const links = navLinks.querySelectorAll("a");
  links.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Escape key closes mobile navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("nav-active")) {
      closeMenu();
      menuToggle.focus();
    }
  });

  // Automatically reset mobile nav if window expands beyond mobile breakpoint
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024 && navLinks.classList.contains("nav-active")) {
      closeMenu();
    }
  }, { passive: true });

  // Sticky nav elevation styling on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  }, { passive: true });
}

/* ==========================================================
   Scroll-Reveal Animations (Intersection Observer)
   ========================================================== */
function initRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal");
  
  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add("active"));
    return;
  }

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observerInstance.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================
   Property Rendering Helper
   ========================================================== */
function formatCurrency(number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(number);
}

function createPropertyCard(property) {
  const safeId = escapeHTML(property.id);
  const safeImage = escapeHTML(property.image);
  const safeTitle = escapeHTML(property.title);
  const safeTag = escapeHTML(property.tag);
  const safeType = escapeHTML(property.type);
  const safeLocation = escapeHTML(property.location);
  const safePrice = formatCurrency(property.price);
  const safeBeds = escapeHTML(property.beds);
  const safeBaths = escapeHTML(property.baths);
  const safeArea = property.area.toLocaleString();

  return `
    <article class="property-card reveal" data-id="${safeId}">
      <div class="property-card-image-wrap">
        <img src="${safeImage}" alt="${safeTitle}" class="property-card-image" loading="lazy" width="600" height="375">
        <span class="property-card-tag">${safeTag}</span>
        <span class="property-card-type-badge">${safeType}</span>
      </div>
      <div class="property-card-content">
        <p class="property-card-location">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>${safeLocation}</span>
        </p>
        <h3 class="property-card-title">${safeTitle}</h3>
        <p class="property-card-price">${safePrice}</p>
        <div class="property-card-specs">
          <div class="spec-item">
            <span class="spec-label">Beds</span>
            <span class="spec-value">${safeBeds}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Baths</span>
            <span class="spec-value">${safeBaths}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Area</span>
            <span class="spec-value">${safeArea} sq ft</span>
          </div>
        </div>
        <div class="property-card-actions">
          <button type="button" class="btn btn-secondary btn-full btn-inquire" data-prop-title="${safeTitle}">Inquire Now</button>
        </div>
      </div>
    </article>
  `;
}

/* ==========================================================
   Featured Properties
   ========================================================== */
function renderFeaturedProperties() {
  const container = document.getElementById("featured-properties-grid");
  if (!container) return;

  const featured = PROPERTIES_DATA.filter(p => p.featured);
  container.innerHTML = featured.map(createPropertyCard).join("");
}

/* ==========================================================
   All Properties Catalog
   ========================================================== */
function renderAllProperties(properties) {
  const container = document.getElementById("all-properties-grid");
  if (!container) return;

  if (properties.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <h3>No Properties Found</h3>
        <p>We couldn't find any listings matching your search criteria. Try adjusting your filters.</p>
        <button id="btn-reset-filters-inner" class="btn btn-primary" type="button">Reset All Filters</button>
      </div>
    `;
    const innerReset = document.getElementById("btn-reset-filters-inner");
    if (innerReset) {
      innerReset.addEventListener("click", resetAllFilters);
    }
    return;
  }

  container.innerHTML = properties.map(createPropertyCard).join("");
  initRevealAnimations();
}

/* ==========================================================
   Agent Profiles
   ========================================================== */
function renderAgents() {
  const container = document.getElementById("agents-grid");
  if (!container) return;

  container.innerHTML = AGENTS_DATA.map(agent => {
    const safePhoto = escapeHTML(agent.photo);
    const safeName = escapeHTML(agent.name);
    const safeRole = escapeHTML(agent.role);
    const safeExp = escapeHTML(agent.experience);
    const safeEmail = escapeHTML(agent.email);
    const safePhone = escapeHTML(agent.phone);
    const phoneClean = safePhone.replace(/[^+\d]/g, '');

    return `
      <article class="agent-card reveal">
        <div class="agent-card-image-wrap">
          <img src="${safePhoto}" alt="${safeName}" class="agent-card-image" loading="lazy" width="400" height="400">
        </div>
        <div class="agent-card-content">
          <h3 class="agent-name">${safeName}</h3>
          <p class="agent-role">${safeRole}</p>
          <p class="agent-exp">${safeExp}</p>
          <div class="agent-contact-details">
            <a href="mailto:${safeEmail}" class="agent-contact-link" aria-label="Send email to ${safeName}">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>${safeEmail}</span>
            </a>
            <a href="tel:${phoneClean}" class="agent-contact-link" aria-label="Call ${safeName}">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>${safePhone}</span>
            </a>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

/* ==========================================================
   Property Filters
   ========================================================== */
let searchTimeout;
function initFilters() {
  const searchInput = document.getElementById("search-input");
  const typeSelect = document.getElementById("type-select");
  const bedsSelect = document.getElementById("beds-select");
  const priceRange = document.getElementById("price-range");
  const priceValue = document.getElementById("price-value");
  const btnReset = document.getElementById("btn-reset-filters");

  if (!searchInput || !priceRange) return;

  // Synchronize slider display text
  priceRange.addEventListener("input", (e) => {
    const val = parseInt(e.target.value, 10);
    if (val >= 20000000) {
      priceValue.textContent = "Any Budget";
    } else {
      priceValue.textContent = formatCurrency(val);
    }
    debounceFilter();
  });

  // Attach search listeners
  searchInput.addEventListener("input", debounceFilter);
  if (typeSelect) typeSelect.addEventListener("change", applyFilters);
  if (bedsSelect) bedsSelect.addEventListener("change", applyFilters);
  if (btnReset) btnReset.addEventListener("click", resetAllFilters);

  // Quick search handles in hero section
  const heroSearchInput = document.getElementById("hero-search-input");
  const heroTypeSelect = document.getElementById("hero-type-select");
  const heroSearchBtn = document.getElementById("hero-search-btn");

  if (heroSearchBtn) {
    heroSearchBtn.addEventListener("click", () => {
      if (heroSearchInput && searchInput) searchInput.value = heroSearchInput.value;
      if (heroTypeSelect && typeSelect) typeSelect.value = heroTypeSelect.value;
      
      const target = document.getElementById("listings-section");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }

      applyFilters();
    });
  }
}

function debounceFilter() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(applyFilters, 220);
}

function applyFilters() {
  const searchInput = document.getElementById("search-input");
  const typeSelect = document.getElementById("type-select");
  const bedsSelect = document.getElementById("beds-select");
  const priceRange = document.getElementById("price-range");
  const container = document.getElementById("all-properties-grid");

  if (!searchInput || !container) return;

  const query = searchInput.value.toLowerCase().trim();
  const type = typeSelect ? typeSelect.value : "";
  const beds = bedsSelect ? bedsSelect.value : "";
  const maxPrice = priceRange ? parseInt(priceRange.value, 10) : 20000000;

  const filtered = PROPERTIES_DATA.filter(property => {
    // Search by title or location
    const matchesQuery = !query || 
      property.title.toLowerCase().includes(query) || 
      property.location.toLowerCase().includes(query);
    
    // Search by property type
    const matchesType = !type || property.type === type;
    
    // Search by bedrooms
    let matchesBeds = true;
    if (beds) {
      if (beds.endsWith("+")) {
        const threshold = parseInt(beds, 10);
        matchesBeds = property.beds >= threshold;
      } else {
        matchesBeds = property.beds === parseInt(beds, 10);
      }
    }

    // Search by price
    const matchesPrice = property.price <= maxPrice;

    return matchesQuery && matchesType && matchesBeds && matchesPrice;
  });

  // Smooth filter transition
  container.classList.add("filtering");
  
  setTimeout(() => {
    renderAllProperties(filtered);
    container.classList.remove("filtering");
  }, 160);
}

function resetAllFilters() {
  const searchInput = document.getElementById("search-input");
  const typeSelect = document.getElementById("type-select");
  const bedsSelect = document.getElementById("beds-select");
  const priceRange = document.getElementById("price-range");
  const priceValue = document.getElementById("price-value");

  if (searchInput) searchInput.value = "";
  if (typeSelect) typeSelect.value = "";
  if (bedsSelect) bedsSelect.value = "";
  if (priceRange) priceRange.value = "20000000";
  if (priceValue) priceValue.textContent = "Any Budget";

  const heroSearchInput = document.getElementById("hero-search-input");
  const heroTypeSelect = document.getElementById("hero-type-select");
  if (heroSearchInput) heroSearchInput.value = "";
  if (heroTypeSelect) heroTypeSelect.value = "";

  applyFilters();
}

/* ==========================================================
   Testimonials Slider & Touch Gestures
   ========================================================== */
function initTestimonialsSlider() {
  const container = document.getElementById("testimonials-slider-content");
  const prevBtn = document.getElementById("testimonial-prev");
  const nextBtn = document.getElementById("testimonial-next");
  const indicators = document.getElementById("testimonial-indicators");
  const section = document.getElementById("testimonials-section");

  if (!container || TESTIMONIALS_DATA.length === 0) return;

  let currentIndex = 0;

  // Render slides in CSS Grid stack
  container.innerHTML = TESTIMONIALS_DATA.map((t, idx) => {
    const safeQuote = escapeHTML(t.quote);
    const safeAuthor = escapeHTML(t.author);
    const safeRole = escapeHTML(t.role);
    const safeLoc = escapeHTML(t.location);
    return `
      <div class="testimonial-slide ${idx === 0 ? 'slide-active' : ''}" data-index="${idx}" role="group" aria-roledescription="slide" aria-label="${idx + 1} of ${TESTIMONIALS_DATA.length}">
        <p class="testimonial-quote">“${safeQuote}”</p>
        <div class="testimonial-author-info">
          <span class="author-name">${safeAuthor}</span>
          <span class="author-title">${safeRole} &middot; ${safeLoc}</span>
        </div>
      </div>
    `;
  }).join("");

  // Render indicators
  if (indicators) {
    indicators.innerHTML = TESTIMONIALS_DATA.map((_, idx) => `
      <button type="button" class="indicator-dot ${idx === 0 ? 'indicator-active' : ''}" data-index="${idx}" aria-label="Go to testimonial slide ${idx + 1}"></button>
    `).join("");
  }

  const slides = container.querySelectorAll(".testimonial-slide");
  const dots = indicators ? indicators.querySelectorAll(".indicator-dot") : [];

  function goToSlide(index) {
    if (index >= TESTIMONIALS_DATA.length) index = 0;
    if (index < 0) index = TESTIMONIALS_DATA.length - 1;

    slides[currentIndex].classList.remove("slide-active");
    if (dots[currentIndex]) dots[currentIndex].classList.remove("indicator-active");

    currentIndex = index;

    slides[currentIndex].classList.add("slide-active");
    if (dots[currentIndex]) dots[currentIndex].classList.add("indicator-active");
  }

  if (prevBtn) prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));

  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      const targetIndex = parseInt(e.target.getAttribute("data-index"), 10);
      goToSlide(targetIndex);
    });
  });

  // Touch swipe support for mobile users
  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  container.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 40;
    if (touchEndX < touchStartX - swipeThreshold) {
      goToSlide(currentIndex + 1);
      resetAutoplay();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      goToSlide(currentIndex - 1);
      resetAutoplay();
    }
  }

  // Keyboard navigation for accessibility
  if (section) {
    section.setAttribute("tabindex", "0");
    section.setAttribute("aria-label", "Customer Testimonials. Use left and right arrow keys to navigate.");
    section.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        goToSlide(currentIndex - 1);
        resetAutoplay();
      } else if (e.key === "ArrowRight") {
        goToSlide(currentIndex + 1);
        resetAutoplay();
      }
    });
  }

  // Autoplay slider every 7.5 seconds
  let autoPlayTimer = setInterval(() => goToSlide(currentIndex + 1), 7500);

  const resetAutoplay = () => {
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(() => goToSlide(currentIndex + 1), 7500);
  };

  if (prevBtn) prevBtn.addEventListener("click", resetAutoplay);
  if (nextBtn) nextBtn.addEventListener("click", resetAutoplay);
  dots.forEach(dot => dot.addEventListener("click", resetAutoplay));
}

/* ==========================================================
   Inquiry Modal Controls & Focus Management
   ========================================================== */
let lastActiveElement = null;

function initInquiryModal() {
  const modal = document.getElementById("inquiry-modal");
  const closeModalBtn = document.getElementById("modal-close");
  const modalPropertyInput = document.getElementById("modal-property");
  
  if (!modal) return;

  // Delegated open listener on "Inquire Now" buttons
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-inquire");
    if (btn) {
      lastActiveElement = btn;
      const propTitle = btn.getAttribute("data-prop-title");
      if (modalPropertyInput && propTitle) {
        modalPropertyInput.value = propTitle;
      }
      openModal(modal);
    }
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => closeModal(modal));
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });
}

function handleModalKeydown(e) {
  const modal = document.getElementById("inquiry-modal");
  if (!modal || !modal.classList.contains("modal-open")) return;
  
  if (e.key === "Escape") {
    closeModal(modal);
    return;
  }

  if (e.key === 'Tab') {
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex="0"]');
    if (focusableElements.length === 0) return;

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  }
}

function openModal(modal) {
  modal.classList.add("modal-open");
  document.body.classList.add("body-scroll-lock");
  
  document.addEventListener('keydown', handleModalKeydown);
  
  const nameInput = document.getElementById("modal-name");
  if (nameInput) {
    setTimeout(() => nameInput.focus(), 60);
  }
}

function closeModal(modal) {
  modal.classList.remove("modal-open");
  document.body.classList.remove("body-scroll-lock");
  
  document.removeEventListener('keydown', handleModalKeydown);
  
  const form = modal.querySelector("form");
  if (form) {
    form.reset();
    clearFormErrors(form);
  }

  if (lastActiveElement) {
    lastActiveElement.focus();
  }
}

/* ==========================================================
   Form Validations & Submissions
   ========================================================== */
function initContactForms() {
  const forms = document.querySelectorAll(".inquiry-form-element");

  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      if (validateForm(form)) {
        submitForm(form);
      }
    });

    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach(input => {
      input.addEventListener("input", () => {
        const group = input.closest(".form-group");
        if (group) {
          group.classList.remove("form-group-error");
          const errorMsg = group.querySelector(".error-message");
          if (errorMsg) errorMsg.textContent = "";
        }
      });
    });
  });
}

function validateForm(form) {
  let isValid = true;
  clearFormErrors(form);

  const nameInput = form.querySelector('[name="name"]');
  const emailInput = form.querySelector('[name="email"]');
  const phoneInput = form.querySelector('[name="phone"]');
  const messageInput = form.querySelector('[name="message"]');

  // Name Validation
  if (nameInput && !nameInput.value.trim()) {
    showError(nameInput, "Please enter your full name.");
    isValid = false;
  }

  // Email Validation
  if (emailInput) {
    const val = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) {
      showError(emailInput, "Please enter your email address.");
      isValid = false;
    } else if (!emailRegex.test(val)) {
      showError(emailInput, "Please enter a valid email address (e.g. name@example.com).");
      isValid = false;
    }
  }

  // Optional Phone Validation
  if (phoneInput && phoneInput.value.trim()) {
    const val = phoneInput.value.trim();
    const phoneRegex = /^[+]?[0-9\s\-()]{7,20}$/;
    if (!phoneRegex.test(val)) {
      showError(phoneInput, "Please enter a valid phone number.");
      isValid = false;
    }
  }

  // Message Validation
  if (messageInput && !messageInput.value.trim()) {
    showError(messageInput, "Please write a message explaining your inquiry.");
    isValid = false;
  }

  return isValid;
}

function showError(input, message) {
  const group = input.closest(".form-group");
  if (!group) return;

  group.classList.add("form-group-error");
  
  let errorMsg = group.querySelector(".error-message");
  if (!errorMsg) {
    errorMsg = document.createElement("span");
    errorMsg.className = "error-message";
    group.appendChild(errorMsg);
  }
  errorMsg.textContent = message;
}

function clearFormErrors(form) {
  const groups = form.querySelectorAll(".form-group");
  groups.forEach(group => {
    group.classList.remove("form-group-error");
    const errorMsg = group.querySelector(".error-message");
    if (errorMsg) errorMsg.textContent = "";
  });
}

function submitForm(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <svg class="spinner" viewBox="0 0 50 50" width="18" height="18" aria-hidden="true">
      <circle class="spinner-path" cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"></circle>
    </svg>
    <span>Processing...</span>
  `;

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
    form.reset();

    showSuccessToast("Thank you. Your inquiry has been sent to our concierge desk. We will contact you shortly.");

    const modal = document.getElementById("inquiry-modal");
    if (modal && modal.classList.contains("modal-open")) {
      closeModal(modal);
    }
  }, 1000);
}

/* ==========================================================
   Newsletter Subscription
   ========================================================== */
function initNewsletterForm() {
  const newsletterForm = document.querySelector(".newsletter-input-group");
  if (!newsletterForm) return;

  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("newsletter-email");
    if (emailInput && emailInput.value.trim()) {
      showSuccessToast("Thank you! You have successfully subscribed to our luxury property newsletter.");
      newsletterForm.reset();
    }
  });
}

/* ==========================================================
   Toast Notifications
   ========================================================== */
function showSuccessToast(message) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const safeMessage = escapeHTML(message);

  const toast = document.createElement("div");
  toast.className = "toast toast-success";
  toast.setAttribute("role", "status");
  toast.innerHTML = `
    <div class="toast-icon">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    </div>
    <div class="toast-content">
      <p class="toast-message">${safeMessage}</p>
    </div>
    <button type="button" class="toast-close" aria-label="Close notification">&times;</button>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("toast-show");
  });

  const closeToast = () => {
    toast.classList.remove("toast-show");
    setTimeout(() => toast.remove(), 250);
  };

  toast.querySelector(".toast-close").addEventListener("click", closeToast);
  setTimeout(closeToast, 4500);
}
