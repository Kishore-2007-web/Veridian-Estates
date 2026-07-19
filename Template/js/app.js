/* js/app.js */

document.addEventListener("DOMContentLoaded", () => {
  // Initializations
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
   Mobile Navigation
   ========================================================== */
function initMobileNav() {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const header = document.querySelector(".header");

  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !isExpanded);
    navLinks.classList.toggle("nav-active");
    menuToggle.classList.toggle("toggle-active");
    document.body.classList.toggle("nav-open");
  });

  // Close menu when clicking a link
  const links = navLinks.querySelectorAll("a");
  links.forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("nav-active");
      menuToggle.classList.remove("toggle-active");
      document.body.classList.remove("nav-open");
    });
  });

  // Sticky nav styling on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  });
}

/* ==========================================================
   Scroll-Reveal Animations (Intersection Observer)
   ========================================================== */
function initRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal");
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Animates once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
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
        <img src="${safeImage}" alt="${safeTitle}" class="property-card-image" loading="lazy">
        <span class="property-card-tag">${safeTag}</span>
        <span class="property-card-type-badge">${safeType}</span>
      </div>
      <div class="property-card-content">
        <p class="property-card-location">
          <svg class="icon-location" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          ${safeLocation}
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
        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <h3>No Properties Found</h3>
        <p>We couldn't find any listings matching your search criteria. Try adjusting your filters.</p>
        <button id="btn-reset-filters-inner" class="btn btn-primary mt-4">Reset Filters</button>
      </div>
    `;
    const innerReset = document.getElementById("btn-reset-filters-inner");
    if (innerReset) {
      innerReset.addEventListener("click", resetAllFilters);
    }
    return;
  }

  container.innerHTML = properties.map(createPropertyCard).join("");
  // Re-run animation observer on newly injected elements
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
          <img src="${safePhoto}" alt="${safeName}" class="agent-card-image" loading="lazy">
        </div>
        <div class="agent-card-content">
          <h3 class="agent-name">${safeName}</h3>
          <p class="agent-role">${safeRole}</p>
          <p class="agent-exp">${safeExp}</p>
          <div class="agent-contact-details">
            <a href="mailto:${safeEmail}" class="agent-contact-link">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              ${safeEmail}
            </a>
            <a href="tel:${phoneClean}" class="agent-contact-link">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              ${safePhone}
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

  if (!searchInput) return;

  // Synchronize the slider display text
  priceRange.addEventListener("input", (e) => {
    const val = parseInt(e.target.value);
    if (val === 20000000) {
      priceValue.textContent = "Any Budget";
    } else {
      priceValue.textContent = formatCurrency(val);
    }
    debounceFilter();
  });

  // Attach search listeners
  searchInput.addEventListener("input", debounceFilter);
  typeSelect.addEventListener("change", applyFilters);
  bedsSelect.addEventListener("change", applyFilters);
  btnReset.addEventListener("click", resetAllFilters);

  // Quick search handles in hero section
  const heroSearchInput = document.getElementById("hero-search-input");
  const heroTypeSelect = document.getElementById("hero-type-select");
  const heroSearchBtn = document.getElementById("hero-search-btn");

  if (heroSearchBtn) {
    heroSearchBtn.addEventListener("click", () => {
      // Sync parameters to main filter controls
      if (heroSearchInput) searchInput.value = heroSearchInput.value;
      if (heroTypeSelect) typeSelect.value = heroTypeSelect.value;
      
      // Scroll to property catalog smoothly
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
  searchTimeout = setTimeout(applyFilters, 300);
}

function applyFilters() {
  const searchInput = document.getElementById("search-input");
  const typeSelect = document.getElementById("type-select");
  const bedsSelect = document.getElementById("beds-select");
  const priceRange = document.getElementById("price-range");
  const container = document.getElementById("all-properties-grid");

  if (!searchInput) return;

  const query = searchInput.value.toLowerCase().trim();
  const type = typeSelect.value;
  const beds = bedsSelect.value;
  const maxPrice = parseInt(priceRange.value);

  // Filter listings
  const filtered = PROPERTIES_DATA.filter(property => {
    // Search by title or location
    const matchesQuery = !query || 
      property.title.toLowerCase().includes(query) || 
      property.location.toLowerCase().includes(query);
    
    // Search by type
    const matchesType = !type || property.type === type;
    
    // Search by bedrooms (if select value is "4+", match >= 4, else exact match)
    let matchesBeds = true;
    if (beds) {
      if (beds.endsWith("+")) {
        const threshold = parseInt(beds);
        matchesBeds = property.beds >= threshold;
      } else {
        matchesBeds = property.beds === parseInt(beds);
      }
    }

    // Search by price
    const matchesPrice = property.price <= maxPrice;

    return matchesQuery && matchesType && matchesBeds && matchesPrice;
  });

  // Visual feedback for filter calculation (shimmer / loading state)
  container.classList.add("filtering");
  
  setTimeout(() => {
    renderAllProperties(filtered);
    container.classList.remove("filtering");
  }, 250);
}

function resetAllFilters() {
  const searchInput = document.getElementById("search-input");
  const typeSelect = document.getElementById("type-select");
  const bedsSelect = document.getElementById("beds-select");
  const priceRange = document.getElementById("price-range");
  const priceValue = document.getElementById("price-value");

  if (!searchInput) return;

  searchInput.value = "";
  typeSelect.value = "";
  bedsSelect.value = "";
  priceRange.value = 20000000;
  priceValue.textContent = "Any Budget";

  // Also reset quick search inputs
  const heroSearchInput = document.getElementById("hero-search-input");
  const heroTypeSelect = document.getElementById("hero-type-select");
  if (heroSearchInput) heroSearchInput.value = "";
  if (heroTypeSelect) heroTypeSelect.value = "";

  applyFilters();
}

/* ==========================================================
   Testimonials Slider
   ========================================================== */
function initTestimonialsSlider() {
  const container = document.getElementById("testimonials-slider-content");
  const prevBtn = document.getElementById("testimonial-prev");
  const nextBtn = document.getElementById("testimonial-next");
  const indicators = document.getElementById("testimonial-indicators");
  const section = document.getElementById("testimonials-section");

  if (!container || TESTIMONIALS_DATA.length === 0) return;

  let currentIndex = 0;

  // Render slides
  container.innerHTML = TESTIMONIALS_DATA.map((t, idx) => {
    const safeQuote = escapeHTML(t.quote);
    const safeAuthor = escapeHTML(t.author);
    const safeRole = escapeHTML(t.role);
    const safeLoc = escapeHTML(t.location);
    return `
      <div class="testimonial-slide ${idx === 0 ? 'slide-active' : ''}" data-index="${idx}">
        <p class="testimonial-quote">“${safeQuote}”</p>
        <div class="testimonial-author-info">
          <span class="author-name">${safeAuthor}</span>
          <span class="author-title">${safeRole} &middot; ${safeLoc}</span>
        </div>
      </div>
    `;
  }).join("");

  // Render indicators
  indicators.innerHTML = TESTIMONIALS_DATA.map((_, idx) => `
    <button type="button" class="indicator-dot ${idx === 0 ? 'indicator-active' : ''}" data-index="${idx}" aria-label="Go to testimonial slide ${idx + 1}"></button>
  `).join("");

  const slides = container.querySelectorAll(".testimonial-slide");
  const dots = indicators.querySelectorAll(".indicator-dot");

  function goToSlide(index) {
    // Handle wrap around
    if (index >= TESTIMONIALS_DATA.length) index = 0;
    if (index < 0) index = TESTIMONIALS_DATA.length - 1;

    // Toggle active classes
    slides[currentIndex].classList.remove("slide-active");
    dots[currentIndex].classList.remove("indicator-active");

    currentIndex = index;

    slides[currentIndex].classList.add("slide-active");
    dots[currentIndex].classList.add("indicator-active");
  }

  prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
  nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));

  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      const targetIndex = parseInt(e.target.getAttribute("data-index"));
      goToSlide(targetIndex);
    });
  });

  // Keyboard navigation for slider (accessibility)
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

  // Autoplay slider every 8 seconds
  let autoPlayTimer = setInterval(() => goToSlide(currentIndex + 1), 8000);

  // Clear timer when user interacts
  const resetAutoplay = () => {
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(() => goToSlide(currentIndex + 1), 8000);
  };

  prevBtn.addEventListener("click", resetAutoplay);
  nextBtn.addEventListener("click", resetAutoplay);
  dots.forEach(dot => dot.addEventListener("click", resetAutoplay));
}

/* ==========================================================
   Inquiry Modal Pre-fill & Controls
   ========================================================== */
function initInquiryModal() {
  const modal = document.getElementById("inquiry-modal");
  const closeModalBtn = document.getElementById("modal-close");
  const modalPropertyInput = document.getElementById("modal-property");
  
  if (!modal) return;

  // Open modal handler (delegated listener on both listings section & featured section)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-inquire");
    if (btn) {
      const propTitle = btn.getAttribute("data-prop-title");
      if (modalPropertyInput && propTitle) {
        modalPropertyInput.value = propTitle;
      }
      openModal(modal);
    }
  });

  // Close modal click listeners
  closeModalBtn.addEventListener("click", () => closeModal(modal));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });
}

// Named function for modal keyboard navigation to avoid event listener buildup
function handleModalKeydown(e) {
  const modal = document.getElementById("inquiry-modal");
  if (!modal || !modal.classList.contains("modal-open")) return;
  
  if (e.key === "Escape") {
    closeModal(modal);
    return;
  }

  if (e.key === 'Tab') {
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex="0"]');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) { // Shift + Tab
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else { // Tab
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  }
}

function openModal(modal) {
  modal.classList.add("modal-open");
  document.body.classList.add("modal-active");
  
  // Attach keydown focus trap listener
  document.addEventListener('keydown', handleModalKeydown);
  
  // Set focus on first input element
  const nameInput = document.getElementById("modal-name");
  if (nameInput) {
    nameInput.focus();
  }
}

function closeModal(modal) {
  modal.classList.remove("modal-open");
  document.body.classList.remove("modal-active");
  
  // Remove keydown focus trap listener
  document.removeEventListener('keydown', handleModalKeydown);
  
  // Reset the form inside the modal
  const form = modal.querySelector("form");
  if (form) {
    form.reset();
    clearFormErrors(form);
  }
}

/* ==========================================================
   Forms Validations and Mock Submissions
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

    // Real-time input cleaning / field errors clearing
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

  // Phone Validation (Optional, but if entered must match general phone format)
  if (phoneInput && phoneInput.value.trim()) {
    const val = phoneInput.value.trim();
    const phoneRegex = /^[+]?[0-9\s\-()]{7,20}$/;
    if (!phoneRegex.test(val)) {
      showError(phoneInput, "Please enter a valid contact phone number.");
      isValid = false;
    }
  }

  // Message validation
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

  // Disable buttons & show loading
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <svg class="spinner" viewBox="0 0 50 50" width="20" height="20">
      <circle class="spinner-path" cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"></circle>
    </svg>
    Processing...
  `;

  // Simulate server communication latency
  setTimeout(() => {
    // Restore button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;

    // Reset Form
    form.reset();

    // Show success dialog / toast message
    showSuccessToast("Thank you. Your inquiry has been sent to our concierge desk. We will contact you shortly.");

    // Close modal if open
    const modal = document.getElementById("inquiry-modal");
    if (modal && modal.classList.contains("modal-open")) {
      closeModal(modal);
    }
  }, 2000);
}

/* ==========================================================
   Newsletter Subscription Handling
   ========================================================== */
function initNewsletterForm() {
  const newsletterForm = document.querySelector(".newsletter-input-group");
  if (!newsletterForm) return;

  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("newsletter-email");
    if (emailInput && emailInput.value.trim()) {
      showSuccessToast("Thank you! You have successfully subscribed to our newsletter.");
      newsletterForm.reset();
    }
  });
}

/* ==========================================================
   Toast Notifications
   ========================================================== */
function showSuccessToast(message) {
  // Check if toast container already exists, if not create
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const safeMessage = escapeHTML(message);

  const toast = document.createElement("div");
  toast.className = "toast toast-success";
  toast.innerHTML = `
    <div class="toast-icon">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    </div>
    <div class="toast-content">
      <p class="toast-message">${safeMessage}</p>
    </div>
    <button type="button" class="toast-close" aria-label="Close Notification">&times;</button>
  `;

  container.appendChild(toast);

  // Trigger browser paint to slide in
  setTimeout(() => {
    toast.classList.add("toast-show");
  }, 10);

  const closeToast = () => {
    toast.classList.remove("toast-show");
    setTimeout(() => toast.remove(), 300);
  };

  toast.querySelector(".toast-close").addEventListener("click", closeToast);

  // Auto remove after 5 seconds
  setTimeout(closeToast, 5000);
}
