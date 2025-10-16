const CONFIG = {
  PRODUCT_API_URL:
    "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json",

  STORAGE_KEYS: {
    PRODUCTS: "ebbk:products:v1",
    FAVS: "ebbk:favs:v1",
  },
  TITLE: "Beğenebileceğinizi düşündüklerimiz",
  COLORS: {
    primary: "#ff9920",
    text: "#333",
    muted: "#666",
    line: "#ddd",
    bg: "#f9f9f9",
    card: "#fff",
  },
  ANCHOR_SELECTORS: [
    ".homepage-hero",
    ".hero",
    ".main-hero",
    "section:has(.hero)",
  ],
};
function isHomePage() {
  const path = location.pathname.replace(/\/+$/, "").toLowerCase();
  const looksRoot = path === "" || path === "/";
  const hasHome =
    document.body.classList.contains("home") ||
    document.body.classList.contains("homepage");

  const canonicalEl = document.querySelector("link[rel='canonical']");
  const canonicalHref = canonicalEl ? canonicalEl.href : "";
  const canonicalRoot =
    canonicalHref && /https?:\/\/[^/]+\/?$/.test(canonicalHref);
  return looksRoot || hasHome || canonicalRoot;
}

(function validateConfig(config) {
  const isHttp = (url) => /^https?:\/\//.test(url);
  if (config && typeof config === "object" && isHttp(config.PRODUCT_API_URL)) {
    console.log("config updated:", config);
  } else {
    console.error("Invalid configuration:", config);
  }
})(CONFIG);

const Storage = {
  get(key, fallback = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.error("Storage get error:", e);
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Storage set error:", e);
    }
  },
};

function applyColor(colors) {
  const root = document.documentElement;
  const map = {
    "--ebbk-primary": colors.primary,
    "--ebbk-text": colors.text,
    "--ebbk-muted": colors.muted,
    "--ebbk-line": colors.line,
    "--ebbk-bg": colors.bg,
    "--ebbk-card": colors.card,
  };
  Object.entries(map).forEach(([key, value]) =>
    root.style.setProperty(key, value)
  );
}

function injectStyles() {
  if (document.getElementById("ebbk-carousel-styles")) return;

  const style = document.createElement("style");
  style.id = "ebbk-carousel-styles";
  style.textContent = `
    :root {

    }
    .ebbk-carousel-container {
    width: 100%;
    margin: 0 auto;
    padding: 20px 16px 32px;
    box-sizing: border-box;
    height: 100%;
    
    }

    @media (min-width: 576px){
    .ebbk-carousel-container{
    
        }

    }
            @media (min-width: 768px) {
      .ebbk-carousel-container {
        max-width: 720px;
      }
    }
    
    @media (min-width: 992px) {
      .ebbk-carousel-container {
        max-width: 960px;
      }
    }
    
    @media (min-width: 1280px) {
      .ebbk-carousel-container {
        max-width: 1180px;
      }
    }
    
    @media (min-width: 1480px) {
      .ebbk-carousel-container {
        max-width: 1296px;
      }
    }
    
    @media (min-width: 1580px) {
      .ebbk-carousel-container {
        max-width: 1320px;
      }
    }

    .ebbk-title{
    font-weight:700;
    font-size:18px;
    margin-bottom:16px;
    color: var(--ebbk-text);
    }
    @media (min-width: 768px) {
      .ebbk-carousel-container {
        padding: 24px 20px 40px;
      }
      .ebbk-title { 
        font-size: 20px;
        margin-bottom: 18px;
      }
    }
    
    @media (min-width: 993px) {
      .ebbk-carousel-container {
        padding: 24px 20px 40px;
      }
      .ebbk-title { 
        font-size: 22px;
        margin-bottom: 20px;
      }
    }
    
    @media (min-width: 1280px) {
      .ebbk-carousel-container {
        padding: 32px 24px 48px;
      }
      .ebbk-title { 
        font-size: 26px;
        margin-bottom: 24px;
      }
    }

    .ebbk-carousel {
    display: flex;
    gap: 20px;
    overflow: hidden;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    padding-bottom: 8px;
    scroll-snap-type: x mandatory;
    scroll-padding-left: 0px;
    
    }

    .ebbk-card {
      position: relative;
      overflow: hidden;
      flex: 0 0 calc((100% - 20px) / 2);
      background: var(--ebbk-card);
      border: 1px solid transparent;
      tranition: border-color 0.2s ease, box-shadow 0.2s ease;
      border-radius: 8px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.05);
      padding: 10px;
      text-align: left;
      scroll-snap-align: start;
    }

    .ebbk-card:hover {
    border-color: #c1ccd4;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    @media (min-width: 993px) {
      .ebbk-card {
        flex: 0 0 calc((100% - 40px) / 3);
        max-width: calc((100% - 40px) / 3);
      }
      .ebbk-carousel {
        overflow-x: hidden;
      }
    }

    @media (min-width: 1280px) {
      .ebbk-card {
        flex: 0 0 calc((100% - 60px) / 4);
        max-width: calc((100% - 60px) / 4);
      }
    }

    @media (min-width: 1480px) {
      .ebbk-card {
        flex: 0 0 calc((100% - 80px) / 5);
        max-width: calc((100% - 80px) / 5);
      }
    }

    .ebbk-name {
      margin: 8px 0 0;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      min-height: calc(1.3em * 2);
      color: #2b2f33;
      font-size: 12px;
    }
    
    @media (min-width: 993px) {
      .ebbk-name {
        font-size: 13px;
      }
    }
    
    .ebbk-name b {
      font-weight: 700;
    }

    .ebbk-pricebox {
      margin-top: auto;
    }
    
    .ebbk-original-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .ebbk-discount-pill {
      background: #00a365;
      color: #fff;
      font-weight: 700;
      font-size: 11px;
      line-height: 1;
      padding: 3px 6px;
      border-radius: 12px;
    }
    
    @media (min-width: 993px) {
      .ebbk-discount-pill {
        font-size: 12px;
      }
    }

    .ebbk-new-price {
      margin-top: 4px;
      color: #00a365;
      font-weight: 700;
      font-size: 16px;
    }
    
    @media (min-width: 993px) {
      .ebbk-new-price {
        font-size: 18px;
      }
    }

    .ebbk-add {
      position: absolute;
      right: 10px;
      bottom: 10px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #fff;
      border: 1px solid var(--ebbk-line);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      line-height: 0;
      color: #0091d5;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    @media (min-width: 993px) {
      .ebbk-add {
        width: 40px;
        height: 40px;
        font-size: 20px;
      }
    }
    
    .ebbk-add:hover {
      background: #0091d5;
      color: #fff;
      transform: scale(1.1);
    }

    .ebbk-add:after {
      content: "+";
    }

    .ebbk-old-price {
      color: var(--ebbk-muted);
      margin-right: 6px;
      font-size: 11px;
    }
    
    @media (min-width: 993px) {
      .ebbk-old-price {
        font-size: 12px;
      }
    }
    
    .ebbk-heart { 
      position: absolute;
      top: 8px;
      right: 8px;
      cursor: pointer;
      z-index: 2;
    }
    
    .ebbk-heart svg { 
      width: 18px; 
      height: 18px; 
      fill: transparent; 
      stroke: var(--ebbk-muted); 
      stroke-width: 1.5; 
      transition: transform 0.2s ease, fill 0.2s ease, stroke 0.2s ease;
    }
    
    @media (min-width: 993px) {
      .ebbk-heart svg {
        width: 20px;
        height: 20px;
      }
    }
    
    .ebbk-heart:hover svg {
      stroke: var(--ebbk-primary);
      transform: scale(1.2); 
    }
    
    .ebbk-heart.active svg {
      stroke: var(--ebbk-primary);
      fill: var(--ebbk-primary);
    }

    .ebbk-link {
      display: flex;
      flex-direction: column;
      height: 100%;
      text-decoration: none;
    }

    .ebbk-imgwrap {
      width: 100%;
      aspect-ratio: 1/1;
      border-radius: 8px;
      overflow: hidden;
      background: var(--ebbk-bg);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ebbk-imgwrap img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 8px;
    }

    .ebbk-carousel-wrap {
      position: relative;
    }

    .ebbk-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #fff;
      border: 1px solid var(--ebbk-line);
      display: none;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: #3d3d3d;
      line-height: 0;
      cursor: pointer;
      z-index: 10;
      transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    @media (min-width: 993px) {
      .ebbk-nav {
        display: flex;
      }
    }

    .ebbk-prev {
      left: -50px;
    }
    
    .ebbk-next {
      right: -50px;
    }

    .ebbk-nav:hover {
      transform: translateY(-50%) scale(1.1);
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }

    .ebbk-nav[disabled] {
      opacity: 0.3;
      pointer-events: none;
    }
    
    .ebbk-nav svg {
      width: 16px;
      height: 16px;
    }
  `;
  document.head.appendChild(style);
}
// Data layer

async function getProducts() {
  const cacheKey = CONFIG.STORAGE_KEYS.PRODUCTS;
  const cachedProducts = Storage.get(cacheKey);

  if (
    cachedProducts &&
    Array.isArray(cachedProducts) &&
    cachedProducts.length > 0
  ) {
    return cachedProducts;
  }

  console.log("Fetching product from API:");

  const response = await fetch(CONFIG.PRODUCT_API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch products from API: " + response.status);
  }

  const data = await response.json();
  const products = Array.isArray(data) ? data : data.products || [];

  Storage.set(cacheKey, products);
  return products;
}

function createCarouselContainer() {
  const section = document.createElement("section");
  section.className = "ebbk-carousel-container";

  const title = document.createElement("h2");
  title.className = "ebbk-title";
  title.textContent = CONFIG.TITLE;

  const wrap = document.createElement("div");
  wrap.className = "ebbk-carousel-wrap";

  const carousel = document.createElement("div");
  carousel.className = "ebbk-carousel";

  const prev = document.createElement("button");
  prev.type = "button";
  prev.className = "ebbk-nav ebbk-prev";
  prev.setAttribute("aria-label", "Önceki ürünler");
  prev.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`;

  const next = document.createElement("button");
  next.type = "button";
  next.className = "ebbk-nav ebbk-next";
  next.setAttribute("aria-label", "Sonraki ürünler");
  next.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 4.5L15.5 12l-7 7.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  wrap.append(prev, carousel, next);
  section.append(title, wrap);

  const anchor = document.querySelector(CONFIG.ANCHOR_SELECTORS.join(","));
  if (anchor) anchor.insertAdjacentElement("afterend", section);
  else document.body.appendChild(section);

  return { section, carousel, prev, next };
}

function splitBrand(name = "") {
  const [brand, ...rest] = String(name).split(" - ");
  return { brand, rest: rest.join(" - ") };
}

// rendering products

function renderProducts(products, container) {
  const favs = Storage.get(CONFIG.STORAGE_KEYS.FAVS, []);
  container.innerHTML = "";

  products.forEach((p) => {
    const fmt = (n) =>
      new Intl.NumberFormat("tr-TR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(n);

    let brand = p.brand || "";
    let titleRest = p.name || "";
    if (!brand && p.name) {
      const parts = p.name.split(" - ");
      brand = parts.shift() || "";
      titleRest = parts.join(" - ");
    }

    const imgSrc = p.img;
    const link = p.url;

    const isFav = favs.map(String).includes(String(p.id));
    const hasDiscount =
      typeof p.original_price === "number" &&
      typeof p.price === "number" &&
      p.original_price > p.price;

    const discount = hasDiscount
      ? Math.round(((p.original_price - p.price) / p.original_price) * 100)
      : null;

    const priceHTML = hasDiscount
      ? `
        <div class="ebbk-pricebox">
          <div class="ebbk-original-row">
            <span class="ebbk-old-price">${fmt(p.original_price)} TL</span>
            <span class="ebbk-discount-pill">%${discount}</span>
          </div>
          <div class="ebbk-new-price">${fmt(p.price)} TL</div>
        </div>`
      : `
        <div class="ebbk-pricebox">
          <div class="ebbk-new-price">${fmt(p.price)} TL</div>
        </div>`;

    const card = document.createElement("div");
    card.className = "ebbk-card";
    card.innerHTML = `
      <div class="ebbk-heart${
        favs.map(String).includes(String(p.id)) ? " active" : ""
      }" data-id="${p.id}">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.1 8.64l-.1.1-.1-.1C9.14 6 5.6 6.24 3.6 8.6c-1.8 2.1-1.3 5.3.9 7.1L12 22l7.5-6.3c2.2-1.8 2.7-5 .9-7.1-2-2.36-5.54-2.6-8.3-.96z"/>
        </svg>
      </div>

        <a href="${link}" target="_blank" class="ebbk-link">
            <div class="ebbk-imgwrap">
            <img src="${imgSrc}" alt="${
      p.name || ""
    }" loading="lazy" decoding="async">
            </div>
        <div class="ebbk-name"><b>${brand}</b>${
      titleRest ? " - " + titleRest : ""
    }</div>
            ${priceHTML}
        </a>

      <button type="button" class="ebbk-add" data-id="${p.id}"
        aria-label="Sepete ekle" title="Sepete ekle"></button>
    `;

    container.appendChild(card);
  });

  container.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".ebbk-add");
    if (addBtn) {
      e.preventDefault();
      e.stopPropagation();
      const pid = addBtn.dataset.id;
      console.log("Add to cart clicked for product id:", pid);
      return;
    }
    const heart = e.target.closest(".ebbk-heart");
    if (!heart) return;
    const id = String(heart.dataset.id);
    let favs = (Storage.get(CONFIG.STORAGE_KEYS.FAVS, []) || []).map(String);

    if (favs.includes(id)) {
      favs = favs.filter((x) => x !== id);
      heart.classList.remove("active");
    } else {
      favs.push(id);
      heart.classList.add("active");
    }
    Storage.set(CONFIG.STORAGE_KEYS.FAVS, favs);
  });
  console.log(`${products.length} products rendered.`);
}

function setupCarouselNav(carousel, prevBtn, nextBtn) {
  const getGap = (el) => {
    const cs = getComputedStyle(el);
    return parseFloat(cs.columnGap || cs.gap || 0) || 0;
  };

  const stepSize = () => {
    const first = carousel.querySelector(".ebbk-card");
    if (!first) return carousel.clientWidth;
    return first.offsetWidth + getGap(carousel);
  };

  const maxScroll = () => carousel.scrollWidth - carousel.clientWidth;

  const updateArrows = () => {
    const x = Math.round(carousel.scrollLeft);
    prevBtn.disabled = x <= 0;
    nextBtn.disabled = x >= maxScroll() - 1;
  };

  const scrollByOne = (dir) => (e) => {
    e.preventDefault();
    const s = stepSize();
    const target = Math.max(
      0,
      Math.min(maxScroll(), carousel.scrollLeft + dir * s)
    );
    carousel.scrollTo({ left: target, behavior: "smooth" });
  };

  prevBtn.addEventListener("click", scrollByOne(-1));
  nextBtn.addEventListener("click", scrollByOne(1));

  let snapTimer;
  carousel.addEventListener(
    "scroll",
    () => {
      updateArrows();
      clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        const s = stepSize();
        const idx = Math.round(carousel.scrollLeft / s);
        carousel.scrollTo({ left: idx * s, behavior: "smooth" });
      }, 80);
    },
    { passive: true }
  );

  window.addEventListener("resize", updateArrows);
  updateArrows();
}

function waitFor(self, { timeout = 500, interval = 100 } = {}) {
  return new Promise((resolve) => {
    const t0 = Date.now();
    (function tick() {
      const el = document.querySelector(self);
      if (el) return resolve(el);
      if (Date.now() - t0 > timeout) return resolve(null);
      setTimeout(tick, interval);
    })();
  });
}

async function init() {
  if (!isHomePage()) {
    console.log("wrong page");
    return;
  }
  applyColor(CONFIG.COLORS);
  injectStyles();
  const { carousel, section, prev, next } = createCarouselContainer();
  const [section1, section2A] = await Promise.all([
    waitFor('cx-page-layout cx-page-slot[position="Section1"]'),
    waitFor('cx-page-layout cx-page-slot[position="Section2A"]'),
  ]);

  if (section2A && section2A.parentNode) {
    section2A.parentNode.insertBefore(section, section2A);
  } else if (section1 && section1.parentNode) {
    section1.parentNode.insertBefore(section, section1.nextSibling);
  } else {
    const before =
      document.querySelector("eb-banner-with-product-carousel") ||
      document.querySelector(
        ".banner__wrapper, .banner, main, .main-content, #content"
      );
    if (before && before.parentNode) {
      before.parentNode.insertBefore(section, before);
    } else {
      (
        document.querySelector("main, .main-content, #content") || document.body
      ).insertAdjacentElement("afterbegin", section);
    }
  }

  const products = await getProducts();
  renderProducts(products, carousel);
  setupCarouselNav(carousel, prev, next);
}

init();
getProducts().then((ps) => console.log(ps.slice(0, 3)));
