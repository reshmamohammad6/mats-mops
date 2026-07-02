const whatsappNumber = "919916743011";

const sectionTargets = {
  premiumMats: "premium-mats-list",
  mopsCleaningTools: "mops-cleaning-tools-list",
  storageSolutions: "storage-solutions-list",
  bottles: "bottles-list",
  decor: "decor-list"
};

const sectionTitles = {
  premiumMats: "Premium Mats Collection",
  mopsCleaningTools: "Mops & Cleaning Tools",
  storageSolutions: "Storage Solutions",
  bottles: "Bottles Collection",
  decor: "Artificial Plants & Decor"
};

let globalCatalog = {};

function orderMessage(productName) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi, I want to order ${productName}`)}`;
}

function renderCategories(categories, isModal = false) {
  const container = isModal ? document.getElementById("modal-grid") : document.getElementById("category-list");
  if (!container || !Array.isArray(categories)) return;

  const itemsToRender = isModal ? categories : categories.slice(0, 6);
  container.innerHTML = itemsToRender.map((category) => `
    <a class="category-card" href="#">
      <img src="${category.image}" alt="${category.productName}">
      <strong>${category.productName}</strong>
      <span>${category.description}</span>
    </a>
  `).join("");
}

function renderProducts(products, targetId, isModal = false) {
  const container = isModal ? document.getElementById("modal-grid") : document.getElementById(targetId);
  if (!container || !Array.isArray(products)) return;

  const itemsToRender = isModal ? products : products.slice(0, 5);
  container.innerHTML = itemsToRender.map((product) => `
    <article class="product-card">
      <img src="${product.image}" alt="${product.productName}">
      <h3>${product.productName}</h3>
      <b>${product.price}</b>
      <p>${product.description}</p>
      <a class="whatsapp-order" href="${orderMessage(product.productName)}" target="_blank" rel="noopener">☏ Order on WhatsApp</a>
    </article>
  `).join("");
}

function setupViewAllButtons() {
  Object.keys(sectionTargets).forEach((sectionName) => {
    const btn = document.getElementById(`view-all-${sectionName}`);
    if (btn) {
      const products = globalCatalog[sectionName];
      if (products && products.length > 0) {
        btn.style.display = 'inline-block';
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          openModal(sectionTitles[sectionName], products, false);
        });
      } else {
        btn.style.display = 'none';
      }
    }
  });
}

function openModal(title, items, isCategory) {
  document.getElementById("modal-title").textContent = title;
  if (isCategory) {
    renderCategories(items, true);
  } else {
    renderProducts(items, null, true);
  }
  document.getElementById("products-modal").classList.add("active");
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("products-modal").classList.remove("active");
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
}

document.getElementById("modal-close-btn")?.addEventListener("click", closeModal);
document.getElementById("products-modal")?.addEventListener("click", (e) => {
  if (e.target.id === "products-modal") closeModal();
});

async function loadCatalog() {
  try {
    const response = await fetch("/api/catalog");
    if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);
    
    globalCatalog = await response.json();
    
    // Check if Shop by Category (categories) was returned, else empty array
    const categories = globalCatalog.categories || [];
    renderCategories(categories);

    Object.entries(sectionTargets).forEach(([sectionName, targetId]) => {
      renderProducts(globalCatalog[sectionName], targetId);
    });

    setupViewAllButtons();
  } catch (error) {
    console.error("Failed to load catalog from backend:", error);
  }
}

function initCarousel() {
  const track = document.getElementById('heroCarouselTrack');
  if (!track) return;
  
  const slides = track.querySelectorAll('img');
  const dotsContainer = document.getElementById('heroCarouselDots');
  const totalSlides = slides.length;
  if (totalSlides <= 1) return;
  
  let currentSlide = 0;
  let autoSlideInterval;
  const dots = [];
  
  function updateSlide() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, index) => {
      const isActive = index === currentSlide;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide();
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlide();
  }

  function goToSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    updateSlide();
  }
  
  function startAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 3000);
  }

  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'hero-carousel-dot';
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(index);
        startAutoSlide();
      });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });
  }

  updateSlide();
  startAutoSlide();
  
  let dragStartX = 0;
  let dragDeltaX = 0;
  let isDragging = false;

  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    isDragging = true;
    dragStartX = e.clientX;
    dragDeltaX = 0;
    track.style.transition = 'none';
    track.setPointerCapture(e.pointerId);
  });

  track.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    dragDeltaX = e.clientX - dragStartX;
    track.style.transform = `translateX(calc(-${currentSlide * 100}% + ${dragDeltaX}px))`;
  });

  track.addEventListener('pointerup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = '';
    handleSwipe();
    track.releasePointerCapture(e.pointerId);
  });

  track.addEventListener('pointercancel', () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = '';
    dragDeltaX = 0;
    updateSlide();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (dragDeltaX < -swipeThreshold) {
      nextSlide();
      startAutoSlide();
    } else if (dragDeltaX > swipeThreshold) {
      prevSlide();
      startAutoSlide();
    } else {
      updateSlide();
    }
    dragDeltaX = 0;
  }
}

initCarousel();
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  if (!slides.length) return;
  
  let currentSlide = 0;
  
  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  }
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
    });
  });
  
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 4000);
}

initTestimonialSlider();
loadCatalog();
