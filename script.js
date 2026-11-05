const products = {
  "angel-reading": { title: "天使占卜", type: "一對一服務", price: 1280, originalPrice: 1680, access: "60 分鐘・線上進行", image: "assets/angel-reading-gold.png" },
  consultation: { title: "一對一諮詢", type: "個人諮詢", price: 2800, originalPrice: 3600, access: "90 分鐘・線上或實體", image: "assets/consultation-gold.png" },
  "aroma-tuning": { title: "香氣調頻", type: "芳香照護", price: 1680, originalPrice: 2280, access: "75 分鐘・實體優先", image: "assets/aroma-tuning-gold.png" }
};

const money = (value) => `NT$ ${Number(value).toLocaleString("zh-TW")}`;
const cartKey = "sunwayDemoCart";
const orderKey = "sunwayDemoOrder";
const page = location.pathname.split("/").pop() || "index.html";
const navItems = [["index.html", "首頁"], ["about.html", "關於我"], ["services.html", "服務項目"], ["courses.html", "最新課程"]];

const productDetails = {
  "angel-reading": {
    eyebrow: "ANGEL READING",
    lead: "當答案還不清楚，先讓象徵替內在說話。",
    description: "透過牌卡與 Angela 的引導式對話，陪你看見議題背後的情緒、需要與可能方向。這項服務提供另一個理解自己的角度。",
    features: [
      ["聚焦此刻議題", "從工作、關係、情緒或人生轉折中，選出目前最想理解的核心問題。"],
      ["牌卡映照內在", "藉由圖像與象徵展開對話，重新看見原本忽略的感受與資源。"],
      ["整理行動方向", "把洞察收束成能帶回生活的提醒，保留選擇，也找回主動權。"]
    ],
    fit: ["正在兩個方向之間猶豫", "想看懂一段關係帶來的提醒", "需要新的角度理解目前狀態", "願意為自己的選擇負責"],
    notes: ["占卜內容為自我探索參考，不保證特定結果", "不替代醫療、法律、投資等專業建議", "請預留安靜且不受打擾的時間", "完成購買後再由 LINE 確認時段"],
    closing: "為自己留一段看清方向的時間。"
  },
  consultation: {
    eyebrow: "PRIVATE CONSULTATION",
    lead: "有人陪你慢慢說清楚，混亂就開始有了輪廓。",
    description: "在尊重與界線清楚的對話裡，陪你梳理反覆出現的情緒、關係與工作議題。你不必準備好答案，只需要帶著真實的自己來。",
    features: [
      ["說出真實近況", "從最困擾或最常反覆的情境開始，不必先把自己整理得很好。"],
      ["辨識情緒需要", "梳理事件、感受與內在信念，讓真正需要被照顧的部分浮現。"],
      ["建立下一步", "把對話化成適合你的練習或行動，回到生活裡逐步驗證。"]
    ],
    fit: ["情緒反覆卡住，想有人陪伴整理", "正經歷關係、工作或人生轉折", "知道要改變，卻不確定從哪開始", "希望建立更穩定的自我照顧方式"],
    notes: ["本服務為生活與自我成長陪伴", "不替代心理治療或醫療診斷", "若有急性危機請優先尋求合法專業協助", "完成購買後再由 LINE 確認形式與時段"],
    closing: "讓一段專屬對話，陪你重新理解自己。"
  },
  "aroma-tuning": {
    eyebrow: "AROMA TUNING",
    lead: "讓一縷香氣，成為回到身體與此刻的入口。",
    description: "結合 Angela 的芳香照護經驗與情緒覺察，引導你辨識當下狀態，找到適合的香氣與日常練習，讓照顧自己變得具體而可持續。",
    features: [
      ["覺察當下狀態", "從睡眠、壓力、情緒與生活節奏，理解目前最需要的支持。"],
      ["感受香氣回應", "在安全使用原則下體驗不同香氣，觀察身體與情緒的細微變化。"],
      ["帶回日常練習", "整理適合自己的使用方式與節奏，讓芳香照護成為生活的一部分。"]
    ],
    fit: ["長期緊繃，想練習放慢與休息", "希望更敏銳地察覺身體訊息", "想建立簡單可持續的自我照顧習慣", "喜歡植物與香氣帶來的陪伴感"],
    notes: ["精油並非藥品，本服務不宣稱療效", "孕期、慢性病、過敏或用藥者請事前告知", "實際用油依個人狀況與安全濃度調整", "完成購買後再由 LINE 確認時段與地點"],
    closing: "讓香氣陪你，把照顧自己放回日常。"
  }
};

const header = document.querySelector("#siteHeader");
if (header) {
  header.className = "site-header";
  header.innerHTML = `
    <div class="nav-shell">
      <a class="logo" href="index.html" aria-label="香悅｜天使姐姐首頁"><img src="assets/sunway-logo_new.svg" alt="香悅 SUN WAY｜天使姐姐"><span>香悅｜天使姐姐</span></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mainNav">選單</button>
      <nav class="main-nav" id="mainNav" aria-label="主選單">
        ${navItems.map(([href, label]) => `<a ${page === href ? 'class="is-active" aria-current="page"' : ""} href="${href}">${label}</a>`).join("")}
        <a class="mobile-cart mobile-cart-link" href="cart.html" aria-label="購物車，共 0 件商品"><span>購物車</span><span class="cart-count" hidden>0</span></a><a class="mobile-cart" href="https://line.me/R/ti/p/@sunway20081224" target="_blank" rel="noopener noreferrer">LINE 諮詢</a>
      </nav>
      <div class="header-actions"><a class="cart-link" href="cart.html" aria-label="購物車，共 0 件商品"><span>購物車</span><span class="cart-count" hidden>0</span></a><a class="login-link" href="https://line.me/R/ti/p/@sunway20081224" target="_blank" rel="noopener noreferrer">LINE 諮詢</a></div>
    </div>`;
  const menuButton = header.querySelector(".menu-toggle");
  const mainNav = header.querySelector(".main-nav");
  menuButton.addEventListener("click", () => {
    const open = mainNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
}

const footer = document.querySelector("#siteFooter");
if (footer) {
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="container footer-grid">
      <div class="footer-brand"><strong>香悅｜天使姐姐</strong><p>芳香照護・情緒陪伴・生命成長</p></div>
      <nav class="footer-nav" aria-label="頁尾選單"><strong>網站導覽</strong><a href="about.html">關於我</a><a href="services.html">課程與服務</a><a href="cart.html">購物車</a></nav>
      <div class="footer-contact"><strong>聯絡資訊</strong><a href="https://line.me/R/ti/p/@sunway20081224" target="_blank" rel="noopener noreferrer">LINE｜@sunway20081224</a><a href="mailto:angela29112458@gmail.com">angela29112458@gmail.com</a><a href="https://www.facebook.com/sunway20081224" target="_blank" rel="noopener noreferrer">Facebook</a></div>
    </div>
    <div class="container footer-bottom">
      <div class="footer-bottom-row">
        <nav class="footer-policies" aria-label="政策資訊"><a href="privacy-policy.html">隱私權政策</a><a href="refund-policy.html">退換貨政策</a><a href="anti-fraud.html">防詐騙資訊</a></nav>
        <nav class="footer-social" aria-label="社群連結">
          <a class="footer-social-item" href="https://line.me/R/ti/p/@sunway20081224" target="_blank" rel="noopener noreferrer" aria-label="加入香悅 LINE" title="加入香悅 LINE"><svg class="social-rail-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.1c0 4-3.6 7.2-8 7.2-.8 0-1.6-.1-2.3-.3L5 20.5l1.2-3.6C4.8 15.6 4 13.4 4 11.1 4 7.1 7.6 4 12 4s8 3.1 8 7.1Z"/><circle cx="8.5" cy="11.2" r=".8"/><circle cx="12" cy="11.2" r=".8"/><circle cx="15.5" cy="11.2" r=".8"/></svg></a>
          <a class="footer-social-item instagram-placeholder" href="#" aria-label="Instagram 連結待設定" title="Instagram 連結待設定"><svg class="social-rail-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle class="solid" cx="17.5" cy="6.7" r="1"/></svg></a>
          <a class="footer-social-item" href="https://www.facebook.com/sunway20081224" target="_blank" rel="noopener noreferrer" aria-label="前往香悅 Facebook" title="前往香悅 Facebook"><svg class="social-rail-icon" viewBox="0 0 24 24" aria-hidden="true"><path class="solid" d="M13.7 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5H17V4a22 22 0 0 0-2.4-.1c-2.4 0-4.1 1.5-4.1 4.2V10H8v3h2.5v8h3.2Z"/></svg></a>
        </nav>
      </div>
      <p class="copyright">© 2026 香悅。本站為課程購買流程展示，正式售價、服務內容與預約規則以上線公告為準。</p>
    </div>`;
}

const socialRail = document.createElement("nav");
socialRail.className = "social-rail";
socialRail.setAttribute("aria-label", "社群與頁面捷徑");
socialRail.innerHTML = `
  <a class="social-rail-item" href="https://line.me/R/ti/p/@sunway20081224" target="_blank" rel="noopener noreferrer" aria-label="加入香悅 LINE" title="加入香悅 LINE">
    <svg class="social-rail-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.1c0 4-3.6 7.2-8 7.2-.8 0-1.6-.1-2.3-.3L5 20.5l1.2-3.6C4.8 15.6 4 13.4 4 11.1 4 7.1 7.6 4 12 4s8 3.1 8 7.1Z"/><circle cx="8.5" cy="11.2" r=".8"/><circle cx="12" cy="11.2" r=".8"/><circle cx="15.5" cy="11.2" r=".8"/></svg><span class="social-rail-caption">LINE</span>
  </a>
  <a class="social-rail-item instagram-placeholder" href="#" aria-label="Instagram 連結待設定" title="Instagram 連結待設定">
    <svg class="social-rail-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle class="solid" cx="17.5" cy="6.7" r="1"/></svg><span class="social-rail-caption">IG</span>
  </a>
  <a class="social-rail-item" href="https://www.facebook.com/sunway20081224" target="_blank" rel="noopener noreferrer" aria-label="前往香悅 Facebook" title="前往香悅 Facebook">
    <svg class="social-rail-icon" viewBox="0 0 24 24" aria-hidden="true"><path class="solid" d="M13.7 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5H17V4a22 22 0 0 0-2.4-.1c-2.4 0-4.1 1.5-4.1 4.2V10H8v3h2.5v8h3.2Z"/></svg><span class="social-rail-caption">FB</span>
  </a>
  <button class="social-rail-item social-rail-top" type="button" aria-label="回到頁首" title="回到頁首">
    <svg class="social-rail-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 14 6-6 6 6"/></svg><span class="social-rail-caption">TOP</span>
  </button>`;
document.body.appendChild(socialRail);
document.querySelectorAll(".instagram-placeholder").forEach((link) => link.addEventListener("click", (event) => {
  event.preventDefault();
  showToast("Instagram 連結尚未設定。");
}));
socialRail.querySelector(".social-rail-top").addEventListener("click", () => {
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
});

let toast = document.querySelector("#toast");
function showToast(message) {
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

const productPage = document.querySelector("#productPage");
if (productPage) {
  const id = productPage.dataset.productId;
  const product = products[id];
  const detail = productDetails[id];
  if (product && detail) {
    productPage.innerHTML = `
      <section class="sales-hero"><div class="container sales-grid"><div class="sales-copy"><p class="eyebrow">${detail.eyebrow}</p><h1>${product.title}</h1><p class="lead">${detail.lead}</p></div><img class="sales-image" src="${product.image}" alt="${product.title}主視覺"></div></section>
      <nav class="detail-nav" aria-label="頁面段落"><div class="container"><a href="#offer">服務與價格</a><a href="#details">服務過程</a><a href="#fit">適合對象</a><a href="#notes">服務提醒</a></div></nav>
      <section class="module module--offer" id="offer"><div class="container module-offer__inner"><p class="eyebrow">SERVICE OVERVIEW</p><h2>${product.title}</h2><p class="module-offer__lead">${detail.lead}</p><p class="module-offer__description">${detail.description}</p><div class="module-offer__facts"><div><strong>${product.access.split("・")[0]}</strong><span>服務時間</span></div><div><strong>${product.access.split("・")[1]}</strong><span>進行方式</span></div><div><strong>一對一</strong><span>專屬陪伴</span></div></div><div class="module-offer__price"><span>優惠價</span><strong>${money(product.price)}</strong><del>原價 ${money(product.originalPrice)}</del><small>現省 ${money(product.originalPrice - product.price)}</small></div><button class="button primary" type="button" data-add-to-cart="${id}">加入購物車</button></div></section>
      <section class="module module--steps soft" id="details"><div class="container"><div class="section-head"><div><p class="eyebrow">HOW IT WORKS</p><h2>一次${product.title}，三個整理階段。</h2></div><p>從當下的狀態出發，循序整理出能帶回生活的提醒與方向。</p></div><div class="module-steps">${detail.features.map(([title, copy], index) => `<article><span>0${index + 1}</span><h3>${title}</h3><p>${copy}</p></article>`).join("")}</div></div></section>
      <section class="module module--pillars" id="fit"><div class="container"><div class="section-head"><div><p class="eyebrow">WHO IS IT FOR</p><h2>很適合你，如果……</h2></div></div><ul class="module-fit-grid">${detail.fit.map((item) => `<li>${item}</li>`).join("")}</ul></div></section>
      <section class="module module--faq soft" id="notes"><div class="container module-faq-layout"><div><p class="eyebrow">BEFORE BOOKING</p><h2>服務提醒</h2></div><ul class="module-note-list">${detail.notes.map((item) => `<li>${item}</li>`).join("")}</ul></div></section>
      <section class="module module--cta"><div class="container module-cta-inner"><div><p class="eyebrow">READY TO BEGIN</p><h2>${detail.closing}</h2><p>完成展示版購物流程後，請透過 LINE 與香悅確認服務形式、時段與注意事項。</p></div><div class="module-cta-actions"><strong>${money(product.price)}</strong><button class="button primary" type="button" data-add-to-cart="${id}">加入購物車</button></div></div></section>`;
    productPage.querySelectorAll("[data-add-to-cart]").forEach((button) => button.addEventListener("click", () => addToCart(button.dataset.addToCart)));
  }
}

function getCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(cartKey) || "[]");
    return Array.isArray(saved) ? saved.filter((item) => products[item.id] && Number.isInteger(item.qty) && item.qty > 0) : [];
  } catch {
    return [];
  }
}

function saveCart(cart) { localStorage.setItem(cartKey, JSON.stringify(cart)); }
function totals(cart) {
  const original = cart.reduce((sum, item) => sum + products[item.id].originalPrice * item.qty, 0);
  const total = cart.reduce((sum, item) => sum + products[item.id].price * item.qty, 0);
  return { original, discount: original - total, total };
}
function setText(selector, value) {
  const node = document.querySelector(selector);
  if (node) node.textContent = value;
}
function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll(".cart-link, .mobile-cart-link").forEach((link) => {
    const badge = link.querySelector(".cart-count");
    badge.textContent = count > 99 ? "99+" : String(count);
    badge.hidden = count === 0;
    link.setAttribute("aria-label", `購物車，共 ${count} 件商品`);
  });
}

function addToCart(id) {
  if (!products[id]) return;
  const cart = getCart();
  const item = cart.find((entry) => entry.id === id);
  if (item) item.qty += 1;
  else cart.push({ id, qty: 1 });
  saveCart(cart);
  updateCartCount();
  showToast(`${products[id].title} 已加入購物車。`);
}

document.querySelectorAll("[data-add-to-cart]").forEach((button) => {
  if (productPage?.contains(button)) return;
  button.addEventListener("click", () => addToCart(button.dataset.addToCart));
});

document.querySelector("[data-clear-cart]")?.addEventListener("click", () => {
  saveCart([]);
  resetCoupon();
  renderCartPage();
  renderCheckoutPage();
  updateCartCount();
  showToast("購物車已清空。");
});

let appliedCoupon = false;

function resetCoupon() {
  appliedCoupon = false;
  const input = document.querySelector("#couponCode");
  if (input) { input.disabled = false; input.value = ""; }
  const button = document.querySelector("#applyCoupon");
  if (button) button.textContent = "使用折扣碼";
  const message = document.querySelector("#couponMessage");
  if (message) message.textContent = "展示用代碼：DEMO100，可折抵 NT$ 100。";
}

function renderCartPage() {
  const container = document.querySelector("#cartItems");
  if (!container) return;
  const cart = getCart();
  const clearButton = document.querySelector("[data-clear-cart]");
  if (clearButton) clearButton.disabled = !cart.length;
  if (!cart.length) {
    container.innerHTML = '<div class="empty-state"><h3>購物車目前是空的</h3><p>從個人服務中，選擇適合你的陪伴方式。</p><a class="button primary" href="services.html">查看服務項目</a></div>';
  } else {
    container.innerHTML = cart.map(({ id, qty }) => {
      const product = products[id];
      return `<article class="cart-item"><img class="cart-thumb" src="${product.image}" alt=""><div class="cart-item-copy"><span>${product.type}</span><h3>${product.title}</h3><p>${product.access}</p></div><div class="cart-item-controls"><div class="quantity-stepper" aria-label="${product.title}數量"><button type="button" data-quantity="-1" data-product="${id}" aria-label="減少${product.title}數量" ${qty === 1 ? "disabled" : ""}>−</button><output aria-live="polite">${qty}</output><button type="button" data-quantity="1" data-product="${id}" aria-label="增加${product.title}數量" ${qty >= 99 ? "disabled" : ""}>+</button></div><strong class="cart-line-price">${money(product.price * qty)}</strong><button class="cart-remove" type="button" data-remove="${id}" aria-label="移除${product.title}">×</button></div></article>`;
    }).join("");
  }
  const { original, discount, total } = totals(cart);
  setText("#cartSubtotal", money(original));
  setText("#cartDiscount", discount ? `− ${money(discount)}` : money(0));
  setText("#cartTotal", money(total));
}

document.querySelector("#cartItems")?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-remove], button[data-quantity]");
  if (!button || button.disabled) return;
  const cart = getCart();
  if (button.dataset.remove) {
    saveCart(cart.filter((item) => item.id !== button.dataset.remove));
  } else {
    const item = cart.find((entry) => entry.id === button.dataset.product);
    if (!item) return;
    item.qty = Math.min(99, Math.max(1, item.qty + Number(button.dataset.quantity)));
    saveCart(cart);
  }
  renderCartPage();
  renderCheckoutPage();
  updateCartCount();
});

function renderCheckoutPage() {
  const container = document.querySelector("#checkoutItems");
  if (!container) return;
  const cart = getCart();
  container.innerHTML = cart.length ? cart.map(({ id, qty }) => `<div class="mini-cart-row"><span>${products[id].title} × ${qty}</span><strong>${money(products[id].price * qty)}</strong></div>`).join("") : '<p class="muted-text">購物車目前是空的，請先選擇服務項目。</p>';
  const { original, discount, total } = totals(cart);
  const couponDiscount = appliedCoupon && cart.length ? Math.min(100, total) : 0;
  setText("#checkoutSubtotal", money(original));
  setText("#checkoutDiscount", discount ? `− ${money(discount)}` : money(0));
  setText("#couponDiscount", `− ${money(couponDiscount)}`);
  const couponRow = document.querySelector("#couponSummaryRow");
  if (couponRow) couponRow.hidden = !couponDiscount;
  setText("#checkoutTotal", money(total - couponDiscount));
  const submit = document.querySelector('#checkoutForm button[type="submit"]');
  if (submit) submit.disabled = !cart.length;
}

const invoiceType = document.querySelector("#invoiceType");
const carrierCheckbox = document.querySelector("#useCarrier");
const noteCheckbox = document.querySelector("#useNote");

function updateOptionalCheckoutFields() {
  const companyFields = document.querySelector("#companyInvoiceFields");
  const carrierField = document.querySelector("#carrierField");
  const noteField = document.querySelector("#noteField");
  if (!invoiceType || !companyFields || !carrierField || !noteField) return;
  const company = invoiceType.value === "company";
  companyFields.hidden = !company;
  companyFields.querySelectorAll("input").forEach((input) => { input.disabled = !company; input.required = company; });
  carrierCheckbox.closest("label").hidden = company;
  if (company) carrierCheckbox.checked = false;
  carrierField.hidden = company || !carrierCheckbox.checked;
  const carrierInput = carrierField.querySelector("input");
  carrierInput.disabled = carrierField.hidden;
  carrierInput.required = !carrierField.hidden;
  noteField.hidden = !noteCheckbox.checked;
  noteField.querySelector("textarea").disabled = noteField.hidden;
}

invoiceType?.addEventListener("change", updateOptionalCheckoutFields);
carrierCheckbox?.addEventListener("change", updateOptionalCheckoutFields);
noteCheckbox?.addEventListener("change", updateOptionalCheckoutFields);
document.querySelector('[name="carrierCode"]')?.addEventListener("input", (event) => { event.target.value = event.target.value.toUpperCase(); });
updateOptionalCheckoutFields();

document.querySelector("#applyCoupon")?.addEventListener("click", () => {
  const input = document.querySelector("#couponCode");
  const message = document.querySelector("#couponMessage");
  const button = document.querySelector("#applyCoupon");
  if (appliedCoupon) {
    resetCoupon();
    message.textContent = "折價碼已移除。展示用代碼：DEMO100。";
  } else if (!getCart().length) {
    message.textContent = "請先加入服務項目，再使用折價碼。";
  } else if (input.value.trim().toUpperCase() === "DEMO100") {
    appliedCoupon = true;
    input.value = "DEMO100";
    input.disabled = true;
    button.textContent = "移除折扣碼";
    message.textContent = "已套用展示用折價碼，折抵 NT$ 100。";
  } else {
    message.textContent = "折價碼無效。展示用代碼為 DEMO100。";
  }
  renderCheckoutPage();
});

document.querySelector("#contactForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  showToast("這是展示表單；請使用頁面的 LINE 或 Email 與香悅聯絡。");
});

const checkoutForm = document.querySelector("#checkoutForm");
checkoutForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const cart = getCart();
  if (!cart.length || !checkoutForm.reportValidity()) return;
  const now = new Date();
  const date = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const suffix = `${String(Date.now()).slice(-6)}${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`;
  const reference = `SW-DEMO-${date}-${suffix}`;
  const couponDiscount = appliedCoupon ? Math.min(100, totals(cart).total) : 0;
  const order = {
    reference,
    items: cart.map(({ id, qty }) => ({ id, qty, unitPrice: products[id].price })),
    couponDiscount,
    payment: checkoutForm.elements?.payment?.value || "credit"
  };
  try {
    sessionStorage.setItem(orderKey, JSON.stringify(order));
  } catch {
    showToast("無法暫存訂購內容，請檢查瀏覽器的儲存設定後再試一次。");
    return;
  }
  saveCart([]);
  updateCartCount();
  location.href = `order-complete.html?ref=${encodeURIComponent(reference)}`;
});

const completionNumber = document.querySelector("#completionNumber");
if (completionNumber) {
  const reference = new URLSearchParams(location.search).get("ref");
  let order;
  try { order = JSON.parse(sessionStorage.getItem(orderKey) || "null"); } catch { order = null; }
  const validItems = Array.isArray(order?.items) && order.items.length > 0 && order.items.length <= Object.keys(products).length && order.items.every((item) =>
    item && products[item.id] && Number.isSafeInteger(item.qty) && item.qty > 0 && item.qty <= 10000 && Number.isSafeInteger(item.unitPrice) && item.unitPrice >= 0
  );
  if (reference && /^SW-DEMO-[0-9]{8}-[0-9]{9}$/.test(reference) && order?.reference === reference && validItems) {
    const subtotal = order.items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
    const couponDiscount = Number.isInteger(order.couponDiscount) && order.couponDiscount >= 0 && order.couponDiscount <= Math.min(100, subtotal) ? order.couponDiscount : 0;
    const paymentNames = { credit: "信用卡（示意）", transfer: "ATM 銀行轉帳（示意）", applepay: "Apple Pay（示意）", linepay: "LINE Pay（示意）" };
    const itemsContainer = document.querySelector("#completionItems");
    order.items.forEach((item) => {
      const product = products[item.id];
      const row = document.createElement("article");
      row.className = "completion-item";
      const image = document.createElement("img");
      image.src = product.image;
      image.alt = "";
      const details = document.createElement("div");
      details.className = "completion-item-copy";
      const title = document.createElement("h3");
      title.textContent = product.title;
      const description = document.createElement("p");
      description.textContent = `${product.access}・數量 ${item.qty}`;
      const price = document.createElement("strong");
      price.className = "completion-item-price";
      price.textContent = money(item.unitPrice * item.qty);
      details.append(title, description);
      row.append(image, details, price);
      itemsContainer.append(row);
    });
    completionNumber.textContent = reference;
    setText("#completionHeading", "訂單已建立");
    setText("#completionMessage", "本次沒有扣款或傳送資料。正式上線後，這裡將顯示付款結果並寄送訂單通知。");
    setText("#completionCoupon", `− ${money(couponDiscount)}`);
    document.querySelector("#completionCouponRow").hidden = !couponDiscount;
    setText("#completionTotal", money(subtotal - couponDiscount));
    setText("#completionPayment", paymentNames[order.payment] || "示意流程");
    document.querySelector("#completionOrder").hidden = false;
  }
}

renderCartPage();
renderCheckoutPage();
updateCartCount();
