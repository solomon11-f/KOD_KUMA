/* ============================================
   KOD KUMA - MAIN SCRIPT
   ============================================ */

// ============================================
// DEFAULT MENU DATA
// ============================================
const DEFAULT_MENU = [
  // PLJESKAVICE
  {
    id: 1, category: "pljeskavice",
    name: "Pljeskavica 100g", price: 210,
    image: "", emoji: "🥩",
    desc: "Domaća pljeskavica od svežeg mlevenog mesa"
  },
  {
    id: 2, category: "pljeskavice",
    name: "Pljeskavica 200g", price: 310,
    image: "", emoji: "🥩",
    desc: "Veća pljeskavica savršena za gladan stomak"
  },
  {
    id: 3, category: "pljeskavice",
    name: "Pljeskavica 300g", price: 410,
    image: "", emoji: "🥩",
    desc: "Jumbo pljeskavica za prave gurmane"
  },
  {
    id: 4, category: "pljeskavice",
    name: "Gurmanska 200g", price: 350,
    image: "", emoji: "🥩",
    desc: "Začinjena gurmanska pljeskavica sa sirom"
  },
  {
    id: 5, category: "pljeskavice",
    name: "Gurmanska 300g", price: 450,
    image: "", emoji: "🥩",
    desc: "Jumbo gurmanska, savršena kombinacija ukusa"
  },
  {
    id: 6, category: "pljeskavice",
    name: "Leskovačka 250g", price: 380,
    image: "", emoji: "🌶️",
    desc: "Ljuta leskovačka specijaliteta po receptu kuma"
  },
  {
    id: 7, category: "pljeskavice",
    name: "Punjena 200g", price: 330,
    image: "", emoji: "🥩",
    desc: "Punjena kajmakom i sirom - pravo iznenađenje"
  },
  {
    id: 8, category: "pljeskavice",
    name: "Punjena 300g", price: 430,
    image: "", emoji: "🥩",
    desc: "Velika punjena pljeskavica, bogata ukusom"
  },
  // ROŠTILJ
  {
    id: 9, category: "rostilj",
    name: "Belo meso 180g", price: 310,
    image: "", emoji: "🍗",
    desc: "Sočno piletina sa roštilja, zlatno hrskavo"
  },
  {
    id: 10, category: "rostilj",
    name: "Batak", price: 290,
    image: "", emoji: "🍗",
    desc: "Sočan piletinski batak sa začinima"
  },
  {
    id: 11, category: "rostilj",
    name: "Punjeni batak", price: 390,
    image: "", emoji: "🍗",
    desc: "Batak punjen sirom i paprikama"
  },
  {
    id: 12, category: "rostilj",
    name: "Šiš ćevap 200g", price: 330,
    image: "", emoji: "🍢",
    desc: "Klasični šiš ćevap na žaru sa prilogom"
  },
  {
    id: 13, category: "rostilj",
    name: "Punjeni šiš 200g", price: 360,
    image: "", emoji: "🍢",
    desc: "Šiš ćevap punjen sirom i povrćem"
  },
  {
    id: 14, category: "rostilj",
    name: "Punjeni šiš 300g", price: 460,
    image: "", emoji: "🍢",
    desc: "Veći punjeni šiš ćevap za prave gurmane"
  },
  {
    id: 15, category: "rostilj",
    name: "Kobasice 200g", price: 280,
    image: "", emoji: "🌭",
    desc: "Domaće kobasice sa roštilja"
  },
  {
    id: 16, category: "rostilj",
    name: "Ćevapi 1kg", price: 1400,
    image: "", emoji: "🍢",
    desc: "Kilogram svežih domaćih ćevapa"
  },
  {
    id: 17, category: "rostilj",
    name: "Mešani roštilj 1kg", price: 1580,
    image: "", emoji: "🍽️",
    desc: "Komplet mešanog roštilja - sve u jednom"
  },
  // BURGERI
  {
    id: 18, category: "burgeri",
    name: "Burger XXL", price: 490,
    image: "", emoji: "🍔",
    desc: "Jumbo burger sa duplom pljeskvicom i svežim povrćem"
  },
  {
    id: 19, category: "burgeri",
    name: "Džek Burger", price: 530,
    image: "", emoji: "🍔",
    desc: "Specijalitet kume - sos po tajnom receptu"
  },
  // NAPICI
  {
    id: 20, category: "napici",
    name: "Pivo limenka", price: 180,
    image: "", emoji: "🍺",
    desc: "Osvežavajuće pivo u limenki"
  },
  {
    id: 21, category: "napici",
    name: "Coca Cola 0.33l", price: 120,
    image: "", emoji: "🥤",
    desc: "Klasična Coca Cola"
  },
  {
    id: 22, category: "napici",
    name: "Fanta 0.33l", price: 120,
    image: "", emoji: "🍊",
    desc: "Slatka narandžasta Fanta"
  },
  {
    id: 23, category: "napici",
    name: "Sprite 0.33l", price: 120,
    image: "", emoji: "🥤",
    desc: "Osvežavajući Sprite"
  },
  {
    id: 24, category: "napici",
    name: "Voda 0.5l", price: 80,
    image: "", emoji: "💧",
    desc: "Prirodna mineralna voda"
  }
];

const CATEGORIES = {
  all:         "Sve",
  pljeskavice: "Pljeskavice",
  rostilj:     "Roštilj",
  burgeri:     "Burgeri",
  napici:      "Napici"
};

// ============================================
// STATE
// ============================================
let menuItems = [];
let cart = [];
let activeCategory = "all";
let orderType = "pickup"; // 'pickup' | 'dostava'

// ============================================
// INIT
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  loadMenu();
  renderMenuTabs();
  renderMenuItems();
  initNavbar();
  initCart();
  initCheckout();
  initScrollAnimations();
  initMobileNav();
});

// ============================================
// MENU
// ============================================
function loadMenu() {
  try {
    const stored = localStorage.getItem("kodkuma_menu");
    if (stored) {
      menuItems = JSON.parse(stored);
    } else {
      menuItems = DEFAULT_MENU;
    }
  } catch (e) {
    menuItems = DEFAULT_MENU;
  }
}

function renderMenuTabs() {
  const container = document.getElementById("menu-tabs");
  if (!container) return;

  container.innerHTML = "";
  Object.entries(CATEGORIES).forEach(([key, label]) => {
    const btn = document.createElement("button");
    btn.className = `tab-btn${activeCategory === key ? " active" : ""}`;
    btn.textContent = label;
    btn.addEventListener("click", () => {
      activeCategory = key;
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderMenuItems();
    });
    container.appendChild(btn);
  });
}

function renderMenuItems() {
  const grid = document.getElementById("menu-grid");
  if (!grid) return;

  const filtered = activeCategory === "all"
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="color:var(--cream);opacity:.5;text-align:center;padding:40px;grid-column:1/-1;font-family:'Oswald',sans-serif;letter-spacing:.06em;">Nema stavki u ovoj kategoriji</div>`;
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <div class="menu-card fade-in" data-id="${item.id}">
      ${item.image
        ? `<img class="menu-card-img" src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
        : ""
      }
      <div class="menu-card-img-placeholder" ${item.image ? 'style="display:none"' : ""}>
        ${item.emoji || "🍽️"}
      </div>
      <div class="menu-card-body">
        <h3>${item.name}</h3>
        <p class="desc">${item.desc || ""}</p>
        <div class="menu-card-footer">
          <div class="price">${item.price}<span> RSD</span></div>
          <button class="add-to-cart-btn" onclick="addToCart(${item.id})" title="Dodaj u korpu">+</button>
        </div>
      </div>
    </div>
  `).join("");

  // trigger fade in
  requestAnimationFrame(() => {
    document.querySelectorAll(".menu-card.fade-in").forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), i * 50);
    });
  });
}

// ============================================
// CART
// ============================================
function addToCart(id) {
  const item = menuItems.find(i => i.id === id);
  if (!item) return;

  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  updateCartUI();
  showToast(`${item.name} dodato u korpu 🛒`);
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else updateCartUI();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI() {
  // Badge
  const count = getCartCount();
  document.getElementById("cart-count").textContent = count;

  // Items
  const container = document.getElementById("cart-items");
  const empty = document.getElementById("cart-empty");

  if (cart.length === 0) {
    container.innerHTML = "";
    empty.style.display = "block";
  } else {
    empty.style.display = "none";
    container.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-img">${item.emoji || "🍽️"}</div>
        <div class="cart-item-info">
          <div class="name">${item.name}</div>
          <div class="price">${(item.price * item.qty).toLocaleString()} RSD</div>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          <button class="remove-item" onclick="removeFromCart(${item.id})" title="Ukloni">🗑</button>
        </div>
      </div>
    `).join("");
  }

  // Total
  document.getElementById("cart-total").textContent = getCartTotal().toLocaleString() + " RSD";
}

function initCart() {
  // Cart button
  document.getElementById("cart-btn").addEventListener("click", openCart);
  document.getElementById("cart-overlay").addEventListener("click", closeCart);
  document.getElementById("cart-close").addEventListener("click", closeCart);
  document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) { showToast("Korpa je prazna!", "error"); return; }
    closeCart();
    openCheckout();
  });
  updateCartUI();
}

function openCart() {
  document.getElementById("cart-overlay").classList.add("open");
  document.getElementById("cart-sidebar").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  document.getElementById("cart-overlay").classList.remove("open");
  document.getElementById("cart-sidebar").classList.remove("open");
  document.body.style.overflow = "";
}

// ============================================
// CHECKOUT
// ============================================
function initCheckout() {
  document.getElementById("checkout-overlay").addEventListener("click", (e) => {
    if (e.target === document.getElementById("checkout-overlay")) closeCheckout();
  });
  document.getElementById("checkout-close").addEventListener("click", closeCheckout);

  // Order type switching
  document.querySelectorAll(".order-type-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".order-type-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      orderType = btn.dataset.type;
      const addrGroup = document.querySelector(".address-group");
      if (orderType === "dostava") addrGroup.classList.add("show");
      else addrGroup.classList.remove("show");
    });
  });

  // Form submission
  document.getElementById("order-form").addEventListener("submit", submitOrder);
}

function openCheckout() {
  updateOrderSummary();
  document.getElementById("checkout-overlay").classList.add("open");
  document.getElementById("order-form-wrap").style.display = "block";
  document.getElementById("order-success").style.display = "none";
  document.body.style.overflow = "hidden";
}

function closeCheckout() {
  document.getElementById("checkout-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

function updateOrderSummary() {
  const container = document.getElementById("summary-items");
  container.innerHTML = cart.map(item => `
    <div class="summary-item">
      <span>${item.qty}x ${item.name}</span>
      <span>${(item.price * item.qty).toLocaleString()} RSD</span>
    </div>
  `).join("");
  document.getElementById("summary-total").textContent = getCartTotal().toLocaleString() + " RSD";
}

function submitOrder(e) {
  e.preventDefault();

  const ime = document.getElementById("ime").value.trim();
  const telefon = document.getElementById("telefon").value.trim();
  const napomena = document.getElementById("napomena").value.trim();
  const adresa = orderType === "dostava" ? document.getElementById("adresa").value.trim() : "";

  if (!ime || !telefon) {
    showToast("Popunite obavezna polja!", "error");
    return;
  }

  if (orderType === "dostava" && !adresa) {
    showToast("Unesite adresu za dostavu!", "error");
    return;
  }

  // Simulate order submission
  const btn = document.getElementById("submit-order-btn");
  btn.textContent = "Slanje...";
  btn.disabled = true;

  setTimeout(() => {
    // Show success
    document.getElementById("order-form-wrap").style.display = "none";
    document.getElementById("order-success").style.display = "block";

    // Clear cart
    cart = [];
    updateCartUI();

    btn.textContent = "Poruči";
    btn.disabled = false;

    // Reset form
    document.getElementById("order-form").reset();
  }, 1500);
}

// ============================================
// NAVBAR
// ============================================
function initNavbar() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  });
}

// ============================================
// MOBILE NAV
// ============================================
function initMobileNav() {
  const btn = document.getElementById("hamburger-btn");
  const nav = document.getElementById("mobile-nav");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => nav.classList.remove("open"));
  });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
}

// ============================================
// TOAST
// ============================================
function showToast(message, type = "default") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ============================================
// REVIEW SLIDER
// ============================================
let reviewIndex = 0;
let reviewAutoplay = null;

function initReviews() {
  const track = document.getElementById("reviews-track");
  const dots  = document.getElementById("rev-dots");
  if (!track || !dots) return;

  const cards = Array.from(track.children);
  const total = cards.length;

  // Build dots
  dots.innerHTML = "";
  cards.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "rev-dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => goToReview(i));
    dots.appendChild(dot);
  });

  // Show first card
  updateReviewSlider(cards);

  // Auto-play
  reviewAutoplay = setInterval(() => {
    reviewIndex = (reviewIndex + 1) % total;
    updateReviewSlider(cards);
  }, 5000);

  // Pause on hover
  track.addEventListener("mouseenter", () => clearInterval(reviewAutoplay));
  track.addEventListener("mouseleave", () => {
    reviewAutoplay = setInterval(() => {
      reviewIndex = (reviewIndex + 1) % total;
      updateReviewSlider(cards);
    }, 5000);
  });

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener("touchstart", e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener("touchend", e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      reviewIndex = (reviewIndex + (diff > 0 ? 1 : -1) + total) % total;
      updateReviewSlider(cards);
    }
  });
}

function updateReviewSlider(cards) {
  if (!cards) {
    const track = document.getElementById("reviews-track");
    if (!track) return;
    cards = Array.from(track.children);
  }

  const total = cards.length;

  // Use scroll-based approach — most reliable across all browsers
  const wrap = document.querySelector(".reviews-track-wrap");
  if (!wrap) return;

  // Calculate offset: center the active card or align left
  const card = cards[reviewIndex];
  const wrapW = wrap.offsetWidth;
  const cardW = card.offsetWidth + 20; // gap
  const offset = Math.max(0, reviewIndex * cardW - (wrapW - cardW) / 2);

  document.getElementById("reviews-track").style.transform = `translateX(-${offset}px)`;

  // Update dots
  document.querySelectorAll(".rev-dot").forEach((d, i) => {
    d.classList.toggle("active", i === reviewIndex);
  });

  // Highlight active card
  cards.forEach((c, i) => {
    c.style.opacity = "1";
    c.style.transform = i === reviewIndex ? "scale(1.03)" : "scale(1)";
  });
}

function slideReviews(dir) {
  const track = document.getElementById("reviews-track");
  if (!track) return;
  const total = track.children.length;
  reviewIndex = (reviewIndex + dir + total) % total;
  updateReviewSlider(Array.from(track.children));
}

function goToReview(index) {
  reviewIndex = index;
  const track = document.getElementById("reviews-track");
  if (!track) return;
  updateReviewSlider(Array.from(track.children));
}

document.addEventListener("DOMContentLoaded", () => {
  initReviews();

  // Promo banner adjusts hero top padding
  const banner = document.getElementById("promo-banner");
  if (banner) {
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
      const adjust = () => {
        heroContent.style.paddingTop = banner.style.display === "none"
          ? "90px"
          : `${90 + banner.offsetHeight}px`;
      };
      adjust();
      new ResizeObserver(adjust).observe(banner);
    }
  }
});

// ============================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
