const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const contactForm = document.querySelector("#contactForm");
let toast = document.querySelector("#toast");

const products = {
  subconscious: {
    title: "潛意識重塑實修課",
    type: "線上課程",
    price: 6280,
    access: "1 年觀看權限"
  },
  audio: {
    title: "21 天能量顯化音頻",
    type: "音頻產品",
    price: 1680,
    access: "永久聆聽"
  },
  journal: {
    title: "心靈專欄書寫課",
    type: "書寫課",
    price: 2280,
    access: "講義與回放"
  },
  program: {
    title: "年度能量重塑陪伴計畫",
    type: "年度計畫",
    price: 39800,
    access: "12 個月共修"
  }
};

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("需求已送出，我會依照你的狀態回覆適合的課程、音頻或諮詢方式。");
    contactForm.reset();
  });
}

document.querySelectorAll("[data-add-to-cart]").forEach((button) => {
  button.addEventListener("click", () => {
    addToCart(button.getAttribute("data-add-to-cart"));
  });
});

const clearCartButton = document.querySelector("[data-clear-cart]");
if (clearCartButton) {
  clearCartButton.addEventListener("click", () => {
    saveCart([]);
    renderCartPage();
    updateCartCount();
    showToast("購物車已清空。");
  });
}

const checkoutForm = document.querySelector("#checkoutForm");
if (checkoutForm) {
  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (getCart().length === 0) {
      showToast("購物車目前是空的，請先選擇課程。");
      return;
    }
    saveCart([]);
    updateCartCount();
    renderCheckoutPage();
    checkoutForm.reset();
    showToast("訂單已送出，學員會收到課程開通信件。");
  });
}

renderCartPage();
renderCheckoutPage();
updateCartCount();

function addToCart(productId) {
  if (!products[productId]) return;
  const cart = getCart();
  const current = cart.find((item) => item.id === productId);
  if (current) {
    current.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }
  saveCart(cart);
  updateCartCount();
  showToast(`${products[productId].title} 已加入購物車。`);
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem("lightWithinCart")) || [];
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("lightWithinCart", JSON.stringify(cart));
}

function formatPrice(value) {
  return `NT$ ${Number(value).toLocaleString("zh-TW")}`;
}

function cartTotal(cart) {
  return cart.reduce((sum, item) => {
    const product = products[item.id];
    return product ? sum + product.price * item.qty : sum;
  }, 0);
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll(".cart-link").forEach((link) => {
    link.textContent = `購物車 ${count}`;
  });
}

function renderCartPage() {
  const container = document.querySelector("#cartItems");
  if (!container) return;

  const cart = getCart();
  const checkoutLink = document.querySelector("#checkoutLink");
  const subtotal = cartTotal(cart);

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>你的購物車目前是空的</h3>
        <p>可以先從最新課程挑選潛意識課程、音頻或年度工作坊。</p>
        <a class="button primary" href="courses.html">前往選課</a>
      </div>
    `;
    if (checkoutLink) checkoutLink.classList.add("is-disabled");
  } else {
    container.innerHTML = cart.map((item) => {
      const product = products[item.id];
      if (!product) return "";
      return `
        <article class="cart-item">
          <div>
            <span>${product.type}</span>
            <h3>${product.title}</h3>
            <p>${product.access}</p>
          </div>
          <div class="item-price">
            <strong>${formatPrice(product.price * item.qty)}</strong>
            <small>數量 ${item.qty}</small>
          </div>
        </article>
      `;
    }).join("");
    if (checkoutLink) checkoutLink.classList.remove("is-disabled");
  }

  setText("#cartSubtotal", formatPrice(subtotal));
  setText("#cartDiscount", formatPrice(0));
  setText("#cartTotal", formatPrice(subtotal));
}

function renderCheckoutPage() {
  const container = document.querySelector("#checkoutItems");
  if (!container) return;

  const cart = getCart();
  const total = cartTotal(cart);
  if (cart.length === 0) {
    container.innerHTML = `<p class="muted-text">購物車目前是空的，請先回到課程頁選擇項目。</p>`;
  } else {
    container.innerHTML = cart.map((item) => {
      const product = products[item.id];
      if (!product) return "";
      return `
        <div class="mini-cart-row">
          <span>${product.title} × ${item.qty}</span>
          <strong>${formatPrice(product.price * item.qty)}</strong>
        </div>
      `;
    }).join("");
  }
  setText("#checkoutTotal", formatPrice(total));
}

function setText(selector, value) {
  const node = document.querySelector(selector);
  if (node) node.textContent = value;
}

function showToast(message) {
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2800);
}
